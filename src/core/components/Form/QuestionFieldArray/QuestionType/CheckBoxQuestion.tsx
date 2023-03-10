import { FieldArray } from "formik";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import iconUpload from "../../../../../assets/Images/Image_upload.svg";
import iconRemove from "../../../../../assets/Icons/Icon_remove.svg";
import iconRemoveImage from "../../../../../assets/Icons/Icon_remove_image.svg";
import {
  getValueFromFormikName,
  handleOnDragOptionEnd,
  handleRemoveOption,
  handleSortOptions,
} from "../../../../helpers/question.helper";
import { Fragment, useState } from "react";
import UploadModal from "../../../Common/Modal";
import UploadFile from "../../../Common/UploadFile";
import TextField from "../../../Common/TextField";

const CheckBoxQuestion = ({
  values = {},
  sectionIndex = 0,
  questionIndex = 0,
  setFieldValue,
  handleChange,
  question = {},
  questionArrayHelpers,
  isSubmit,
  errors,
  touched,
}: any) => {
  const optionsSort = handleSortOptions(question?.options);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [optionName, setOptionName] = useState<string>();
  const [optionValue, setOptionValue] = useState<any>();

  const handleUploadFile = (optionName: string, optionValue: any) => {
    setIsOpen(true);
    setOptionName(optionName);
    setOptionValue(optionValue);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChangeImage = (path: any) => {
    setFieldValue(optionName, {
      ...optionValue,
      image: {
        altText: "image",
        properties: {
          alignment: "LEFT",
          width: 740,
        },
        sourceUri: path,
      },
    });
    closeModal();
  };

  const handleRemoveImageOption = (optionName: string, optionValue: any) => {
    setFieldValue(optionName, {
      optionId: optionValue?.optionId,
      value: optionValue?.value,
      isOther: optionValue?.isOther,
    });
  };

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
              const optionFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options.${optionIndex}`;

              const optionValueFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options.${optionIndex}.value`;

              const optionImageUriFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options.${optionIndex}.image.sourceUri`;

              const optionFormikValue =
                getValueFromFormikName(optionFormikName, values) || "";

              const optionValueFormikValue =
                getValueFromFormikName(optionValueFormikName, values) || "";

              const optionImageUriFormikValue =
                getValueFromFormikName(optionImageUriFormikName, values) || "";

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
                                  <CheckboxItem />
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
                                  {option?.option !== "Other" ? (
                                    <IconUploadFile
                                      isSubmit={isSubmit}
                                      onClick={() => {
                                        if (isSubmit) return;
                                        handleUploadFile(
                                          optionFormikName,
                                          optionFormikValue
                                        );
                                      }}
                                      src={iconUpload}
                                      alt={""}
                                    />
                                  ) : null}

                                  {question?.options?.length > 1 ? (
                                    <IconRemove
                                      src={iconRemove}
                                      alt={""}
                                      height="25px"
                                      width="25px"
                                      isSubmit={isSubmit}
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
                              {optionImageUriFormikValue ? (
                                <ImageGroup>
                                  <Image
                                    src={optionImageUriFormikValue}
                                    name={optionImageUriFormikName}
                                    value={optionImageUriFormikValue}
                                    onChange={handleChange}
                                    type="image"
                                    alt={""}
                                    height="158px"
                                    width="270px"
                                    disabled={isSubmit}
                                  />
                                  <ActionImage
                                    src={iconRemoveImage}
                                    isSubmit={isSubmit}
                                    onClick={() => {
                                      if (isSubmit) return;
                                      handleRemoveImageOption(
                                        optionFormikName,
                                        optionFormikValue
                                      );
                                    }}
                                    type="image"
                                    alt={""}
                                  />
                                </ImageGroup>
                              ) : null}
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
      <UploadModal
        children={<UploadFile handleChangeImage={handleChangeImage} />}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
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

const IconUploadFile: any = styled.img`
  width: 24px;
  height: 24px;
  margin: 3px 10px 0 0;
  cursor: ${(props: any) => (props?.isSubmit ? "no-drop" : "pointer")};
  @media (max-width: 480px) {
    width: 15px;
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

const Image = styled.input`
  margin: 15px 0 20px 20px;
  object-fit: cover;
  height: 158px;
  width: 270px;
  cursor: context-menu;
  @media (max-width: 1024px) {
    margin: 10px 0 15px 15px;
  }
  @media (max-width: 768px) {
    height: 100px;
    width: 170px;
  }
`;

const ImageGroup = styled.div`
  position: relative;
  display: flex;
`;

const ActionImage: any = styled.input`
  position: absolute;
  left: 270px;
  top: 6px;
  cursor: ${(props: any) => (props?.isSubmit ? "no-drop" : "pointer")};
  @media (max-width: 1024px) {
    width: 18px;
    height: 18px;
  }
  @media (max-width: 380px) {
    width: 15px;
    height: 15px;
  }
`;

export default CheckBoxQuestion;
