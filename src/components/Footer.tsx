'use client';

import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const footerLinks = {
    services: [
      { name: 'กระเป๋าเอกสารดิจิทัล', href: '#' },
      { name: 'นัดหมายแพทย์', href: '#' },
      { name: 'แจ้งความออนไลน์', href: '#' },
      { name: 'ยื่นขออนุญาต', href: '#' },
      { name: 'แจ้งปัญหา', href: '#' }
    ],
    support: [
      { name: 'ศูนย์ช่วยเหลือ', href: '#' },
      { name: 'คำถามที่พบบ่อย', href: '#' },
      { name: 'ติดต่อเจ้าหน้าที่', href: '#' },
      { name: 'รายงานปัญหา', href: '#' }
    ],
    legal: [
      { name: 'นโยบายความเป็นส่วนตัว', href: '#' },
      { name: 'เงื่อนไขการใช้งาน', href: '#' },
      { name: 'นโยบายคุกกี้', href: '#' },
      { name: 'ข้อกำหนดการเข้าถึง', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🇹🇭</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold">แพลตฟอร์มดิจิทัลภาครัฐ</h3>
                <p className="text-sm text-gray-400">Government Digital Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              แพลตฟอร์มดิจิทัลภาครัฐแบบครบวงจร เพื่อเพิ่มประสิทธิภาพการให้บริการประชาชน 
              ผ่านเทคโนโลยีที่ทันสมัย
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400" />
                <span className="text-sm text-gray-400">02-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <span className="text-sm text-gray-400">info@govdigital.go.th</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400" />
                <span className="text-sm text-gray-400">กรุงเทพมหานคร ประเทศไทย</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">บริการ</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ช่วยเหลือ</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">กฎหมาย</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 แพลตฟอร์มดิจิทัลภาครัฐ. สงวนลิขสิทธิ์ทั้งหมด.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
