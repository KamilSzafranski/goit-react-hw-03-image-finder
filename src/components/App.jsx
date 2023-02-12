import React, { PureComponent } from 'react';
import { fetchGallery } from 'services/api';
import { Gallery } from './Gallery/Gallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Warning } from './App.styled';

export class App extends PureComponent {
  state = {
    inputValue: '',
    default: true,
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { Search } = event.currentTarget.elements;

    this.setState(state => ({
      inputValue: Search.value.trim(),
      default: false,
    }));
  };

  componentDidMount() {
    this.setState(prevState => ({ inputValue: '', deafult: true }));
  }
  render() {
    return (
      <div>
        <Searchbar handleSubmit={this.handleSubmit} />
        {this.state.default && (
          <Warning>
            Gallery is empty. Please write somting in Input! &#x1F609;
          </Warning>
        )}
        <Gallery searchValue={this.state.inputValue} />
      </div>
    );
  }
}
