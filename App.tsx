import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ExamPreview from './components/ExamPreview';
import { generateExamHtml } from './services/geminiService';
import { AppStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setStatus(AppStatus.PROCESSING);
    setErrorMessage(null);

    try {
      const generatedHtml = await generateExamHtml(file);
      setHtmlContent(generatedHtml);
      setStatus(AppStatus.SUCCESS);
    } catch (error: any) {
      setStatus(AppStatus.ERROR);
      setErrorMessage(error.message || "حدث خطأ غير متوقع أثناء المعالجة.");
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setHtmlContent('');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-tajawal text-right flex flex-col" dir="rtl">
      <Header />

      <main className="flex-grow flex flex-col">
        {status === AppStatus.IDLE || status === AppStatus.PROCESSING || status === AppStatus.ERROR ? (
          <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
            
            <div className="text-center mb-8 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-[#365d32] mb-4">
                تحويل الأسئلة إلى نماذج امتحانية احترافية
              </h1>
              <p className="text-lg text-gray-600">
                قم برفع صورة للأسئلة المكتوبة بخط اليد أو المطبوعة، وسيقوم النظام بتنسيقها
                تلقائياً وفق المعايير السورية الرسمية.
              </p>
            </div>

            <FileUpload 
              onFileSelect={handleFileSelect} 
              isLoading={status === AppStatus.PROCESSING} 
            />

            {status === AppStatus.ERROR && (
              <div className="mt-8 p-6 bg-red-50 border-r-4 border-red-500 rounded-lg shadow-sm max-w-2xl w-full">
                <h3 className="text-red-800 font-bold text-lg mb-2">عذراً، حدث خطأ</h3>
                <p className="text-red-700">{errorMessage}</p>
                <button 
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm font-semibold"
                >
                  حاول مرة أخرى
                </button>
              </div>
            )}
            
            <footer className="mt-auto py-8 text-center text-gray-400 text-sm">
              <p>&copy; 2025 مدرسة ألف التعليمية - نظام التنسيق الذكي</p>
            </footer>
          </div>
        ) : (
          <ExamPreview 
            htmlContent={htmlContent} 
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
};

export default App;