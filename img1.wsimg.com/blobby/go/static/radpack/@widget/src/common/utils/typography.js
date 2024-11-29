import { get, merge, reduce, startsWith } from 'lodash';
import { getRichTextCharCount } from '.';

export function resolveValue(value, args) {
  return typeof value === 'function' ? value.call(this, args) : value;
}

export function reduceFontSizeMap({
  richtext,
  fontSizeMap,
  children,
  dangerouslySetInnerHTML = {}
}) {
  if (!fontSizeMap) {
    return {};
  }
  children = children || dangerouslySetInnerHTML.__html;
  return reduce(
    fontSizeMap,
    (result, value, key) => {
      if (startsWith(key, '@')) {
        result[key] = reduceFontSizeMap({ fontSizeMap: value, children });
      } else {
        let count;
        if (typeof children === 'string' && richtext) {
          count = getRichTextCharCount(children, 0);
        }
        count = count || get(children, 'length', 0);

        const [min = 0, max = Number.MAX_VALUE] = value;
        if (count >= min && count <= max) {
          result.fontSize = key;
        }
      }
      return result;
    },
    {}
  );
}

export function resolveFontSizeMap(props) {
  return { style: reduceFontSizeMap(props) };
}

export function mergeTypographyOverrides(value, props) {
  return merge(
    {},
    resolveValue.call(this, this.mappedValues.typographyMapping[value], props),
    {
      ...(props?.style?.fontSize ? { style: { fontSize: props.style.fontSize } } : {})
    },
    resolveValue.call(this, this.mappedValues.typographyOverrides?.[value], props) || {},
    resolveValue.call(this, this.mappedValues[`typography${value}`], props) || {},
    props.fontSizeMap ? resolveFontSizeMap(props) : {}
  );
}

export function resolveStateLookup(state, props, defaultStyle = {}) {
  if (
    !state ||
    (props.typography && props.typography.toLowerCase()) === (state && state.toLowerCase())
  )
    return defaultStyle;
  return (
    mergeTypographyOverrides.call(this, props.typography, props)[state.toLowerCase()] ||
    defaultStyle
  );
}

export function composeStateStyles(states, props) {
  if (!states) return {};
  return states
    .split(/(?=[A-Z])/)
    .reduce(
      (finalState, curState) =>
        merge({}, finalState, mergeTypographyOverrides.call(this, curState, props)),
      {}
    );
}
