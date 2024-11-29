import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';
import { replaceImageSizeParams } from '../../../../utils/image';
import { imageShapeRatios } from '../../../../constants/imageShapeRatios';

export function ProductAsset({
  assets,
  banner = false,
  boxed = true,
  defaultAssetUrl,
  getStyles = () => {
    return false;
  },
  unboxedSize = 100,
  dataAids = {},
  imageCropMethod,
  showBorder = true,
  imageShape,
  noProductImage,
  ...props
}) {
  // NOTE: before switching to the v2 endpoint, we received all
  // the assets for a product in the response. Now, we receive
  // one url that accounts for the noProductImage case
  const oldAssetUrl = assets && assets.length ? assets[0].large_url : noProductImage;
  const assetUrl = defaultAssetUrl || oldAssetUrl;
  if (!assetUrl) {
    return null;
  }

  // We can modify an image api url to make it more "dynamic". This will allow the
  // <Background> component to automagically generate the right thumbnail size.
  const imageUrl = replaceImageSizeParams(assetUrl, '/:/rs=w:{width},h:{height},cg:false,m');

  const assetSize = imageCropMethod === 'expand_to_fill' ? 'cover' : 'contain';
  const styles = {
    outer: {
      borderColor: showBorder ? 'section' : 'transparent',
      borderWidth: 'xsmall',
      borderStyle: 'solid',
      position: 'relative',
      paddingTop: imageShapeRatios[imageShape] || imageShapeRatios.square,
      paddingRight: '100%',
      backgroundColor: '!rgba(255,255,255,0.1)'
    },
    inner: {
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px',
      backgroundSize: assetSize,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  };

  return boxed
    ? this.Block(
      this.merge(
        {
          group: 'Product',
          groupType: 'Asset',
          style: styles.outer,
          children: [
            <UX2.Component.Background
              key='background'
              backgroundImage={ imageUrl }
              style={ styles.inner }
              data-aid={ dataAids.image }
            />,
            banner && banner.text !== null && (
              <UX2.Group.Product.Banner
                key='banner'
                getStyles={ getStyles }
                data-aid={ dataAids.saleBanner }
              >
                { banner.text }
              </UX2.Group.Product.Banner>
            )
          ]
        },
        props
      )
    )
    : this.Image(
      this.merge(
        {
          group: 'Product',
          groupType: 'Asset',
          src: replaceImageSizeParams(assetUrl, `/:/rs=w:${unboxedSize},h:${unboxedSize}`),
          style: { display: 'block', maxWidth: '100%' }
        },
        props
      )
    );
}

export function ProductBanner({
  getStyles = () => {
    return false;
  },
  ...props
}) {
  return this.Block(
    this.merge(
      {
        style: {
          'position': 'absolute',
          'bottom': '0px',
          'right': '0px',
          'width': 'auto',
          'paddingVertical': getStyles({ saleBannerPaddingVertical: true }) || 'xsmall',
          'paddingHorizontal': 'xsmall',
          'backgroundColor': 'action',
          'fontColor': 'action',
          'fontSize': 'small',
          '@md': getStyles() || {},
          '@lg': getStyles() || {},
          '@sm-only': {
            paddingVertical: 'xxsmall',
            paddingHorizontal: 'xsmall'
          }
        }
      },
      props
    )
  );
}
