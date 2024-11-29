import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import styles from './styles';
import { BUTTON_ICON_SIZE, BUTTON_ICON_SIZE_SM } from '../../../../../constants';

export default function Button({ children, ...props }) {
  const { state = 'default', size = 'default' } = props;
  const tag = props.href || props.target || props.theme === 'link' ? 'a' : 'button';
  const externalLinkProps = tag === 'a' && props.target === '_blank' ? { rel: 'noopener' } : {};
  const iconSizeDefault = size === 'small' ? 'small' : 'default';
  const {
    icon,
    iconLeft = true,
    iconSize = iconSizeDefault,
    ...styleProps
  } = styles.call(this, props);
  const btnAddonEl = props.btnAddon ? <UX2.Element.Element className='btnAddon' /> : null;

  // Icon logic
  const iconSizes = {
    default: {
      icon: BUTTON_ICON_SIZE,
      adjustment: '-xsmall'
    },
    small: {
      icon: BUTTON_ICON_SIZE_SM,
      adjustment: '-xxsmall'
    }
  };
  const iconAdjustStyles =
    styleProps.fill !== 'OPEN'
      ? {
        marginLeft: iconLeft ? iconSizes[iconSize].adjustment : 0,
        marginRight: iconLeft ? 0 : iconSizes[iconSize].adjustment
      }
      : {};
  const iconSpace = `calc(${iconSizes[iconSize].icon} + 8px)`;
  const iconStyles = {
    common: {
      fontSize: 'inherit',
      fontFamily: 'inherit',
      textTransform: 'inherit',
      letterSpacing: 'inherit'
    },
    wrapper: {
      position: 'relative',
      ...iconAdjustStyles
    },
    icon: {
      width: iconSizes[iconSize].icon,
      height: iconSizes[iconSize].icon,
      position: 'absolute',
      top: '50%',
      left: iconLeft ? 0 : 'auto',
      right: iconLeft ? 'auto' : 0,
      lineHeight: 0,
      transform: 'translateY(-50%)',
      ['> img']: {
        display: 'block'
      }
    },
    text: {
      display: 'block',
      textAlign: 'center',
      marginLeft: iconLeft ? iconSpace : 0,
      marginRight: iconLeft ? 0 : iconSpace
    }
  };

  const iconChildren = (
    <React.Fragment>
      { btnAddonEl }
      <UX2.Element.Element style={{ ...iconStyles.common, ...iconStyles.wrapper }}>
        <UX2.Element.Element style={ iconStyles.icon }>
          { typeof icon === 'string' ? (
            <UX2.Element.Icon icon={ icon } size={ iconSizes[iconSize].icon } />
          ) : (
            icon
          ) }
        </UX2.Element.Element>
        <UX2.Element.Element
          className='iconText'
          style={{ ...iconStyles.common, ...iconStyles.text }}
        >
          { children }
        </UX2.Element.Element>
      </UX2.Element.Element>
    </React.Fragment>
  );

  return this.merge(
    {
      tag,
      disabled: state === 'disabled',
      tcclTracking: 'click',
      typography: 'ButtonAlpha',
      ...externalLinkProps,
      children: icon ? (
        iconChildren
      ) : (
        <React.Fragment>
          { btnAddonEl }
          { children }
        </React.Fragment>
      ),
      ['data-ux-btn']: this.base.kind.toLowerCase()
    },
    styleProps,
    props
  );
}
