import { useRef } from "react";
import styled from "styled-components";
import {
  getValueFromFormikName,
  handleCopyQuestion,
  handleRemoveQuestion,
} from "../../../helpers/question.helper";
import ToggleButton from "../../Common/ToggleButton";
import iconCopy from "../../../../assets/Icons/Icon_copy.svg";
import iconDelete from "../../../../assets/Icons/Icon_delete.svg";

interface QuestionFooterProps {
  section?: any;
  values?: any;
  sectionArrayHelpers?: any;
  sectionIndex?: number;
  isSubmit?: boolean;
  handleShowMessage?: (message: string) => void;
}
const QuestionFooter = ({
  section = {},
  values = [],
  sectionArrayHelpers,
  sectionIndex = 0,
  isSubmit = false,
  handleShowMessage,
}: QuestionFooterProps) => {
  const buttonCopyRef: any = useRef(null);
  const buttonRemoveRef: any = useRef(null);
  const requiredFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.required`;
  const typeFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.type`;
  const isTextFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.textQuestion.paragraph`;
  const typeFormikValue = getValueFromFormikName(typeFormikName, values) || "";
  const isTextFormikValue =
    getValueFromFormikName(isTextFormikName, values) || false;

  const onLaunchClicked = () => {
    buttonCopyRef.current.disabled = !buttonCopyRef.current.disabled;
    buttonRemoveRef.current.disabled = !buttonRemoveRef.current.disabled;
    const timeoutID = setTimeout(() => {
      buttonCopyRef.current.disabled = !buttonCopyRef.current.disabled;
      buttonRemoveRef.current.disabled = !buttonRemoveRef.current.disabled;
    }, 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  };

  return (
    <Footer>
      <IconCopy
        ref={buttonCopyRef}
        disabled={isSubmit}
        src={iconCopy}
        onClick={() => {
          if (isSubmit) return;
          onLaunchClicked();
          if (handleShowMessage) handleShowMessage("コピーしました");
          handleCopyQuestion(
            section,
            sectionArrayHelpers,
            sectionIndex,
            typeFormikValue,
            isTextFormikValue
          );
        }}
        type="image"
        alt={""}
      />
      <IconRemove
        ref={buttonRemoveRef}
        disabled={isSubmit}
        src={iconDelete}
        onClick={() => {
          if (isSubmit) return;
          onLaunchClicked();
          if (handleShowMessage) handleShowMessage("削除しました");
          handleRemoveQuestion(sectionIndex, sectionArrayHelpers);
        }}
        type="image"
        alt={""}
      />
      <Line />
      <Text>必須</Text>
      <ToggleButtonStyle>
        <ToggleButton
          name={requiredFormikName}
          status={section.createItem.item.questionItem.question.required}
          isSubmit={isSubmit}
        />
      </ToggleButtonStyle>
    </Footer>
  );
};

const Footer = styled.div`
  border-top: 1px solid #e0e0e0;
  margin-top: 40px;
  height: 53px;
  display: flex;
  justify-content: end;
  align-items: center;
  @media (max-width: 1024px) {
    margin-top: 15px;
    height: 30px;
  }
`;

const IconCopy: any = styled.input`
  margin-right: 16px;
  cursor: ${(props: any) => (props?.disabled ? "no-drop" : "pointer")};
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 37px;
    height: 0px;
    left: 10;
    top: 0;
    border: 1px solid #e0e0e0;
    transform: rotate(90deg);
  }
  @media (max-width: 1024px) {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

const IconRemove: any = styled.input`
  margin-right: 23px;
  cursor: ${(props: any) => (props?.disabled ? "no-drop" : "pointer")};
  @media (max-width: 1024px) {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

const Line = styled.div`
  height: 30px !important;
  height: 0px;
  border: 1px solid #e0e0e0;
  margin-right: 16px;
  @media (max-width: 1024px) {
    height: 20px !important;
    margin-right: 5px;
  }
`;

const Text = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 1vw;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-right: 10px;
  height: 20px;
`;

const ToggleButtonStyle = styled.div`
  padding: 12px 0;
  height: 100%;
  @media (max-width: 1024px) {
    padding: 5px 0;
  }
`;

export default QuestionFooter;
