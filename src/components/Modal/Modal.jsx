import React, { PureComponent } from "react";
import { Overlay, ModalDiv } from "./Modal.styled";

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
    const { largeurl, imgalt, handleCloseModal } = this.props;
    return (
      <Overlay onClick={handleCloseModal}>
        <ModalDiv>
          <img src={largeurl} alt={imgalt} />
        </ModalDiv>
      </Overlay>
    );
  }
}
