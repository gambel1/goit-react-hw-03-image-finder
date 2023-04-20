import { AppContainer } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import ApiFetchGallery from '../../api/ApiFetchGallery';
import Loader from '../Loader/Loader';
import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const { totalHits, hits } = await ApiFetchGallery(query, page);

        if (totalHits === 0) {
          Notify.failure('По вашему запросу ничего не найдено');
          this.setState({ isLoading: false });
          return;
        }

        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));

        this.setState({ isLoading: false });
      } catch (error) {
        Notify.failure('Что-то пошло не так');
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleQuerySubmit = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { images, totalHits, isLoading } = this.state;
    const { handleQuerySubmit, handleLoadMore } = this;
    return (
      <AppContainer>
        <Searchbar submit={handleQuerySubmit} />
        {images && <ImageGallery images={images} />}

        {!isLoading && images.length > 0 && totalHits > images.length && (
          <Button lodeMore={handleLoadMore} />
        )}
        {isLoading && <Loader />}
      </AppContainer>
    );
  }
}
