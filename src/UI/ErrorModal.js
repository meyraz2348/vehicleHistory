import React from "react";
import Modal from "./Modal";
import classes from "./ErrorModal.module.css";
export default function ErrorModal(props) {
  const backdropHandler = () => {
    console.log("hi");
    props.onClose();
  };
  return (
    <Modal
      onClick={backdropHandler}
      style={{
        width: "25rem",
      }}
    >
      <h1 className={classes.errorModal}>No matching logs found</h1>
    </Modal>
  );
}
