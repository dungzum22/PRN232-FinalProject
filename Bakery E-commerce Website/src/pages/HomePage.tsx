import { useState, useEffect } from 'react';
import { ArrowRight, Star, Clock, Award } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import * as api from '../lib/api';
import { Product } from '../types';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import * as S from './HomePage.styled';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const products = await api.getProducts();
      setFeaturedProducts(products.slice(0, 4));
    } catch (err) {
      console.error('Failed to load featured products:', err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Star, title: 'Premium Quality', desc: 'Sourced from the finest suppliers' },
    { icon: Clock, title: 'Fresh Daily', desc: 'Baked fresh every morning' },
    { icon: Award, title: 'Award Winning', desc: 'Recognized by industry experts' },
  ];

  return (
    <S.PageContainer>
      {/* Hero Section */}
      <S.HeroSection>
        <S.HeroBackground />

        <S.HeroContainer>
          <S.HeroContent>
            <S.Badge>
              <span>✨ Baked Fresh Daily</span>
            </S.Badge>
            <S.HeroTitle>
              Artisan Bakery,<br />
              <S.HeroHighlight>Made with Love</S.HeroHighlight>
            </S.HeroTitle>
            <S.HeroDescription>
              Discover our handcrafted breads, decadent cakes, and delightful pastries.
              Every bite tells a story of tradition, quality, and passion.
            </S.HeroDescription>
            <S.ButtonGroup>
              <S.PrimaryButton onClick={() => onNavigate('products')}>
                Shop Now
                <ArrowRight />
              </S.PrimaryButton>
              <S.SecondaryButton onClick={() => onNavigate('products')}>
                View Menu
              </S.SecondaryButton>
            </S.ButtonGroup>
          </S.HeroContent>
        </S.HeroContainer>

        <S.HeroImage>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1555939594-58d7cb561827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnl8ZW58MXx8fHwxNzYxOTkyNDcwfDA&ixlib=rb-4.1.0&q=80&w=1000&utm_source=figma&utm_medium=referral"
            alt="Fresh Baked Goods"
          />
        </S.HeroImage>
      </S.HeroSection>

      {/* Features Section */}
      <S.Section>
        <S.Container>
          <S.SectionHeader>
            <S.SectionTitle>Why Choose Our Bakery</S.SectionTitle>
            <S.SectionDescription>
              Premium quality ingredients, time-honored recipes, and a passion for perfection
            </S.SectionDescription>
          </S.SectionHeader>

          <S.Grid $cols={3}>
            {features.map((feature, idx) => (
              <S.FeatureCard key={idx}>
                <S.FeatureIcon>
                  <feature.icon />
                </S.FeatureIcon>
                <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                <S.FeatureDescription>{feature.desc}</S.FeatureDescription>
              </S.FeatureCard>
            ))}
          </S.Grid>
        </S.Container>
      </S.Section>

      {/* Featured Products */}
      <S.Section $bgColor="#f9f1ea">
        <S.Container>
          <S.SectionHeader>
            <S.SectionTitle>Featured Products</S.SectionTitle>
            <S.SectionDescription>Our best-sellers and customer favorites</S.SectionDescription>
          </S.SectionHeader>

          {loading ? (
            <S.LoadingContainer>
              <S.LoadingSpinner />
            </S.LoadingContainer>
          ) : (
            <S.ProductsGrid>
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(id) => onNavigate('product-detail', { productId: id })}
                  onAddToCart={(product) => addToCart(product, 1)}
                />
              ))}
            </S.ProductsGrid>
          )}
        </S.Container>
      </S.Section>
    </S.PageContainer>
  );
}
