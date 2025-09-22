'use client'

import { useState, useMemo } from 'react'
import { ShoppingCart, Heart, Star, Filter, Grid, List, Search, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const allProducts = [
  {
    id: 1,
    name: "Coastal Cruiser 7'2\"",
    category: "Longboards",
    price: 849,
    originalPrice: null,
    rating: 4.8,
    reviews: 124,
    image: "/generated/longboard-coastal-cruiser.png",
    badge: "Best Seller",
    inStock: true,
    brand: "Wave Riders",
    tags: ["beginner-friendly", "classic", "stable"]
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
    badge: null,
    inStock: true,
    brand: "Wave Riders",
    tags: ["performance", "advanced", "speed"]
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
    badge: "Sale",
    inStock: true,
    brand: "Oceanic",
    tags: ["warm", "flexible", "durable"]
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
    badge: "New",
    inStock: true,
    brand: "Wave Riders",
    tags: ["premium", "professional", "noseriding"]
  },
  {
    id: 5,
    name: "Speed Demon 5'10\"",
    category: "Shortboards",
    price: 749,
    originalPrice: null,
    rating: 4.5,
    reviews: 67,
    image: "/generated/shortboard-performance.png",
    badge: null,
    inStock: false,
    brand: "Wave Riders",
    tags: ["aggressive", "advanced", "powerful-waves"]
  },
  {
    id: 6,
    name: "Arctic Pro 4/3",
    category: "Wetsuits",
    price: 329,
    originalPrice: null,
    rating: 4.7,
    reviews: 94,
    image: "/generated/wetsuit-oceanic-pro.png",
    badge: null,
    inStock: true,
    brand: "Arctic",
    tags: ["cold-water", "thick", "winter"]
  }
]

const categories = ["All Products", "Longboards", "Shortboards", "Wetsuits", "Accessories"]
const brands = ["All Brands", "Wave Riders", "Oceanic", "Arctic"]
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $200", min: 0, max: 199 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "$500 - $800", min: 500, max: 800 },
  { label: "$800+", min: 800, max: Infinity }
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" }
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [selectedBrand, setSelectedBrand] = useState("All Brands")
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const categoryMatch = selectedCategory === "All Products" || product.category === selectedCategory
      const brandMatch = selectedBrand === "All Brands" || product.brand === selectedBrand
      const priceMatch = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
      const searchMatch = searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return categoryMatch && brandMatch && priceMatch && searchMatch
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id - a.id // Assuming higher ID = newer
        default:
          return 0
      }
    })

    return filtered
  }, [selectedCategory, selectedBrand, selectedPriceRange, searchQuery, sortBy])

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
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

  const ProductCard = ({ product }: { product: typeof allProducts[0] }) => (
    <div className="product-card group">
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

      {/* Stock Status */}
      {!product.inStock && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-300 ${
              product.inStock ? 'group-hover:scale-105' : 'opacity-50'
            }`}
          />
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all z-20"
      >
        <Heart
          className={`w-5 h-5 ${
            wishlist.includes(product.id)
              ? 'text-coral-accent fill-current'
              : 'text-gray-400'
          }`}
        />
      </button>

      {/* Product Info */}
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-ocean-primary mb-2 hover:text-ocean-secondary">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        <p className="text-sm text-gray-400 mb-2">{product.brand}</p>

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
        <Link href={`/product/${product.id}`}>
          <button
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all ${
              product.inStock
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.inStock ? 'View Details' : 'Out of Stock'}</span>
          </button>
        </Link>
      </div>
    </div>
  )

  const ProductListItem = ({ product }: { product: typeof allProducts[0] }) => (
    <div className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      {/* Product Image */}
      <div className="relative w-48 h-48 flex-shrink-0">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover rounded-l-lg transition-transform duration-300 ${
              product.inStock ? 'hover:scale-105' : 'opacity-50'
            }`}
          />
        </Link>

        {/* Badges */}
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

      {/* Product Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-xl text-ocean-primary hover:text-ocean-secondary">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-400 mt-1">{product.brand}</p>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 hover:bg-gray-50 rounded-full"
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

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={product.originalPrice ? 'price-sale text-xl' : 'price text-xl'}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="price-original">
                ${product.originalPrice}
              </span>
            )}
            {!product.inStock && (
              <span className="text-red-500 text-sm font-medium">Out of Stock</span>
            )}
          </div>

          <Link href={`/product/${product.id}`}>
            <button
              disabled={!product.inStock}
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all ${
                product.inStock
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="hero-section sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-white">
              WAVE RIDERS
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link">Boards</a>
              <a href="#" className="nav-link">Wetsuits</a>
              <a href="#" className="nav-link">Accessories</a>
              <a href="#" className="nav-link">Sale</a>
              <a href="#" className="nav-link">About</a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-white hover:text-sand-light">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ocean-primary mb-4">All Products</h1>
          <p className="text-lg text-gray-600">Discover our complete collection of surfboards and gear</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-6 text-ocean-primary">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-secondary/20 focus:border-ocean-secondary outline-none"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 text-ocean-primary"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Brand</label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="mr-3 text-ocean-primary"
                      />
                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.label}
                        checked={selectedPriceRange.label === range.label}
                        onChange={() => setSelectedPriceRange(range)}
                        className="mr-3 text-ocean-primary"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("All Products")
                  setSelectedBrand("All Brands")
                  setSelectedPriceRange(priceRanges[0])
                  setSearchQuery("")
                }}
                className="w-full btn-secondary py-2"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <p className="text-gray-600">
                  {filteredAndSortedProducts.length} products found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-ocean-secondary/20 focus:border-ocean-secondary outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Products")
                    setSelectedBrand("All Brands")
                    setSelectedPriceRange(priceRanges[0])
                    setSearchQuery("")
                  }}
                  className="mt-4 btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}