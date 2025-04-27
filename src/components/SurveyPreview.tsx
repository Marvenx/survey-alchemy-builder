
import React from 'react';
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

  const handleFieldClick = (fieldId: string) => {
    setSelectedFieldId(fieldId);
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
                  disabled
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  placeholder={field.placeholder || "Enter text"}
                  rows={field.rows || 3}
                  disabled
                />
              )}

              {field.type === 'radio' && (
                <RadioGroup disabled>
                  {field.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {field.type === 'checkbox' && (
                <div className="space-y-2">
                  {field.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox id={option.id} disabled />
                      <Label htmlFor={option.id}>{option.label}</Label>
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
                      disabled
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      className="p-3 pointer-events-auto"
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
