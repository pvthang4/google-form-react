import { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import SectionFieldArray from "./SectionFieldArray";
import Header from "../Common/Header";
import styled from "styled-components";
import { initalFormValue } from "./initalFormValue";
import { axiosHandler } from "../../services/httpClient";
import { FormService } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { finalValidationSchema } from "./validation";
import ModalSuccess from "./ModalSuccess";
import HeaderAction from "./HeaderAction";
import { useGoogleLogin } from "@react-oauth/google";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [formUri, setFormUri] = useState<boolean>(false);
  const [isSubmit] = useState<boolean>(false);
  const [isLogin, setLogin] = useState<boolean>(false);

  // handle submit form
  const handleSubmitForm = async (values: any) => {
    let formId: string;
    const info = values?.requests[0]?.createItem?.item;
    const removeKey = (dictionary: any) => {
      const data = dictionary?.map((item: any) => {
        delete item?.createItem?.item?.questionItem?.question["questionId"];
        delete item?.createItem?.item["itemId"];
        item.createItem.location = { index: 0 };
        if (
          item?.createItem?.item?.questionItem?.question?.hasOwnProperty(
            "choiceQuestion"
          )
        ) {
          item?.createItem?.item?.questionItem?.question?.choiceQuestion?.options?.map(
            (option: any) => {
              delete option["optionId"];
              if (option?.isOther) {
                delete option["value"];
              }
              return {
                ...option,
              };
            }
          );
        }
        return item;
      });
      return data;
    };

    const infoRequest = {
      info: {
        title: info?.title,
      },
    };
    const createItems = removeKey(values?.requests?.slice(1));

    const body = {
      requests: [
        {
          updateFormInfo: {
            info: {
              description: info?.description,
              title: info?.title,
            },
            updateMask: "*",
          },
        },
        ...createItems,
      ],
    };
    const { isSuccess, data } = await axiosHandler(() =>
      FormService.createItem(infoRequest)
    );
    formId = data?.formId;

    if (isSuccess) {
      const { successUpdate = isSuccess } = await axiosHandler(() =>
        FormService.updateItem(formId, body)
      );

      if (successUpdate) {
        const { successGetItem = isSuccess, data } = await axiosHandler(() =>
          FormService.getItem(formId)
        );
        if (successGetItem) {
          toast.success("提出しました。", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setFormUri(data?.responderUri);
          setIsOpen(true);
        }
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // handle copy link
  const handleCopy = (text: any) => {
    navigator.clipboard.writeText(text);
    toast.success("リンクのコピーに成功しました。", {
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

  // handle check login
  const handleCheckLogin = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  // handle login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("token", tokenResponse?.access_token);
      if (tokenResponse) {
        setLogin(true);
      }
    },
  });

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return (
    <MainWrapper>
      <Formik
        initialValues={initalFormValue}
        validationSchema={finalValidationSchema}
        onSubmit={handleSubmitForm}
        validateOnChange={true}
        validateOnBlur
        enableReinitialize
      >
        {(formik: any) => {
          const {
            values,
            errors,
            handleSubmit,
            setFieldValue,
            handleChange,
            touched,
          } = formik;

          return (
            <Fragment>
              <Header />
              {isLogin ? (
                <>
                  <HeaderAction
                    isSubmit={isSubmit}
                    formik={formik}
                    handleSubmit={handleSubmit}
                    toast={toast}
                  />
                  <SectionFieldArray
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    isSubmit={isSubmit}
                    errors={errors}
                    touched={touched}
                  />
                </>
              ) : (
                <Loggin>
                  <LoginButton onClick={() => login()}>
                    <TextLoginButton>Login</TextLoginButton>
                  </LoginButton>
                </Loggin>
              )}
            </Fragment>
          );
        }}
      </Formik>

      <ModalSuccess
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        formUri={formUri}
        handleCopy={handleCopy}
        navigate={navigate}
      />

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </MainWrapper>
  );
};

const MainWrapper = styled.div``;

const Loggin = styled.div`
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

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 30px;
  gap: 10px;
  border: 0;
  background: linear-gradient(90deg, #22c1cb 0%, #22c1cb 38.28%, #22c1cb 100%);
  cursor: pointer;
  height: 40px;
  border-radius: 6px;
  @media (max-width: 480px) {
    padding: 0px 7px;
    height: 20px;
  }
`;

const TextLoginButton = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.0125em;
  color: #ffffff;
  @media (max-width: 1024px) {
    font-size: 1.5vw;
  }
`;

export default Form;
