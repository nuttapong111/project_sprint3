'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, UsersIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AboutSection() {
  const values = [
    {
      icon: UsersIcon,
      title: 'ประชาชนเป็นศูนย์กลาง',
      description: 'ออกแบบทุกฟีเจอร์เพื่อความสะดวกและประโยชน์สูงสุดของประชาชน'
    },
    {
      icon: ShieldCheckIcon,
      title: 'ความปลอดภัยและความเป็นส่วนตัว',
      description: 'ใช้เทคโนโลยีเข้ารหัสขั้นสูงและปฏิบัติตาม PDPA อย่างเคร่งครัด'
    },
    {
      icon: ClockIcon,
      title: 'บริการ 24/7',
      description: 'เข้าถึงบริการภาครัฐได้ทุกที่ทุกเวลา ไม่มีวันหยุด'
    }
  ];

  const achievements = [
    'ผู้ใช้งานมากกว่า 2.5 ล้านคน',
    'ให้บริการครบ 50+ ประเภท',
    'ความพึงพอใจ 95%',
    'ประหยัดเวลาเฉลี่ย 80%'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
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
            เกี่ยวกับเรา
          </h2>
          <p className="section-subtitle">
            แพลตฟอร์มดิจิทัลภาครัฐที่มุ่งมั่นในการยกระดับการให้บริการประชาชน
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              วิสัยทัศน์ของเรา
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              เรามุ่งมั่นที่จะเป็นแพลตฟอร์มดิจิทัลภาครัฐที่ทันสมัยที่สุด 
              เพื่อยกระดับการให้บริการประชาชนให้มีความสะดวก รวดเร็ว และโปร่งใส
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              ด้วยเทคโนโลยี AI, Blockchain และระบบความปลอดภัยขั้นสูง 
              เราสามารถให้บริการที่ครอบคลุมทุกความต้องการของประชาชน
            </p>

            {/* Achievements */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">ผลงานที่ภาคภูมิใจ</h4>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card max-w-md mx-auto">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">🏛️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">ภาครัฐดิจิทัล</h3>
                <p className="text-gray-600">
                  การเปลี่ยนแปลงสู่ยุคดิจิทัลที่ประชาชนเป็นศูนย์กลาง
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🤖</div>
                    <p className="text-sm font-medium text-gray-700">AI Technology</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🔐</div>
                    <p className="text-sm font-medium text-gray-700">Security First</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">⚡</div>
                    <p className="text-sm font-medium text-gray-700">Fast Service</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl mb-2">📱</div>
                    <p className="text-sm font-medium text-gray-700">Mobile Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
