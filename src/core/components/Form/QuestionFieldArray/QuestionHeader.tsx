import { Fragment, useEffect, useRef, useState } from "react";
import UploadModal from "../../Common/Modal";
import QuestionTypeDropdown from "../../Common/QuestionTypeDropdown";
import iconEditImage from "../../../../assets/Icons/Icon_edit_image.svg";
import UploadFile from "../../Common/UploadFile";
import styled from "styled-components";
import { getValueFromFormikName } from "../../../helpers/question.helper";
import TextField from "../../Common/TextField";

interface QuestionHeaderProps {
  sectionIndex?: number;
  questionIndex?: number;
  handleChange: () => any;
  values: any;
  setFieldValue: any;
  questionType?: any;
  sectionArrayHelpers: any;
  isSubmit: any;
  errors: any;
  touched: any;
}

const QuestionHeader = ({
  sectionIndex = 0,
  questionIndex = 0,
  handleChange,
  values = {},
  setFieldValue,
  questionType,
  sectionArrayHelpers,
  isSubmit,
  errors,
  touched,
}: QuestionHeaderProps) => {
  const refSelect: any = useRef(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isShowOption, setIsShowOption] = useState<boolean>(false);

  const questionTitleFormikName: string = `requests.${sectionIndex}.createItem.item.title`;
  const questionImageUriFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.image.sourceUri`;

  const questionFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem`;

  const questionTitleFormikValue: string =
    getValueFromFormikName(questionTitleFormikName, values) || "";

  const questionUriFormikValue: string =
    getValueFromFormikName(questionImageUriFormikName, values) || "";

  const questionFormikValue: any =
    getValueFromFormikName(questionFormikName, values) || "";

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChangeImage = (path: any) => {
    setFieldValue(questionFormikName, {
      ...questionFormikValue,
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

  const handleRemoveImage = () => {
    setFieldValue(questionFormikName, {
      question: questionFormikValue.question,
    });
    setIsShowOption(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        isShowOption &&
        refSelect?.current &&
        !refSelect?.current.contains(e?.target)
      ) {
        setIsShowOption(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isShowOption]);

  return (
    <Fragment>
      <QuestionHeaderStyle>
        <TextField
          handleChange={handleChange}
          name={questionTitleFormikName}
          value={questionTitleFormikValue}
          disabled={isSubmit}
          errors={errors}
          touched={touched}
          color="#000000"
          placeholder="質問を入力してください"
        />
        <DropDownList>
          <QuestionTypeDropdown
            questionIndex={questionIndex}
            values={values}
            setFieldValue={setFieldValue}
            questionType={questionType}
            sectionArrayHelpers={sectionArrayHelpers}
            sectionIndex={sectionIndex}
            isSubmit={isSubmit}
          />
        </DropDownList>
      </QuestionHeaderStyle>

      <UploadImage>
        <LabelUpload>添付画像</LabelUpload>
        <ButtonUpload>
          {questionUriFormikValue ? (
            <ImageGroup>
              <Image
                src={questionUriFormikValue}
                name={questionImageUriFormikName}
                value={questionUriFormikValue}
                onChange={handleChange}
                type="image"
                alt={""}
                height="100%"
                width="100%"
              />
              <ActionImage
                src={iconEditImage}
                isSubmit={isSubmit}
                onClick={() => {
                  if (isSubmit) return;
                  setIsShowOption(!isShowOption);
                }}
                type="image"
                alt={""}
              />
              {isShowOption ? (
                <ActionSelect ref={refSelect}>
                  <Option onClick={() => setIsOpen(true)}>画像の変更</Option>
                  <Option onClick={handleRemoveImage}>画像の削除</Option>
                </ActionSelect>
              ) : null}
            </ImageGroup>
          ) : (
            <Upload
              isSubmit={isSubmit}
              onClick={() => {
                if (isSubmit) return;
                setIsOpen(true);
              }}
            >
              画像アップロード
            </Upload>
          )}
        </ButtonUpload>
      </UploadImage>

      <UploadModal
        children={<UploadFile handleChangeImage={handleChangeImage} />}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </Fragment>
  );
};

const QuestionHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const UploadImage = styled.div`
  text-align: left;
`;

const LabelUpload = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #646673;
`;

const ButtonUpload = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 5px;
  gap: 13px;
  width: 100%;
  min-height: 57px;
  border: 1px solid #c9cace;
  border-radius: 6px;
  margin-top: 16px;
  @media (max-width: 1024px) {
    min-height: 40px;
  }
  @media (max-width: 768px) {
    min-height: 30px;
  }
`;

const Upload: any = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 24px;
  gap: 10px;
  height: 49px;
  background: #e8e7e7;
  border: 1px solid #c9cace;
  border-radius: 4px;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0025em;
  color: #1e293b;
  cursor: ${(props: any) => (props?.isSubmit ? "no-drop" : "pointer")};
  @media (max-width: 1024px) {
    height: 34px;
    font-size: 14px;
    padding: 8px 10px;
  }
  @media (max-width: 768px) {
    height: 22px;
    font-size: 11px;
    padding: 4px 6px;
  }
`;

const Image = styled.input`
  object-fit: cover;
  cursor: context-menu;
`;

const DropDownList = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ImageGroup = styled.div`
  position: relative;
`;

const ActionImage: any = styled.input`
  position: absolute;
  left: -18px;
  top: -15px;
  width: 45px;
  height: 45px;
  cursor: ${(props: any) => (props?.isSubmit ? "no-drop" : "pointer")};
  @media (max-width: 480px) {
    top: -21px;
    width: 30px;
  }
`;

const ActionSelect = styled.div`
  position: absolute;
  left: -115px;
  top: 25px;
  box-sizing: border-box;
  width: 82px;
  height: 78px;
  text-align: center;
  @media (max-width: 1024px) {
    left: -75px;
    top: -70px;
  }
  @media (max-width: 480px) {
    left: 10px;
    top: -50px;
  }
`;

const Option = styled.div`
  height: 28px;
  margin-bottom: 10px;
  background: #807e93;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  width: 82px;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 1024px) {
    height: 20px;
    font-size: 11px;
    width: 68px;
  }
`;

export default QuestionHeader;
