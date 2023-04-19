import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import ApiFetchGallery from '../api/ApiFetchGallery';
import Loader from './Loader/Loader';
import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totals: 0,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const { totals, hits } = await ApiFetchGallery(query, page);

        if (totals === 0) {
          Notify.failure('По вашему запросу ничего не найдено');
          this.setState({ isLoading: false });
          return;
        }

        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totals:
            page === 1
              ? totals - hits.length
              : totals - [...prevState.images, ...hits].length,
        }));

        this.setState({ isLoading: false });
      } catch (error) {
        Notify.failure('Что-то пошло не так');
      }
    }
  }

  handleLodeMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleQuerySubmit = event => {
    this.setState({ event, page: 1 });
  };

  render() {
    const { images, totals, isLoading } = this.state;
    const { handleQuerySubmit, handleLodeMore } = this;
    return (
      <div>
        <Searchbar submit={handleQuerySubmit} />
        {images && <ImageGallery images={images} />}
        {!totals && <Button onLodeMore={handleLodeMore} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}
