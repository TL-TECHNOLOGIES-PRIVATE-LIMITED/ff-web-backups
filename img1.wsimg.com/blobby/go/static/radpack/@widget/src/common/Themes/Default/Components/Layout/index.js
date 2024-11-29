import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function SplitLayout({
  contentElement,
  mediaElement,
  reverse,
  bleed,
  fluid,
  gridProps = {},
  ...props
}) {
  const gridMarginOffset = this.parseSizedUnit(this.mapPropValue('spacing', 'medium'))[0];
  const direction = reverse ? 'Left' : 'Right';
  const fluidStyles = fluid ? { marginHorizontal: `-${gridMarginOffset}px` } : {};
  const bleedStyles = bleed
    ? {
      '@md': {
        height: '100%',
        [`margin${direction}`]: `-${gridMarginOffset}px`
      }
    }
    : {};

  const slot1 = contentElement ? (
    <UX2.Component.Grid.Cell key='slot1'>{ contentElement }</UX2.Component.Grid.Cell>
  ) : null;

  const slot2 = mediaElement ? (
    <UX2.Component.Grid.Cell key='slot2' style={{ 'flex': 1, '@md': { flex: 1 } }}>
      <UX2.Element.Block style={{ ...fluidStyles, ...bleedStyles, position: 'relative' }}>
        { mediaElement }
      </UX2.Element.Block>
    </UX2.Component.Grid.Cell>
  ) : null;

  const slots = [slot1, slot2].filter(Boolean);

  return this.merge(
    {
      tag: UX2.Element.Container,
      fluid,
      children: (
        <UX2.Component.Grid xs={ 1 } md={ slots.length || 1 } { ...gridProps }>
          { reverse ? slots.reverse() : slots }
        </UX2.Component.Grid>
      )
    },
    props
  );
}

export function VerticalBox({ align, ...props }) {
  return this.HorizontalBox(
    this.merge(
      {
        alignX: align || 'middle',
        style: {
          flexDirection: 'column',
          width: 'auto',
          height: '100%'
        }
      },
      props
    )
  );
}

export function HorizontalBox({ align, ...props }) {
  return this.Box(
    this.merge(
      {
        alignX: align || 'left',
        style: {
          height: 'auto',
          width: '100%'
        }
      },
      props
    )
  );
}

export function Box({ alignX, alignY, ...props }) {
  const alignment = {
    top: 'flex-start',
    left: 'flex-start',
    start: 'flex-start',
    middle: 'center',
    center: 'center',
    bottom: 'flex-end',
    right: 'flex-end',
    end: 'flex-end'
  };

  return this.merge(
    {
      tag: UX2.Element.Block,
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: alignment[alignX] || 'normal',
        alignItems: alignment[alignY] || 'stretch'
      }
    },
    props
  );
}
