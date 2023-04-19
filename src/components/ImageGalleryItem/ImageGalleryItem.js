import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

import React from 'react';

export default class ImageGalleryItem extends React.Component {
  state = { isModalOpen: false };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
    
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { isModalOpen } = this.state;
    const { toggleModal } = this;

    return (
      <li class="gallery-item">
        <img src={webformatURL} alt={tags} onClick={toggleModal}
        />
        {isModalOpen && (
          <Modal
            closeModal={toggleModal}
            largeModalImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </li>
    );
  }
}


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
