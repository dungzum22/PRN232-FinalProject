import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import * as S from './ProductCard.styled';

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <S.Card>
      <S.ImageContainer onClick={() => onViewDetails(product.id)}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
        />
        <S.ImageOverlay />

        {product.stock < 5 && product.stock > 0 && (
          <S.Badge $variant="warning">
            Low Stock
          </S.Badge>
        )}
        {product.stock === 0 && (
          <S.Badge $variant="error">
            Out of Stock
          </S.Badge>
        )}
      </S.ImageContainer>

      <S.Content onClick={() => onViewDetails(product.id)}>
        <div>
          <S.CategoryBadge $variant="outline">
            {product.categoryName}
          </S.CategoryBadge>
          <S.Title>{product.name}</S.Title>
        </div>

        <S.Description>
          {product.description}
        </S.Description>

        <S.RatingContainer>
          <Star />
          <S.RatingText>
            {product.rating}
          </S.RatingText>
          <S.ReviewCount>
            ({product.reviewCount})
          </S.ReviewCount>
        </S.RatingContainer>

        <S.PriceContainer>
          <S.Price>${product.price.toFixed(2)}</S.Price>
        </S.PriceContainer>
      </S.Content>

      {onAddToCart && (
        <S.Footer>
          <S.AddToCartButton
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            $disabled={product.stock === 0}
            disabled={product.stock === 0}
          >
            <ShoppingCart />
            Add to Cart
          </S.AddToCartButton>
        </S.Footer>
      )}
    </S.Card>
  );
}
