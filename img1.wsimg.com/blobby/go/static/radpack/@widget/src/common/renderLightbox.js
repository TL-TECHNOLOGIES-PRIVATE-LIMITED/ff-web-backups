import Lightbox from './components/Lightbox';
import React from 'react';
import { dataAids } from './constants/dataAids';

const renderLightbox = function () {
  const { galleryImages, size, renderMode } = this.props;
  const { showLightbox, selectedIndex } = this.state;
  const images = [].concat(...galleryImages);
  return images.length && showLightbox ? (
    <Lightbox
      images={ images.map(imageData => ({ image: imageData.image, caption: imageData.caption })) }
      visible={ true }
      selectedIndex={ selectedIndex }
      onRequestClose={ this.hideLightbox }
      size={ size }
      data-aid={ dataAids.LIGHTBOX_MODAL }
      renderMode={ renderMode }
    />
  ) : null;
};

export default renderLightbox;
