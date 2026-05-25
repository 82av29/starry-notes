# ✦ Starry Notes

تطبيق ملاحظات أنيق وخفيف مع خلفية نجوم متحركة.

## المميزات
- خلفية سوداء مع نجوم متحركة
- واجهة بأسلوب iOS الحديث
- حفظ محلي كامل (بدون حسابات)
- بحث سريع في الملاحظات
- دعم كامل للعربية
- خفيف وسريع

---

## طريقة البناء (APK عبر GitHub Actions)

### الخطوات:

**1. إنشاء حساب Expo**
- اذهب إلى [expo.dev](https://expo.dev) وأنشئ حساباً مجانياً

**2. الحصول على EXPO_TOKEN**
- من لوحة تحكم Expo: Settings → Access Tokens → Create Token
- انسخ التوكن

**3. إضافة التوكن لـ GitHub**
- في الريبو: Settings → Secrets and variables → Actions → New repository secret
- الاسم: `EXPO_TOKEN`
- القيمة: التوكن الذي نسخته

**4. رفع الملفات**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/starry-notes.git
git push -u origin main
```

**5. تشغيل البناء**
- اذهب إلى: Actions → Build APK → Run workflow
- انتظر ~10 دقائق
- حمّل الـ APK من: Actions → آخر run → Artifacts → starry-notes-apk

---

## التشغيل المحلي (اختياري)
```bash
npm install
npx expo start
```
