import React, { PureComponent } from "react";
import { Overlay, ModalDiv } from "./Modal.styled";
import PropTypes from "prop-types";
import { object } from "prop-types";

export class Modal extends PureComponent {
  closeOnKey = event => {
    if (event.code === "Escape") {
      this.props.handleCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.closeOnKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeOnKey);
  }

  render() {
    const { image, handleCloseModal } = this.props;
    return (
      <Overlay onClick={handleCloseModal}>
        <ModalDiv>
          <img alt={image[0].tags} src={image[0].largeImageURL} />
        </ModalDiv>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  image: PropTypes.arrayOf(PropTypes.object).isRequired,
};
