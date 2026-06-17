"use client";

import { useState, useEffect } from "react";
import {} from "lucide-react";
import {
  Shield,
  Flame,
  Phone,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Users,
  ChevronUp,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [stats, setStats] = useState({ cities: 0, years: 0, extinguishers: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === showcaseItems.length - 1 ? 0 : prev + 1,
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = { cities: 300, years: 15, extinguishers: 50000 };
            const duration = 2000;
            const start = Date.now();

            const animate = () => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / duration, 1);

              setStats({
                cities: Math.floor(targets.cities * progress),
                years: Math.floor(targets.years * progress),
                extinguishers: Math.floor(targets.extinguishers * progress),
              });

              if (progress < 1) requestAnimationFrame(animate);
            };

            animate();
          }
        });
      },
      { threshold: 0.3 },
    );

    const statsSection = document.getElementById("stats-section");
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToTopFn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showcaseItems = [
    {
      title: "Fire Protection",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200",
    },
    {
      title: "Security Guard Services",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    },
    {
      title: "Emergency Response",
      image:
        "https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200",
    },
    {
      title: "Panic Button App",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200",
    },
    {
      title: "Fuel Station Safety",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(2);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#08111f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] flex items-center justify-center shadow-lg">
              {" "}
              <Shield className="w-5 h-5 text-white" />{" "}
            </div>{" "}
            <div>
              {" "}
              <h2 className="text-white font-bold tracking-wide text-lg leading-none">
                {" "}
                PROTECTION ONE{" "}
              </h2>{" "}
              <p className="text-[10px] uppercase tracking-[3px] text-slate-400 mt-1">
                {" "}
                Fire • Security • Response{" "}
              </p>{" "}
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("services")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Solutions
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Industries
              </button>

              <button className="text-slate-300 hover:text-white transition-colors">
                Coverage
              </button>

              <button className="text-slate-300 hover:text-white transition-colors">
                Careers
              </button>

              {/* Right Side */}

              <div className="text-right">
                <p className="text-xs text-slate-400">24/7 Emergency Support</p>

                <p className="text-white font-semibold">+92 300 XXXXXXX</p>
              </div>

              <button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Contact Us
              </button>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="lg text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#0A1628] border-t border-[#D32F2F]/20 py-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <section id="hero" className="relative min-h-screen overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/70" />

          {/* Gradient Overlay */}

          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/75 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex min-h-screen items-center">
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
              <div className="max-w-3xl">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 mt-20">
                  <Shield className="w-4 h-4 text-[#F5A623]" />
                  <span className="text-sm text-white">
                    Serving 300+ Cities Across Pakistan
                  </span>
                </div>
                {/* Heading */}
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight mb-6">
                  Protecting People,
                  <span className="block text-[#D32F2F]">
                    Assets & Operations
                  </span>
                  Across Pakistan
                </h1>
                {/* Description */}
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
                  Protection One delivers Fire Safety, Security Guard Services,
                  Emergency Response Systems, Panic Buttons and Safety Solutions
                  for businesses, institutions and communities nationwide.
                </p>
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Request Consultation
                  </button>

                  <button className="border border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20">
                    Contact Us
                  </button>
                </div>
                {/* Service Chips */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {[
                    "Fire Safety",
                    "Security Guards",
                    "Emergency Response",
                    "Panic Button",
                    "24/7 Monitoring",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-xl">
                  <div>
                    <h3 className="text-4xl font-black text-[#F5A623]">300+</h3>
                    <p className="text-slate-300 text-sm mt-1">Cities Served</p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-black text-[#F5A623]">24/7</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      Emergency Support
                    </p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-black text-[#F5A623]">15+</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      Years Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
            ```
          </div>

          {/* Bottom Fade */}

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent" />
        </section>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-[#D32F2F] font-semibold text-sm tracking-widest uppercase">
              What We Offer
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0A1628] mt-4">
              Complete Safety Ecosystem
            </h2>
            <div className="w-20 h-1 bg-[#F5A623] mx-auto mt-6 rounded" />
          </div>

          {/* Coverflow Slider — Only 3 Slides */}
          <Swiper
            modules={[EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop={false}
            coverflowEffect={{
              rotate: 0,
              stretch: -20,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            className="max-w-4xl mx-auto pb-14"
          >
            {/* Slide 1: Fire Extinguishers */}
            <SwiperSlide>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center h-[420px] flex flex-col justify-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#D32F2F] bg-opacity-10 p-5 rounded-full">
                    <Flame className="w-10 h-10 text-[#D32F2F]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">
                  Fire Extinguishers
                </h3>
                <p className="text-[#475569] leading-relaxed mb-6">
                  ABC, CO2, Foam &amp; Kitchen K-Class. Supply, refilling &amp;
                  annual maintenance certified by local fire authorities.
                </p>
                <button className="mt-auto inline-flex items-center justify-center gap-2 text-[#D32F2F] font-semibold hover:gap-3 transition-all">
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </SwiperSlide>

            {/* Slide 2: Fire Suppression */}
            <SwiperSlide>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center h-[420px] flex flex-col justify-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#D32F2F] bg-opacity-10 p-5 rounded-full">
                    <Droplet className="w-10 h-10 text-[#D32F2F]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">
                  Fire Suppression
                </h3>
                <p className="text-[#475569] leading-relaxed mb-6">
                  Automatic systems for server rooms, commercial kitchens &amp;
                  industrial facilities. NFPA &amp; FM200 compliant.
                </p>
                <button className="mt-auto inline-flex items-center justify-center gap-2 text-[#D32F2F] font-semibold hover:gap-3 transition-all">
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </SwiperSlide>

            {/* Slide 3: Security Guards */}
            <SwiperSlide>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center h-[420px] flex flex-col justify-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#D32F2F] bg-opacity-10 p-5 rounded-full">
                    <Shield className="w-10 h-10 text-[#D32F2F]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">
                  Security Guards
                </h3>
                <p className="text-[#475569] leading-relaxed mb-6">
                  Uniformed, background-checked, trained security personnel for
                  corporate offices, banks &amp; industrial sites.
                </p>
                <button className="mt-auto inline-flex items-center justify-center gap-2 text-[#D32F2F] font-semibold hover:gap-3 transition-all">
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#F5A623] uppercase tracking-[4px] text-sm font-semibold">
              Nationwide Presence
            </span>

            <h2 className="text-5xl md:text-6xl font-black mt-6">
              Protecting Critical
              <span className="block text-[#D32F2F]">
                Infrastructure Across Pakistan
              </span>
            </h2>

            <p className="text-slate-400 max-w-3xl mx-auto mt-8 text-lg">
              Trusted by banking institutions, telecom operators, fuel stations,
              retail networks and commercial facilities across more than 300
              cities nationwide.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md">
              <h3 className="text-6xl font-black text-[#F5A623]">300+</h3>
              <p className="mt-3 text-slate-300">Cities Covered</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md">
              <h3 className="text-6xl font-black text-[#F5A623]">24/7</h3>
              <p className="mt-3 text-slate-300">Emergency Response</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md">
              <h3 className="text-6xl font-black text-[#F5A623]">15+</h3>
              <p className="mt-3 text-slate-300">Years Experience</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md">
              <h3 className="text-6xl font-black text-[#F5A623]">24k+</h3>
              <p className="mt-3 text-slate-300">Protected Assets</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <span className="uppercase tracking-[4px] text-sm">Get Started</span>

          <h2 className="text-5xl md:text-6xl font-black mt-6">
            Ready To Protect Your Business?
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-xl text-white/90">
            Whether you need Fire Protection, Security Guard Services, Emergency
            Response Systems or Panic Button Solutions, our team is ready to
            help.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <button className="bg-white text-[#D32F2F] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
              Request Consultation
            </button>

            <button className="border border-white/30 px-8 py-4 rounded-2xl font-bold backdrop-blur-md hover:bg-white/10 transition">
              +92 300 XXXXXXX
            </button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <span className="bg-white/10 px-5 py-2 rounded-full">Banking</span>

            <span className="bg-white/10 px-5 py-2 rounded-full">Telecom</span>

            <span className="bg-white/10 px-5 py-2 rounded-full">
              Fuel Stations
            </span>

            <span className="bg-white/10 px-5 py-2 rounded-full">Retail</span>

            <span className="bg-white/10 px-5 py-2 rounded-full">
              Industrial
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1628] text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Column 1 - Logo & About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-[#D32F2F]" />
                <span className="text-white font-bold text-lg">
                  PROTECTION ONE
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Complete fire safety and security solutions trusted by
                Pakistan&apos;s leading banks and corporations.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 - Service Areas */}
            <div>
              <h4 className="text-white font-semibold mb-4">Service Areas</h4>
              <ul className="text-sm space-y-1">
                <li>Karachi • Lahore • Islamabad</li>
                <li>Faisalabad • Multan • Peshawar</li>
                <li>Quetta • Rawalpindi • 300+ Cities</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2026 Protection One PK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrollToTop && (
        <button
          onClick={scrollToTopFn}
          className="fixed bottom-8 right-8 bg-[#D32F2F] hover:bg-[#B71C1C] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
