
import { FieldType, SurveyField, Option, InputField, TextareaField, ChoiceField, DateField } from "@/types/survey";

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Create a new field based on type
export const createNewField = (type: FieldType): SurveyField => {
  const baseField = {
    id: generateId(),
    question: '',
    required: false,
  };

  switch (type) {
    case 'input':
      return {
        ...baseField,
        type: 'input',
        placeholder: '',
      } as InputField;
    case 'textarea':
      return {
        ...baseField,
        type: 'textarea',
        placeholder: '',
        rows: 3,
      } as TextareaField;
    case 'radio':
      return {
        ...baseField,
        type: 'radio',
        options: [
          { id: generateId(), label: 'Option 1' },
        ],
      } as ChoiceField;
    case 'checkbox':
      return {
        ...baseField,
        type: 'checkbox',
        options: [
          { id: generateId(), label: 'Option 1' },
        ],
      } as ChoiceField;
    case 'date':
      return {
        ...baseField,
        type: 'date',
      } as DateField;
    default:
      // This is a TypeScript guard to ensure all types are handled
      const _exhaustiveCheck: never = type;
      throw new Error(`Unhandled field type: ${type}`);
  }
};

// Create a new option for choice fields (radio, checkbox)
export const createNewOption = (label: string = 'New Option'): Option => {
  return {
    id: generateId(),
    label,
  };
};

// Move a field up in the survey
export const moveFieldUp = (fields: SurveyField[], fieldId: string): SurveyField[] => {
  const index = fields.findIndex(field => field.id === fieldId);
  if (index <= 0) return fields;
  
  const newFields = [...fields];
  const temp = newFields[index];
  newFields[index] = newFields[index - 1];
  newFields[index - 1] = temp;
  
  return newFields;
};

// Move a field down in the survey
export const moveFieldDown = (fields: SurveyField[], fieldId: string): SurveyField[] => {
  const index = fields.findIndex(field => field.id === fieldId);
  if (index < 0 || index >= fields.length - 1) return fields;
  
  const newFields = [...fields];
  const temp = newFields[index];
  newFields[index] = newFields[index + 1];
  newFields[index + 1] = temp;
  
  return newFields;
};
