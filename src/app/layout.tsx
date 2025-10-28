import type { Metadata } from 'next'
import { Inter, Kanit } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const kanit = Kanit({ 
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-kanit',
})

export const metadata: Metadata = {
  title: 'แพลตฟอร์มดิจิทัลภาครัฐ | Government Digital Platform',
  description: 'แพลตฟอร์มดิจิทัลภาครัฐแบบครบวงจร เพื่อเพิ่มประสิทธิภาพการให้บริการประชาชนผ่าน Website และ Mobile Application',
  keywords: 'รัฐบาลดิจิทัล, บริการภาครัฐ, เอกสารดิจิทัล, นัดหมายแพทย์, แจ้งความออนไลน์',
  authors: [{ name: 'Government Digital Platform Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={`${inter.variable} ${kanit.variable}`}>
      <body className={`${kanit.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
