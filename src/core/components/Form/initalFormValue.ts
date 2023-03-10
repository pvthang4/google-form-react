import __uniqueId from "lodash/uniqueId";
import { ChoiceType } from "../../enums";

export const initalFormValue = {
  //sections
  requests: [
    {
      createItem: {
        // section
        item: {
          itemId: __uniqueId("sectionId-"),
          pageBreakItem: {},
          title: "",
          description: "",
        },
      },
    },
    {
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
                    isOther: false,
                  },
                ],
                shuffle: false,
              },
            },
          },
        },
      },
    },
  ],
};

export const valuesChart = {
  info: {
    form_id: "21312312312312",
    title: "ラクビル東京ビル　利用状況に係るアンケート",
    form_tile: "Form title",
    total_response: 10,
  },
  sections: [
    {
      title: "Section 1",
      questions: [
        {
          type: ChoiceType.RADIO,
          title: "あなたの性別を教えてください。",
          total_response: 5,
          answers: [
            {
              value: "1998",
              total: 10,
              color: "#D61355",
            },
            {
              value: "1999",
              total: 20,
              color: "#F94A29",
            },
            {
              value: "2000",
              total: 30,
              color: "#FCE22A",
            },
            {
              value: "2001",
              total: 20,
              color: "#30E3DF",
            },
            {
              value: "2002",
              total: 10,
              color: "#151D3B",
            },
          ],
        },
        {
          type: ChoiceType.CHECKBOX,
          title: "あなたの性別を教えてください。2",
          total_response: 4,
          answers: [
            {
              value: "1998",
              total: 10,
            },
            {
              value: "1999",
              total: 22,
            },
            {
              value: "2000",
              total: 30,
            },
            {
              value: "2000",
              total: 25,
            },
          ],
        },
        {
          type: ChoiceType.DROP_DOWN,
          title: "あなたの性別を教えてください。3",
          total_response: 2,
          answers: [
            {
              value: "1998",
              total: 10,
              color: "#88E0EF",
            },
            {
              value: "1999",
              total: 20,
              color: "#6A0572",
            },
          ],
        },
        {
          type: ChoiceType.SHORT_ANSWER,
          title: "Question title 4",
          total_response: 3,
          answers: [
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
          ],
        },
        {
          type: ChoiceType.PARAGRAPH,
          title: "Question title 5",
          total_response: 2,
          answers: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "when an unknown printer took a galley of type and scrambled",
          ],
        },
      ],
    },
  ],
};
