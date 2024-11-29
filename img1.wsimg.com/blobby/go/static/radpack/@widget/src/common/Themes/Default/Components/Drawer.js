import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { ICON_SIZE } from '../../../constants';

export function Drawer(props) {
  const {
    maxWidth,
    category,
    backgroundColor,
    children,
    left,
    isOpen,
    showCloseIcon,
    onCloseClick
  } = props;
  const {
    Element: { Background, CloseIcon, Container, Wrapper }
  } = UX2;

  const component = (
    <UX2.Group.DrawerPanel>
      { isOpen && <Background /> }
      <Container
        maxWidth={ isOpen ? maxWidth : 0 }
        category={ category }
        left={ left }
        backgroundColor={ backgroundColor }
      >
        { isOpen && showCloseIcon && <CloseIcon size={ ICON_SIZE } onClick={ onCloseClick } /> }
        <Wrapper>{ children }</Wrapper>
      </Container>
    </UX2.Group.DrawerPanel>
  );

  return this.merge(props, { children: component });
}
