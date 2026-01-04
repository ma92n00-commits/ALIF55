export const APP_COLORS = {
  primary: '#365d32',    // Deep Green
  secondary: '#ddac80',  // Terra Cotta / Light Brown
  accent: '#d8b473',     // Gold
};

export const LOGO_URL = 'https://i.postimg.cc/x1m7DV2z/mdrst-alf.jpg';

export const EXTRACTION_PROMPT = `
مهمتك هي استخراج النص الكامل الموجود في الصورة المرفقة بدقة عالية وحرفية تامة.
1. اكتب النص كما هو موجود تماماً في الصورة.
2. لا تضف أي مقدمات أو شروحات (مثل "إليك النص").
3. لا تقم بتنسيق النص أو تحويله إلى أسئلة وأجوبة، فقط استخرج المحتوى الخام.
`;

export const FORMATTING_PROMPT = `
تصرف كمدرس خبير ومتخصص في إعداد الأسئلة الامتحانية وتنسيق النماذج الرسمية.
لديك نص خام تم استخراجه من ورقة أسئلة (سيتم تزويدك به في الأسفل). مهمتك هي تحويل هذا النص إلى نموذج امتحاني منسق على شكل صفحة واحدة باستخدام لغة HTML فقط.

المعايير المطلوبة بدقة:
1. تحويل النص إلى صفحة HTML واحدة فقط.
2. التنسيق:
   - اتجاه الصفحة: RTL (من اليمين لليسار).
   - الخطوط: استخدم خطوط عربية رسمية (مثل 'Amiri', 'Traditional Arabic', serif).
   - الألوان: استخدم فقط الألوان التالية في التنسيق (#365d32, #ddac80, #d8b473, والأسود للنصوص).
   - **هام جداً للطباعة (PDF):** أضف كود CSS التالي داخل <style>:
     @media print {
       @page { size: A4; margin: 0; }
       body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; }
       .page-content { padding: 20mm; width: 100%; box-sizing: border-box; }
     }
     body { background-color: #fff; color: #000; font-family: serif; }
     .exam-container { max-width: 210mm; margin: 0 auto; background: white; padding: 20mm; min-height: 297mm; box-sizing: border-box; position: relative; }
     .header-table { width: 100%; border-bottom: 2px solid #365d32; padding-bottom: 10px; margin-bottom: 20px; }
     .logo-img { width: 80px; height: auto; }

3. الهيكل (Header) - استخدم جدول (table) لتنسيق الترويسة بدقة:
   - العمود الأيمن: ضع شعار المدرسة (img src="${LOGO_URL}") وتحته "مديرية التربية والتعليم بحلب" ثم "مدرسة ألف التعليمية".
   - العمود الأوسط: اسم المادة (بخط كبير) وتحته "امتحان الفصل الدراسي الأول 2025".
   - العمود الأيسر: مربع للدرجة النهائية للاختبار.

4. تنسيق الأسئلة:
   - رقّم الأسئلة بشكل واضح (السؤال الأول، السؤال الثاني...).
   - حافظ على تباعد مناسب بين الأسئلة.
   - استخدم حدود (borders) أنيقة بلون #ddac80 حول مجموعات الأسئلة إذا لزم الأمر.

5. التذييل (Footer):
   - "انتهت الأسئلة" في الوسط.
   - "اسم المعلم: ..............." في اليسار.
   - "مع تمنياتنا للطلاب بالنجاح" في الوسط أسفل كل شيء.

المخرج النهائي:
- كود HTML كامل (يبدأ بـ <!DOCTYPE html>) جاهز للنسخ واللصق.
- لا تضف أي نصوص أو شروحات خارج الكود (مثل \`\`\`html).

النص الخام المستخرج:
`;