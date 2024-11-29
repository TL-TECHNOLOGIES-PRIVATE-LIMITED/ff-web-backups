import React from 'react';
import { UX2, components } from '@wsb/guac-widget-core';
import PropTypes from 'prop-types';

const { Link } = components;

const GalleryImage = props => {
  const getTCCLString = UX2.utils.TCCLUtils.getTCCLString;
  const tcclString = getTCCLString({
    eid: 'ux2.gallery.external_link.click',
    type: 'click'
  });

  const { style } = props.imageProps;

  const Image = props.background ? (
    <UX2.Component.Background { ...props.imageProps } />
  ) : (
    <UX2.Element.Image { ...props.imageProps } />
  );

  if (props.externalLink) {
    return (
      <UX2.Element.Block style={ style }>
        <Link data-tccl={ tcclString } linkData={ props.externalLink }>
          { Image }
        </Link>
      </UX2.Element.Block>
    );
  }

  return <UX2.Element.Block style={ style }>{ Image }</UX2.Element.Block>;
};

GalleryImage.propTypes = {
  imageProps: PropTypes.object,
  background: PropTypes.bool,
  externalLink: PropTypes.object
};

export default GalleryImage;
