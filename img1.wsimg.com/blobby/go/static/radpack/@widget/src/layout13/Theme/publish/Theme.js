import { merge } from 'lodash';
import Default from '../../../common/Themes/Default/Theme';
import * as utils from '../../../common/Themes/Default/Dials/Colors/utils';
import {
  sectionHeadingAlignment,
  sectionHeadingColor,
  sectionHeadingSize,
  sectionHeadingHR
} from '../../../common/utils/themeOverrides';
import { getMenuHeadingStyle } from '../../../common/utils/legacyOverrides';
import * as filledIcons from '../../../common/IconPacks/humanisticFilled';
import * as socialIconPack from '../../../common/IconPacks/SocialIcons/defaultSocialIconPack';
import { Blink } from '../../../common/loaders';
import { sectionHrTypes, WIDGETS_WITH_CIRCULAR_IMAGES } from '../../../common/constants';
import { mergeTypographyOverrides } from '../../../common/utils/typography';
import { WIDE_INSET } from '../../../common/constants/headerTreatments';
import themeConfig from '../themeConfig';

const { SMALL_UNDERLINE } = sectionHrTypes;

class Theme13 extends Default {
  static config = themeConfig;

  static get displayName() {
    return 'Theme13';
  }

  static getMutatorDefaultProps(widgetType, widgetPreset) {
    const defaultProps = super.getMutatorDefaultProps(widgetType, widgetPreset);
    const enableCircularImage =
      WIDGETS_WITH_CIRCULAR_IMAGES[widgetPreset] || defaultProps.enableCircularImage;

    return widgetType === 'HEADER'
      ? {
        ...defaultProps,
        hasLogoAlign: true,
        useSlideshow: true,
        useMediaTypeSelector: true,
        showOverlayOpacityControls: true,
        hasNavBackgroundToggle: true,
        headerTreatmentsConfig: {
          ...defaultProps.headerTreatmentsConfig,
          ...themeConfig.headerTreatmentsConfig
        },
        enableVideoOverlaySlider: true
      }
      : {
        ...defaultProps,
        enableCircularImage
      };
  }

  constructor() {
    super();
    this.mappedValues = {
      ...this.mappedValues,
      backgroundColorNavSolid() {
        const background = utils.getDial(this, 'background');
        return background.setAlpha(25);
      },
      typographyOverrides: {
        LogoAlpha: {
          style: {
            font: 'primary',
            color: 'highContrast',
            fontSize: 'large',
            fontWeight: 'normal',
            letterSpacing: 'normal',
            textTransform: 'none'
          }
        },
        HeadingBeta: {
          style: {
            font: 'primary',
            color: 'highlight',
            fontSize: 'xxlarge',
            fontWeight: 'normal',
            letterSpacing: 'normal',
            textTransform: 'none'
          }
        },
        HeadingGamma: {
          style: {
            font: 'alternate',
            color: 'highlight',
            fontSize: 'xlarge',
            fontWeight: 'normal',
            letterSpacing: 'normal',
            textTransform: 'none'
          }
        },
        NavAlpha: {
          style: {
            font: 'alternate',
            color: 'highContrast',
            fontSize: 'small',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            letterSpacing: '0.071em',
            [':hover']: {
              color: 'highContrast'
            },
            [':active']: {
              color: 'highContrast'
            }
          },
          active: {
            style: {
              color: 'highContrast',
              [':hover']: {
                color: 'highContrast'
              }
            }
          }
        },
        SubNavAlpha: {
          style: {
            font: 'alternate',
            color: 'section',
            fontSize: 'medium',
            fontWeight: 'normal',
            letterSpacing: 'normal',
            textTransform: 'none',
            textDecoration: 'none',
            [':hover']: {
              color: 'section'
            },
            [':active']: {
              color: 'section'
            }
          },
          active: {
            style: {
              fontWeight: 'bold',
              color: 'section',
              [':hover']: {
                color: 'section'
              }
            }
          }
        },
        ButtonAlpha: props => {
          const { size = 'default' } = props;
          const sizes = {
            small: {
              fontSize: 'xsmall'
            },
            default: {
              fontSize: 'small'
            },
            large: {
              fontSize: 'medium'
            }
          };
          return {
            style: {
              font: 'alternate',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.071em',
              ...sizes[size]
            }
          };
        },
        InputAlpha: props => {
          return merge(mergeTypographyOverrides.call(this, 'BodyAlpha', props), {
            style: {
              color: 'input',
              ['@xs-only']: {
                fontSize: 'medium' // 16px
              }
            }
          });
        }
      }
    };
  }

  Heading(props) {
    const { tag } = props;
    const { widgetType, widgetPreset } = this.base;
    return super.Heading(
      this.merge(
        {
          style: getMenuHeadingStyle(tag, widgetType, widgetPreset)
        },
        props
      )
    );
  }

  Intro(props) {
    return super.Intro(this.merge({ alignment: 'center' }, props));
  }

  Phone(props) {
    return super.Phone(
      this.merge(
        {
          style: {
            marginBottom: 'xlarge',
            display: 'inline-block',
            paddingTop: 0,
            ['@md']: {
              marginBottom: 'xxlarge',
              maxWidth: '50%'
            }
          }
        },
        props
      )
    );
  }

