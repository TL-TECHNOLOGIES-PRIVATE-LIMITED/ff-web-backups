import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UX2, constants } from '@wsb/guac-widget-core';
import Carousel from '@wsb/guac-widget-shared/lib/components/Carousel';
import CustomArrows from './CustomArrows';
import ArrowKeyHandler from './ArrowKeyHandler';
import { dataAids } from '../constants/dataAids';
import { omit } from 'lodash';

const { Z_INDEX_FULL_SCREEN_OVERLAY } = constants.layers; // global
const Z_INDEX_CAROUSEL_CONTAINER = 1; // relative
const isIE11 =
  typeof navigator !== 'undefined' &&
  parseInt((/trident\/.*; rv:(\d+)/i.exec(navigator.userAgent) || [])[1], 10) === 11;

class Lightbox extends Component {
  static get propTypes() {
    return {
      images: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string.isRequired,
          caption: PropTypes.string
        })
      ).isRequired,
      selectedIndex: PropTypes.number.isRequired,
      visible: PropTypes.bool.isRequired,
      onRequestClose: PropTypes.func.isRequired,
      size: PropTypes.string,
      renderMode: PropTypes.string
    };
  }

  constructor(props) {
    super(...arguments);
    this.afterChange = this.afterChange.bind(this);
    this.beforeChange = this.beforeChange.bind(this);

    this.state = {
      currentIndex: props.selectedIndex
    };
  }

  beforeChange(index) {
    this.setState({
      currentIndex: index
    });
  }

  afterChange(index) {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    const { images, visible, onRequestClose, size, renderMode } = this.props;
    const { currentIndex } = this.state;
    const isSmall = size === 'xs' || size === 'sm';
    const isMedium = size === 'md';
    const imageStyle = {
      maxWidth: isSmall ? '90vw' : '70vw',
      maxHeight: isSmall ? '60vh' : '70vh',
      objectFit: 'contain'
    };
    const closeStyle = {
      cursor: 'pointer',
      color: 'section',
      marginRight: '-10px'
    };
    const captionStyle = {
      maxWidth: isSmall ? '90%' : '750px',
      padding: 0,
      textAlign: 'center',
      marginVertical: 'medium',
      marginHorizontal: 'auto',
      color: 'white',
      height: 'auto',
      maxHeight: isSmall ? '30vh' : '20vh',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    };
    const topBarStyle = {
      width: isSmall ? '90%' : '76%',
      textAlign: 'right',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      top: isSmall ? 'medium' : 'xlarger',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      position: 'absolute',
      zIndex: Z_INDEX_CAROUSEL_CONTAINER + 1
    };
    const modalStyle = {
      position: 'fixed',
      zIndex: Z_INDEX_FULL_SCREEN_OVERLAY,
      background: 'rgba(0, 0, 0, 0.9)',
      padding: '0',
      border: '0',
      overflow: 'hidden',
      borderRadius: '0',
      opacity: '1'
    };
    const carouselStyle = {
      container: {
        zIndex: Z_INDEX_CAROUSEL_CONTAINER
      }
    };
    const controls = isSmall
      ? []
      : [
        {
          component: CustomArrows,
          props: {
            visible: images.length > 1,
            overrideArrowStyle: {
              borderRadius: '50%',
              marginHorizontal: isMedium ? '5%' : '10%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...(renderMode === 'PREVIEW' && {
                'top': '40%',
                '@xs-only': {
                  top: '25%'
                }
              })
            }
          },
          position: 'bottom'
        },
        { component: ArrowKeyHandler }
      ];
    const content = visible ? (
      <UX2.Group.Carousel
        onTouchMove={ e => {
          e.preventDefault();
        } }
      >
        <UX2.Element.Block category='accent' section='overlay' style={ topBarStyle }>
          <UX2.Element.Text.Major children={ `${currentIndex + 1} / ${images.length}` } featured />
          <UX2.Element.Icon
            icon='close'
            data-aid={ dataAids.LIGHTBOX_CLOSE }
            style={ closeStyle }
            onClick={ onRequestClose }
          />
        </UX2.Element.Block>

        <Carousel
          initialSlide={ currentIndex }
          dots={ false }
          arrows={ false }
          cellPadding={ 0 }
          infinite={ true }
          draggable={ isSmall }
          autoplay={ false }
          clickToNavigate={ false }
          afterChange={ this.afterChange }
          beforeChange={ this.beforeChange }
          slideHeight='100vh'
          slideWidth='100vw'
          controls={ controls }
          transition={ isSmall ? 'slide' : 'fade' }
          transitionDuration={ isSmall ? 500 : 250 }
          style={ carouselStyle }
        >
          { images.map(({ image, caption }, index) => {
            const blurBgStyle = {
              position: 'absolute',
              top: '-50px',
              left: '-50px',
              right: '-50px',
              bottom: '-50px',
              backgroundImage: `url(${image.image})`,
              backgroundSize: 'cover',
              filter: 'blur(40px) brightness(50%)'
            };
            const blurBg =
              isIE11 || isSmall ? null : (
                <UX2.Element.Block
                  data-aid={ dataAids.CAROUSEL_BLUR_BACKGROUND }
                  onClick={ onRequestClose }
                  style={ blurBgStyle }
                />
              );

            return (
              <UX2.Element.Block
                category='accent'
                section='overlay'
                data-aid={ dataAids.CAROUSEL_BACKGROUND }
                onClick={ onRequestClose }
                key={ index }
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                { blurBg }
                <UX2.Element.Block
                  data-aid={ dataAids.CAROUSEL_CONTENT }
                  onClick={ e => {
                    e.stopPropagation();
                  } }
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    ...(renderMode === 'PREVIEW' && {
                      'top': '40%',
                      '@xs-only': {
                        top: '25%'
                      }
                    })
                  }}
                >
                  <UX2.Element.Image
                    style={ imageStyle }
                    imageData={ omit(image, ['top', 'left', 'width', 'height', 'rotation']) }
                  />
                  { caption && (
                    <UX2.Element.Text
                      data-aid={ dataAids.CAROUSEL_IMAGE_CAPTION }
                      style={ captionStyle }
                      children={ caption }
                      richtext
                      featured
                    />
                  ) }
                </UX2.Element.Block>
              </UX2.Element.Block>
            );
          }) }
        </Carousel>
      </UX2.Group.Carousel>
    ) : null;

    return <UX2.Component.Modal.Overlay style={ modalStyle }>{ content }</UX2.Component.Modal.Overlay>;
  }
}

export default Lightbox;
