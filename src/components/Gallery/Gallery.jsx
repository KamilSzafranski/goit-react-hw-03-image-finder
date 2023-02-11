import React, { Component, PureComponent } from 'react';
import {
  GalleryBtn,
  GalleryGrid,
  GalleryItem,
  GalleryImg,
} from './Gallery.styled';
import { Fragment } from 'react';

export class Gallery extends PureComponent {
  render() {
    const { galleryHits, handleClick } = this.props;
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
        <GalleryBtn onClick={handleClick}>Load more</GalleryBtn>
      </>
    );
  }
}
