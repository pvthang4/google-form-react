export interface Question {
  id?: string;
  question__title?: string;
  question__type?: string;
  options?: Option[];
  short__question?: string;
  paragraph?: string;
}
export interface Option {
  id?: string;
  option?: string;
}
export interface TypeObject {
  label?: any;
  type: string | number | boolean;
}
