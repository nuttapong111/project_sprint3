import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content link for screen readers */}
      <a href="#main-content" className="skip-link">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      
      <Header />
      
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
