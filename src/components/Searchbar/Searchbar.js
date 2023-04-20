import {
  SearchbarBoxHeder,
  SearchbarBoxSearchForm,
  SearchbarBoxButton,
  SearchbarBoxSpan,
  SearchbarBoxInput,
} from './Searchbar.styled';
import React from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class Searchbar extends React.Component {
  state = {
    query: '',
    page: 1,
  };

  handleNameChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { query } = this.state;
    const { submit } = this.props;

    if (query.trim() === '') {
      Notify.failure('Введите что-то');
      return;
    }
    submit(query);
  };

  render() {
    const { handleSubmit, handleNameChange } = this;
    const { query } = this.state;

    return (
      <SearchbarBoxHeder>
        <SearchbarBoxSearchForm onSubmit={handleSubmit}>
          <SearchbarBoxButton type="submit">
            <SearchbarBoxSpan>Search</SearchbarBoxSpan>
          </SearchbarBoxButton>

          <SearchbarBoxInput
            onChange={handleNameChange}
            value={query}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </SearchbarBoxSearchForm>
      </SearchbarBoxHeder>
    );
  }
}

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};
