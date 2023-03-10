import imageCloudUpload from "../../../assets/Images/Image_cloud_upload.svg";
import styled from "styled-components";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UploadFile = ({ handleChangeImage }: any) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  // ref
  const inputRef: any = useRef(null);

  // handle drag events
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const imageExtension = ["jpg", "jpeg", "png"];
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      const isImage = imageExtension.includes(
        e?.dataTransfer?.files[0]?.name?.toLowerCase()?.split(".").pop()
      );
      if (isImage) {
        const body = {
          file: e?.dataTransfer?.files[0],
          file_name: e?.dataTransfer?.files[0]?.name,
        };
        handleUploadImage(body);
      } else {
        toast.error(
          "アップロードできる画像のファイル形式は、「jpeg」、「jpg」、「png」です。",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: any) => {
    const imageExtension = ["jpg", "jpeg", "png"];

    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      const isImage = imageExtension.includes(
        e?.target?.files[0]?.name?.toLowerCase()?.split(".").pop()
      );
      if (isImage) {
        const body = {
          file: e?.target?.files[0],
          file_name: e?.target?.files[0]?.name,
        };
        setLoading(true);
        handleUploadImage(body);
      } else {
        toast.error(
          "アップロードできる画像のファイル形式は、「jpeg」、「jpg」、「png」です。",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    }
  };

  // handle upload image
  const handleUploadImage = async (body: any) => {
    axios
      .post(
        "https://vvprf44d2226oj5cswd4zwfs3a0qcxcc.lambda-url.ap-northeast-1.on.aws/",
        body,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        setLoading(false);
        handleChangeImage(response.data.file_url);
      })
      .catch(function (error) {
        return error;
      });
  };
  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <Modal>
      <ModalHeader>
        <TextHeader>画像の挿入</TextHeader>
      </ModalHeader>
      <ModalBody>
        <UploadForm
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <UploadInput
            ref={inputRef}
            type="file"
            multiple={true}
            onChange={handleChange}
          />
          <Label className={dragActive ? "drag-active" : ""}>
            <ButtonGroup>
              <ImageUpload src={imageCloudUpload} alt={""} />
            </ButtonGroup>
          </Label>
          {dragActive && (
            <DrapBlock
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></DrapBlock>
          )}
        </UploadForm>
      </ModalBody>
      <ButtonStyle>
        <UploadButton
          disabled={loading}
          loading={loading}
          onClick={onButtonClick}
        >
          参照
        </UploadButton>
      </ButtonStyle>
      <ModalFooter>または、ここにファイルをドラッグしてください</ModalFooter>
    </Modal>
  );
};

const Modal = styled.div``;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.01);
  box-shadow: inset 0px -2px 0px #00a0e9;
  @media (max-width: 1024px) {
    width: 90px;
  }
  @media (max-width: 480px) {
    width: 65px;
  }
`;

const TextHeader = styled.p`
  width: fit-content;
  height: 32px;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3c3b47;
  @media (max-width: 1024px) {
    width: 90px;
    height: 24px;
    font-size: 18px;
    line-height: 24px;
  }
  @media (max-width: 480px) {
    width: 82px;
    font-size: 13px;
  }
`;

const ModalBody = styled.div`
  text-align: center;
`;

const UploadForm = styled.form`
  max-width: 100%;
  text-align: center;
  position: relative;
`;

const UploadInput = styled.input`
  display: none;
`;

const ImageUpload = styled.img`
  width: 250px;
  height: 250px;
  @media (max-width: 1024px) {
    width: 185px;
    height: 180px;
  }
  @media (max-width: 480px) {
    width: 150px;
    height: 100px;
  }
`;

const Label = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 82px;
  @media (max-width: 1024px) {
    margin-top: 0;
  }
  @media (max-width: 480px) {
    margin-top: 0;
  }
`;

const UploadButton: any = styled.button`
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
  gap: 10px;
  background: ${(props: any) => (props?.loading ? "#e3e3e3" : "#00a0e9")};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #ffffff;
  height: 48px;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  & hover: {
    text-decoration-line: underline;
  }
  @media (max-width: 1024px) {
    padding: 0px 20px;
    font-size: 17px;
    height: 26px;
    margin-bottom: 5px;
  }
  @media (max-width: 480px) {
    padding: 0px 12px;
    font-size: 12px;
    height: 22px;
    margin-bottom: 5px;
  }
`;

const DrapBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ButtonGroup = styled.div``;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalFooter = styled.p`
  text-align: center;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 2vw;
  color: #3c3b47;
  margin-top: 15px;
`;

export default UploadFile;
