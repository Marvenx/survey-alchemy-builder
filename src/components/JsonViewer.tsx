
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSurvey } from '@/context/SurveyContext';
import { toast } from "sonner";

const JsonViewer: React.FC = () => {
  const { survey, updateSurveyFromJson } = useSurvey();
  const [jsonString, setJsonString] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setJsonString(JSON.stringify(survey, null, 2));
  }, [survey]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setJsonString(JSON.stringify(survey, null, 2));
    setIsEditing(false);
  };

  const handleApply = () => {
    try {
      // Try to parse the JSON to validate it
      JSON.parse(jsonString);
      updateSurveyFromJson(jsonString);
      setIsEditing(false);
    } catch (error) {
      toast.error("Invalid JSON. Please check the format.");
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    toast.success("JSON copied to clipboard");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-medium">JSON Code</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <Textarea
          value={jsonString}
          onChange={handleJsonChange}
          readOnly={!isEditing}
          className="font-mono text-sm h-full min-h-[500px] resize-none rounded-none p-4"
        />
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Changes
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={handleEdit}>
              Edit JSON
            </Button>
            <Button onClick={handleCopy}>
              Copy JSON
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default JsonViewer;
