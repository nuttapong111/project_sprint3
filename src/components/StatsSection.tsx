'use client';

import { motion } from 'framer-motion';
import { stats } from '@/lib/mockData';

export default function StatsSection() {
  const statItems = [
    {
      label: 'ผู้ใช้งานทั้งหมด',
      value: stats.totalUsers,
      icon: '👥',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'บริการที่ให้บริการ',
      value: stats.totalServices,
      icon: '⚡',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'เวลาตอบสนองเฉลี่ย',
      value: stats.averageResponseTime,
      icon: '⚡',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'ความพึงพอใจ',
      value: stats.satisfactionRate,
      icon: '⭐',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ตัวเลขที่พูดได้
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            เราได้ให้บริการประชาชนมาอย่างต่อเนื่อง และได้รับความไว้วางใจจากผู้ใช้งานทั่วประเทศ
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="card bg-white/10 backdrop-blur-sm border-white/20">
                <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="space-y-2">
                  <div className={`text-3xl md:text-4xl font-bold text-white ${item.color}`}>
                    {item.value}
                  </div>
                  <div className="text-primary-100 font-medium">
                    {item.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
