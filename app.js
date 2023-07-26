const express = require('express');
const app = express();
const path = require('path');
const port = 3000; // เลือกพอร์ตของเซิร์ฟเวอร์

// เปิดใช้งานเฟรมเวิร์ค Express.js เพื่อส่งไฟล์และรันเว็บไซต์
app.use(express.static(path.join(__dirname,'dist')));

// เมื่อมีคำขอ GET ที่ root path (/) ให้ส่งไฟล์ index.html กลับไปยังเบราว์เซอร์
app.get('/', (req, res) => {
  res.render ('index')
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
