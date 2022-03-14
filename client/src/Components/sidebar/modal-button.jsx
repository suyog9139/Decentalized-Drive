import React from 'react';
import './modal-button.css';

const ModalButton = props => (
  <button className="modal-button-main" onClick={props.handleClick}>
    {props.children}
  </button>);

export default ModalButton;