'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicrophoneIcon,
  StopIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  SpeakerWaveIcon,
  CheckCircleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PaperClipIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { PDFGenerator, DailyReportData } from '@/lib/pdfGenerator';
import { UserContext } from '@/lib/userContext';
import { ReportStatusManager } from '@/lib/reportStatus';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  isEditable?: boolean;
  isTranscribed?: boolean;
}

interface ReportType {
  id: string;
  name: string;
  questions: string[];
  followUpQuestions: { [key: string]: string[] };
}

const reportTypes: { [key: string]: ReportType } = {
  theft: {
    id: 'theft',
    name: 'การลักทรัพย์',
    questions: [
      'กรุณาบอกรายละเอียดของทรัพย์สินที่ถูกขโมย',
      'มูลค่าของทรัพย์สินที่ถูกขโมยประมาณเท่าไหร่',
      'เหตุการณ์เกิดขึ้นเมื่อไหร่และที่ไหน',
      'มีพยานหรือหลักฐานอะไรบ้าง',
      'คุณสงสัยว่าใครเป็นผู้กระทำผิด'
    ],
    followUpQuestions: {
      'ทรัพย์สิน': ['ทรัพย์สินนั้นมีลักษณะอย่างไร', 'คุณมีรูปภาพของทรัพย์สินหรือไม่'],
      'มูลค่า': ['คุณซื้อทรัพย์สินนั้นมาเท่าไหร่', 'มีใบเสร็จหรือหลักฐานการซื้อหรือไม่'],
      'สถานที่': ['สถานที่นั้นอยู่ที่ไหน', 'คุณไปที่นั่นบ่อยหรือไม่'],
      'พยาน': ['พยานเป็นใคร', 'พยานเห็นเหตุการณ์หรือไม่']
    }
  },
  fraud: {
    id: 'fraud',
    name: 'การทุจริต',
    questions: [
      'กรุณาอธิบายการทุจริตที่เกิดขึ้น',
      'จำนวนเงินที่เกี่ยวข้องเท่าไหร่',
      'ใครเป็นผู้กระทำผิด',
      'เหตุการณ์เกิดขึ้นเมื่อไหร่',
      'คุณมีหลักฐานอะไรบ้าง'
    ],
    followUpQuestions: {
      'การทุจริต': ['การทุจริตเกิดขึ้นอย่างไร', 'มีใครเกี่ยวข้องบ้าง'],
      'จำนวนเงิน': ['เงินมาจากไหน', 'มีการโอนเงินหรือไม่'],
      'ผู้กระทำผิด': ['คุณรู้จักผู้กระทำผิดหรือไม่', 'ผู้กระทำผิดมีตำแหน่งอะไร']
    }
  },
  violence: {
    id: 'violence',
    name: 'การใช้ความรุนแรง',
    questions: [
      'กรุณาอธิบายเหตุการณ์ที่เกิดขึ้น',
      'คุณได้รับบาดเจ็บหรือไม่',
      'เหตุการณ์เกิดขึ้นเมื่อไหร่และที่ไหน',
      'มีพยานหรือไม่',
      'คุณรู้จักผู้กระทำผิดหรือไม่'
    ],
    followUpQuestions: {
      'เหตุการณ์': ['เกิดอะไรขึ้นก่อนหน้านี้', 'มีการทะเลาะกันหรือไม่'],
      'บาดเจ็บ': ['บาดเจ็บตรงไหนบ้าง', 'ไปหาหมอหรือยัง'],
      'พยาน': ['พยานเห็นเหตุการณ์หรือไม่', 'พยานเป็นใคร']
    }
  },
  cyber: {
    id: 'cyber',
    name: 'อาชญากรรมไซเบอร์',
    questions: [
      'กรุณาอธิบายการหลอกลวงที่เกิดขึ้น',
      'คุณเสียเงินไปเท่าไหร่',
      'การหลอกลวงเกิดขึ้นผ่านช่องทางไหน',
      'คุณมีหลักฐานการสนทนาหรือไม่',
      'คุณรู้จักผู้หลอกลวงหรือไม่'
    ],
    followUpQuestions: {
      'การหลอกลวง': ['ผู้หลอกลวงใช้วิธีไหน', 'มีการส่งลิงก์หรือไฟล์มาให้หรือไม่'],
      'เงิน': ['เงินถูกโอนไปที่ไหน', 'มีการใช้บัตรเครดิตหรือไม่'],
      'ช่องทาง': ['ใช้แอปไหนในการติดต่อ', 'มีเบอร์โทรศัพท์ของผู้หลอกลวงหรือไม่']
    }
  }
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reportType, setReportType] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize chat with report type
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type && reportTypes[type]) {
      setReportType(type);
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: `สวัสดีครับ ผมเป็น AI Assistant ที่จะช่วยคุณบันทึกประจำวันเรื่อง${reportTypes[type].name} กรุณาตอบคำถามของผมทีละข้อเพื่อให้ผมสามารถสร้างบันทึกประจำวันให้คุณได้อย่างถูกต้องครับ`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
      // Start with first question
      setTimeout(() => {
        askNextQuestion(type, 0);
      }, 2000);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const askNextQuestion = (type: string, questionIndex: number) => {
    const reportData = reportTypes[type];
    if (questionIndex < reportData.questions.length) {
      const questionMessage: Message = {
        id: `q-${questionIndex}`,
        type: 'ai',
        content: reportData.questions[questionIndex],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, questionMessage]);
      setCurrentQuestionIndex(questionIndex);
    } else {
      // All questions answered, generate summary
      generateSummary();
    }
  };

  const generateSummary = () => {
    const summaryMessage: Message = {
      id: 'summary',
      type: 'ai',
      content: 'ขอบคุณสำหรับข้อมูลครับ ตอนนี้ผมจะส่งบันทึกประจำวันให้เจ้าหน้าที่ตรวจสอบ กรุณารอการอนุมัติครับ...',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, summaryMessage]);
    setIsGeneratingPDF(true);
    
    // Submit report for approval
    setTimeout(() => {
      submitReportForApproval();
      setIsGeneratingPDF(false);
      setShowPDFPreview(true);
    }, 3000);
  };

  const submitReportForApproval = () => {
    const personalInfo = UserContext.getPersonalInfo();
    const attachmentData = attachments.map(file => ({
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 
            file.type.startsWith('audio/') ? 'audio' : 'document',
      size: file.size,
      url: URL.createObjectURL(file)
    }));

    const reportData = {
      userId: 'current_user', // In real app, get from UserContext
      reportType,
      userAnswers,
      personalInfo,
      attachments: attachmentData
    };

    const report = ReportStatusManager.createReport(reportData);
    console.log('Report submitted for approval:', report.id);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        processAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาตรวจสอบการตั้งค่า');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      const geminiApiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
      
      if (!geminiApiKey || geminiApiKey === 'your_gemini_api_key_here') {
        // Fallback: Simulate speech-to-text processing if no API key
        console.warn('Gemini API key not configured, using simulation');
        setTimeout(() => {
          const transcribedText = "นี่คือข้อความที่แปลงจากเสียง (จำลอง)";
          addUserMessage(transcribedText, true, true);
          setIsProcessing(false);
        }, 2000);
        return;
      }

      // Convert audio blob to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        const base64Data = base64Audio.split(',')[1];
        
        try {
          // Call Gemini API for speech-to-text
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  parts: [
                    {
                      text: "Convert this audio to text in Thai language. Return only the transcribed text."
                    },
                    {
                      inlineData: {
                        mimeType: 'audio/webm',
                        data: base64Data
                      }
                    }
                  ]
                }],
                generationConfig: {
                  languageCode: 'th'
                }
              })
            }
          );

          if (!response.ok) {
            throw new Error('Failed to transcribe audio');
          }

          const data = await response.json();
          const transcribedText = data.candidates[0].content.parts[0].text;
          
          addUserMessage(transcribedText, true, true);
          setIsProcessing(false);
        } catch (error) {
          console.error('Error transcribing audio:', error);
          // Fallback to simulation
          const transcribedText = "ไม่สามารถแปลงเสียงได้ กรุณาพิมพ์ข้อความแทน";
          addUserMessage(transcribedText, true, true);
          setIsProcessing(false);
        }
      };
      
      reader.onerror = () => {
        setIsProcessing(false);
      };
      
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsProcessing(false);
    }
  };

  const addUserMessage = (content: string, isVoice: boolean = false, isTranscribed: boolean = false) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date(),
      isVoice,
      isTranscribed,
      isEditable: isTranscribed // ให้แก้ไขได้เฉพาะข้อความที่แปลงจากเสียง
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Store answer
    if (reportType) {
      const questionKey = reportTypes[reportType].questions[currentQuestionIndex];
      setUserAnswers(prev => ({
        ...prev,
        [questionKey]: content
      }));
    }
    
    // Move to next question
    setTimeout(() => {
      if (reportType) {
        askNextQuestion(reportType, currentQuestionIndex + 1);
      }
    }, 1000);
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;
    if (message.trim()) {
      addUserMessage(message);
      e.currentTarget.reset();
    }
  };

  const startEditMessage = (messageId: string, currentContent: string) => {
    setEditingMessageId(messageId);
    setEditText(currentContent);
  };

  const saveEditMessage = () => {
    if (editingMessageId && editText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, content: editText }
          : msg
      ));
      
      // Update user answers if this is a transcribed message
      if (reportType) {
        const questionKey = reportTypes[reportType].questions[currentQuestionIndex];
        setUserAnswers(prev => ({
          ...prev,
          [questionKey]: editText
        }));
      }
      
      setEditingMessageId(null);
      setEditText('');
    }
  };

  const cancelEditMessage = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const downloadPDF = () => {
    // This will be handled by the approval system
    alert('บันทึกประจำวันอยู่ระหว่างการตรวจสอบโดยเจ้าหน้าที่ กรุณารอการอนุมัติ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <a 
            href="/citizen/report-crime" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            กลับสู่หน้าหลัก
          </a>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Assistant - บันทึกประจำวันเรื่อง{reportTypes[reportType]?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            ตอบคำถามของ AI ทีละข้อ เพื่อสร้างบันทึกประจำวันให้คุณ
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.isVoice && (
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <SpeakerWaveIcon className="h-4 w-4 mr-1" />
                          <span className="text-xs opacity-75">ข้อความจากเสียง</span>
                        </div>
                        {message.isEditable && (
                          <button
                            onClick={() => startEditMessage(message.id, message.content)}
                            className="text-xs opacity-75 hover:opacity-100 flex items-center"
                          >
                            <PencilIcon className="h-3 w-3 mr-1" />
                            แก้ไข
                          </button>
                        )}
                      </div>
                    )}
                    
                    {editingMessageId === message.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full p-2 text-sm text-gray-900 rounded border"
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEditMessage}
                            className="flex items-center px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                          >
                            <CheckIcon className="h-3 w-3 mr-1" />
                            บันทึก
                          </button>
                          <button
                            onClick={cancelEditMessage}
                            className="flex items-center px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            <XMarkIcon className="h-3 w-3 mr-1" />
                            ยกเลิก
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    
                    <p className="text-xs opacity-75 mt-1">
                      {message.timestamp.toLocaleTimeString('th-TH')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
                    <span className="text-sm">กำลังแปลงเสียงเป็นข้อความ...</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    กรุณารอสักครู่ หากข้อความไม่ถูกต้อง คุณสามารถแก้ไขได้
                  </p>
                </div>
              </motion.div>
            )}
            
            {isGeneratingPDF && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
                    <span className="text-sm">กำลังสร้างบันทึกประจำวัน...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {!showPDFPreview && (
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleTextSubmit} className="flex space-x-2">
                <input
                  type="text"
                  name="message"
                  placeholder="พิมพ์ข้อความของคุณ..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isProcessing}
                />
                <button
                  type="button"
                  onClick={() => setShowAttachmentModal(true)}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </form>
              
              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-700 truncate max-w-32">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Voice Recording */}
              <div className="mt-3 flex justify-center">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                  >
                    <MicrophoneIcon className="h-5 w-5" />
                    <span>กดเพื่ออัดเสียง</span>
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <StopIcon className="h-5 w-5" />
                    <span>หยุดอัดเสียง</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* PDF Preview */}
          {showPDFPreview && (
            <div className="border-t border-gray-200 p-6">
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ส่งบันทึกประจำวันเรียบร้อย!
                </h3>
                <p className="text-gray-600 mb-6">
                  บันทึกประจำวันของคุณถูกส่งให้เจ้าหน้าที่ตรวจสอบแล้ว กรุณารอการอนุมัติ
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={downloadPDF}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>รอการอนุมัติ</span>
                  </button>
                  <a
                    href="/citizen/report-crime"
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    กลับหน้าหลัก
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {reportType && !showPDFPreview && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>ความคืบหน้า</span>
              <span>{currentQuestionIndex + 1} / {reportTypes[reportType]?.questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentQuestionIndex + 1) / reportTypes[reportType]?.questions.length) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {/* Usage Tips */}
        {!showPDFPreview && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 เคล็ดลับการใช้งาน</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• คุณสามารถพิมพ์ข้อความหรืออัดเสียงตอบคำถามได้</li>
              <li>• หากข้อความที่แปลงจากเสียงไม่ถูกต้อง ให้คลิกปุ่ม "แก้ไข" เพื่อแก้ไข</li>
              <li>• คุณสามารถแนบไฟล์หลักฐานได้ (รูปภาพ, วิดีโอ, เสียง, เอกสาร)</li>
              <li>• ตอบคำถามให้ครบถ้วนเพื่อให้ AI สร้างบันทึกประจำวันที่สมบูรณ์</li>
              <li>• ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับและปลอดภัย</li>
            </ul>
          </div>
        )}

        {/* Attachment Modal */}
        {showAttachmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                แนบไฟล์หลักฐาน
              </h3>
              
              <div className="space-y-4">
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors"
                  >
                    <PaperClipIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">คลิกเพื่อเลือกไฟล์</p>
                    <p className="text-sm text-gray-500">
                      รองรับ: รูปภาพ, วิดีโอ, เสียง, PDF, Word, Text
                    </p>
                  </button>
                </div>

                {attachments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      ไฟล์ที่เลือก ({attachments.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAttachmentModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => setShowAttachmentModal(false)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}