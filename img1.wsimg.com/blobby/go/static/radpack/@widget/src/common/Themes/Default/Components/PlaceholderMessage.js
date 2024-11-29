import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function PlaceholderMessage({ section, message, textProps = {}, ...props }) {
  const styles = {
    container: {
      backgroundColor: 'section',
      paddingHorizontal: 'medium',
      paddingVertical: 'small',
      textAlign: 'center'
    },
    text: {
      fontColor: 'lowContrast'
    }
  };
  const children = (
    <UX2.Component.Grid inset bottom={ false } section={ section }>
      <UX2.Element.Block style={ styles.container }>
        <UX2.Element.Text tag='span' style={ styles.text } { ...textProps }>
          { message }
        </UX2.Element.Text>
      </UX2.Element.Block>
    </UX2.Component.Grid>
  );

  return this.merge({ children }, props);
}
