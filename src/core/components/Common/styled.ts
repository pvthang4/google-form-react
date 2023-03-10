import { MdArrowDropDown } from "react-icons/md";
import styled from "styled-components";

const DropdownWrapper: any = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  gap: 12px;
  width: 100%;
  height: 56px;
  background: ${(props: any) => (props?.disabled ? "#e8e7e7" : "#ffffff")};
  border: 1px solid #c9cace;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  width: 95%;
  position: relative;
  @media (max-width: 1024px) {
    height: 34px;
    padding: 5px 6px;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  z-index: 10;
  top: 55px;
  left: 0;
  width: 100%;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  & > div {
    padding: 8px 8px 8px 20px;
    @media (max-width: 1024px) {
      padding: 8px;
    }
  }
  @media (max-width: 1024px) {
    top: 40px;
  }
  @media (max-width: 480px) {
    top: 30px;
  }
`;

const DropdownListItem: any = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  background-color: ${(props: any) => {
    if (props.isListOpen) {
      return props.isSelected ? "rgba(26,115,232,0.078)" : "white";
    } else {
      return "white";
    }
  }};
  &:hover {
    background-color: ${(props: any) => {
      if (props.isListOpen) {
        return props.isSelected ? "rgba(26,115,232,0.039)" : "#eeeeee";
      } else {
        return "white";
      }
    }};
  }
`;

const DropdownListItemContent: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  color: #807e93;
  background: ${(props: any) => (props?.disabled ? "#e8e7e7" : "")};
  & > span {
    margin-left: 10px;
    @media (max-width: 480px) {
      margin-left: 5px;
    }
  }
  @media (max-width: 1024px) {
    height: 32px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
    height: 28px;
  }
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    background: transparent;
  }
`;

const LabelStyled = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  @media (max-width: 1024px) {
    width: 24px;
    height: 15px;
  }
`;

const InputStyled = styled.input`
  display: none;
`;

const MdArrowDropDownStyle = styled(MdArrowDropDown)`
  position: absolute;
  right: 10px;
`;

const SliderStyled: any = styled.div`
  position: absolute;
  cursor: ${(props: any) => (props?.disabled ? "no-drop" : "pointer")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  width: 48px;
  height: 24px;
  border-radius: 100px;
  border: 1px solid #646673;
  border-radius: 100px;
  &:before {
    position: absolute;
    content: "";
    width: 16px;
    height: 16px;
    background: ${(props: any) => (props?.checked ? "#FFFFFF" : "#646673")};
    cursor: ${(props: any) => (props?.disabled ? "no-drop" : "pointer")};
    left: ${(props: any) => (props?.checked ? "3px" : "3px")};
    bottom: ${(props: any) => (props?.checked ? "3px" : "3px")};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    @media (max-width: 1024px) {
      width: 11px;
      height: 11px;
      left: 1px;
      bottom: 1px;
    }
    @media (max-width: 480px) {
    }
  }
  @media (max-width: 1024px) {
    width: 25px;
    height: 15px;
  }
  ${InputStyled}:focus+& {
    box-shadow: 0 0 1px #0080c1;
  }
  ${InputStyled}:checked+&:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
    @media (max-width: 1024px) {
      -webkit-transform: translateX(10px);
      -ms-transform: translateX(10px);
      transform: translateX(10px);
    }
  }
  ${InputStyled}:checked+& {
    border: 1px solid #22c1cb;
    background: linear-gradient(
      90deg,
      #22c1cb 0%,
      #22c1cb 38.28%,
      #22c1cb 100%
    );
  }
`;

export {
  DropdownWrapper,
  DropdownList,
  DropdownListItem,
  DropdownListItemContent,
  LabelStyled,
  InputStyled,
  SliderStyled,
  MdArrowDropDownStyle,
};
