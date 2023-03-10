import Modal from "react-modal";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import iconCopy from "../../../../assets/Icons/Icon_copy.svg";

const customStyles = {
  content: {
    width: "60%",
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: 0,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#FFFFFF",
    border: "1px solid #807E93",
    borderRadius: "10px",
  },
};
const ModalSuccess = ({
  modalIsOpen,
  closeModal,
  formUri,
  handleCopy,
  navigate,
}: any) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <ModalWrap>
        <HeaderModal>
          <TitleModal>フォームを送信</TitleModal>
        </HeaderModal>
        <TextLine1>
          <Text>アンケートの作成、お疲れさまでした。</Text>
        </TextLine1>
        <TextLine2>
          <Text>以下のリンクを回答者宛に送付して下さい。</Text>
        </TextLine2>
        <TextLink>リンク</TextLink>
        <TextLinkCopy>
          <Tippy content={formUri} placement="top" className="tool-tip-answer">
            <TextUri>{formUri}</TextUri>
          </Tippy>

          <IconCopy
            src={iconCopy}
            onClick={() => handleCopy(formUri)}
            type="image"
            alt={""}
          />
        </TextLinkCopy>
        <FooterModal></FooterModal>
      </ModalWrap>
    </Modal>
  );
};

const ModalWrap = styled.div`
  padding: 20px 20px 30px 20px;
  @media (max-width: 1024px) {
    padding: 10px 10px 15px 10px;
  }
`;
const HeaderModal = styled.div`
  background: rgba(255, 255, 255, 0.01);
  // box-shadow: inset 0px -2px 0px #00a0e9;
  width: fit-content;
`;

const TitleModal = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3c3b47;
  @media (max-width: 1024px) {
    font-size: 1.5vw;
  }
`;

const TextLine1 = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  @media (max-width: 1024px) {
    margin-top: 20px;
  }
  @media (max-width: 480px) {
    margin-top: 5px;
  }
`;

const TextLine2 = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3c3b47;
  &:first-child {
    margin-bottom: 16px;
    @media (max-width: 1024px) {
      margin-bottom: 8px;
    }
    @media (max-width: 480px) {
      margin-bottom: 2px;
    }
  }
  @media (max-width: 1024px) {
    font-size: 1.5vw;
  }
`;

const TextLink = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  // margin: 1vw 0 0 1vw;
  @media (max-width: 1024px) {
    font-size: 1.5vw;
  }
`;

const FooterModal = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const TextLinkCopy = styled.p`
  display: flex;
  justify-content: center;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  align-items: center;
  text-align: center;
  color: #000000;
  border-bottom: 1px solid #3c3b47;
  margin: 20px 35px 0 35px;
  position: relative;
  @media (max-width: 1024px) {
    margin: 0 35px;
  }
  @media (max-width: 768px) {
    margin: 0 20px;
  }
  @media (max-width: 480px) {
    margin: 0 10px;
  }
`;

const TextUri = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  @media (max-width: 1024px) {
    font-size: 1.5vw;
  }
`;

const IconCopy = styled.input`
  position: absolute;
  right: -25px;
  @media (max-width: 1024px) {
    width: 20px;
    height: 20px;
    right: -20px;
  }
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
    right: -15px;
  }
  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
    right: -10px;
  }
`;

export default ModalSuccess;
