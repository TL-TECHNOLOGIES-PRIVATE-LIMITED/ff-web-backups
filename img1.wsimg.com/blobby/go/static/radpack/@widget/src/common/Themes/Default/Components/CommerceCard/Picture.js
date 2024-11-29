import React from 'react';
import { UX2 } from '@wsb/guac-widget-core';

export function CommerceCardPicture({
  backgroundAssetUrl,
  overlayAlpha = 0,
  imageCropMethod,
  dataAids = {},
  imageData,
  src,
  ...props
}) {
  const baseStyles = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: '100%',
    height: '100%'
  };

  const backgroundProps = {
    backgroundImage: backgroundAssetUrl,
    imageData: { overlayAlpha: overlayAlpha },
    style: {
      ...baseStyles,
      backgroundSize: ['shrink_to_fit', 'shrinkToFit'].includes(imageCropMethod)
        ? 'contain'
        : 'cover'
    }
  };

  const imageProps = {
    imageData,
    src,
    lazyLoad: false,
    staticImage: true,
    style: {
      ...baseStyles,
      objectFit: ['shrink_to_fit', 'shrinkToFit'].includes(imageCropMethod) ? 'contain' : 'cover'
    }
  };

  const PictureComponent = backgroundAssetUrl ? UX2.Component.Background : UX2.Element.Image;
  const pictureProps = backgroundAssetUrl ? backgroundProps : imageProps;

  const content = <PictureComponent { ...pictureProps } data-aid={ dataAids.image } />;

  return this.merge(
    {
      children: content
    },
    props
  );
}
