import __uniqueId from "lodash/uniqueId";
import { ChoiceType } from "../enums";
import { FormService } from "../services";
import { axiosHandler } from "../services/httpClient";

//handle add section
export const handleAddSection = (values: any, arrayHelpers: any) => {
  arrayHelpers.insert(values?.requests?.length, {
    createItem: {
      item: {
        pageBreakItem: {},
        description: "",
        title: "",
      },
    },
  });
};

// handle add question
export const handleAddQuestion = (
  sectionArrayHelpers: any,
  requestsLength: any,
  questionEndRef: any
) => {
  sectionArrayHelpers.insert(requestsLength + 1, {
    createItem: {
      // section
      item: {
        itemId: __uniqueId("sectionId-"),
        title: "",
        questionItem: {
          // question
          question: {
            questionId: __uniqueId("questionId-"),
            required: false,
            choiceQuestion: {
              type: ChoiceType.RADIO,
              options: [
                {
                  optionId: __uniqueId("optionId-"),
                  value: "",
                },
              ],
              shuffle: false,
            },
          },
        },
      },
    },
  });
  const questionTimeoutId = setTimeout(
    () =>
      questionEndRef.current?.scrollIntoView({
        behavior: "smooth",
      }),
    1000
  );
  return () => {
    clearTimeout(questionTimeoutId);
  };
};

// handle remove section handleRemoveSection
export const handleRemoveSection = (
  sectionArrayHelpers: any,
  sectionIndex: number
) => {
  if (sectionIndex === 0) return;
  sectionArrayHelpers.remove(sectionIndex);
};

// handle change question type
export const handleType = (
  e: any,
  values: any,
  setFieldValue: any,
  sectionIndex: number
) => {
  const questionFormikName = `requests.${sectionIndex}.createItem.item.questionItem.question`;
  const questionFormikValue = getValueFromFormikName(
    questionFormikName,
    values
  );
  if (e.target.value === ChoiceType.SHORT_ANSWER) {
    const newData = {
      questionId: questionFormikValue.questionId,
      required: questionFormikValue.required,
      textQuestion: { paragraph: false },
    };
    setFieldValue(questionFormikName, newData);
  } else if (e.target.value === ChoiceType.PARAGRAPH) {
    const newData = {
      questionId: questionFormikValue.questionId,
      required: questionFormikValue.required,
      textQuestion: { paragraph: true },
    };
    setFieldValue(questionFormikName, newData);
  } else {
    const newData = {
      questionId: questionFormikValue.questionId,
      required: questionFormikValue.required,
      choiceQuestion: {
        type: e.target.value,
        options: [
          {
            optionId: __uniqueId("optionId-"),
            value: "",
            isOther: false,
          },
        ],
        shuffle: false,
      },
    };
    setFieldValue(questionFormikName, newData);
  }
};

// handle add option for question
export const handleAddOption = (
  sectionIndex: number,
  values: any,
  setFieldValue: any
) => {
  const optionsFormikName = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options`;
  const optionsFormikValue = getValueFromFormikName(optionsFormikName, values);

  const newData = [
    ...optionsFormikValue,
    {
      optionId: __uniqueId("optionId-"),
      value: "",
      isOther: false,
    },
  ];
  setFieldValue(optionsFormikName, newData);
};

// handle add other option for question
export const handleAddOtherOption = (
  sectionIndex: number,
  values: any,
  setFieldValue: any,
  questionArrayHelpers: any
) => {
  const optionsFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options`;
  const optionsFormikValue =
    getValueFromFormikName(optionsFormikName, values) || [];

  const newData = [
    ...optionsFormikValue,
    {
      optionId: __uniqueId("optionId-"),
      value: "その他",
      isOther: true,
    },
  ];
  setFieldValue(optionsFormikName, newData);
};

// handle remove option of question
export const handleRemoveOption = (
  optionArrayHelpers: any,
  optionIndex: number
) => {
  optionArrayHelpers.remove(optionIndex);
};

