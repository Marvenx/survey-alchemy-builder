
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldType } from '@/types/survey';
import { createNewField } from '@/utils/surveyUtils';
import { useSurvey } from '@/context/SurveyContext';
import { Type, AlignLeft, CircleDot, CheckSquare, Calendar } from 'lucide-react';

interface FieldTypeOption {
  type: FieldType;
  label: string;
  icon: React.ElementType;
}

const fieldTypes: FieldTypeOption[] = [
  { type: 'input', label: 'Text Input', icon: Type },
  { type: 'textarea', label: 'Text Area', icon: AlignLeft },
  { type: 'radio', label: 'Radio Buttons', icon: CircleDot },
  { type: 'checkbox', label: 'Checkboxes', icon: CheckSquare },
  { type: 'date', label: 'Date Picker', icon: Calendar },
];

const FieldTypeSelector: React.FC = () => {
  const { addField } = useSurvey();

  const handleAddField = (type: FieldType) => {
    const newField = createNewField(type);
    addField(newField);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Add Field</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {fieldTypes.map((fieldType) => (
          <Button
            key={fieldType.type}
            variant="outline"
            className="justify-start h-auto py-3 px-3 flex items-center"
            onClick={() => handleAddField(fieldType.type)}
          >
            <fieldType.icon className="mr-2 h-4 w-4" />
            <span>{fieldType.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default FieldTypeSelector;
