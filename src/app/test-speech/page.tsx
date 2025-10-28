'use client';

import { useState } from 'react';

export default function TestSpeechPage() {
  const [status, setStatus] = useState<string>('');

  const testSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatus('❌ Browser ไม่รองรับ Speech Synthesis API');
      alert('เบราว์เซอร์ของคุณไม่รองรับการอ่านเสียง');
      return;
    }

    setStatus('🎤 กำลังอ่านเสียง...');
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    // Wait a bit
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance('สวัสดีครับ นี่คือการทดสอบการอ่านเสียง');
      utterance.lang = 'th-TH';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => {
        setStatus('✅ เริ่มอ่านเสียงแล้ว');
      };
      
      utterance.onerror = (event) => {
        setStatus(`❌ เกิดข้อผิดพลาด: ${event.error}`);
      };
      
      utterance.onend = () => {
        setStatus('✅ อ่านเสียงเสร็จแล้ว');
      };
      
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const getVoices = () => {
    if (typeof window === 'undefined') return [];
    const voices = window.speechSynthesis.getVoices();
    return voices.filter(v => v.lang.startsWith('th') || v.lang.startsWith('en'));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🎤 ทดสอบการอ่านเสียง (Text-to-Speech)
        </h1>
        
        <div className="space-y-6">
          {/* Browser Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">ความรองรับเบราว์เซอร์</h2>
            {typeof window !== 'undefined' && 'speechSynthesis' in window ? (
              <p className="text-blue-800">✅ รองรับ Speech Synthesis API</p>
            ) : (
              <p className="text-red-600">❌ ไม่รองรับ Speech Synthesis API</p>
            )}
          </div>

          {/* Test Button */}
          <button
            onClick={testSpeech}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            🔊 ทดสอบการอ่านเสียง
          </button>

          {/* Status */}
          {status && (
            <div className={`p-4 rounded-lg ${
              status.includes('✅') ? 'bg-green-50 text-green-800' :
              status.includes('❌') ? 'bg-red-50 text-red-800' :
              'bg-blue-50 text-blue-800'
            }`}>
              {status}
            </div>
          )}

          {/* Available Voices */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">เสียงที่พร้อมใช้งาน:</h3>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {getVoices().slice(0, 5).map((voice, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {voice.name} ({voice.lang})
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">📋 วิธีการใช้งาน</h3>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>กดปุ่ม "ทดสอบการอ่านเสียง" ด้านบน</li>
              <li>คุณควรจะได้ยินเสียง "สวัสดีครับ นี่คือการทดสอบการอ่านเสียง"</li>
              <li>ตรวจสอบว่าเสียงของระบบเปิดอยู่</li>
              <li>ใช้ Chrome, Edge หรือ Safari เพื่อผลลัพธ์ที่ดีที่สุด</li>
            </ul>
          </div>

          {/* Back Button */}
          <a 
            href="/"
            className="block text-center text-primary-600 hover:text-primary-700"
          >
            ← กลับหน้าหลัก
          </a>
        </div>
      </div>
    </div>
  );
}

