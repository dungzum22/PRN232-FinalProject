import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import * as api from '../lib/api';
import { Product, Category } from '../types';
import * as S from './ProductsPage.styled';

interface ProductsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Fetch products and categories on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, products]);

  return (
    <S.PageContainer>
      <S.Container>
        <S.Header>
          <S.Badge>
            <span>Premium Selection</span>
          </S.Badge>
          <S.Title>Our Products</S.Title>
          <S.Description>
            Browse our delicious selection of handcrafted baked goods
          </S.Description>
        </S.Header>

        {/* Filters */}
        <S.FiltersCard>
          <S.FiltersGrid>
            <S.SearchInputWrapper>
              <Search />
              <S.SearchInput
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </S.SearchInputWrapper>

            <S.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </S.Select>

            <S.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </S.Select>
          </S.FiltersGrid>

          {(searchQuery || selectedCategory !== 'all') && (
            <S.FilterInfo>
              <S.FilterText>
                {filteredProducts.length} products found
              </S.FilterText>
              <S.ClearButton
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </S.ClearButton>
            </S.FilterInfo>
          )}
        </S.FiltersCard>

        {/* Products Grid */}
        {loading ? (
          <S.LoadingContainer>
            <S.LoadingIcon>
              <S.LoadingSpinner />
            </S.LoadingIcon>
            <S.LoadingText>Loading products...</S.LoadingText>
          </S.LoadingContainer>
        ) : filteredProducts.length > 0 ? (
          <S.ProductsGrid>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(id) => onNavigate('product-detail', { productId: id })}
                onAddToCart={(product) => addToCart(product, 1)}
              />
            ))}
          </S.ProductsGrid>
        ) : (
          <S.EmptyContainer>
            <S.EmptyIcon>
              <Search />
            </S.EmptyIcon>
            <S.EmptyText>No products found matching your criteria.</S.EmptyText>
            <S.EmptyButton
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear filters
            </S.EmptyButton>
          </S.EmptyContainer>
        )}
      </S.Container>
    </S.PageContainer>
  );
}
