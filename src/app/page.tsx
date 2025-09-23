'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, Star, Search, Menu, X } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

const products = [
  {
    id: 1,
    name: "Coastal Cruiser 7'2\"",
    category: "Longboards",
    price: 849,
    originalPrice: null,
    rating: 4.8,
    reviews: 124,
    image: "/generated/longboard-coastal-cruiser.png",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Performance Shortboard 6'2\"",
    category: "Shortboards",
    price: 649,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    image: "/generated/shortboard-performance.png",
    badge: null
  },
  {
    id: 3,
    name: "Oceanic Wetsuit 3/2",
    category: "Wetsuits",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    reviews: 156,
    image: "/generated/wetsuit-oceanic-pro.png",
    badge: "Sale"
  },
  {
    id: 4,
    name: "Wave Rider Pro 8'6\"",
    category: "Longboards",
    price: 925,
    originalPrice: null,
    rating: 4.9,
    reviews: 78,
    image: "/generated/longboard-coastal-cruiser.png",
    badge: "New"
  }
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])

  const addToCart = (productId: number) => {
    setCart([...cart, productId])
  }

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-coral-accent fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="hero-section sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-0.5">
            {/* Logo */}
            <div className="text-xs font-bold text-white">
              WAVE RIDERS
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
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-coral-accent text-white rounded-full text-xs w-3.5 h-3.5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/generated/hero-surfer-sunset.png"
            alt="Surfer riding wave at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl px-4">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight fade-in">
              FIND YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-accent to-orange-400">PERFECT WAVE</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-12 fade-in opacity-95 font-medium">
              Premium Surfboards & Coastal Lifestyle Gear
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary text-xl px-12 py-5 fade-in transform hover:scale-105 transition-all duration-300">
                Shop Now
              </button>
              <button className="btn-secondary-hero text-xl px-12 py-5 fade-in">
                View Collection
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-white to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-coral-accent/10 rounded-full mb-4">
              <span className="text-coral-accent font-semibold text-sm uppercase tracking-wide">Featured Collection</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-ocean-primary mb-6 leading-tight">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our top-rated surfboards and gear, carefully curated for every skill level and wave condition</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="product-card-enhanced group cursor-pointer">
                {/* Product Badge */}
                {product.badge && (
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                    product.badge === 'Sale' ? 'bg-coral-accent text-white' :
                    product.badge === 'New' ? 'bg-green-500 text-white' :
                    'bg-ocean-primary text-white'
                  }`}>
                    {product.badge}
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-72 overflow-hidden rounded-t-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id)
                          ? 'text-coral-accent fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-8">
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <h3 className="font-semibold text-lg text-ocean-primary mb-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={product.originalPrice ? 'price-sale' : 'price'}>
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="price-original">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-ocean-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-ocean-primary mb-4">Why Choose Wave Riders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the difference with our commitment to quality and customer satisfaction</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-primary">Free Shipping</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Complimentary shipping on all orders over $200. Get your gear delivered right to your door.</p>
            </div>
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-primary">Expert Crafted</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Each board is handcrafted by professional shapers with decades of experience and passion.</p>
            </div>
            <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-primary to-ocean-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-ocean-primary">30-Day Guarantee</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Not completely satisfied? We offer a full refund within 30 days, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="hero-section py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join the Ocean Community</h3>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">Get exclusive deals, surf tips, and be the first to know about new arrivals delivered straight to your inbox</p>
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

      {/* Mini Cart Indicator */}
      {cart.length > 0 && (
        <div className="mini-cart">
          <ShoppingCart className="w-6 h-6 text-ocean-primary" />
          <span className="absolute -top-1 -right-1 bg-coral-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        </div>
      )}
    </div>
  )
}