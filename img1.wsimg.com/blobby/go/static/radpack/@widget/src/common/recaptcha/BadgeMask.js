import React from 'react';
import { UX } from '@wsb/guac-widget-core';

function BadgeMask() {
  return <UX.Style>{ '.grecaptcha-badge { visibility: hidden; }' }</UX.Style>;
}

export default BadgeMask;
