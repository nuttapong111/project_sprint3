'use client';

import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

export default function ContactSection() {
  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'โทรศัพท์',
      details: ['02-123-4567', '02-123-4568'],
      description: 'จันทร์-ศุกร์ 08:00-17:00'
    },
    {
      icon: EnvelopeIcon,
      title: 'อีเมล',
      details: ['info@govdigital.go.th', 'support@govdigital.go.th'],
      description: 'ตอบกลับภายใน 24 ชั่วโมง'
    },
    {
      icon: MapPinIcon,
      title: 'ที่อยู่',
      details: ['123 ถนนรามคำแหง2', 'แขวดอกไม้', 'เขตประเวศ กรุงเทพมหานคร 10200'],
      description: 'สำนักงานใหญ่'
    },
    {
      icon: ClockIcon,
      title: 'เวลาทำการ',
      details: ['จันทร์-ศุกร์: 08:00-17:00', 'เสาร์: 08:00-12:00'],
      description: 'ปิดวันอาทิตย์และวันหยุดราชการ'
    }
  ];

  const supportChannels = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'แชทสดกับเจ้าหน้าที่',
      available: '24/7',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile App',
      description: 'ดาวน์โหลดแอปมือถือ',
      available: 'iOS & Android',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'ส่งอีเมลสอบถาม',
      available: '24 ชั่วโมง',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            ติดต่อเรา
          </h2>
          <p className="section-subtitle">
            เราพร้อมให้ความช่วยเหลือและตอบคำถามทุกข้อสงสัย
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ข้อมูลการติดต่อ
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h4>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Support Channels */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ช่องทางการสนับสนุน
              </h3>
              <div className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${channel.bgColor} rounded-lg flex items-center justify-center`}>
                        <channel.icon className={`h-6 w-6 ${channel.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {channel.title}
                        </h4>
                        <p className="text-gray-600 mb-1">
                          {channel.description}
                        </p>
                        <span className="text-sm text-primary-600 font-medium">
                          {channel.available}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ส่งข้อความด่วน
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="กรอกอีเมล"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ข้อความ
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="กรอกข้อความที่ต้องการสอบถาม"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  ส่งข้อความ
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
