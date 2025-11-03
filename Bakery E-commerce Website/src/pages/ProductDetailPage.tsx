import { useState, useEffect } from 'react';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import * as api from '../lib/api';
import { Product, Review } from '../types';
import * as S from './ProductDetailPage.styled';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

export function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [product, setProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadProductData();
  }, [productId]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      const [productData, reviewsData] = await Promise.all([
        api.getProductById(productId),
        api.getProductReviews(productId),
      ]);
      setProduct(productData);
      setProductReviews(reviewsData);
    } catch (err) {
      console.error('Failed to load product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      onNavigate('cart');
    }
  };

  const handleSubmitReview = async () => {
    if (!product) return;
    setSubmittingReview(true);
    try {
      const review = await api.createReview({
        productId: product.id,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setProductReviews([...productReviews, review]);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <S.LoadingContainer>
        <S.LoadingSpinner />
      </S.LoadingContainer>
    );
  }

  if (!product) {
    return (
      <S.Container>
        <p style={{ textAlign: 'center', color: '#9a8a7d', marginBottom: '1rem' }}>Product not found</p>
        <S.BackButton onClick={() => onNavigate('products')}>Back to Products</S.BackButton>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.BackButton onClick={() => onNavigate('products')}>
        ← Back to Products
      </S.BackButton>

      <S.ProductGrid>
        {/* Product Image */}
        <S.ImageContainer>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
          />
        </S.ImageContainer>

        {/* Product Info */}
        <S.ProductInfo>
          <S.CategoryBadge>{product.categoryName}</S.CategoryBadge>
          <S.ProductTitle>{product.name}</S.ProductTitle>

          <S.RatingContainer>
            <S.Stars>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </S.Stars>
            <S.RatingText>
              {product.rating} ({product.reviewCount} reviews)
            </S.RatingText>
          </S.RatingContainer>

          <S.Description>{product.description}</S.Description>

          <S.Price>
            <span>${product.price.toFixed(2)}</span>
          </S.Price>

          <S.Stock>
            <span>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </S.Stock>

          <S.Separator />

          {/* Quantity Selector */}
          <S.QuantitySection>
            <S.Label>Quantity</S.Label>
            <S.QuantityControls>
              <S.QuantityButton
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus />
              </S.QuantityButton>
              <S.QuantityDisplay>{quantity}</S.QuantityDisplay>
              <S.QuantityButton
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                $disabled={quantity >= product.stock}
                disabled={quantity >= product.stock}
              >
                <Plus />
              </S.QuantityButton>
            </S.QuantityControls>
          </S.QuantitySection>

          <S.AddToCartButton
            onClick={handleAddToCart}
            $disabled={product.stock === 0}
            disabled={product.stock === 0}
          >
            <ShoppingCart />
            Add to Cart
          </S.AddToCartButton>
        </S.ProductInfo>
      </S.ProductGrid>

      {/* Reviews Section */}
      <S.ReviewsSection>
        <S.SectionTitle>Customer Reviews</S.SectionTitle>

        {user && (
          <S.ReviewFormCard>
            <S.ReviewFormTitle>Write a Review</S.ReviewFormTitle>
            <div style={{ marginBottom: '1rem' }}>
              <S.Label>Rating</S.Label>
              <S.RatingSelector>
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  >
                    <Star
                      className={
                        i < newReview.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
              </S.RatingSelector>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <S.Label>Your Review</S.Label>
              <S.TextArea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this product..."
                rows={4}
              />
            </div>
            <S.SubmitButton
              onClick={handleSubmitReview}
              $disabled={submittingReview}
              disabled={submittingReview}
            >
              {submittingReview ? 'Submitting...' : 'Submit Review'}
            </S.SubmitButton>
          </S.ReviewFormCard>
        )}

        <div>
          {productReviews.length > 0 ? (
            productReviews.map(review => (
              <S.ReviewCard key={review.id}>
                <S.ReviewHeader>
                  <S.ReviewAuthor>
                    <S.ReviewName>{review.userName}</S.ReviewName>
                    <S.ReviewStars>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </S.ReviewStars>
                  </S.ReviewAuthor>
                  <S.ReviewDate>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </S.ReviewDate>
                </S.ReviewHeader>
                <S.ReviewComment>{review.comment}</S.ReviewComment>
              </S.ReviewCard>
            ))
          ) : (
            <S.EmptyReviews>No reviews yet. Be the first to review!</S.EmptyReviews>
          )}
        </div>
      </S.ReviewsSection>
    </S.Container>
  );
}
