import React, { Component } from 'react';
import {
  GalleryBtn,
  GalleryGrid,
  GalleryItem,
  GalleryImg,
} from './Gallery.styled';
import { Fragment } from 'react';

export class Gallery extends Component {
  render() {
    const { galleryHits } = this.props;
    console.log(galleryHits);
    return (
      <>
        <GalleryGrid>
          {galleryHits.map(element => {
            return (
              <GalleryItem key={element.id}>
                <GalleryImg alt={element.tags} src={element.webformatURL} />
              </GalleryItem>
            );
          })}
        </GalleryGrid>
        <GalleryBtn>Load more</GalleryBtn>
      </>
    );
  }
}
