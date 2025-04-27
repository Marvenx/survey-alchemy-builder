
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from 'lucide-react';
import { useSurvey } from '@/context/SurveyContext';
import FieldTypeSelector from './FieldTypeSelector';
import FieldEditor from './FieldEditor';
import SurveyPreview from './SurveyPreview';
import JsonViewer from './JsonViewer';

const SurveyBuilder: React.FC = () => {
  const { survey, clearFields } = useSurvey();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // We'd need to add this to our context if we want to edit the title
    // For now, this is just a placeholder
  };

  return (
    <div className="container mx-auto py-6 lg:px-8">
      <div className="flex flex-col space-y-6">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-survey-purple">
              Survey Alchemy Builder
            </CardTitle>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Survey</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to clear all fields? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearFields}>
                    Yes, clear all
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardHeader>
          <CardContent>
            <Input
              className="text-xl font-medium"
              value={survey.title}
              onChange={handleTitleChange}
              placeholder="Survey Title"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Field Types and Editor */}
          <div className="lg:col-span-3 space-y-6">
            <FieldTypeSelector />
            <FieldEditor />
          </div>

          {/* Middle Column - Survey Preview */}
          <div className="lg:col-span-5">
            <SurveyPreview />
          </div>

          {/* Right Column - JSON Viewer */}
          <div className="lg:col-span-4">
            <JsonViewer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;
