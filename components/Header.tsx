import React from 'react';
import { LOGO_URL } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-[#365d32] text-white shadow-lg p-4 border-b-4 border-[#d8b473]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-full shadow-md border-2 border-[#d8b473]">
            <img 
              src={LOGO_URL} 
              alt="شعار مدرسة ألف" 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-tajawal">نظام تنسيق الامتحانات</h1>
            <p className="text-[#ddac80] text-sm">مدرسة ألف التعليمية</p>
          </div>
        </div>
        <div className="text-left hidden md:block">
          <p className="text-sm opacity-80">مديرية التربية والتعليم</p>
          <p className="font-bold text-[#d8b473]">الإصدار التعليمي 2025</p>
        </div>
      </div>
    </header>
  );
};

export default Header;