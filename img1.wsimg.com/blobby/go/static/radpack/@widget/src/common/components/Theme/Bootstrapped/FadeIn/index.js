import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { components, constants } from '@wsb/guac-widget-core';
import Script from './raw';

const { Bootstrap } = components;
const {
  renderModes: { PUBLISH }
} = constants;

const FadeIn = ({ targetId, renderMode }) => {
  const isPublish = renderMode === PUBLISH;

  useEffect(() => {
    if (!isPublish) {
      return Script({ targetId });
    }
  }, [isPublish, targetId]);

  return isPublish ? (
    <Bootstrap.JS id='FadeIn' script={ Script.toString() } props={{ targetId }} />
  ) : null;
};

FadeIn.propTypes = {
  targetId: PropTypes.string.isRequired,
  renderMode: PropTypes.string.isRequired
};

export default FadeIn;
