'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, Star, ArrowLeft, Plus, Minus, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const productData = {
  1: {
    id: 1,
    name: "Coastal Cruiser 7'2\"",
    category: "Longboards",
    price: 849,
    originalPrice: null,
    rating: 4.8,
    reviews: 124,
    images: [
      "/generated/longboard-coastal-cruiser.png",
      "/generated/longboard-coastal-cruiser.png",
      "/generated/longboard-coastal-cruiser.png"
    ],
    badge: "Best Seller",
    description: "The Coastal Cruiser is perfect for beginners and experienced surfers looking for a stable, easy-to-ride longboard. Crafted from premium materials with a classic design that never goes out of style.",
    specifications: {
      length: "7'2\"",
      width: "22\"",
      thickness: "2.875\"",
      volume: "52L",
      finSetup: "Single Fin + 2+1 Compatible",
      construction: "PU/PE Construction"
    },
    features: [
      "Hand-laminated for durability",
      "Classic longboard shape",
      "Perfect for small to medium waves",
      "Includes single fin",
      "Premium foam core"
    ],
    inStock: true,
    quantity: 8
  },
  2: {
    id: 2,
    name: "Performance Shortboard 6'2\"",
    category: "Shortboards",
    price: 649,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    images: [
      "/generated/shortboard-performance.png",
      "/generated/shortboard-performance.png",
      "/generated/shortboard-performance.png"
    ],
    badge: null,
    description: "Designed for high-performance surfing, this shortboard delivers exceptional speed and maneuverability in powerful waves. Perfect for intermediate to advanced surfers.",
    specifications: {
      length: "6'2\"",
      width: "19.5\"",
      thickness: "2.5\"",
      volume: "28L",
      finSetup: "Thruster (3-fin)",
      construction: "EPS/Epoxy Construction"
    },
    features: [
      "High-performance rocker",
      "Lightweight EPS core",
      "Sharp rail design",
      "Tri-fin setup included",
      "Advanced hydrodynamics"
    ],
    inStock: true,
    quantity: 12
  }
}

const relatedProducts = [
  {
    id: 3,
    name: "Wave Rider Pro 8'6\"",
    price: 925,
    image: "/generated/longboard-coastal-cruiser.png",
    rating: 4.9
  },
  {
    id: 4,
    name: "Oceanic Wetsuit 3/2",
    price: 199,
    image: "/generated/wetsuit-oceanic-pro.png",
    rating: 4.6
  }
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = productData[parseInt(params.id) as keyof typeof productData]
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? 'text-coral-accent fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { productId: product.id, quantity, size: selectedSize })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="hero-section sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-sand-light">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="text-2xl font-bold text-white">WAVE RIDERS</div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-sand-light">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="relative text-white hover:text-sand-light">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-ocean-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-ocean-primary">{product.category}</Link>
            <span>/</span>
            <span className="text-ocean-primary">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  product.badge === 'Sale' ? 'bg-coral-accent text-white' :
                  product.badge === 'New' ? 'bg-green-500 text-white' :
                  'bg-ocean-primary text-white'
                }`}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-ocean-primary' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-ocean-primary mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className={product.originalPrice ? 'price-sale text-3xl' : 'price text-3xl'}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="price-original text-xl">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  product.inStock ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Size Selection (for wetsuits/accessories) */}
            {product.category === 'Wetsuits' && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex space-x-3">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'border-ocean-primary bg-ocean-primary text-white'
                          : 'border-gray-300 hover:border-ocean-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    className="p-2 hover:bg-gray-50"
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.quantity} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button className="btn-secondary px-6">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-coral-accent rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-ocean-primary text-ocean-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <dl className="grid grid-cols-1 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <dt className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </dt>
                      <dd className="text-gray-700">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-lg font-medium">{product.rating} out of 5</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-3">
                        {renderStars(5)}
                      </div>
                      <span className="font-medium">Jake M.</span>
                      <span className="text-gray-500 ml-2">2 weeks ago</span>
                    </div>
                    <p className="text-gray-700">Amazing board! Perfect for learning and even great for experienced riders. The build quality is exceptional.</p>
                  </div>
                  <div className="border-b border-gray-100 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-3">
                        {renderStars(4)}
                      </div>
                      <span className="font-medium">Sarah K.</span>
                      <span className="text-gray-500 ml-2">1 month ago</span>
                    </div>
                    <p className="text-gray-700">Great board for the price. Very stable and well-made. Shipping was fast too!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-ocean-primary mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <div className="product-card group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-ocean-primary mb-2">{item.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{item.rating}</span>
                    </div>
                    <p className="price">${item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="price text-lg">${product.price}</span>
            <span className="text-sm text-gray-500">{product.name}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 btn-primary py-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}