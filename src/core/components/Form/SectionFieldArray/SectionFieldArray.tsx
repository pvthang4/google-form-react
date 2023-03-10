import { FieldArray } from "formik";
import QuestionFieldArray from "../QuestionFieldArray";
import styled from "styled-components";
import iconAddQuestion from "../../../../assets/Icons/Icon_add_question.svg";
import {
  getValueFromFormikName,
  handleAddQuestion,
  handleOnDragEnd,
} from "../../../helpers/question.helper";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useRef, useState, useCallback } from "react";
import TextField from "../../Common/TextField";
import Tippy from "@tippyjs/react";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { toast } from "react-toastify";

const SectionFieldArray = ({
  values,
  setFieldValue,
  handleChange,
  isSubmit,
  errors,
  touched,
}: any) => {
  const middleRef: any = useRef();
  const size = useWindowSize();
  const questionEndRef: any = useRef(null);
  const [indexActive, setIndexActive] = useState<any>();
  const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);

  const handleActiveQuestion = (index: any) => {
    setIndexActive(index);
  };

  const hasScrollbar = useCallback(
    () => () => {
      return middleRef.current.scrollHeight > middleRef.current.clientHeight;
    },
    [middleRef]
  );

  useEffect(() => {
    setIsScrollBarVisible(hasScrollbar());
  }, [hasScrollbar, values, size]);

  const renderSectionFieldArray = (sectionArrayHelpers: any) => {
    return (
      <DragDropContext
        onDragEnd={(result: any) =>
          handleOnDragEnd(result, values, sectionArrayHelpers, setFieldValue)
        }
      >
        <Droppable droppableId="requests" type={"requests"}>
          {(provided) => (
            <Main ref={provided.innerRef} {...provided.droppableProps}>
              <FormContainer ref={middleRef}>
                {values?.requests?.map((section: any, sectionIndex: number) => {
                  const sectionTitleFormikName: string = `requests.${sectionIndex}.createItem.item.title`;
                  const sectionDescriptionFormikName: string = `requests.${sectionIndex}.createItem.item.description`;
                  const sectionTitleFormikValue: string =
                    getValueFromFormikName(sectionTitleFormikName, values) ||
                    "";
                  const sectionDescriptionFormikValue: string =
                    getValueFromFormikName(
                      sectionDescriptionFormikName,
                      values
                    ) || "";

                  const requestsLength = values?.requests?.length;
                  const isHeader = section?.createItem?.item?.pageBreakItem;
                  const item = section?.createItem?.item;

                  return (
                    <Draggable
                      key={item?.itemId}
                      draggableId={item?.itemId}
                      index={sectionIndex}
                      isDragDisabled={isSubmit}
                    >
                      {(provided) => (
                        <Section
                          key={item?.itemId}
                          id={item?.itemId}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {isHeader ? (
                            <HeaderGroup>
                              <HeaderSection
                                isActive={indexActive === sectionIndex}
                                key={item?.itemId}
                                sectionIndex={sectionIndex}
                                onClick={() =>
                                  handleActiveQuestion(sectionIndex)
                                }
                              >
                                <TextField
                                  name={sectionTitleFormikName}
                                  value={sectionTitleFormikValue}
                                  handleChange={handleChange}
                                  size="2vw"
                                  fontWeight="700"
                                  padding="0"
                                  height="3.5vw"
                                  minHeight="30px"
                                  disabled={isSubmit}
                                  errors={errors}
                                  touched={touched}
                                  placeholder="アンケートタイトルを入力してください"
                                />
                                <TextField
                                  name={sectionDescriptionFormikName}
                                  value={sectionDescriptionFormikValue}
                                  handleChange={handleChange}
                                  size="1.2vw"
                                  fontWeight="400"
                                  padding="0"
                                  height="2.5vw"
                                  minHeight="23px"
                                  disabled={isSubmit}
                                  errors={errors}
                                  touched={touched}
                                  placeholder="アンケートの説明"
                                />
                                <ActionForm
                                  disabled={isSubmit}
                                  isScrollBarVisible={isScrollBarVisible}
                                >
                                  <Tippy
                                    placement="right"
                                    content={"質問を追加する"}
                                  >
                                    <IconAddQuestion
                                      disabled={isSubmit}
                                      id="add-question"
                                      type="image"
                                      src={iconAddQuestion}
                                      alt="picture"
                                      onClick={() => {
                                        if (isSubmit) return;
                                        handleAddQuestion(
                                          sectionArrayHelpers,
                                          requestsLength,
                                          questionEndRef
                                        );
                                        toast.success("質問を追加しました。", {
                                          position: "top-right",
                                          autoClose: 3000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                          theme: "light",
                                        });
                                      }}
                                    />
                                  </Tippy>
                                </ActionForm>
                              </HeaderSection>
                            </HeaderGroup>
                          ) : (
                            <BodySection>
                              <QuestionFieldArray
                                provided={{ ...provided.dragHandleProps }}
                                sectionArrayHelpers={sectionArrayHelpers}
                                values={values}
                                sectionIndex={sectionIndex}
                                section={section}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                indexActive={indexActive}
                                isSubmit={isSubmit}
                                errors={errors}
                                touched={touched}
                                questionEndRef={questionEndRef}
                              />
                            </BodySection>
                          )}
                        </Section>
                      )}
                    </Draggable>
                  );
                })}
              </FormContainer>

              {provided.placeholder}
            </Main>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return <FieldArray name="requests" render={renderSectionFieldArray} />;
};

const Main = styled.div`
  // display: flex;
  // justify-content: center;
`;

const FormContainer: any = styled.div`
  display: inline-block;
  width: 100%;
  text-align: -webkit-center;
  position: relative;
  margin-top: 195px;
  height: calc(100vh - 199px);
  overflow: auto;
  @media (max-width: 768px) {
    margin-top: 140px;
    height: calc(100vh - 144px);
  }
  @media (max-width: 480px) {
    margin-top: 120px;
    height: calc(100vh - 124px);
  }
  ::-webkit-scrollbar-track {
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #6466;
  }
`;

const Section = styled.div`
  // margin: auto;
  margin-bottom: 15px;
  max-width: 70vw;
  @media (max-width: 1024px) {
    max-width: 85vw;
  }
`;

const HeaderGroup = styled.div``;

const HeaderSection: any = styled.div`
  width: 100%;
  background: #ffffff;
  text-align: left;
  border-radius: 8px;
  position: relative;
  padding: 32px 32px 8px 32px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  margin-bottom: 26px;
  @media (max-width: 1024px) {
    padding: 15px 15px 0 15px;
  }
`;

const ActionForm: any = styled.div`
  // position: absolute;
  // right: -80px;
  // top: 0;
  position: fixed;
  right: ${(props: any) => (props?.isScrollBarVisible ? "5px" : 0)};
  top: 50%;
  box-sizing: border-box;
  width: 58px;
  cursor: ${(props: any) => (props?.disabled ? "no-drop" : "pointer")};
  background: ${(props: any) => (props?.disabled ? "#e8e7e7" : "#ffffff")};
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 25%);
  border-radius: 10px;
  text-align: center;
  @media (max-width: 1024px) {
    width: 35px;
    height: 37px;
  }
  @media (max-width: 480px) {
    width: 24px;
    height: 27px;
  }
`;

const IconAddQuestion = styled.input`
  margin: 11px;
  cursor: ${(props: any) => (props?.disabled ? "no-drop" : "pointer")};
  @media (max-width: 1024px) {
    margin: 4px;
    width: 25px;
    height: 25px;
    margin: 5px 4px 0 4px;
  }
  @media (max-width: 480px) {
    width: 15px;
    margin: 0;
  }
`;

const BodySection = styled.div``;

export default SectionFieldArray;
