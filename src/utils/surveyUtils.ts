
import { FieldType, SurveyField, Option } from "@/types/survey";

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Create a new field based on type
export const createNewField = (type: FieldType): SurveyField => {
  const baseField = {
    id: generateId(),
    type,
    question: '',
    required: false,
  };

  switch (type) {
    case 'input':
      return {
        ...baseField,
        type,
        placeholder: '',
      };
    case 'textarea':
      return {
        ...baseField,
        type,
        placeholder: '',
        rows: 3,
      };
    case 'radio':
    case 'checkbox':
      return {
        ...baseField,
        type,
        options: [
          { id: generateId(), label: 'Option 1' },
        ],
      };
    case 'date':
      return {
        ...baseField,
        type,
      };
    default:
      return baseField as SurveyField;
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
