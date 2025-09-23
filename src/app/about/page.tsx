'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, Star, Search, Menu, X, Users, Award, Waves, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

const teamMembers = [
  {
    id: 1,
    name: "Jake Martinez",
    role: "Founder & Master Shaper",
    bio: "With over 20 years of surfing and 15 years of board shaping experience, Jake founded Wave Riders to share his passion for the perfect wave.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Head of Design",
    bio: "Former professional surfer turned designer, Sarah brings both technical expertise and aesthetic vision to every board we create.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Marcus Thompson",
    role: "Operations Manager",
    bio: "Ensuring every customer gets the best experience, Marcus manages our operations with the precision of a perfect barrel ride.",
    image: "/placeholder.svg"
  }
]

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="hero-section sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-0.5">
            {/* Logo */}
            <div className="text-xs font-bold text-white">
              <a href="/">WAVE RIDERS</a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <a href="/products" className="nav-link">Boards</a>
              <a href="/wetsuits" className="nav-link">Wetsuits</a>
              <a href="#" className="nav-link">Accessories</a>
              <a href="#" className="nav-link">Sale</a>
              <a href="/about" className="nav-link">About</a>
            </div>

            {/* Search and Cart */}
            <div className="flex items-center space-x-1.5">
              <div className="hidden md:flex items-center bg-white/20 rounded-lg px-1.5 py-0.5">
                <Search className="w-3 h-3 text-white mr-0.5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-white/70 outline-none text-xs w-16"
                />
              </div>
              <button className="relative text-white hover:text-sand-light">
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 py-0.5">
            <div className="container mx-auto px-4 space-y-0.5">
              <a href="/products" className="block nav-link py-0.5">Boards</a>
              <a href="/wetsuits" className="block nav-link py-0.5">Wetsuits</a>
              <a href="#" className="block nav-link py-0.5">Accessories</a>
              <a href="#" className="block nav-link py-0.5">Sale</a>
              <a href="/about" className="block nav-link py-0.5">About</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/generated/hero-surfer-sunset.png"
            alt="Surfing at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight fade-in">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-accent to-orange-400">WAVE RIDERS</span>
          </h1>
          <p className="text-xl md:text-2xl mt-6 fade-in opacity-95">
            Where passion meets craftsmanship in every wave
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-b from-white to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-coral-accent/10 rounded-full mb-4">
                <span className="text-coral-accent font-semibold text-sm uppercase tracking-wide">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-ocean-primary mb-6">Riding Waves Since 2010</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Wave Riders was born from a simple belief: every surfer deserves a board that matches their passion for the ocean. Founded in 2010 by master shaper Jake Martinez, we started in a small garage workshop with nothing but traditional tools and an unwavering commitment to quality.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  What began as custom boards for local surfers has grown into a global community of wave riders who trust us to craft their perfect board. We combine time-honored shaping techniques with modern innovation, ensuring every board we create performs as beautifully as it looks.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, Wave Riders continues to handcraft each board with the same attention to detail and passion that started it all. Because we believe that great surfing begins with great boards.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl flex items-center justify-center">
                  <Waves className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-ocean-primary mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-primary">Quality Craftsmanship</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Every board is handcrafted with precision and care, using only the finest materials and time-tested techniques.</p>
            </div>
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-primary">Community Focus</h3>
              <p className="text-gray-600 text-lg leading-relaxed">We're not just selling boards; we're building a community of ocean lovers who share our passion for the waves.</p>
            </div>
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300">
                <Waves className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-primary">Ocean Respect</h3>
              <p className="text-gray-600 text-lg leading-relaxed">We're committed to sustainable practices and protecting the ocean environment that gives us so much joy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-white to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-coral-accent/10 rounded-full mb-4">
              <span className="text-coral-accent font-semibold text-sm uppercase tracking-wide">Meet the Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-ocean-primary mb-6">The People Behind the Boards</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Passionate individuals dedicated to crafting your perfect wave-riding experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-ocean-primary to-ocean-secondary flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-ocean-primary">{member.name}</h3>
                <p className="text-coral-accent font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-ocean-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-ocean-primary mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have questions or want to visit our workshop? We'd love to hear from you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ocean-primary">Visit Our Workshop</h3>
              <p className="text-gray-600">123 Coastal Highway<br />Surf City, CA 90210</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ocean-primary">Call Us</h3>
              <p className="text-gray-600">(555) 123-WAVE<br />Mon-Sat 9AM-6PM</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ocean-primary">Email Us</h3>
              <p className="text-gray-600">hello@waveriders.com<br />We'll respond within 24hrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="hero-section py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join the Ocean Community</h3>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">Get exclusive deals, surf tips, and be the first to know about new arrivals</p>
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-none outline-none text-lg shadow-lg"
              />
              <button className="btn-coral px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-white/60 mt-4">No spam, unsubscribe at any time</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">WAVE RIDERS</h4>
              <p className="text-white/80">
                Your premier destination for quality surfboards and coastal lifestyle gear.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 text-white/80">
                <li><a href="/products" className="hover:text-white">Surfboards</a></li>
                <li><a href="/wetsuits" className="hover:text-white">Wetsuits</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">Sale</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-white/80">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Size Guide</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 Wave Riders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}