import React, { useCallback, useState } from 'react';
import { UploadCloud, FileImage, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateAndPassFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("يرجى تحميل ملف صورة فقط (JPG, PNG).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
       setError("حجم الملف كبير جداً. الحد الأقصى 5 ميغابايت.");
       return;
    }
    setError(null);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300
        ${dragActive ? "border-[#d8b473] bg-[#365d32]/5" : "border-[#365d32]/30 bg-white"}
        ${isLoading ? "opacity-50 pointer-events-none" : "hover:bg-gray-50"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          {isLoading ? (
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-[#365d32] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-[#365d32]">جاري تحليل المستند وتنسيق النموذج...</p>
              <p className="text-sm text-gray-500 mt-2">قد يستغرق هذا بضع ثوانٍ</p>
            </div>
          ) : (
            <>
              <UploadCloud className={`w-16 h-16 mb-4 ${dragActive ? "text-[#d8b473]" : "text-[#365d32]"}`} />
              <p className="mb-2 text-xl font-bold text-[#365d32]">
                <span className="font-semibold">اضغط للتحميل</span> أو اسحب الملف هنا
              </p>
              <p className="text-sm text-gray-500">
                (JPG, PNG) صور واضحة للأسئلة المكتوبة أو المطبوعة
              </p>
            </>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          disabled={isLoading}
          accept="image/*"
        />
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {!isLoading && !error && (
        <div className="mt-6 p-4 bg-[#ddac80]/10 border border-[#ddac80] rounded-lg">
          <h3 className="font-bold text-[#365d32] mb-2 flex items-center gap-2">
            <FileImage className="w-5 h-5" />
            تعليمات الاستخدام:
          </h3>
          <ul className="list-disc list-inside text-sm text-[#5a422a] space-y-1">
            <li>قم بتصوير ورقة الأسئلة بشكل عمودي وواضح.</li>
            <li>سيقوم النظام باستخراج النصوص وتنسيقها في نموذج رسمي.</li>
            <li>يمكنك طباعة النموذج الناتج مباشرة أو حفظه كملف PDF.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;