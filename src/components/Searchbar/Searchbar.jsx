import React, { Component } from 'react';
// import proptypes from 'prop-types';
import {
  Searchbarr,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Searchbarr>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormInput type="text" name="Search" />
          <SearchFormButton type="submit"></SearchFormButton>
        </SearchForm>
      </Searchbarr>
    );
  }
}
