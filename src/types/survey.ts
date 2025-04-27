
export type FieldType = 'input' | 'textarea' | 'radio' | 'checkbox' | 'date';

export interface Option {
  id: string;
  label: string;
}

export interface BaseField {
  id: string;
  type: FieldType;
  question: string;
  required: boolean;
}

export interface InputField extends BaseField {
  type: 'input';
  placeholder?: string;
}

export interface TextareaField extends BaseField {
  type: 'textarea';
  placeholder?: string;
  rows?: number;
}

export interface ChoiceField extends BaseField {
  type: 'radio' | 'checkbox';
  options: Option[];
}

export interface DateField extends BaseField {
  type: 'date';
}

export type SurveyField = InputField | TextareaField | ChoiceField | DateField;

export interface Survey {
  title: string;
  fields: SurveyField[];
}
