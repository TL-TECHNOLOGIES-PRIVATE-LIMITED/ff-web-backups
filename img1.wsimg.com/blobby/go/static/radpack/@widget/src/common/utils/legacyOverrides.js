export function getMenuHeadingStyle(tag, widgetType, widgetPreset) {
  // Override the default h3 styling for menu layouts to preserve legacy behavior. Not for use in new themes.
  let style = {};

  if (widgetType === 'MENU' && tag === 'h3') {
    style = { color: 'highlight' };

    if (widgetPreset === 'menu3') {
      style.fontSize = 'large';
    }
  }

  return style;
}
