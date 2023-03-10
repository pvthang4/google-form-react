import styled from "styled-components";

const HeaderAction = ({ formik, handleSubmit, toast }: any) => {
  return (
    <Header>
      <HeaderTabs>
        <Tab1 tabIndex={0}>質問</Tab1>
      </HeaderTabs>
      <HeaderButton>
        <SubmitButton
          onClick={async () => {
            handleSubmit();
            const errorList = await formik.validateForm();
            if (errorList?.requests) {
              toast.error(
                "記載内容に不備があります。必須項目を入力してください。",
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
          }}
        >
          <TextButtonSubmit>回答リンク作成</TextButtonSubmit>
        </SubmitButton>
      </HeaderButton>
    </Header>
  );
};

const Header = styled.div`
  position: fixed;
  top: 110px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 59px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70vw;
  border-bottom: 2px solid #c9cace;
  @media (max-width: 1024px) {
    width: 85vw;
  }
  @media (max-width: 768px) {
    top: 60px;
    width: 95vw;
  }
  @media (max-width: 480px) {
    top: 60px;
    height: 45px;
  }
`;

const HeaderTabs = styled.div`
  display: flex;
  text-align: center;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.0125em;
  color: #3c3b47;
  @media (max-width: 1024px) {
    font-size: 1.5vw;
  }
`;

const Tab1: any = styled.div`
  width: 98px;
  padding: 18px
  position: relative;
  &:after {
    position: absolute;
    content: "";
    height: 3px;
    background: ${(props: any) => (props?.tabIndex === 0 ? "#1e293b" : "none")};
    transition: background 0.3s ease-in-out;
    width: 98px;
    bottom: -2px;
    left: 0;
    @media (max-width: 480px) {
      width: 40px;
    }
  }
  @media (max-width: 480px) {
    width: 40px;
    padding: 0;
  }
`;

const HeaderButton = styled.div`
  display: flex;
`;

const SubmitButton: any = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 30px;
  gap: 10px;
  border: 0;
  background: ${(props: any) =>
    props?.disabled
      ? "#b9b7b7"
      : "linear-gradient(90deg, #22c1cb 0%, #22c1cb 38.28%, #22c1cb 100%)"};
  cursor: ${(props: any) => (props?.disabled ? "no-drop" : "pointer")};
  height: 40px;
  border-radius: 6px;
  @media (max-width: 480px) {
    padding: 0px 7px;
    height: 20px;
  }
`;

const TextButtonTempSave = styled.p`
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

const TextButtonSubmit = styled(TextButtonTempSave)``;

export default HeaderAction;
