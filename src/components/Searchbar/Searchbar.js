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
    const { query } = this.state;
    const { submit } = this.props;

    event.preventDefault();

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
      <header class="searchbar">
        <form onSubmit={handleSubmit} class="form">
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            onChange={handleNameChange}
            value={query}
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};
