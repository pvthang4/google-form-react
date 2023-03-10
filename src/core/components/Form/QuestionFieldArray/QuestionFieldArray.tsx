import { ChoiceType } from "../../../enums";
import {
  handleAddOption,
  handleAddOtherOption,
  handleRemoveOtherOption,
} from "../../../helpers/question.helper";
import QuestionFooter from "./QuestionFooter";
import QuestionHeader from "./QuestionHeader";
import CheckBoxQuestion from "./QuestionType/CheckBoxQuestion";
import MutipleChoiceQuestion from "./QuestionType/MutipleChoiceQuestion";
import ParagraphQuestion from "./QuestionType/ParagraphQuestion";
import SelectQuestion from "./QuestionType/SelectQuestion";
import ShortQuestion from "./QuestionType/ShortQuestion";
import imageDrap from "../../../../assets/Images/Image_drap.svg";
import iconRemove from "../../../../assets/Icons/Icon_remove.svg";
import styled from "styled-components";
import { toast } from "react-toastify";

const QuestionFieldArray = ({
  sectionArrayHelpers,
  questionArrayHelpers,
  values,
  handleChange,
  setFieldValue,
  section,
  sectionIndex,
  provided,
  indexActive,
  isSubmit,
  errors,
  touched,
  questionEndRef,
}: any) => {
  const item = section?.createItem?.item;
  const isOther = item?.questionItem?.question?.choiceQuestion?.options?.find(
    (item: any) => item?.isOther === true
  );
  const choiceQuestionType = item?.questionItem?.question?.choiceQuestion?.type;

  let questionWithType: any;

  let questionType: any;

  if (
    choiceQuestionType === ChoiceType.RADIO ||
    choiceQuestionType === ChoiceType.CHECKBOX ||
    choiceQuestionType === ChoiceType.DROP_DOWN
  ) {
    questionWithType = item?.questionItem?.question?.choiceQuestion;
    questionType = choiceQuestionType;
  } else {
    if (item?.questionItem?.question?.textQuestion?.paragraph) {
      questionType = ChoiceType.PARAGRAPH;
    } else {
      questionType = ChoiceType.SHORT_ANSWER;
    }
  }

  const selectedParagraphOption = (type: boolean) => {
    if (!type) {
      return <ShortQuestion />;
    } else {
      return <ParagraphQuestion />;
    }
  };

  const handleShowMessage = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Question ref={questionEndRef}>
      <QuestionItem isActive={indexActive === sectionIndex}>
        <HeaderQuestion {...provided}>
          <IconDrap src={imageDrap} alt={""} />
        </HeaderQuestion>
        <QuestionHeader
          sectionIndex={sectionIndex}
          sectionArrayHelpers={sectionArrayHelpers}
          handleChange={handleChange}
          values={values}
          setFieldValue={setFieldValue}
          isSubmit={isSubmit}
          errors={errors}
          touched={touched}
          questionType={questionType}
        />
        <Option text={item?.questionItem?.question?.textQuestion}>
          {item?.questionItem?.question?.textQuestion ? (
            selectedParagraphOption(
              item?.questionItem?.question?.textQuestion?.paragraph
            )
          ) : questionWithType?.type === ChoiceType.RADIO ? (
            <MutipleChoiceQuestion
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              question={questionWithType}
              sectionIndex={sectionIndex}
              questionArrayHelpers={questionArrayHelpers}
              isSubmit={isSubmit}
              errors={errors}
              touched={touched}
            />
          ) : questionWithType?.type === ChoiceType.CHECKBOX ? (
            <CheckBoxQuestion
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              question={questionWithType}
              sectionIndex={sectionIndex}
              questionArrayHelpers={questionArrayHelpers}
              isSubmit={isSubmit}
              errors={errors}
              touched={touched}
            />
          ) : (
            <SelectQuestion
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              question={questionWithType}
              sectionIndex={sectionIndex}
              questionArrayHelpers={questionArrayHelpers}
              isSubmit={isSubmit}
              errors={errors}
              touched={touched}
            />
          )}
          {isOther ? (
            <OtherOption>
              {questionWithType?.type === ChoiceType.RADIO ||
              questionWithType?.type === ChoiceType.CHECKBOX ? (
                <OptionGroup>
                  <LeftOption>
                    {questionWithType?.type === ChoiceType.DROP_DOWN ? (
                      <SelectOption>
                        {`${
                          item?.questionItem?.question?.choiceQuestion?.options
                            ?.length + 1
                        }.`}
                      </SelectOption>
                    ) : questionWithType?.type === ChoiceType.RADIO ? (
                      <RadioItem />
                    ) : (
                      <CheckboxItem />
                    )}
                  </LeftOption>
                  <RightOption>
                    <OtherText>その他</OtherText>
                    <IconRemove
                      src={iconRemove}
                      alt={""}
                      onClick={() => {
                        if (isSubmit) return;
                        handleRemoveOtherOption(
                          sectionIndex,
                          values,
                          setFieldValue,
                          questionArrayHelpers
                        );
                      }}
                    />
                  </RightOption>
                </OptionGroup>
              ) : null}
            </OtherOption>
          ) : null}
          <AddOption>
            {questionWithType?.type === ChoiceType.RADIO ||
            questionWithType?.type === ChoiceType.CHECKBOX ||
            questionWithType?.type === ChoiceType.DROP_DOWN ? (
              <OptionGroup>
                <LeftOption>
                  {questionWithType?.type === ChoiceType.DROP_DOWN ? (
                    <SelectOption>
                      {`${
                        item?.questionItem?.question?.choiceQuestion?.options
                          ?.length + 1
                      }.`}
                    </SelectOption>
                  ) : questionWithType?.type === ChoiceType.RADIO ? (
                    <RadioItem />
                  ) : (
                    <CheckboxItem />
                  )}
                </LeftOption>
                <RightOption>
                  <OptionOtherText
                    isSubmit={isSubmit}
                    onClick={() => {
                      if (isSubmit) return;
                      handleAddOption(sectionIndex, values, setFieldValue);
                    }}
                  >
                    選択肢を追加
                  </OptionOtherText>
                  {!isOther &&
                  questionWithType?.type !== ChoiceType.DROP_DOWN ? (
                    <>
                      <OptionOrText>&nbsp; または&nbsp;</OptionOrText>
                      <OptionOtherText
                        isSubmit={isSubmit}
                        onClick={() => {
                          if (isSubmit) return;
                          handleAddOtherOption(
                            sectionIndex,
                            values,
                            setFieldValue,
                            questionArrayHelpers
                          );
                        }}
                      >
                        &nbsp; 「その他」を追加
                      </OptionOtherText>
                    </>
                  ) : null}
                </RightOption>
              </OptionGroup>
            ) : null}
          </AddOption>
        </Option>
        <QuestionFooter
          section={section}
          sectionArrayHelpers={sectionArrayHelpers}
          values={values}
          sectionIndex={sectionIndex}
          isSubmit={isSubmit}
          handleShowMessage={handleShowMessage}
        />
      </QuestionItem>
    </Question>
  );
};

