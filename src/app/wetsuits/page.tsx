'use client'

import { useState, useMemo } from 'react'
import { ShoppingCart, Heart, Star, Filter, Grid, List, Search, ChevronDown, Waves, Thermometer, Zap, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const wetsuitProducts = [
  {
    id: 3,
    name: "Oceanic Pro 3/2",
    thickness: "3/2mm",
    water_temp: "60-68°F",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    reviews: 156,
    image: "/generated/wetsuit-oceanic-pro.png",
    badge: "Sale",
    inStock: true,
    brand: "Oceanic",
    tags: ["warm", "flexible", "durable"],
    features: ["Thermal Lining", "Flatlock Seams", "Back Zip"],
    size: "Available in XS-XL"
  },
  {
    id: 6,
    name: "Arctic Pro 4/3",
    thickness: "4/3mm", 
    water_temp: "50-60°F",
    price: 329,
    originalPrice: null,
    rating: 4.7,
    reviews: 94,
    image: "/generated/wetsuit-oceanic-pro.png",
    badge: null,
    inStock: true,
    brand: "Arctic",
    tags: ["cold-water", "thick", "winter"],
    features: ["Neoprene Core", "Chest Zip", "Sealed Seams"],
    size: "Available in S-XXL"
  },
  {
    id: 7,
    name: "Summer Flex 2/2",
    thickness: "2/2mm",
    water_temp: "68-75°F",
    price: 149,
    originalPrice: null,
    rating: 4.4,
    reviews: 78,
    image: "/generated/wetsuit-summer-flex-22.png",
    badge: "New",
    inStock: true,
    brand: "FlexCore",
    tags: ["summer", "flexible", "lightweight"],
    features: ["Ultra Stretch", "Quick Dry", "Flatlock Seams"],
    size: "Available in XS-XL"
  },
  {
    id: 8,
    name: "Competition Elite 3/2",
    thickness: "3/2mm",
    water_temp: "60-68°F",
    price: 449,
    originalPrice: null,
    rating: 4.9,
    reviews: 45,
    image: "/generated/wetsuit-thermal-pro-32.png",
    badge: "Pro",
    inStock: true,
    brand: "Elite",
    tags: ["performance", "competition", "premium"],
    features: ["Yamamoto Neoprene", "Blind Stitched", "Chest Zip"],
    size: "Available in S-XL"
  },
  {
    id: 9,
    name: "Youth Explorer 3/2",
    thickness: "3/2mm", 
    water_temp: "60-68°F",
    price: 119,
    originalPrice: null,
    rating: 4.5,
    reviews: 67,
    image: "/generated/wetsuit-thermal-pro-32.png",
    badge: null,
    inStock: false,
    brand: "Youth Pro",
    tags: ["kids", "beginner", "affordable"],
    features: ["Easy Entry", "Soft Neoprene", "Reinforced Knees"],
    size: "Available in Youth S-XL"
  },
  {
    id: 10,
    name: "Winter Warrior 5/4",
    thickness: "5/4mm",
    water_temp: "40-50°F", 
    price: 399,
    originalPrice: null,
    rating: 4.8,
    reviews: 89,
    image: "/generated/wetsuit-winter-warrior-54.png",
    badge: "Best Seller",
    inStock: true,
    brand: "Arctic",
    tags: ["extreme-cold", "thick", "winter"],
    features: ["Thermal Core", "Hood Attachment", "Sealed Seams"],
    size: "Available in M-XXL"
  }
]

const thicknesses = ["All Thickness", "2/2mm", "3/2mm", "4/3mm", "5/4mm"]
const brands = ["All Brands", "Oceanic", "Arctic", "FlexCore", "Elite", "Youth Pro"]
const waterTemps = [
  { label: "All Temperatures", min: 0, max: 100 },
  { label: "Warm (68-75°F)", min: 68, max: 75 },
  { label: "Moderate (60-68°F)", min: 60, max: 68 },
  { label: "Cool (50-60°F)", min: 50, max: 60 },
  { label: "Cold (40-50°F)", min: 40, max: 50 }
]
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $150", min: 0, max: 149 },
  { label: "$150 - $250", min: 150, max: 250 },
  { label: "$250 - $350", min: 250, max: 350 },
  { label: "$350+", min: 350, max: Infinity }
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" }
]

