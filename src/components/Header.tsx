'use client';

import { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import NotificationPopup from './NotificationPopup';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextToSpeech, setIsTextToSpeech] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isVoiceControl, setIsVoiceControl] = useState(false);

  const navigation = [
    { name: 'หน้าหลัก', href: '#home' },
    { name: 'บริการ', href: '#services' },
    { name: 'เกี่ยวกับเรา', href: '#about' },
    { name: 'ติดต่อ', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Accessibility features
  useEffect(() => {
    if (isTextToSpeech) {
      const speak = (text: string) => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'th-TH';
          utterance.rate = 0.8;
          speechSynthesis.speak(utterance);
        }
      };
      speak('ยินดีต้อนรับสู่แพลตฟอร์มดิจิทัลภาครัฐ');
    } else {
      speechSynthesis.cancel();
    }
  }, [isTextToSpeech]);

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [isLargeText]);

  useEffect(() => {
    if (isVoiceControl) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'th-TH';
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };

      recognition.start();

      return () => {
        recognition.stop();
      };
    }
  }, [isVoiceControl]);

  const handleVoiceCommand = (command: string) => {
    if (command.includes('หน้าหลัก') || command.includes('home')) {
      document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    } else if (command.includes('บริการ') || command.includes('services')) {
      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
    } else if (command.includes('เกี่ยวกับ') || command.includes('about')) {
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (command.includes('ติดต่อ') || command.includes('contact')) {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🇹🇭</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">แพลตฟอร์มดิจิทัลภาครัฐ</h1>
                <p className="text-xs text-gray-500">Government Digital Platform</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="เมนูหลัก">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                aria-label={`ไปยัง${item.name}`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Accessibility Features */}
            <div className="flex items-center space-x-1 mr-4">
              <button
                onClick={() => setIsTextToSpeech(!isTextToSpeech)}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  isTextToSpeech 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={isTextToSpeech ? 'ปิดการอ่านเสียง' : 'เปิดการอ่านเสียง'}
              >
                {isTextToSpeech ? (
                  <SpeakerXMarkIcon className="h-4 w-4" />
                ) : (
                  <SpeakerWaveIcon className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  isHighContrast 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={isHighContrast ? 'ปิดโหมดความคมชัดสูง' : 'เปิดโหมดความคมชัดสูง'}
              >
                <AdjustmentsHorizontalIcon className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsLargeText(!isLargeText)}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  isLargeText 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={isLargeText ? 'ปิดตัวอักษรใหญ่' : 'เปิดตัวอักษรใหญ่'}
              >
                <EyeIcon className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsVoiceControl(!isVoiceControl)}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  isVoiceControl 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={isVoiceControl ? 'ปิดการควบคุมด้วยเสียง' : 'เปิดการควบคุมด้วยเสียง'}
              >
                <CursorArrowRaysIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="relative">
              <NotificationPopup />
            </div>
            <a href="/login" className="btn-primary">
              <UserIcon className="h-5 w-5 mr-2" />
              เข้าสู่ระบบ
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full btn-primary">
                  <UserIcon className="h-5 w-5 mr-2" />
                  เข้าสู่ระบบ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
