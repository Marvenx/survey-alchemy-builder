
import React from 'react';
import { SurveyProvider } from '@/context/SurveyContext';
import SurveyBuilder from '@/components/SurveyBuilder';

const Index: React.FC = () => {
  return (
    <SurveyProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SurveyBuilder />
      </div>
    </SurveyProvider>
  );
};

export default Index;
