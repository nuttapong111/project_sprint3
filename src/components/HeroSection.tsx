'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  const benefits = [
    'ลดเวลาและขั้นตอนการให้บริการ',
    'เพิ่มความโปร่งใสในการทำงาน',
    'ลดการใช้เอกสารกระดาษ',
    'เพิ่มความสะดวกในการเข้าถึง'
  ];

  return (
    <section id="home" className="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                แพลตฟอร์มดิจิทัล
                <span className="text-gradient block">ภาครัฐ</span>
                <span className="text-2xl md:text-3xl text-gray-600 font-normal">
                  แบบครบวงจร
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                เพิ่มประสิทธิภาพการให้บริการประชาชนผ่าน Website และ Mobile Application 
                โดยรวมบริการหลักของหน่วยงานรัฐไว้ในที่เดียว
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="btn-primary text-lg px-8 py-4 flex items-center justify-center group">
                เริ่มใช้งานฟรี
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                ดูวิดีโอแนะนำ
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="card max-w-md mx-auto relative z-10">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">แอปพลิเคชัน</h3>
                <p className="text-gray-600">เข้าถึงบริการภาครัฐได้ทุกที่ทุกเวลา</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">💳</div>
                    <p className="text-sm font-medium text-gray-700">เอกสารดิจิทัล</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🏥</div>
                    <p className="text-sm font-medium text-gray-700">นัดหมายแพทย์</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">👮</div>
                    <p className="text-sm font-medium text-gray-700">แจ้งความ</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">📄</div>
                    <p className="text-sm font-medium text-gray-700">ใบอนุญาต</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg"
            >
              🔔
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-xl shadow-lg"
            >
              ✅
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -left-8 w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-lg shadow-lg"
            >
              📊
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
