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
  CursorArrowRaysIcon,
  HomeIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  BellIcon,
  CogIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import NotificationPopup from './NotificationPopup';
import { UserContext } from '@/lib/userContext';
import { mockUsers } from '@/lib/mockUsers';
import textToSpeech from '@/lib/textToSpeech';

interface HeaderProps {
  isLoggedIn?: boolean;
  userType?: 'citizen' | 'officer' | 'admin';
}

export default function Header({ isLoggedIn = false, userType = 'citizen' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isTextToSpeech, setIsTextToSpeech] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isVoiceControl, setIsVoiceControl] = useState(false);

  // ตั้งค่าผู้ใช้ปัจจุบันเมื่อ component โหลด
  useEffect(() => {
    if (isLoggedIn && !UserContext.getCurrentUser()) {
      // ใช้ผู้ใช้ตัวอย่างสำหรับการทดสอบ
      const sampleUser = mockUsers.find(user => user.userType === userType);
      if (sampleUser) {
        UserContext.setCurrentUser(sampleUser);
      }
    }
  }, [isLoggedIn, userType]);

  const navigation = [
    { name: 'หน้าหลัก', href: '#home' },
    { name: 'บริการ', href: '#services' },
    { name: 'เกี่ยวกับเรา', href: '#about' },
    { name: 'ติดต่อ', href: '#contact' },
  ];

  const citizenMenu = [
    { name: 'Dashboard', href: '/citizen/dashboard', icon: HomeIcon },
    { name: 'กระเป๋าเอกสารดิจิทัล', href: '/citizen/digital-wallet', icon: DocumentTextIcon },
    { name: 'บันทึกประจำวัน', href: '/citizen/report-crime', icon: ExclamationTriangleIcon },
    { name: 'ประวัติการบันทึก', href: '/citizen/reports-history', icon: DocumentTextIcon },
    { name: 'ยื่นเอกสารออนไลน์', href: '/citizen/submit-documents', icon: ClipboardDocumentListIcon },
    { name: 'ประวัติการยื่นเอกสาร', href: '/citizen/document-history', icon: DocumentTextIcon },
    { name: 'พบแพทย์', href: '/citizen/medical-appointment', icon: HeartIcon },
  ];

  const officerMenu = [
    { name: 'Dashboard', href: '/officer/dashboard', icon: HomeIcon },
    { name: 'ตรวจสอบบันทึกประจำวัน', href: '/officer/reports', icon: ExclamationTriangleIcon },
    { name: 'ตรวจสอบการยื่นเอกสาร', href: '/officer/document-review', icon: ClipboardDocumentListIcon },
    { name: 'จัดการกระเป๋าเอกสาร', href: '/officer/digital-wallet', icon: DocumentTextIcon },
    { name: 'จัดการคำขอ', href: '/officer/requests', icon: ClipboardDocumentListIcon },
  ];

  const adminMenu = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'จัดการผู้ใช้', href: '/admin/users', icon: UserIcon },
    { name: 'จัดการระบบ', href: '/admin/system', icon: CogIcon },
    { name: 'รายงาน', href: '/admin/reports', icon: ExclamationTriangleIcon },
  ];

  const getCurrentMenu = () => {
    if (!isLoggedIn) return [];
    switch (userType) {
      case 'citizen': return citizenMenu;
      case 'officer': return officerMenu;
      case 'admin': return adminMenu;
      default: return citizenMenu;
    }
  };

  const currentMenu = getCurrentMenu();

  // Mock user data
  const getUserData = () => {
    switch (userType) {
      case 'citizen':
        return { name: 'สมชาย ใจดี', role: 'ประชาชน' };
      case 'officer':
        return { name: 'นางสาว รัฐบาล', role: 'เจ้าหน้าที่' };
      case 'admin':
        return { name: 'ดร. ระบบดิจิทัล', role: 'ผู้ดูแลระบบ' };
      default:
        return { name: 'ผู้ใช้', role: 'ประชาชน' };
    }
  };

  const userData = getUserData();

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
    textToSpeech.setEnabled(isTextToSpeech);
    console.log('Text-to-speech enabled:', isTextToSpeech);
  }, [isTextToSpeech]);

  // Announce page changes when text-to-speech is enabled
  useEffect(() => {
    if (isTextToSpeech && typeof window !== 'undefined') {
      const path = window.location.pathname;
      let pageTitle = '';
      
      if (path.includes('dashboard')) {
        pageTitle = 'แดชบอร์ด';
      } else if (path.includes('digital-wallet')) {
        pageTitle = 'กระเป๋าเอกสารดิจิทัล';
      } else if (path.includes('report-crime')) {
        pageTitle = 'บันทึกประจำวัน';
      } else if (path.includes('document-history')) {
        pageTitle = 'ประวัติเอกสาร';
      } else if (path.includes('profile')) {
        pageTitle = 'ข้อมูลส่วนตัว';
      } else {
        pageTitle = 'แพลตฟอร์มดิจิทัลภาครัฐ';
      }

      textToSpeech.announcePageContent(pageTitle);
    }
  }, [isTextToSpeech]);

  // Add event listeners for accessibility when enabled
  useEffect(() => {
    if (!isTextToSpeech) return;

    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a')) {
        const text = target.textContent?.trim() || target.getAttribute('aria-label');
        if (text) {
          textToSpeech.announceButton(text);
        }
      }
    };

    const handleInputFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const label = target.getAttribute('aria-label') || 
                   document.querySelector(`label[for="${target.id}"]`)?.textContent ||
                   target.getAttribute('placeholder');
      if (label) {
        textToSpeech.announceField(label);
      }
    };

    document.addEventListener('click', handleButtonClick);
    document.addEventListener('focusin', handleInputFocus);

    return () => {
      document.removeEventListener('click', handleButtonClick);
      document.removeEventListener('focusin', handleInputFocus);
    };
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-dropdown]')) {
          setIsUserDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

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
      <div className="w-full px-6 lg:px-8">
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

          {/* Desktop Navigation - Conditional Rendering */}
          {!isLoggedIn ? (
            /* Homepage Navigation */
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
          ) : (
            /* Logged-in User Menu */
            <nav className="hidden lg:flex space-x-1" role="navigation" aria-label={`เมนู${userType === 'citizen' ? 'ประชาชน' : userType === 'officer' ? 'เจ้าหน้าที่' : 'ผู้ดูแลระบบ'}`}>
              {currentMenu.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-primary-50"
                    aria-label={`ไปยัง${item.name}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden xl:block">{item.name}</span>
                  </a>
                );
              })}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Accessibility Features */}
            <div className="flex items-center space-x-1 mr-4">
              <button
                onClick={() => {
                  const newState = !isTextToSpeech;
                  setIsTextToSpeech(newState);
                  
                  // Test speech synthesis
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    const testUtterance = new SpeechSynthesisUtterance(
                      newState ? 'เปิดใช้งานการอ่านเสียง' : 'ปิดการอ่านเสียง'
                    );
                    testUtterance.lang = 'th-TH';
                    testUtterance.rate = 0.9;
                    window.speechSynthesis.speak(testUtterance);
                    console.log('Speaking:', testUtterance.text);
                  } else {
                    console.error('Speech synthesis not supported');
                    alert('เบราว์เซอร์ของคุณไม่รองรับการอ่านเสียง กรุณาใช้ Chrome, Edge หรือ Safari');
                  }
                }}
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

            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <a href="/register" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  สมัครสมาชิก
                </a>
                <a href="/login" className="btn-primary">
                  <UserIcon className="h-5 w-5 mr-2" />
                  เข้าสู่ระบบ
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <NotificationPopup />
                </div>

                {/* User Dropdown */}
                <div className="relative" data-dropdown>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="text-right">
                      <div className="text-sm font-medium">{userData.name}</div>
                      <div className="text-xs text-gray-500">{userData.role}</div>
                    </div>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <a
                        href={`/${userType}/profile`}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        <span>โปรไฟล์ส่วนตัว</span>
                      </a>
                      <a
                        href={`/${userType}/notifications`}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <BellIcon className="h-4 w-4" />
                        <span>การแจ้งเตือน</span>
                      </a>
                      <div className="border-t border-gray-100 my-1"></div>
                      <a
                        href="/logout"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <XMarkIcon className="h-4 w-4" />
                        <span>ออกจากระบบ</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
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
              {!isLoggedIn ? (
                /* Homepage Mobile Navigation */
                <>
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
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <a href="/register" className="w-full block text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      สมัครสมาชิก
                    </a>
                    <a href="/login" className="w-full btn-primary">
                      <UserIcon className="h-5 w-5 mr-2" />
                      เข้าสู่ระบบ
                    </a>
                  </div>
                </>
              ) : (
                /* Logged-in Mobile Navigation */
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      เมนู{userType === 'citizen' ? 'ประชาชน' : userType === 'officer' ? 'เจ้าหน้าที่' : 'ผู้ดูแลระบบ'}
                    </h3>
                    {currentMenu.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <IconComponent className="h-5 w-5" />
                          <span>{item.name}</span>
                        </a>
                      );
                    })}
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <a
                        href={`/${userType}/profile`}
                        className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserIcon className="h-5 w-5" />
                        <span>โปรไฟล์ส่วนตัว</span>
                      </a>
                      <a
                        href={`/${userType}/notifications`}
                        className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <BellIcon className="h-5 w-5" />
                        <span>การแจ้งเตือน</span>
                      </a>
                      <a
                        href="/logout"
                        className="flex items-center space-x-3 text-red-600 hover:text-red-700 block px-3 py-2 text-base font-medium w-full text-left"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <XMarkIcon className="h-5 w-5" />
                        <span>ออกจากระบบ</span>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
