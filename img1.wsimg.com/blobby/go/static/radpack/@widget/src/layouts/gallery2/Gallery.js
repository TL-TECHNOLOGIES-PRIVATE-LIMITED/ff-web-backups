/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UX2 } from '@wsb/guac-widget-core';
import {
  dataAids,
  getGalleryDataAid,
  getGalleryDataRouteProps
} from '../../common/constants/dataAids';
import RenderLightbox from '../../common/renderLightbox';
import { getGridRowSizes } from '../../common/util';
import GalleryImage from '../../common/components/GalleryImage';

export default class Gallery2 extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showLightbox: false,
      selectedIndex: 0,
      page: 1
    };
    this.hideLightbox = this.hideLightbox.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  static get propTypes() {
    return {
      category: PropTypes.string,
      galleryImages: PropTypes.array.isRequired,
      section: PropTypes.string,
      staticContent: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      category: 'neutral',
      section: 'default'
    };
  }

  hideLightbox() {
    this.setState({
      showLightbox: false
    });
  }

  handleClick(index) {
    this.setState({
      showLightbox: true,
      selectedIndex: index
    });
  }

  loadMore(e) {
    e.stopPropagation();
    this.setState({ page: this.state.page + 1 });
  }

  renderSeeMoreText() {
    const { staticContent } = this.props;
    const styles = { paddingVertical: 'xlarge', textAlign: 'center' };

    return (
      <UX2.Element.Block style={ styles }>
        <UX2.Element.MoreLink.Expand
          role='button'
          tabIndex='0'
          onClick={ this.loadMore }
          data-aid={ dataAids.GALLERY_MORE_BUTTON }
          children={ staticContent.showMore }
          data-edit-interactive={ true }
        />
      </UX2.Element.Block>
    );
  }

  renderRows(rows) {
    const { galleryImages } = this.props;
    const { page } = this.state;

    const Grid = UX2.Component.Grid;
    const Cell = Grid.Cell;

    const styles = {
      container: {
        'width': '100%',
        'height': '130px',
        'overflow': 'hidden',
        'position': 'relative',
        'cursor': 'pointer',
        '@sm': { height: '200px' },
        '@md': {
          'height': '300px',
          ':hover': {
            '.dim': {
              backgroundColor: 'rgba(255, 255, 255, .1)'
            },
            '.image': {
              transform: 'scale(1.05)'
            }
          }
        }
      },
      img: {
        height: '100%',
        width: '100%',
        transition: 'transform .5s ease'
      },
      overlay: {
        'position': 'absolute',
        'height': '100%',
        'width': '100%',
        '@md': {
          backgroundColor: 'rgba(0, 0, 0, .1)',
          transition: 'background-color .5s ease',
          zIndex: '1'
        }
      }
    };
    let start = 0;
    return rows.slice(0, page * 2).map((row, i) => {
      const rowXs = row === 1 ? 1 : row % 2 ? 3 : 2;
      const content = (
        <Grid key={ i } xs={ rowXs } sm={ row } gutter={ false } data-route=''>
          { galleryImages
            .map((i, c) => {
              return { ...i, index: c };
            })
            .slice(start, start + row)
            .map(({ image, index, externalLink }) => {
              const imageProps = {
                'data-aid': getGalleryDataAid(index),
                'style': styles.img,
                'className': 'image',
                'imageData': image
              };

              return (
                <Cell
                  key={ index }
                  style={ styles.container }
                  onClick={
                    !externalLink
                      ? () => {
                        this.handleClick(index);
                      }
                      : null
                  }
                  { ...getGalleryDataRouteProps(index, { isImage: true, useImageField: false }) }
                >
                  <UX2.Element.Block style={ styles.overlay } className='dim'>
                    <GalleryImage
                      imageProps={ imageProps }
                      externalLink={ externalLink }
                      background={ true }
                    />
                  </UX2.Element.Block>
                </Cell>
              );
            }) }
        </Grid>
      );
      start += row;
      return content;
    });
  }

  renderZeroState() {
    return (
      <UX2.Element.Block data-aid={ dataAids.LAYOUT_TWO_ZERO_STATE } style={{ minHeight: '200px' }} />
    );
  }

  render() {
    const { category, section, galleryImages } = this.props;
    const { page } = this.state;
    const rows = getGridRowSizes(galleryImages.length, 2, 4);
    const pages = Math.ceil(rows.length / 2);

    const styles = {
      section: { 'paddingVertical': 0, '@xs-only': { paddingVertical: 0 } },
      container: { padding: '0px !important' },
      link: {
        paddingVertical: 'large',
        textAlign: 'center',
        width: '100%',
        display: 'block'
      }
    };

    return (
      <UX2.Group.Section.Banner category={ category } section={ section } style={ styles.section }>
        <UX2.Element.Container fluid style={ styles.container }>
          { galleryImages.length > 0 ? this.renderRows(rows) : this.renderZeroState() }
          { pages > page && this.renderSeeMoreText() }
        </UX2.Element.Container>

        { RenderLightbox.call(this) }
      </UX2.Group.Section.Banner>
    );
  }
}
