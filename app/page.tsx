'use client'

import { useState, useEffect } from 'react'
import {
  Shield,
  Flame,
  Phone,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Droplet,
  Users,
  ChevronUp,
} from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollToTop, setScrollToTop] = useState(false)
  const [stats, setStats] = useState({ cities: 0, years: 0, extinguishers: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      setScrollToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = { cities: 300, years: 15, extinguishers: 50000 }
            const duration = 2000
            const start = Date.now()

            const animate = () => {
              const elapsed = Date.now() - start
              const progress = Math.min(elapsed / duration, 1)

              setStats({
                cities: Math.floor(targets.cities * progress),
                years: Math.floor(targets.years * progress),
                extinguishers: Math.floor(targets.extinguishers * progress),
              })

              if (progress < 1) requestAnimationFrame(animate)
            }

            animate()
          }
        })
      },
      { threshold: 0.3 }
    )

    const statsSection = document.getElementById('stats-section')
    if (statsSection) observer.observe(statsSection)

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const scrollToTopFn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A1628]/95 backdrop-blur-md border-b border-[#D32F2F]/20'
            : 'bg-[#0A1628]/80 backdrop-blur-md border-b border-[#D32F2F]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <Shield className="w-6 h-6 text-white group-hover:text-[#D32F2F] transition-colors" />
              <span className="text-white font-bold text-lg">PROTECTION ONE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#0A1628] border-t border-[#D32F2F]/20 py-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-[#D32F2F]/10"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen bg-[#0A1628] text-white overflow-hidden pt-20 pb-12"
      >
        {/* Background gradient pattern */}
        <div className="absolute inset-0 gradient-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 border border-[#F5A623]/50 rounded-full px-4 py-2">
              <Flame className="w-4 h-4 text-[#F5A623]" />
              <span className="text-[#F5A623] text-sm font-medium">
                🔥 Trusted by 500+ Banks &amp; Telecom Companies Across Pakistan
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
            Complete Fire Protection
            <br />
            <span className="text-[#D32F2F]">
              &amp; Security Solutions
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-center text-lg sm:text-xl text-[#CBD5E1] max-w-3xl mx-auto mb-12">
            Certified fire extinguishers, advanced suppression systems &amp; trained security guards. Serving Karachi, Lahore, Islamabad &amp; 300+ cities nationwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 group">
              Request Free Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623]/10 px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
              <Phone className="w-5 h-5" />
              Call Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 flex-wrap">
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-[#F5A623]" />
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-[#F5A623]" />
              <span>NFPA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-[#F5A623]" />
              <span>24/7 Emergency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#D32F2F] font-semibold text-sm tracking-widest uppercase">
              What We Offer
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0A1628] mt-4">
              Complete Safety Ecosystem
            </h2>
            <div className="w-20 h-1 bg-[#F5A623] mx-auto mt-6 rounded" />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fire Extinguishers */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-[#D32F2F] p-4 rounded-full">
                  <Flame className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628] text-center mb-4">
                Fire Extinguishers
              </h3>
              <p className="text-[#475569] text-center mb-6 leading-relaxed">
                ABC, CO2, Foam &amp; Kitchen K-Class. Supply, refilling &amp; annual maintenance certified by local fire authorities.
              </p>
              <div className="text-center">
                <button className="text-[#D32F2F] hover:text-[#B71C1C] font-semibold flex items-center justify-center gap-1 mx-auto group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Fire Suppression */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-[#D32F2F] p-4 rounded-full">
                  <Droplet className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628] text-center mb-4">
                Fire Suppression Systems
              </h3>
              <p className="text-[#475569] text-center mb-6 leading-relaxed">
                Automatic systems for server rooms, commercial kitchens &amp; industrial facilities. NFPA &amp; FM200 compliant.
              </p>
              <div className="text-center">
                <button className="text-[#D32F2F] hover:text-[#B71C1C] font-semibold flex items-center justify-center gap-1 mx-auto group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Security Guards */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-[#D32F2F] p-4 rounded-full">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628] text-center mb-4">
                Security Guards
              </h3>
              <p className="text-[#475569] text-center mb-6 leading-relaxed">
                Uniformed, background-checked, trained security personnel for corporate offices, banks &amp; industrial sites.
              </p>
              <div className="text-center">
                <button className="text-[#D32F2F] hover:text-[#B71C1C] font-semibold flex items-center justify-center gap-1 mx-auto group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats-section"
        className="py-20 bg-[#0A1628] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <h2 id="about" className="text-4xl sm:text-5xl font-bold text-center mb-16">
            Why Pakistan&apos;s Largest Banks Trust Us
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Cities */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-[#F5A623] mb-2">
                {stats.cities}+
              </div>
              <p className="text-gray-300 text-lg">Cities Nationwide</p>
            </div>

            {/* Years */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-[#F5A623] mb-2">
                {stats.years}+
              </div>
              <p className="text-gray-300 text-lg">Years of Excellence</p>
            </div>

            {/* Extinguishers */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-[#F5A623] mb-2">
                {stats.extinguishers.toLocaleString()}+
              </div>
              <p className="text-gray-300 text-lg">Extinguishers Serviced</p>
            </div>

            {/* Support */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black text-[#F5A623] mb-2">
                24/7
              </div>
              <p className="text-gray-300 text-lg">Emergency Response</p>
            </div>
          </div>

          {/* Client Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <div className="border border-[#F5A623]/50 rounded-full px-6 py-3 text-center">
              <span className="text-[#F5A623]">🏦 Banking</span>
            </div>
            <div className="border border-[#F5A623]/50 rounded-full px-6 py-3 text-center">
              <span className="text-[#F5A623]">📡 Telecom</span>
            </div>
            <div className="border border-[#F5A623]/50 rounded-full px-6 py-3 text-center">
              <span className="text-[#F5A623]">🏭 Industrial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-4xl font-bold text-[#0A1628] mb-4 pb-4 border-l-4 border-[#D32F2F] pl-6">
                Request a Free Site Audit
              </h2>
              <p className="text-[#475569] text-lg mb-8 ml-6">
                Our experts will visit your facility, assess fire risks, and propose a custom safety plan — at no cost.
              </p>

              {/* Benefits */}
              <div className="space-y-4 ml-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[#2D2D2D]">Free inspection within 48 hours</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[#2D2D2D]">Customized safety proposal</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[#2D2D2D]">Compliance guarantee</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 ml-6 bg-[#D32F2F]/10 p-4 rounded-lg border border-[#D32F2F]/20">
                <Phone className="w-6 h-6 text-[#D32F2F] flex-shrink-0" />
                <div>
                  <p className="text-sm text-[#475569]">Call Now</p>
                  <p className="text-2xl font-bold text-[#D32F2F]">+92 300 XXXXXXX</p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#D32F2F]">
              <form className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 focus:border-transparent transition-all"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your company"
                    className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 focus:border-transparent transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your city"
                    className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 XXXXXXX"
                    className="w-full px-4 py-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 focus:border-transparent transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mt-6 group"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Disclaimer */}
                <p className="text-xs text-[#475569] text-center">
                  We respect your privacy. No spam.
                </p>
              </form>
            </div>
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
                <span className="text-white font-bold text-lg">PROTECTION ONE</span>
              </div>
              <p className="text-sm text-gray-400">
                Complete fire safety and security solutions trusted by Pakistan&apos;s leading banks and corporations.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">
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
  )
}
