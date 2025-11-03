import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import * as S from './CartPage.styled';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <S.EmptyContainer>
        <S.Container>
          <S.EmptyContent>
            <S.EmptyIcon>
              <ShoppingBag />
            </S.EmptyIcon>
            <S.EmptyTitle>Your cart is empty</S.EmptyTitle>
            <S.EmptyText>
              Add some delicious items to your cart to get started!
            </S.EmptyText>
            <S.BrowseButton onClick={() => onNavigate('products')}>
              Browse Products
            </S.BrowseButton>
          </S.EmptyContent>
        </S.Container>
      </S.EmptyContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.Container>
        <S.Header>
          <S.HeaderIcon>
            <ShoppingBag />
          </S.HeaderIcon>
          <S.HeaderText>
            <S.Title>Shopping Cart</S.Title>
            <S.Subtitle>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</S.Subtitle>
          </S.HeaderText>
        </S.Header>

      <S.Grid>
        {/* Cart Items */}
        <S.CartItems>
          {cart.map(item => (
            <S.CartItem key={item.product.id}>
              <S.ItemContent>
                <S.ItemImage>
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </S.ItemImage>

                <S.ItemDetails>
                  <S.ItemHeader>
                    <S.ItemInfo>
                      <S.ItemName>{item.product.name}</S.ItemName>
                      <S.ItemCategory>{item.product.categoryName}</S.ItemCategory>
                    </S.ItemInfo>
                    <S.RemoveButton
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 />
                    </S.RemoveButton>
                  </S.ItemHeader>

                  <S.ItemFooter>
                    <S.QuantityControls>
                      <S.QuantityButton
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus />
                      </S.QuantityButton>
                      <S.QuantityDisplay>{item.quantity}</S.QuantityDisplay>
                      <S.QuantityButton
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        $disabled={item.quantity >= item.product.stock}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus />
                      </S.QuantityButton>
                    </S.QuantityControls>

                    <S.ItemPricing>
                      <S.UnitPrice>
                        ${item.product.price.toFixed(2)} each
                      </S.UnitPrice>
                      <S.TotalPrice>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </S.TotalPrice>
                    </S.ItemPricing>
                  </S.ItemFooter>
                </S.ItemDetails>
              </S.ItemContent>
            </S.CartItem>
          ))}
        </S.CartItems>

        {/* Order Summary */}
        <div>
          <S.SummaryCard>
            <S.SummaryTitle>Order Summary</S.SummaryTitle>

            <S.SummaryItems>
              <S.SummaryRow>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </S.SummaryRow>
              <S.SummaryRow>
                <span>Shipping</span>
                <span>$5.00</span>
              </S.SummaryRow>
              <S.SummaryRow>
                <span>Tax (10%)</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </S.SummaryRow>

              <S.Separator />

              <S.TotalRow>
                <span>Total</span>
                <span>
                  ${(cartTotal + 5 + cartTotal * 0.1).toFixed(2)}
                </span>
              </S.TotalRow>
            </S.SummaryItems>

            <S.CheckoutButton onClick={() => onNavigate('checkout')}>
              Proceed to Checkout
            </S.CheckoutButton>
          </S.SummaryCard>
        </div>
      </S.Grid>
      </S.Container>
    </S.PageContainer>
  );
}
