import React, { useRef } from 'react';
import { Printer, RefreshCw, ArrowRight, Download } from 'lucide-react';

interface ExamPreviewProps {
  htmlContent: string;
  onReset: () => void;
}

const ExamPreview: React.FC<ExamPreviewProps> = ({ htmlContent, onReset }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col h-screen max-h-[90vh]">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-[#365d32] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            نموذج جديد
          </button>
          <span className="h-6 w-px bg-gray-300"></span>
          <h2 className="text-lg font-bold text-[#365d32]">معاينة النموذج</h2>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-[#ddac80] hover:text-[#c49266] transition-colors"
            title="إعادة المحاولة"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2 bg-[#365d32] hover:bg-[#2b4a28] text-white rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 font-bold"
          >
            <Download className="w-5 h-5" />
            تحميل كـ PDF
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-grow bg-gray-600 rounded-lg p-4 md:p-8 overflow-hidden flex justify-center shadow-inner relative">
         <div className="absolute top-2 text-white/50 text-xs">معاينة A4</div>
        <div className="bg-white shadow-2xl w-full h-full max-w-[210mm] aspect-[210/297] overflow-hidden rounded-sm">
           <iframe
            ref={iframeRef}
            srcDoc={htmlContent}
            title="Exam Preview"
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-modals"
           />
        </div>
      </div>
    </div>
  );
};

export default ExamPreview;