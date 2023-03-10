import iconLogo from "../../../assets/Icons/Icon_surface.svg";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useIsOverflow } from "../../hooks/useIsOverflow";
import Tippy from "@tippyjs/react";

const Header = () => {
  const params: any = useParams();
  const refTitle: any = useRef();
  const refHeader: any = useRef();
  const isOverflowTitle = useIsOverflow(refTitle, () => {});
  const isOverflowHeader = useIsOverflow(refHeader, () => {});

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <IconLogo
          isNoDrop={params?.buildingId}
          type="image"
          src={iconLogo}
          alt={""}
        />
        <HeaderTitle>
          <Tippy
            content="無題のアンケート"
            disabled={!isOverflowTitle}
            placement="top"
            className="tool-tip-answer"
          >
            <TitleText ref={refTitle}>無題のアンケート</TitleText>
          </Tippy>
          <Tippy
            content="ラクビル東京ビル"
            disabled={!isOverflowHeader}
            placement="top"
            className="tool-tip-answer"
          >
            <DescriptionText ref={refHeader}></DescriptionText>
          </Tippy>
        </HeaderTitle>
      </HeaderLeft>
      <HeaderRight>
        <UserNameText></UserNameText>
      </HeaderRight>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  height: 96px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
  padding: 0 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1024px) {
    padding: 0 20px;
  }
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
`;

const IconLogo: any = styled.input`
  cursor: context-menu;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const HeaderRight = styled.div``;
const HeaderTitle = styled.div`
  margin-left: 20px;
  @media (max-width: 768px) {
    margin-left: 5px;
  }
`;
const TitleText = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.0025em;
  color: #3c3b47;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media (max-width: 1024px) {
    font-size: 2vw;
  }
  @media (max-width: 768px) {
  }
`;
const DescriptionText = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.0025em;
  color: #646673;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (max-width: 1024px) {
    font-size: 1.5vw;
  }
  @media (max-width: 768px) {
    line-height: 20px;
  }
`;
const UserNameText = styled.p`
  width: max-content;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.0015em;
  color: #000000;
  @media (max-width: 1024px) {
    font-size: 1.8vw;
  }
`;

export default Header;
