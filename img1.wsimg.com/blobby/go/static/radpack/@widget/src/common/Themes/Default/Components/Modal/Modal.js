import React from 'react';
import { merge } from 'lodash';
import { UX2 } from '@wsb/guac-widget-core';

export function Modal({
  children,
  onClose,
  closeOnClickOutside,
  preventShrink,
  width,
  style,
  ...props
}) {
  const mergedStyles = merge(
    {
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      border: '0',
      position: 'fixed',
      zIndex: '1002',
      overflowY: 'auto',
      backgroundColor: 'accentOverlay'
    },
    style
  );

  const content = (
    <UX2.Component.Modal.Body
      children={ children }
      onClose={ onClose }
      preventShrink={ preventShrink }
      width={ width }
    />
  );

  return this.merge(
    {
      tag: UX2.Element.Block,
      category: 'neutral',
      style: mergedStyles,
      children: content,
      onClick: closeOnClickOutside ? onClose : null
    },
    props
  );
}
