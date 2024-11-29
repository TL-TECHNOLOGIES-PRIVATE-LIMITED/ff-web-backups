import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { components, constants } from '@wsb/guac-widget-core';
import Script from './raw';

const { Bootstrap } = components;
const {
  renderModes: { PUBLISH },
  breakpoints: { SM_MIN }
} = constants;

const FullWidthScaler = ({ containerId, targetId, renderMode, maxSize = 640 }) => {
  const isPublish = renderMode === PUBLISH;
  const tabletBreakpoint = SM_MIN;

  useEffect(() => {
    if (!isPublish) {
      return Script({ containerId, targetId, maxSize, tabletBreakpoint });
    }
  }, [isPublish, containerId, targetId, maxSize, tabletBreakpoint]);

  return isPublish ? (
    <Bootstrap.JS
      id='FullWidthScaler'
      script={ Script.toString() }
      props={{ containerId, targetId, maxSize, tabletBreakpoint }}
    />
  ) : null;
};

FullWidthScaler.propTypes = {
  containerId: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
  renderMode: PropTypes.string.isRequired,
  maxSize: PropTypes.number
};

export default FullWidthScaler;