export default function WetsuitsPage() {
  const [selectedThickness, setSelectedThickness] = useState("All Thickness")
  const [selectedBrand, setSelectedBrand] = useState("All Brands")
  const [selectedWaterTemp, setSelectedWaterTemp] = useState(waterTemps[0])
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = wetsuitProducts.filter((product) => {
      const thicknessMatch = selectedThickness === "All Thickness" || product.thickness === selectedThickness
      const brandMatch = selectedBrand === "All Brands" || product.brand === selectedBrand
      const priceMatch = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
      
      // Water temperature matching
      let tempMatch = true
      if (selectedWaterTemp.label !== "All Temperatures") {
        const tempRange = product.water_temp.match(/(\d+)-(\d+)°F/)
        if (tempRange) {
          const productTempMin = parseInt(tempRange[1])
          const productTempMax = parseInt(tempRange[2])
          tempMatch = (productTempMin <= selectedWaterTemp.max && productTempMax >= selectedWaterTemp.min)
        }
      }
      
      const searchMatch = searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))

      return thicknessMatch && brandMatch && priceMatch && tempMatch && searchMatch
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
          return b.id - a.id
        default:
          return 0
      }
    })

    return filtered
  }, [selectedThickness, selectedBrand, selectedWaterTemp, selectedPriceRange, searchQuery, sortBy])

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

  const WetsuitCard = ({ product }: { product: typeof wetsuitProducts[0] }) => (
    <div className="product-card-enhanced group relative">
      {/* Product Badge */}
      {product.badge && (
        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
          product.badge === 'Sale' ? 'bg-coral-accent text-white' :
          product.badge === 'New' ? 'bg-green-500 text-white' :
          product.badge === 'Pro' ? 'bg-purple-600 text-white' :
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
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              product.inStock ? 'group-hover:scale-110' : 'opacity-50'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all z-20 hover:scale-110"
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
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ocean-secondary bg-sand-light px-2 py-1 rounded-full">
            {product.thickness}
          </span>
          <span className="text-xs text-gray-500">{product.water_temp}</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-xl text-ocean-primary mb-2 hover:text-ocean-secondary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

        {/* Key Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <span key={index} className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
              {index === 0 && <Thermometer className="w-3 h-3 mr-1" />}
              {index === 1 && <Shield className="w-3 h-3 mr-1" />}
              {feature}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className={product.originalPrice ? 'price-sale text-2xl' : 'price text-2xl'}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="price-original text-lg">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Link href={`/product/${product.id}`}>
          <button
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all transform ${
              product.inStock
                ? 'btn-primary hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{product.inStock ? 'View Details' : 'Out of Stock'}</span>
          </button>
        </Link>
      </div>
    </div>
  )

  const WetsuitListItem = ({ product }: { product: typeof wetsuitProducts[0] }) => (
    <div className="flex bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <div className="relative w-64 h-64 flex-shrink-0">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-300 ${
              product.inStock ? 'hover:scale-105' : 'opacity-50'
            }`}
          />
        </Link>

        {/* Badges */}
        {product.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
            product.badge === 'Sale' ? 'bg-coral-accent text-white' :
            product.badge === 'New' ? 'bg-green-500 text-white' :
            product.badge === 'Pro' ? 'bg-purple-600 text-white' :
            'bg-ocean-primary text-white'
          }`}>
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-medium text-ocean-secondary bg-sand-light px-3 py-1 rounded-full">
                  {product.thickness}
                </span>
                <span className="text-sm text-gray-500">{product.water_temp}</span>
              </div>
              <Link href={`/product/${product.id}`}>
                <h3 className="font-bold text-2xl text-ocean-primary hover:text-ocean-secondary mb-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-500 mb-2">{product.brand}</p>
              <p className="text-sm text-gray-400">{product.size}</p>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 hover:bg-gray-50 rounded-full"
            >
              <Heart
                className={`w-6 h-6 ${
                  wishlist.includes(product.id)
                    ? 'text-coral-accent fill-current'
                    : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.map((feature, index) => (
              <span key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                {index === 0 && <Thermometer className="w-4 h-4 mr-1" />}
                {index === 1 && <Shield className="w-4 h-4 mr-1" />}
                {index === 2 && <Zap className="w-4 h-4 mr-1" />}
                {feature}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className={product.originalPrice ? 'price-sale text-3xl' : 'price text-3xl'}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="price-original text-lg">
                ${product.originalPrice}
              </span>
            )}
            {!product.inStock && (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </div>

          <Link href={`/product/${product.id}`}>
            <button
              disabled={!product.inStock}
              className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all ${
                product.inStock
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>View Details</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation Header */}
      <nav className="hero-section sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-white">
              WAVE RIDERS
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="nav-link">All Products</Link>
              <a href="#" className="nav-link">Boards</a>
              <span className="nav-link text-sand-light font-semibold">Wetsuits</span>
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

      {/* Hero Section */}
      <div className="hero-section py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Waves className="w-8 h-8 text-white mr-3" />
            <h1 className="text-5xl font-bold text-white">Premium Wetsuits</h1>
          </div>
          <p className="text-xl text-sand-light mb-8 max-w-2xl mx-auto">
            Stay warm and comfortable in the water with our professional-grade wetsuits designed for every condition
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center">
              <Thermometer className="w-5 h-5 mr-2" />
              <span>Temperature Rated</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>Durable Construction</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              <span>Flexible Fit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-xl mb-6 text-ocean-primary flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Wetsuits</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, brand, or features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-secondary/20 focus:border-ocean-secondary outline-none"
                  />
                </div>
              </div>

              {/* Thickness Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Thickness</label>
                <div className="space-y-2">
                  {thicknesses.map((thickness) => (
                    <label key={thickness} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="thickness"
                        value={thickness}
                        checked={selectedThickness === thickness}
                        onChange={(e) => setSelectedThickness(e.target.value)}
                        className="mr-3 text-ocean-primary"
                      />
                      <span className="text-sm text-gray-700">{thickness}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Water Temperature Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Water Temperature</label>
                <div className="space-y-2">
                  {waterTemps.map((temp) => (
                    <label key={temp.label} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="waterTemp"
                        value={temp.label}
                        checked={selectedWaterTemp.label === temp.label}
                        onChange={() => setSelectedWaterTemp(temp)}
                        className="mr-3 text-ocean-primary"
                      />
                      <span className="text-sm text-gray-700">{temp.label}</span>
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
                  setSelectedThickness("All Thickness")
                  setSelectedBrand("All Brands")
                  setSelectedWaterTemp(waterTemps[0])
                  setSelectedPriceRange(priceRanges[0])
                  setSearchQuery("")
                }}
                className="w-full btn-secondary py-3 rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary flex items-center space-x-2 py-3 px-4 rounded-xl"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <p className="text-gray-600 font-medium">
                  {filteredAndSortedProducts.length} wetsuits found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-md' : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-md' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-ocean-secondary/20 focus:border-ocean-secondary outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <Waves className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-xl mb-2">No wetsuits found matching your criteria.</p>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {
                    setSelectedThickness("All Thickness")
                    setSelectedBrand("All Brands")
                    setSelectedWaterTemp(waterTemps[0])
                    setSelectedPriceRange(priceRanges[0])
                    setSearchQuery("")
                  }}
                  className="btn-primary py-3 px-6 rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => (
                  <WetsuitCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAndSortedProducts.map((product) => (
                  <WetsuitListItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}