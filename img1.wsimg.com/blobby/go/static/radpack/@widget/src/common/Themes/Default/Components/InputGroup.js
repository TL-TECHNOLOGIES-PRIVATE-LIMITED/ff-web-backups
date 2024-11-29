import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function InputGroup({ input = {}, button = {}, error, errorProps = {}, ...props }) {
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      ['@sm']: {
        flexDirection: 'row'
      }
    },
    errorWrapperDesktop: {
      ['@xs-only']: {
        display: 'none'
      }
    },
    errorWrapperMobile: {
      ['@sm']: {
        display: 'none'
      },
      marginBottom: 'medium'
    },
    inputWrapper: {
      display: 'flex',
      flexGrow: 1,
      marginBottom: error ? 0 : 'medium',
      ['@sm']: {
        marginVertical: 'xxsmall'
      }
    },
    input: {
      width: '100%',
      ['@sm']: {
        marginRight: 'medium',
        height: '100%'
      },
      ...(input.style || {})
    },
    button: {
      width: '100%',
      marginHorizontal: 0,
      ['@xs-only']: {
        marginVertical: 0
      },
      ['@sm']: {
        marginVertical: 'xxsmall',
        maxWidth: '30%'
      },
      ...(button.style || {})
    },
    error: {
      position: 'static',
      ['@sm']: {
        position: 'absolute'
      },
      ...(errorProps.style || {})
    }
  };

  const inputComponent = <UX2.Element.Input.FloatLabel { ...input } style={ styles.input } />;
  const buttonComponent = (
    <UX2.Element.Button.Primary tag='button' type='submit' { ...button } style={ styles.button } />
  );
  const errorComponent = error && (
    <UX2.Element.Error alert { ...errorProps } style={ styles.error }>
      { error }
    </UX2.Element.Error>
  );

  const structure = (
    <React.Fragment>
      <UX2.Element.Block style={ styles.wrapper }>
        <UX2.Element.Block style={ styles.inputWrapper }> { inputComponent } </UX2.Element.Block>
        { errorComponent && (
          <UX2.Element.Block style={ styles.errorWrapperMobile }>
            { ' ' }
            { errorComponent }{ ' ' }
          </UX2.Element.Block>
        ) }
        { buttonComponent }
      </UX2.Element.Block>
      { errorComponent && (
        <UX2.Element.Block style={ styles.errorWrapperDesktop }> { errorComponent } </UX2.Element.Block>
      ) }
    </React.Fragment>
  );

  return this.merge(
    {
      tag: UX2.Group.Form,
      children: structure
    },
    props
  );
}
