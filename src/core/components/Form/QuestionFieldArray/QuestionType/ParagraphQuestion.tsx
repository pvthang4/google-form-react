import styled from "styled-components";

const ParagraphQuestion = () => {
  return <OptionInput>記述式テキスト（長文回答）</OptionInput>;
};
const OptionInput = styled.p`
  margin: 16px 0 0 0;
  padding: 0 0 8px 0;
  color: #807e93;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  border-bottom: 1px solid #828282;
  width: 50%;
  @media (max-width: 1024px) {
    font-size: 13px;
    margin: 10px 0 0 0;
    padding: 0 0 5px 0;
  }
  @media (max-width: 500px) {
    font-size: 10px;
    margin: 10px 0 0 0;
    padding: 0px 0 2px 0;
  }
  text-align: left;
`;

export default ParagraphQuestion;
