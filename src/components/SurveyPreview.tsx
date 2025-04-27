
import React, { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

const SurveyPreview: React.FC = () => {
  const { survey, selectedFieldId, setSelectedFieldId } = useSurvey();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleFieldClick = (fieldId: string) => {
    setSelectedFieldId(fieldId);
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{survey.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto space-y-4">
        {survey.fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>Add fields to your survey using the sidebar</p>
          </div>
        ) : (
          survey.fields.map((field) => (
            <div
              key={field.id}
              className={cn(
                "p-4 border rounded-md cursor-pointer transition-all",
                selectedFieldId === field.id
                  ? "border-survey-purple bg-survey-light-purple"
                  : "border-border hover:border-survey-purple"
              )}
              onClick={() => handleFieldClick(field.id)}
            >
              <div className="mb-2">
                <Label className="text-base">
                  {field.question || "Untitled Question"}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              </div>

              {field.type === 'input' && (
                <Input
                  placeholder={field.placeholder || "Enter text"}
                  value={formValues[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  placeholder={field.placeholder || "Enter text"}
                  rows={field.rows || 3}
                  value={formValues[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {field.type === 'radio' && (
                <RadioGroup
                  value={formValues[field.id] || ''}
                  onValueChange={(value) => handleInputChange(field.id, value)}
                >
                  {field.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`${field.id}-${option.id}`} />
                      <Label htmlFor={`${field.id}-${option.id}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {field.type === 'checkbox' && (
                <div className="space-y-2">
                  {field.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${field.id}-${option.id}`} 
                        checked={(formValues[field.id] || []).includes(option.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = formValues[field.id] || [];
                          const newValues = checked 
                            ? [...currentValues, option.id]
                            : currentValues.filter((id: string) => id !== option.id);
                          handleInputChange(field.id, newValues);
                        }}
                      />
                      <Label htmlFor={`${field.id}-${option.id}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === 'date' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>
                        {formValues[field.id] 
                          ? format(new Date(formValues[field.id]), 'PPP') 
                          : "Pick a date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formValues[field.id] ? new Date(formValues[field.id]) : undefined}
                      onSelect={(date) => handleInputChange(field.id, date)}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default SurveyPreview;