  ContentCard(props) {
    const styles = this.base.widgetPreset === 'about1' ? { style: { alignItems: 'center' } } : {};
    return super.ContentCard(this.merge(styles, props));
  }

  Hero(props) {
    return super.Hero(
      this.merge(
        {
          style: {
            position: 'relative',
            marginVertical: 0,
            paddingVertical: 'medium',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            ['@md']: {
              flexGrow: 1,
              flexShrink: 0,
              flexBasis: 'auto',
              paddingVertical: 'xlarge'
            }
          }
        },
        props
      )
    );
  }

  Tagline(props) {
    return super.Tagline(
      this.merge(
        {
          style: {
            maxWidth: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            ['@xs-only']: {
              margin: '0 auto'
            }
          }
        },
        props
      )
    );
  }

  HeroText(props) {
    return super.SubTagline(
      this.merge(
        {
          style: {
            lineHeight: '1.5',
            maxWidth: '100%'
          }
        },
        props
      )
    );
  }

  Icon(props) {
    return super.Icon(
      this.merge(
        {
          iconPack: { ...filledIcons, ...socialIconPack }
        },
        props
      )
    );
  }

  Loader(props) {
    return Blink.apply(this, [props]);
  }

  SectionHeading(props) {
    const base = this.base;
    const overrides = this.merge(
      {},
      sectionHeadingAlignment(base),
      sectionHeadingColor(base),
      sectionHeadingSize(base),
      sectionHeadingHR(base)
    );
    return super.SectionHeading(
      this.merge(
        {
          style: {
            // Static
            'textAlign': 'center',
            'marginLeft': 'auto',
            '@md': {
              textAlign: 'center',
              marginLeft: 'auto'
            }
          },
          sectionHeadingHR: SMALL_UNDERLINE,
          featured: false
        },
        overrides,
        props
      )
    );
  }

  DividerHR(props) {
    const { category } = props;
    return super.HR(
      this.merge(
        {
          style: {
            borderColor: category === 'neutral' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
          }
        },
        props
      )
    );
  }

  Pipe(props) {
    return super.Pipe(
      this.merge(
        {
          style: {
            height: '1em'
          }
        },
        props
      )
    );
  }

  // Header image
  HeaderMediaBackground(props) {
    return super.Background(
      this.merge(
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }
        },
        props
      )
    );
  }

  HeaderMediaFillBackground(props) {
    return this.HeaderMediaBackground(
      this.merge(
        {
          style: {
            'minHeight': 300,
            'justifyContent': 'space-between',
            '@md': {
              minHeight: '85vh'
            }
          }
        },
        props
      )
    );
  }

  // eslint-disable-next-line id-length
  HeaderMediaOrigBlurBackground(props) {
    return super.Background(
      this.merge(
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }
        },
        props
      )
    );
  }

  HeaderMediaImage({ headerTreatment, ...props }) {
    return super.Image(
      this.merge(
        headerTreatment !== WIDE_INSET
          ? {
            style: {
              borderStyle: 'solid',
              borderWidth: 'large',
              borderColor: 'white'
            },
            mobileGutterWidth: 18
          }
          : {},
        props
      )
    );
  }

  PromoBanner(props) {
    return super.PromoBanner(
      this.merge(
        {
          style: {
            position: 'relative',
            zIndex: 1
          }
        },
        props
      )
    );
  }

  sharedInputStyles = {
    style: {
      borderColor: 'input',
      borderRadius: 'medium',
      borderStyle: 'solid',
      borderWidth: 'xsmall'
    }
  };

  Input(props) {
    return super.Input(
      this.merge(
        { ...this.sharedInputStyles },
        {
          style: {
            paddingVertical: 'small',
            paddingHorizontal: 'small'
          }
        },
        props
      )
    );
  }

  InputFloatLabelLabel(props) {
    return super.InputFloatLabelLabel(
      this.merge(
        {
          style: {
            left: '16px',
            top: '33%'
          }
        },
        props
      )
    );
  }

  InputTextArea(props) {
    return super.InputTextArea(
      this.merge(
        {
          rows: 6
        },
        props
      )
    );
  }

  InputSelect(props) {
    return super.InputSelect(
      this.merge(
        {
          ...this.sharedInputStyles
        },
        props
      )
    );
  }

  InputSelectElement(props) {
    return super.InputSelectElement(
      this.merge(
        {
          style: {
            paddingVertical: 'small',
            paddingHorizontal: 'small'
          }
        },
        props
      )
    );
  }

  MediaObjectBackground(props) {
    return super.MediaObjectBackground(
      this.merge(
        {
          style: {
            borderRadius: 'medium'
          }
        },
        props
      )
    );
  }

  HeadingMajor(props) {
    return super.HeadingMajor(
      this.merge(
        {
          featured: true
        },
        props
      )
    );
  }

  PriceMajor(props) {
    return super.PriceMajor(
      this.merge(
        {
          typography: 'HeadingDelta'
        },
        props
      )
    );
  }

  SlideshowArrows(props) {
    return super.SlideshowArrows(
      this.merge(
        {
          style: {
            '@sm': {
              paddingHorizontal: 'medium',
              marginHorizontal: 'medium'
            }
          }
        },
        props
      )
    );
  }
}

export default Theme13;
