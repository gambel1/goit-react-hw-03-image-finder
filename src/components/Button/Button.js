import { ButtonLodeMoreStyled } from './Button.styled';
import PropTypes from 'prop-types';
export default function Button({ lodeMore }) {
  return (
    <ButtonLodeMoreStyled onClick={lodeMore} type="button">
      Lode More
    </ButtonLodeMoreStyled>
  );
}

Button.propTypes = {
  lodeMore: PropTypes.func.isRequired,
};
