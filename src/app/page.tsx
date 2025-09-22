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
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">
              WAVE RIDERS
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link">Boards</a>
              <a href="#" className="nav-link">Wetsuits</a>
              <a href="#" className="nav-link">Accessories</a>
              <a href="#" className="nav-link">Sale</a>
              <a href="#" className="nav-link">About</a>
            </div>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-white/20 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-white mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-white placeholder-white/70 outline-none text-sm w-40"
                />
              </div>
              <button className="relative text-white hover:text-sand-light">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-coral-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 py-4">
            <div className="container mx-auto px-4 space-y-4">
              <a href="#" className="block nav-link py-2">Boards</a>
              <a href="#" className="block nav-link py-2">Wetsuits</a>
              <a href="#" className="block nav-link py-2">Accessories</a>
              <a href="#" className="block nav-link py-2">Sale</a>
              <a href="#" className="block nav-link py-2">About</a>
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
            FIND YOUR<br />
            <span className="text-coral-accent">PERFECT WAVE</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 fade-in opacity-90">
            Premium Surfboards & Coastal Lifestyle Gear
          </p>
          <button className="btn-primary text-lg px-8 py-4 fade-in">
            Shop Now
          </button>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 w-full wave-divider h-8"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ocean-primary mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Discover our top-rated surfboards and gear</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card group">
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
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

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
                <div className="p-6">
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
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-primary">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $200</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-primary">Expert Crafted</h3>
              <p className="text-gray-600">Handcrafted by professional shapers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-primary">30-Day Guarantee</h3>
              <p className="text-gray-600">Not satisfied? Full refund within 30 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="hero-section py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">Join the Ocean Community</h3>
          <p className="text-xl mb-8 text-white/90">Get exclusive deals and surf tips delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-none outline-none"
            />
            <button className="btn-coral px-6 py-3">
              Subscribe
            </button>
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
                <li><a href="#" className="hover:text-white">Surfboards</a></li>
                <li><a href="#" className="hover:text-white">Wetsuits</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">Sale</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white">About Us</a></li>
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