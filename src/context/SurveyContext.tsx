
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Survey, SurveyField } from '@/types/survey';
import { moveFieldDown, moveFieldUp } from '@/utils/surveyUtils';
import { toast } from "sonner";

interface SurveyContextType {
  survey: Survey;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
  addField: (field: SurveyField) => void;
  updateField: (fieldId: string, updatedField: Partial<SurveyField>) => void;
  deleteField: (fieldId: string) => void;
  clearFields: () => void;
  moveUp: (fieldId: string) => void;
  moveDown: (fieldId: string) => void;
  updateSurveyFromJson: (jsonString: string) => void;
}

const SurveyContext = createContext<SurveyContextType | null>(null);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [survey, setSurvey] = useState<Survey>({
    title: 'My Survey',
    fields: [],
  });
  
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const addField = (field: SurveyField) => {
    setSurvey(prev => ({
      ...prev,
      fields: [...prev.fields, field],
    }));
    setSelectedFieldId(field.id);
  };

  const updateField = (fieldId: string, updatedField: Partial<SurveyField>) => {
    setSurvey(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updatedField } : field
      ) as SurveyField[],
    }));
  };

  const deleteField = (fieldId: string) => {
    setSurvey(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
    }));
    
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
    
    toast.success("Field deleted successfully");
  };

  const clearFields = () => {
    setSurvey(prev => ({
      ...prev,
      fields: [],
    }));
    setSelectedFieldId(null);
    toast.success("All fields cleared");
  };

  const moveUp = (fieldId: string) => {
    setSurvey(prev => ({
      ...prev,
      fields: moveFieldUp(prev.fields, fieldId),
    }));
  };

  const moveDown = (fieldId: string) => {
    setSurvey(prev => ({
      ...prev,
      fields: moveFieldDown(prev.fields, fieldId),
    }));
  };

  const updateSurveyFromJson = (jsonString: string) => {
    try {
      const parsedSurvey = JSON.parse(jsonString);
      
      // Basic validation to ensure the imported JSON has the right structure
      if (
        typeof parsedSurvey === 'object' &&
        parsedSurvey !== null &&
        Array.isArray(parsedSurvey.fields)
      ) {
        setSurvey(parsedSurvey as Survey);
        setSelectedFieldId(null);
        toast.success("Survey imported successfully");
      } else {
        toast.error("Invalid survey JSON structure");
      }
    } catch (error) {
      toast.error("Failed to parse JSON. Please check the format.");
    }
  };

  const value = {
    survey,
    selectedFieldId,
    setSelectedFieldId,
    addField,
    updateField,
    deleteField,
    clearFields,
    moveUp,
    moveDown,
    updateSurveyFromJson,
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
};
