import * as yup from "yup";

// validation schema options
export const optionsValidationSchema = () =>
  yup.object().shape({
    question: yup.object().shape({
      choiceQuestion: yup.object().shape({
        options: yup.array().of(
          yup
            .object({ value: yup.string() })
            .test(
              "unique",
              "同一選択肢を利用することはできません",
              function validateUnique(currentOption) {
                const otherOption = this.parent.filter(
                  (item: any) => item !== currentOption
                );

                const isDuplicate = otherOption.some(
                  (item: any) => item.value === currentOption.value
                );

                return isDuplicate
                  ? this.createError({ path: `${this.path}.value` })
                  : true;
              }
            )
            .shape({
              value: yup.string().trim().required("ご入力をお願いします"),
            })
        ),
      }),
    }),
  });
// validation schema sections
export const sectionsValidationSchema = () =>
  yup.array().of(
    yup.object().shape({
      createItem: yup.object().shape({
        item: yup.object().shape({
          pageBreakItem: yup.object(),
          title: yup.string().trim().required("ご入力をお願いします"),
          description: yup
            .string()
            .when("pageBreakItem", (pageBreakItem: any, _schema: any) => {
              return pageBreakItem[0]
                ? yup.string().trim().required("ご入力をお願いします")
                : yup.string().nullable();
            }),
          questionItem: yup
            .object()
            .when(["pageBreakItem"], (pageBreakItem: any, _schema: any) => {
              return pageBreakItem
                ? optionsValidationSchema()
                : yup.object().nullable();
            }),
        }),
      }),
    })
  );
// validation schema form create
export const finalValidationSchema = (t: any) =>
  yup.object().shape({ requests: sectionsValidationSchema() });
