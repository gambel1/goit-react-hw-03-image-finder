import PropTypes from 'prop-types';
export default function Button({ onLodeMore }) {
  <button onClick={onLodeMore} type="button">
    Lode More
  </button>;
}

Button.propTypes = {
  onLodeMore: PropTypes.func.isRequired
};
