import React, { useState } from 'react';
import './App.css';

function App() {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to manage submission

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sender || !recipient || !documentTitle || !file) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true); // Disable form while submitting

    const formData = new FormData();
    formData.append('sender', sender);
    formData.append('recipient', recipient);
    formData.append('documentTitle', documentTitle);
    formData.append('file', file);

    fetch('/submit-document', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('เอกสารถูกส่งเรียบร้อยแล้ว');
          // Reset form fields
          setSender('');
          setRecipient('');
          setDocumentTitle('');
          setFile(null);
          document.getElementById('file').value = ''; // Reset file input
        } else {
          alert('เกิดข้อผิดพลาดในการส่งเอกสาร');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาดในการส่งเอกสาร');
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable form after submission
      });
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>User</h2>
        <ul>
          <li><a href="#"><i className="fa fa-home"></i> หน้าหลัก</a></li>
          <li><a href="#"><i className="fa fa-cloud-upload"></i> ส่งเอกสาร</a></li>
          <li><a href="#"><i className="fa fa-file-text"></i> ติดตามเอกสาร</a></li>
          <li><a href="#"><i className="fa fa-info-circle"></i> ศูนย์ช่วยเหลือ</a></li>
          <li><a href="#"><i className="fa fa-phone"></i> ติดต่อเรา</a></li>
          <li><a href="#"><i className="fa fa-cog"></i> ตั้งค่า</a></li>
          <li><a href="#"><i className="fa fa-sign-out"></i> ออกจากระบบ</a></li>
        </ul>
      </div>
      <div className="content">
        <h1>ส่งเอกสาร</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sender">ผู้ส่งเอกสาร</label>
            <div className="input-icon">
              <i className="fa fa-user"></i>
              <input 
                type="text" 
                id="sender" 
                value={sender} 
                onChange={(e) => setSender(e.target.value)} 
                placeholder="ชื่อผู้ส่งเอกสารต้องเป็นชื่อเต็ม (สามารถใช้อักษรภาษาอังกฤษได้)" 
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="recipient">ผู้รับเอกสาร</label>
            <div className="input-icon">
              <i className="fa fa-user"></i>
              <input 
                type="text" 
                id="recipient" 
                value={recipient} 
                onChange={(e) => setRecipient(e.target.value)} 
                placeholder="สมาชิกในกลุ่มผู้รับเอกสารที่เลือกสามารถดาวน์โหลดเอกสารได้" 
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="documentTitle">หัวข้อเอกสาร</label>
            <div className="input-icon">
              <i className="fa fa-pencil"></i>
              <input 
                type="text" 
                id="documentTitle" 
                value={documentTitle} 
                onChange={(e) => setDocumentTitle(e.target.value)} 
                placeholder="ชื่อของเอกสารเมื่อตรวจพบไฟล์ดาวน์โหลด (สามารถใช้อักษรภาษาไทยได้)" 
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="file">เลือกไฟล์</label>
            <div className="input-icon">
              <i className="fa fa-upload"></i>
              <input 
                type="file" 
                id="file" 
                onChange={handleFileChange} 
                required 
              />
            </div>
            <p className="file-instructions">อัปโหลดไฟล์ doc, ppt, pptx, docx, rar, zip, jpg, pdf</p>
          </div>
          <div className="form-group">
            <input 
              type="submit" 
              value={isSubmitting ? "กำลังบันทึก..." : "บันทึก"} 
              disabled={isSubmitting} 
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