const Question = styled.div`
  position: relative;
`;
const IconDrap = styled.img`
  width: 30px;
  @media (max-width: 1024px) {
    width: 25px;
  }
  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
  }
`;

const QuestionItem: any = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1px 32px 0 32px;
  margin-bottom: 26px;
  position: relative;
  &: last-child {
    margin-bottom: 0;
  }
  @media (max-width: 1024px) {
    padding: 1px 15px 0 15px;
  }
`;

const HeaderQuestion = styled.div`
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Option: any = styled.div`
  display: ${(props: any) => (props.text ? "flex" : "block")};
`;

const AddOption = styled.div``;

const OptionGroup = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
  margin-bottom: 30px;
  @media (max-width: 1024px) {
    margin-bottom: 23px;
  }
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const SelectOption = styled.div`
  height: 30px;
  padding-top: 10px;
  margin-right: 19px;
  display: flex;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  @media (max-width: 1024px) {
    height: 25px;
    font-size: 15px;
    padding-top: 6px;
  }
  @media (max-width: 480px) {
    height: 15px;
    font-size: 11px;
    margin-right: 10px;
    margin-bottom: 2px;
    padding-top: 0px;
  }
`;

const RadioItem = styled.div`
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border: 1px solid #89939e;
  border-radius: 50%;
  margin: 5px 15px 0 0;
  @media (max-width: 1024px) {
    margin: 9px 10px 0 0;
  }
  @media (max-width: 480px) {
    margin: 4px 5px 0 0;
    height: 21px;
    width: 22px;
  }
`;

const LeftOption = styled.div`
  display: flex;
`;

const RightOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  // margin-top: 20px;
`;

const OptionOtherText: any = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0025em;
  color: #3c3b47;
  cursor: ${(props: any) => (props?.isSubmit ? "no-drop" : "pointer")};
  border-bottom: 1px solid #3c3b47;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const OptionOrText = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #3c3b47;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const CheckboxItem = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  border: 1px solid #807e93;
  margin-top: 15px;
  @media (max-width: 1024px) {
    margin: 9px 10px 0 0;
    width: 22px;
    height: 22px;
  }
  @media (max-width: 480px) {
    margin: 4px 5px 0 0;
    width: 15px;
    height: 15px;
  }
`;

const OtherOption = styled.div``;

const IconRemove = styled.img`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25px;
  height: 25px;
  @media (max-width: 480px) {
    width: 14px;
    height: 30px;
  }
`;

const OtherText = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #c9cace;
  border-bottom: 1px dashed #c9cace;
  width: 50%;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export default QuestionFieldArray;
