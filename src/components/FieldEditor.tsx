
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { SurveyField, ChoiceField, Option } from '@/types/survey';
import { useSurvey } from '@/context/SurveyContext';
import { createNewOption } from '@/utils/surveyUtils';
import { Plus, Trash, ArrowUp, ArrowDown } from 'lucide-react';

const FieldEditor: React.FC = () => {
  const { 
    survey, 
    selectedFieldId, 
    updateField, 
    deleteField, 
    moveUp, 
    moveDown 
  } = useSurvey();
  
  const selectedField = survey.fields.find(field => field.id === selectedFieldId);
  
  if (!selectedField) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Field Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select a field to edit its properties
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(selectedField.id, { question: e.target.value });
  };

  const handleRequiredChange = (checked: boolean) => {
    updateField(selectedField.id, { required: checked });
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedField.type === 'input' || selectedField.type === 'textarea') {
      updateField(selectedField.id, { placeholder: e.target.value });
    }
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedField.type === 'textarea') {
      const rows = parseInt(e.target.value) || 3;
      updateField(selectedField.id, { rows });
    }
  };

  const handleAddOption = () => {
    if (selectedField.type === 'radio' || selectedField.type === 'checkbox') {
      const field = selectedField as ChoiceField;
      const newOption = createNewOption(`Option ${field.options.length + 1}`);
      updateField(selectedField.id, {
        options: [...field.options, newOption]
      });
    }
  };

  const handleUpdateOption = (optionId: string, label: string) => {
    if (selectedField.type === 'radio' || selectedField.type === 'checkbox') {
      const field = selectedField as ChoiceField;
      const updatedOptions = field.options.map(option => 
        option.id === optionId ? { ...option, label } : option
      );
      updateField(selectedField.id, { options: updatedOptions });
    }
  };

  const handleDeleteOption = (optionId: string) => {
    if (selectedField.type === 'radio' || selectedField.type === 'checkbox') {
      const field = selectedField as ChoiceField;
      const updatedOptions = field.options.filter(option => option.id !== optionId);
      if (updatedOptions.length > 0) {
        updateField(selectedField.id, { options: updatedOptions });
      }
    }
  };

  const fieldIndex = survey.fields.findIndex(field => field.id === selectedField.id);
  const isFirst = fieldIndex === 0;
  const isLast = fieldIndex === survey.fields.length - 1;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Field Properties</CardTitle>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => moveUp(selectedField.id)}
            disabled={isFirst}
            className="h-8 w-8"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => moveDown(selectedField.id)}
            disabled={isLast}
            className="h-8 w-8"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="icon"
            onClick={() => deleteField(selectedField.id)}
            className="h-8 w-8"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            value={selectedField.question}
            onChange={handleQuestionChange}
            placeholder="Enter your question"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="required"
            checked={selectedField.required}
            onCheckedChange={handleRequiredChange}
          />
          <Label htmlFor="required">Required</Label>
        </div>
        
        {(selectedField.type === 'input' || selectedField.type === 'textarea') && (
          <div className="space-y-1">
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={selectedField.placeholder || ''}
              onChange={handlePlaceholderChange}
              placeholder="Enter placeholder text"
            />
          </div>
        )}
        
        {selectedField.type === 'textarea' && (
          <div className="space-y-1">
            <Label htmlFor="rows">Rows</Label>
            <Input
              id="rows"
              type="number"
              min="2"
              max="10"
              value={selectedField.rows || 3}
              onChange={handleRowsChange}
            />
          </div>
        )}
        
        {(selectedField.type === 'radio' || selectedField.type === 'checkbox') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Options</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddOption}
                className="h-8 px-2 flex items-center text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Option
              </Button>
            </div>
            
            <div className="space-y-2 mt-2">
              {(selectedField as ChoiceField).options.map((option: Option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Input
                    value={option.label}
                    onChange={(e) => handleUpdateOption(option.id, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteOption(option.id)}
                    disabled={(selectedField as ChoiceField).options.length <= 1}
                    className="h-8 w-8"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldEditor;
