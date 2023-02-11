import React, { PureComponent } from 'react';
import { fetchGallery } from 'services/api';
import { Warning, SpinnerContainer } from './App.styled';
import { Gallery } from './Gallery/Gallery';
import { Searchbar } from './Searchbar/Searchbar';
import { TailSpin } from 'react-loader-spinner';

export class App extends PureComponent {
  state = {
    inputValue: '',
    galleryData: [],
    page: null,
    loader: false,
  };

  handleSearch = async () => {
    this.setState(prevState => ({ loader: true }));
    try {
      const galleryImages = await fetchGallery(this.state.inputValue);
      this.setState(prevState => ({
        galleryData: [...galleryImages],
      }));
    } catch (error) {
    } finally {
      this.setState(prevState => ({
        loader: false,
      }));
    }
  };

  handleClick = event => {
    event.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handlePagination = async () => {
    const { inputValue, page } = this.state;
    this.setState(prevState => ({ loader: true }));
    try {
      const galleryImages = await fetchGallery(inputValue, page);
      this.setState(prevState => ({
        galleryData: [...prevState.galleryData, ...galleryImages],
      }));
    } catch (error) {
    } finally {
      this.setState(prevState => ({
        loader: false,
      }));
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { Search } = event.currentTarget.elements;

    this.setState(state => ({ page: 1, inputValue: Search.value.trim() }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, inputValue } = this.state;
    if (inputValue !== prevState.inputValue) {
      this.handleSearch();
    }

    if (prevState.page !== page && page !== null) {
      this.handlePagination();
    }
  }

  render() {
    const { galleryData, loader } = this.state;
    return (
      <div>
        <Searchbar handleSubmit={this.handleSubmit} />
        {galleryData.length === 0 && !loader && (
          <Warning>
            Gallery is empty. Please write somting in Input! &#x1F609;
          </Warning>
        )}

        {galleryData.length !== 0 && !loader && (
          <Gallery
            galleryHits={this.state.galleryData}
            handleClick={this.handleClick}
          />
        )}
        {loader && (
          <SpinnerContainer>
            <TailSpin
              height="380"
              width="380"
              color="#3f51b5"
              ariaLabel="tail-spin-loading"
              radius="10"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </SpinnerContainer>
        )}
      </div>
    );
  }
}
