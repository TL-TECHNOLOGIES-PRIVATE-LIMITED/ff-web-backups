import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { node, string } from 'prop-types';

const Styles = function Styles() {
  this.outerContainer = {
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  this.grid = { width: '100%' };

  this.marginBottom = {
    marginBottom: 'medium'
  };

  this.centeredMarginBottom = {
    ...this.marginBottom,
    textAlign: 'center'
  };

  this.svg = {
    ...this.centeredMarginBottom,
    color: 'primary'
  };
};
const styles = new Styles();

const CenteredNotice = ({ heading, body, icon, dataAid }) => {
  const { Heading, Block } = UX2.Element;
  const {
    Grid,
    Grid: { Cell }
  } = UX2.Component;

  return (
    <Block data-aid={ dataAid } style={ styles.outerContainer }>
      <Grid style={ styles.grid } xs={ 1 } md={ 3 }>
        <Cell pushXs={ 0 } pushMd={ 1 } size={ 1 }>
          <Block style={ styles.svg }>{ icon }</Block>
          <Heading.Default style={{ ...styles.marginBottom, textAlign: 'center' }} group='Group'>
            { heading }
          </Heading.Default>
          <Block style={ styles.centeredMarginBottom }>{ body }</Block>
        </Cell>
      </Grid>
    </Block>
  );
};

CenteredNotice.propTypes = {
  dataAid: string,
  heading: node,
  body: node,
  icon: node
};

export default CenteredNotice;
