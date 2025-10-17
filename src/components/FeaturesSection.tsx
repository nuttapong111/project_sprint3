'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/mockData';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            ฟีเจอร์หลัก
          </h2>
          <p className="section-subtitle">
            บริการครบวงจรที่ออกแบบมาเพื่อความสะดวกของประชาชน
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="feature-card group"
            >
              {/* Icon */}
              <div className={`feature-icon ${feature.bgColor}`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : feature.status === 'beta'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {feature.status === 'available' ? 'พร้อมใช้งาน' : 
                     feature.status === 'beta' ? 'ทดลองใช้' : 'เร็วๆ นี้'}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium py-2 group">
                  <span>เรียนรู้เพิ่มเติม</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              พร้อมเริ่มต้นแล้วหรือยัง?
            </h3>
            <p className="text-gray-600 mb-6">
              เข้าร่วมกับประชาชนกว่า 2.5 ล้านคนที่ไว้วางใจให้เราดูแลบริการภาครัฐให้คุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                เริ่มใช้งานทันที
              </button>
              <button className="btn-secondary">
                ดาวน์โหลดแอป
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
