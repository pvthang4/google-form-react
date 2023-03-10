import { useEffect, useRef } from "react";
import styled from "styled-components";
import { getValueFromFormikName } from "../../helpers/question.helper";
import { useWindowSize } from "../../hooks/useWindowSize";

const TextField = ({
  target,
  size,
  fontWeight,
  padding,
  height,
  value,
  placeholder,
  addNewOption = () => {},
  setIsFocused,
  name,
  handleChange,
  disabled,
  errors,
  touched,
  width,
  color,
}: any) => {
  const textareaRef: any = useRef(null);
  const windowSize = useWindowSize();

  const handleOnBlur = (event: any) => {
    event.target.value = event.target.value.trimLeft();
    event.target.value = event.target.value.trimRight();
    if (handleChange) handleChange(event);
    setIsFocused(false);
  };

  // Clear entry with Escape Key
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    // Tab Key Press (for option item) to add new option
    if (event.key === "Tab" && target === "label") {
      addNewOption(event.key);
    }
  };

  const errorsMessage = getValueFromFormikName(name, errors) || "";
  const touchedMessage = getValueFromFormikName(name, touched) || "";

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    if (textareaRef) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, size, windowSize]);

  return (
    <TextFieldWrap>
      <FormInputText
        ref={textareaRef}
        isError={errorsMessage && touchedMessage}
        size={size}
        fontWeight={fontWeight}
        padding={padding}
        height={height}
        value={value}
        placeholder={placeholder}
        onKeyDown={(e: any) => handleKeyDown(e)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e: any) => handleOnBlur(e)}
        name={name}
        width={width}
        color={color}
        disabled={disabled}
      />
      <TextMessage>
        {errorsMessage && touchedMessage ? errorsMessage : <div>&nbsp;</div>}
      </TextMessage>
      {/* {errorsMessage && touchedMessage && (
        <IconMdErrorOutline color="#f75454" size="20px" />
      )} */}
    </TextFieldWrap>
  );
};

const TextFieldWrap = styled.div`
  position: relative;
  width: 100%;
  text-align: left;
`;

const FormInputText: any = styled.textarea`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
  height: 56px;
  background: ${(props: any) => (props?.disabled ? "#e8e7e7" : "#ffffff")};
  overflow: hidden;
  resize: none;
  border: 1px solid ${(props: any) => (props?.isError ? "#f75454" : "#c9cace")};
  border-radius: 10px;
  width: ${(props: any) => (props?.width ? props?.width : "100%")};
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0025em;
  color: ${(props: any) =>
    props?.disabled ? "#807E93" : props?.color ? props?.color : "#3C3B47"};
  outline: none;
  @media (max-width: 1024px) {
    padding: 5px 6px;
    height: 40px;
    font-size: 14px;
  }
  @media (max-width: 480px) {
    padding: 5px;
    height: 30px;
    font-size: 10px;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #0000008a;
  }
  :-ms-input-placeholder {
    color: #0000008a;
  }
`;

const TextMessage = styled.p`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #f75454;
  @media (max-width: 1024px) {
    font-size: 11px;
    line-height: 21px;
  }
`;

// const IconMdErrorOutline = styled(MdErrorOutline)`
//   position: absolute;
//   top: 18px;
//   right: 10px;
//   @media (max-width: 1024px) {
//     top: 10px;
//   }
//   @media (max-width: 480px) {
//     top: 5px;
//     right: 5px;
//   }
// `;

export default TextField;
