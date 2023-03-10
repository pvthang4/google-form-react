import { Fragment, useEffect, useRef, useState } from "react";
import {
  MdShortText,
  MdSubject,
  MdRadioButtonChecked,
  MdCheckBox,
  MdArrowDropDownCircle,
} from "react-icons/md";
import {
  QUESTION_TYPE_LIST,
  QUESTION_TYPE_LIST_INIT,
} from "../../constants/data";
import { ChoiceType } from "../../enums";
import { handleType } from "../../helpers/question.helper";
import { useWindowSize } from "../../hooks/useWindowSize";
import {
  DropdownList,
  DropdownListItem,
  DropdownListItemContent,
  DropdownWrapper,
  MdArrowDropDownStyle,
} from "./styled";

const QuestionTypeDropdown = ({
  questionType = ChoiceType.RADIO,
  values = {},
  setFieldValue,
  sectionIndex = 0,
  isSubmit,
}: any) => {
  const refDropdown: any = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [typeActive, setTypeActive] = useState<string>(questionType);

  const [questionTypeList, setQuestionTypeList] = useState<any>(
    QUESTION_TYPE_LIST_INIT
  );

  const size = useWindowSize();

  const handleOnClickItem = (val: any) => {
    const newQuestionTypeList = QUESTION_TYPE_LIST.filter(
      (item: any) => item.type !== val
    );
    setQuestionTypeList(newQuestionTypeList);

    setIsDropdownOpen(false);
    setTypeActive(val);
    const e = {
      target: {
        value: val,
      },
    };
    handleType(e, values, setFieldValue, sectionIndex);
  };

  const getTypeLabel = (type: any) => {
    const questionFilter = QUESTION_TYPE_LIST?.filter(
      (item: any) => item.type === type
    );

    return questionFilter[0]?.label;
  };

  const selectedTypeIcon = (type: any) => {
    switch (type) {
      case ChoiceType.SHORT_ANSWER:
        return (
          <MdShortText
            size={size?.width < 780 ? "20px" : "35px"}
            color="#807E93"
          />
        );
      case ChoiceType.PARAGRAPH:
        return (
          <MdSubject
            size={size?.width < 780 ? "20px" : "35px"}
            color="#807E93"
          />
        );
      case ChoiceType.RADIO:
        return (
          <MdRadioButtonChecked
            size={size?.width < 780 ? "20px" : "35px"}
            color="#807E93"
          />
        );
      case ChoiceType.CHECKBOX:
        return (
          <MdCheckBox
            size={size?.width < 780 ? "20px" : "35px"}
            color="#807E93"
          />
        );
      case ChoiceType.DROP_DOWN:
        return (
          <MdArrowDropDownCircle
            size={size?.width < 780 ? "20px" : "35px"}
            color="#807E93"
          />
        );
      default:
        return;
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        isDropdownOpen &&
        refDropdown?.current &&
        !refDropdown?.current.contains(e?.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  return (
    <DropdownWrapper ref={refDropdown} disabled={isSubmit}>
      {/* Selected Question Type */}
      <DropdownListItem
        onClick={() => {
          if (isSubmit) return;
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <DropdownListItemContent disabled={isSubmit}>
          {selectedTypeIcon(typeActive)}
          <span>{getTypeLabel(typeActive)}</span>
        </DropdownListItemContent>
        <MdArrowDropDownStyle
          size={size?.width < 780 ? "20px" : "35px"}
          color="#807E93"
        />
      </DropdownListItem>

      {/* Question Type Dropdown List */}
      {isDropdownOpen && (
        <DropdownList>
          {questionTypeList?.map(({ type, label }: any, index: number) => {
            if (index === 2) {
              return (
                <Fragment key={index}>
                  <DropdownListItem
                    isListOpen={isDropdownOpen}
                    isSelected={typeActive === type}
                    onClick={() => handleOnClickItem(type)}
                  >
                    <DropdownListItemContent>
                      {selectedTypeIcon(type)}
                      <span>{label}</span>
                    </DropdownListItemContent>
                  </DropdownListItem>
                </Fragment>
              );
            } else {
              return (
                <DropdownListItem
                  key={index}
                  isListOpen={isDropdownOpen}
                  isSelected={typeActive === type}
                  onClick={() => handleOnClickItem(type)}
                >
                  <DropdownListItemContent>
                    {selectedTypeIcon(type)}
                    <span>{label}</span>
                  </DropdownListItemContent>
                </DropdownListItem>
              );
            }
          })}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default QuestionTypeDropdown;
