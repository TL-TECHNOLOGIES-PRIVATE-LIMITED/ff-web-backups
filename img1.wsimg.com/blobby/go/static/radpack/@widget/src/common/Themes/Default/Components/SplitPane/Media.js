import React from 'react';
import { UX2, components, utils } from '@wsb/guac-widget-core';
import { IMAGE, VIDEO } from '../../../../constants/mediaTypes';

const { getSelectedVideoProps } = utils;

const { Link } = components;

export function SplitPaneMedia(props) {
  const { fullBleed, mediaData, children, style, roundedCorners, ...otherProps } = props;
  const { mediaType = IMAGE } = mediaData;
  // Reset styles for mobile/tablet
  const commonVideoStyles = {
    ['@xs-only']: {
      marginBottom: 0
    },
    ['@sm-only']: {
      marginBottom: 0
    }
  };
  const fullBleedStyle = {
    width: '100%',
    height: '100%'
  };
  const fullBleedImageStyle = {
    ...fullBleedStyle,
    '@xs-only': {
      minHeight: '30vh'
    }
  };
  const { link } = mediaData;
  const insetStyle = roundedCorners
    ? {
      borderRadius: 'xlarge',
      overflow: 'hidden'
    }
    : {};

  let content;

  if (mediaType === VIDEO) {
    content = (
      <UX2.Component.Video
        { ...getSelectedVideoProps(mediaData) }
        style={{ ...commonVideoStyles, ...(fullBleed ? fullBleedStyle : insetStyle) }}
      />
    );
  } else {
    content = fullBleed ? (
      <UX2.Component.Background imageData={ mediaData } style={ fullBleedImageStyle } />
    ) : (
      <UX2.Element.Image imageData={ mediaData } style={ insetStyle } />
    );
  }

  return this.merge(
    {
      tag: 'div',
      children: link ? <Link linkData={ link }>{ content }</Link> : content,
      style: {
        ...style,
        ...(fullBleed ? fullBleedStyle : {})
      }
    },
    otherProps
  );
}
