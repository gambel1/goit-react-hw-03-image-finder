import { ButtonLodeMoreStyled } from './Button.styled';
import PropTypes from 'prop-types';
export default function Button({ onLodeMore }) {
  <ButtonLodeMoreStyled onClick={onLodeMore} type="button">
    Lode More
  </ButtonLodeMoreStyled>;
}

Button.propTypes = {
  onLodeMore: PropTypes.func.isRequired,
};
