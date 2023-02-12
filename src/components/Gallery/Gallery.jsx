import React, { PureComponent } from 'react';
import {
  GalleryBtn,
  GalleryGrid,
  GalleryItem,
  GalleryImg,
  Warning,
  SpinnerContainer,
  DotSpinnerContainer,
  Text,
} from './Gallery.styled';
import { Fragment } from 'react';
import { fetchGallery } from 'services/api';
import { TailSpin, ThreeDots } from 'react-loader-spinner';

export class Gallery extends PureComponent {
  state = {
    gallery: [],
    page: 1,
    loader: false,
    loaderSmall: false,
    searchNothing: false,
    isPhotoLeft: true,
  };

  handleSearch = async () => {
    this.setState(prevState => ({ loader: true, searchNothing: false }));

    try {
      const galleryImages = await fetchGallery(this.props.searchValue);

      if (galleryImages.hits.length === 0)
        this.setState(prevState => ({ searchNothing: true }));
      if (galleryImages.totalHits <= 12) {
        this.setState(prevState => ({ isPhotoLeft: false }));
      } else {
        this.setState(prevState => ({ isPhotoLeft: true }));
      }
      this.setState(prevState => ({
        gallery: [...galleryImages.hits],
      }));
    } catch (error) {
    } finally {
      this.setState(prevState => ({
        loader: false,
        page: 1,
      }));
    }
  };
  handlePagination = async () => {
    const { page } = this.state;
    const { searchValue } = this.props;
    this.setState(prevState => ({ loaderSmall: true }));
    try {
      const galleryImages = await fetchGallery(searchValue, page);
      console.log(page);
      console.log(page * 12, galleryImages.totalHits);

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...galleryImages.hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState(prevState => ({
        loaderSmall: false,
      }));
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      await this.handleSearch();
    }

    if (prevState.page !== this.state.page) {
      await this.handlePagination();
    }
  }

  handleClick = event => {
    event.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery, loader, loaderSmall, searchNothing, isPhotoLeft } =
      this.state;
    return (
      <>
        {!loader && searchNothing && (
          <Warning>
            We found nothing &#x1F62D; Please try againg with corret search
            value &#x1F609;
          </Warning>
        )}
        <GalleryGrid>
          {gallery.map(element => {
            return (
              <GalleryItem key={element.id}>
                <GalleryImg alt={element.tags} src={element.webformatURL} />
              </GalleryItem>
            );
          })}
        </GalleryGrid>

        {loader && (
          <>
            <SpinnerContainer>
              <TailSpin
                height="180"
                width="180"
                color="#303f9f"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </SpinnerContainer>
          </>
        )}
        {loaderSmall && (
          <>
            <DotSpinnerContainer>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#303f9f"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </DotSpinnerContainer>
          </>
        )}

        {isPhotoLeft && gallery.length !== 0 && !loader && (
          <GalleryBtn onClick={this.handleClick}>Load more</GalleryBtn>
        )}
        {!isPhotoLeft && !searchNothing && <Text>No more photo</Text>}
      </>
    );
  }
}
