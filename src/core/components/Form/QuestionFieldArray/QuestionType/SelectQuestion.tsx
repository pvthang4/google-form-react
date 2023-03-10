import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  getValueFromFormikName,
  handleOnDragOptionEnd,
  handleRemoveOption,
  handleSortOptions,
} from "../../../../helpers/question.helper";
import iconRemove from "../../../../../assets/Icons/Icon_remove.svg";
import { FieldArray } from "formik";
import styled from "styled-components";
import { Fragment } from "react";
import TextField from "../../../Common/TextField";

const SelectQuestion = ({
  sectionIndex = 0,
  questionIndex = 0,
  values = {},
  setFieldValue,
  handleChange,
  question = {},
  questionArrayHelpers,
  isSubmit,
  errors,
  touched,
}: any) => {
  const optionsSort = handleSortOptions(question?.options);

  return (
    <DragDropContext
      onDragEnd={(result: any) =>
        handleOnDragOptionEnd(
          result,
          questionArrayHelpers,
          questionIndex,
          values,
          setFieldValue,
          sectionIndex
        )
      }
    >
      <Droppable droppableId="option">
        {(provided) => (
          <Option {...provided.droppableProps} ref={provided.innerRef}>
            {optionsSort?.map((option: any, optionIndex: number) => {
              const optionValueFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options.${optionIndex}.value`;
              const optionValueFormikValue =
                getValueFromFormikName(optionValueFormikName, values) || "";

              return (
                <Draggable
                  key={option?.optionId}
                  draggableId={option?.optionId}
                  index={optionIndex}
                  isDragDisabled={isSubmit}
                >
                  {(provided) => (
                    <FieldArray
                      name={`requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options`}
                      render={(optionArrayHelpers) => (
                        <OptionGroup
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={option?.optionId}
                        >
                          {!option?.isOther ? (
                            <Fragment>
                              <OptionItem>
                                <OptionLeftItem>
                                  <SelectItem>{`${
                                    optionIndex + 1
                                  }.`}</SelectItem>
                                  <TextField
                                    handleChange={handleChange}
                                    value={optionValueFormikValue}
                                    name={optionValueFormikName}
                                    disabled={isSubmit}
                                    errors={errors}
                                    touched={touched}
                                    placeholder={`選択肢${optionIndex + 1}`}
                                  />
                                </OptionLeftItem>
                                <ActionOption>
                                  {question?.options?.length > 1 ? (
                                    <IconRemove
                                      src={iconRemove}
                                      isSubmit={isSubmit}
                                      alt={""}
                                      height="25px"
                                      width="25px"
                                      onClick={() => {
                                        if (isSubmit) return;
                                        handleRemoveOption(
                                          optionArrayHelpers,
                                          optionIndex
                                        );
                                      }}
                                    />
                                  ) : null}
                                </ActionOption>
                              </OptionItem>
                            </Fragment>
                          ) : null}
                        </OptionGroup>
                      )}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Option>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Option = styled.div``;

const OptionGroup = styled.div`
  position: relative;
  outline: none;
  &:first-child {
    margin-top: 20px;
  }
`;

const OptionItem = styled.div`
  display: flex;
  width: 100%;
`;

const OptionLeftItem = styled.div`
  display: flex;
  width: 100%;
`;

const SelectItem = styled.div`
  width: 31px;
  height: 30px;
  margin-right: 9px;
  display: flex;
  align-items: end;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  margin-top: 12px;
  @media (max-width: 1024px) {
    width: 20px;
    height: 25px;
    font-size: 15px;
    margin-top: 5px;
  }
  @media (max-width: 480px) {
    width: 10px;
    height: 20px;
    font-size: 11px;
    margin-top: 0;
  }
`;

const ActionOption = styled.div`
  display: flex;
  margin: 20px 0 20px 20px;
  @media (max-width: 1024px) {
    margin: 7px;
  }
  @media (max-width: 480px) {
    margin: 2px;
  }
`;

const IconRemove: any = styled.img`
  width: 23px;
  height: 30px;
  cursor: ${(props: any) => (props?.isSubmit ? "no-drop" : "pointer")};
  @media (max-width: 480px) {
    width: 14px;
  }
`;

export default SelectQuestion;
