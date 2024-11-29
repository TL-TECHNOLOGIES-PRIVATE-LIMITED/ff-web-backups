import keymirror from 'keymirror';
import { constants } from '@wsb/guac-widget-core';
import { NAV_DRAWER_OFFSET } from './navigationDrawer';

const { widgetTypes, colorPackCategories, themeConstants, buttons } = constants;

const sectionHrTypes = keymirror({
  NONE: null,
  SMALL_UNDERLINE: null,
  FULL_UNDERLINE: null,
  INLINE: null
});

const SEARCH_INPUT_LEFT_PADDING = 40;
const ABOUT1_IMAGE_WIDTH = '365px';
const CONTENT2_IMAGE_WIDTH = '600px';
const DEFAULT_HEADER_IMAGE_OPACITY = 25;
const DEFAULT_FALLBACK_IMAGE_OPACITY = 24;
const DEFAULT_OVERLAY_TEXT_SHADOW = themeConstants.DEFAULT_OVERLAY_TEXT_SHADOW; // used in widgets also, hence shared
const OVERLAY_DARK_TEXT_SHADOW = '0px 2px 10px rgba(0, 0, 0, 0.3)'; // used only in themes
const ICON_SIZE = 28; // medium - explicit value used due to math in search component
const MIN_TARGET = 40;

const OVERLAY_OPACITY_DEFAULTS = {
  about4: DEFAULT_FALLBACK_IMAGE_OPACITY,
  introduction5: DEFAULT_FALLBACK_IMAGE_OPACITY,
  content5: DEFAULT_FALLBACK_IMAGE_OPACITY,
  ordering1: DEFAULT_FALLBACK_IMAGE_OPACITY,
  payment2: DEFAULT_FALLBACK_IMAGE_OPACITY,
  zillow1: DEFAULT_FALLBACK_IMAGE_OPACITY,
  reviews1: DEFAULT_FALLBACK_IMAGE_OPACITY,
  rss1: DEFAULT_FALLBACK_IMAGE_OPACITY,
  subscribe3: DEFAULT_FALLBACK_IMAGE_OPACITY,
  mlsSearch1: DEFAULT_FALLBACK_IMAGE_OPACITY,
  contact10: DEFAULT_FALLBACK_IMAGE_OPACITY,
  countdown1: DEFAULT_FALLBACK_IMAGE_OPACITY,
  quote1: DEFAULT_FALLBACK_IMAGE_OPACITY
};

const BUTTON_ICON_SIZE = '24px';
const BUTTON_ICON_SIZE_SM = '18px';

const COMMON_BUTTON_CONFIG = {
  spotlight: {
    fill: buttons.fills.SOLID
  },
  external: {
    fill: buttons.fills.NONE,
    decoration: buttons.decorations.NONE,
    shadow: buttons.shadows.NONE
  }
};

const WIDGETS_WITH_CIRCULAR_IMAGES = {
  about1: true
};

export {
  widgetTypes,
  sectionHrTypes,
  colorPackCategories as categories,
  SEARCH_INPUT_LEFT_PADDING,
  ABOUT1_IMAGE_WIDTH,
  CONTENT2_IMAGE_WIDTH,
  OVERLAY_OPACITY_DEFAULTS,
  DEFAULT_HEADER_IMAGE_OPACITY,
  DEFAULT_FALLBACK_IMAGE_OPACITY,
  DEFAULT_OVERLAY_TEXT_SHADOW,
  OVERLAY_DARK_TEXT_SHADOW,
  BUTTON_ICON_SIZE,
  BUTTON_ICON_SIZE_SM,
  ICON_SIZE,
  MIN_TARGET,
  COMMON_BUTTON_CONFIG,
  WIDGETS_WITH_CIRCULAR_IMAGES,
  NAV_DRAWER_OFFSET
};
