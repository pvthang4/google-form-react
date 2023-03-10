import Modal from "react-modal";

const customStyles = {
  content: {
    width: "70%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#FFFFFF",
    border: "1px solid #807E93",
    borderRadius: "10px",
  },
};

const UploadModal = ({
  setIsOpen,
  subtitle,
  modalIsOpen,
  afterOpenModal,
  closeModal,
  children,
}: any) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </Modal>
  );
};

export default UploadModal;
