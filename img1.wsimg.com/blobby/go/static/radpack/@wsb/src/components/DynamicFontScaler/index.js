import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { components, constants } from '@wsb/guac-widget-core';

import Script from './raw';
import dynamicFontScaler from '../../common/utils/dynamicFontScaler';

const { Bootstrap } = components;
const { XXLARGE, XLARGE, LARGE } = constants.fontSizes;
const { PUBLISH } = constants.renderModes;

class DynamicFontScalerWrapper extends Component {
  static propTypes = {
    typography: PropTypes.string,
    text: PropTypes.string.isRequired,
    containerId: PropTypes.string.isRequired,
    font: PropTypes.string,
    renderMode: PropTypes.oneOf(Object.values(constants.renderModes)),
    targetId: PropTypes.string.isRequired,
    fontSizes: PropTypes.arrayOf(PropTypes.oneOf(Object.values(constants.fontSizes))),
    style: PropTypes.object,
    maxLines: PropTypes.number,
    Tag: PropTypes.node, // Tag value should be passed in order for Typography to correctly match the scaled text
    prioritizeDefault: PropTypes.bool,
    scriptOnly: PropTypes.bool // inject script for bootstrapped elements to call via utils/dynamicFontScaler
  };

  static defaultProps = {
    fontSizes: [XXLARGE, XLARGE, LARGE],
    scriptOnly: false
  };

  getDynamicFontScaler() {
    return dynamicFontScaler({ ...this.props });
  }

  componentDidUpdate() {
    this.invokeScript();
  }

  componentDidMount() {
    this.invokeScript();
  }

  invokeScript() {
    const { scriptOnly, renderMode } = this.props;
    if (!scriptOnly || renderMode !== PUBLISH) {
      this.detachScript();
      this._detachScript = Script(this.getDynamicFontScaler().scriptProps);
    }
  }

  detachScript() {
    this._detachScript && this._detachScript();
  }

  componentWillUnmount() {
    this.detachScript();
  }

  render() {
    const { renderMode, scriptOnly } = this.props;
    if (scriptOnly) {
      if (renderMode === PUBLISH) {
        return <Bootstrap.JS id='DynamicFontScaler' script={ Script.toString() } scriptOnly={ true } />;
      }

      // Expose how Bootstrap would expose
      window.wsb = window.wsb || {};
      window.wsb.DynamicFontScaler = window.wsb.DynamicFontScaler || Script;
      return null;
    }
    const { element, scriptProps } = this.getDynamicFontScaler();

    if (renderMode === PUBLISH) {
      return (
        <React.Fragment>
          { element }
          <Bootstrap.JS id='DynamicFontScaler' script={ Script.toString() } props={ scriptProps } />
        </React.Fragment>
      );
    }

    return element;
  }
}

export default DynamicFontScalerWrapper;