// handle remove other option of question
export const handleRemoveOtherOption = (
  sectionIndex: number,
  values: any,
  setFieldValue: any,
  questionArrayHelpers: any
) => {
  const optionsFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options`;
  const optionsFormikValue =
    getValueFromFormikName(optionsFormikName, values) || [];

  const newData = optionsFormikValue?.filter(
    (item: any) => item?.isOther === false
  );
  setFieldValue(optionsFormikName, newData);
};

// handle swap question
export const handleSwapQuestion = (
  questions: any[],
  questionArrayHelpers: any,
  questionIndex: number
) => {
  if (questions?.length === 1) return;
  questionArrayHelpers.swap(questionIndex, questionIndex + 1);
};
// handle copy question
export const handleCopyQuestion = (
  section: any,
  sectionArrayHelpers: any,
  sectionIndex: number,
  questionType: any,
  isTextFormikValue: boolean
) => {
  const newOptions = (options: any) => {
    const optionsList = options.map((item: any) => ({
      ...item,
      optionId: __uniqueId("optionId-"),
    }));
    return optionsList;
  };

  if (
    questionType === ChoiceType.CHECKBOX ||
    questionType === ChoiceType.DROP_DOWN ||
    questionType === ChoiceType.RADIO
  ) {
    const newQuestion: any = {
      createItem: {
        item: {
          itemId: __uniqueId("sectionId-"),
          title: section.createItem.item.title,
          questionItem: {
            ...section.createItem.item.questionItem,
            question: {
              questionId: __uniqueId("questionId-"),
              required: section.createItem.item.questionItem.question.required,
              choiceQuestion: {
                type: section.createItem.item.questionItem.question
                  .choiceQuestion.type,
                options: newOptions(
                  section.createItem.item.questionItem.question.choiceQuestion
                    .options
                ),
                shuffle:
                  section.createItem.item.questionItem.question.choiceQuestion
                    .shuffle,
              },
            },
            // image: section.createItem.item.questionItem.image,
          },
        },
      },
    };
    sectionArrayHelpers.insert(sectionIndex + 1, newQuestion);
  } else {
    if (isTextFormikValue) {
      const newQuestion: any = {
        createItem: {
          item: {
            itemId: __uniqueId("sectionId-"),
            title: section.createItem.item.title,
            questionItem: {
              ...section.createItem.item.questionItem,
              question: {
                questionId: __uniqueId("questionId-"),
                required:
                  section.createItem.item.questionItem.question.required,
                textQuestion: {
                  paragraph: isTextFormikValue,
                },
              },
              // image: section.createItem.item.questionItem.image,
            },
          },
        },
      };
      sectionArrayHelpers.insert(sectionIndex + 1, newQuestion);
    } else {
      const newQuestion: any = {
        createItem: {
          item: {
            itemId: __uniqueId("sectionId-"),
            title: section.createItem.item.title,
            questionItem: {
              ...section.createItem.item.questionItem,
              question: {
                questionId: __uniqueId("questionId-"),
                required:
                  section.createItem.item.questionItem.question.required,
                textQuestion: {
                  paragraph: isTextFormikValue,
                },
              },
              // image: section.createItem.item.questionItem.image,
            },
          },
        },
      };
      sectionArrayHelpers.insert(sectionIndex + 1, newQuestion);
    }
  }
};

// handle remove question
export const handleRemoveQuestion = (
  sectionIndex: number,
  sectionArrayHelpers: any
) => {
  sectionArrayHelpers.remove(sectionIndex);
};

// handle drap and drop question
export const handleOnDragEnd = (
  result: any,
  values: any,
  sectionArrayHelpers: any,
  setFieldValue: any
) => {
  // // index start, index end
  const sourceIndex: number = result.source.index;
  const destIndex: number = result.destination.index;

  if (!result.destination || destIndex === 0) return;
  // get field name of sections, get value with field name
  const sectionsFormikName: string = "requests";
  const sectionsFormikValue =
    getValueFromFormikName(sectionsFormikName, values) || [];

  const items = Array.from(sectionsFormikValue);
  // to
  const [reorderedItem] = items.splice(sourceIndex, 1);
  // from
  items.splice(destIndex, 0, reorderedItem);
  setFieldValue(sectionsFormikName, items);
};

// handle drap and drop option of question
export const handleOnDragOptionEnd = (
  result: any,
  questionArrayHelpers: any,
  questionIndex: number,
  values: any,
  setFieldValue: any,
  sectionIndex?: number
) => {
  if (!result.destination) return;
  // get field name of options, get value with field name
  const optionsFormikName: string = `requests.${sectionIndex}.createItem.item.questionItem.question.choiceQuestion.options`;

  const optionsFormikValue =
    getValueFromFormikName(optionsFormikName, values) || [];

  // index start, index end
  const sourceIndex: number = result.source.index;
  const destIndex: number = result.destination.index;

  const items = Array.from(optionsFormikValue);
  // to
  const [reorderedItem] = items.splice(sourceIndex, 1);
  // from
  items.splice(destIndex, 0, reorderedItem);

  setFieldValue(optionsFormikName, items);
};
export const getValueFromFormikName = (path: string, obj?: any) => {
  return path.split(".").reduce((previous: any, current: any) => {
    return previous ? previous[current] : null;
    // eslint-disable-next-line no-restricted-globals
  }, obj || self);
};

// handle sort isOther from flase to true
export const handleSortOptions = (options: any) => {
  return options?.sort((a: any, b: any) => a.isOther - b.isOther);
};

// handle down load file
export const handleDownloadFile = (url: any) => {
  return window.open(url, "_blank");
};

// handle get set up link
export const handleGetSetUpLink = async () => {
  const { isSuccess, data } = await axiosHandler(() =>
    FormService.getLinkSetUpFileConfig()
  );
  if (isSuccess) {
    window.open(data?.data?.authorization_url, "_blank", "noreferrer");
  }
};
