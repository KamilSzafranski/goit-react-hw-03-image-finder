import React, { Component } from "react";
import { fetchGallery } from "services/api";
import { Gallery } from "./Gallery/Gallery";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    inputValue: "",
    galleryData: [],
  };

  handleInput = event => {
    event.preventDefault();

    this.setState(prevState => ({ inputValue: event.target.value }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    const galleryImages = await fetchGallery(this.state.inputValue);
    this.setState(state => ({ galleryData: [...galleryImages] }));
  };

  render() {
    return (
      <div>
        <Searchbar
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
        <Gallery galleryHits={this.state.galleryData} />
      </div>
    );
  }
}
