import { ModalOverlayBoxDiv, ModalDiv } from './Modal.styled';
import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
  }

  closeOnEsc = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.closeModal();
  };

  render() {
    const { closeModal, largeModalImageURL, tags } = this.props;

    return createPortal(
      <ModalOverlayBoxDiv onClick={closeModal}>
        <ModalDiv>
          <img src={largeModalImageURL} alt={tags} />
        </ModalDiv>
      </ModalOverlayBoxDiv>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeModalImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
