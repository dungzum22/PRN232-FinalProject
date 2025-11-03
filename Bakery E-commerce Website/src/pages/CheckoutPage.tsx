import { useState } from 'react';
import { CreditCard, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import * as S from './CheckoutPage.styled';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and navigate to orders
    clearCart();
    setLoading(false);
    onNavigate('orders');
  };

  if (cart.length === 0) {
    return (
      <S.EmptyContainer>
        <S.EmptyAlert>
          Your cart is empty. Please add items before checking out.
        </S.EmptyAlert>
        <S.BrowseButton onClick={() => onNavigate('products')}>
          Browse Products
        </S.BrowseButton>
      </S.EmptyContainer>
    );
  }

  const total = cartTotal + 5 + cartTotal * 0.1;

  return (
    <S.Container>
      <S.Title>Checkout</S.Title>

      <S.Form onSubmit={handleSubmit}>
        <S.Grid>
          <S.FormSection>
            {/* Shipping Address */}
            <S.Card>
              <S.CardHeader>
                <S.CardTitle>
                  <MapPin />
                  Shipping Address
                </S.CardTitle>
              </S.CardHeader>
              <S.CardContent>
                <S.FormGroup>
                  <S.Label>Street Address</S.Label>
                  <S.Input
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                    placeholder="123 Main St"
                    required
                  />
                </S.FormGroup>

                <S.InputRow>
                  <S.FormGroup>
                    <S.Label>City</S.Label>
                    <S.Input
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      placeholder="New York"
                      required
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>State</S.Label>
                    <S.Input
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      placeholder="NY"
                      required
                    />
                  </S.FormGroup>
                </S.InputRow>

                <S.InputRow>
                  <S.FormGroup>
                    <S.Label>ZIP Code</S.Label>
                    <S.Input
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      placeholder="10001"
                      required
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>Country</S.Label>
                    <S.Input
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      placeholder="USA"
                      required
                    />
                  </S.FormGroup>
                </S.InputRow>
              </S.CardContent>
            </S.Card>

            {/* Payment Information */}
            <S.Card>
              <S.CardHeader>
                <S.CardTitle>
                  <CreditCard />
                  Payment Information
                </S.CardTitle>
              </S.CardHeader>
              <S.CardContent>
                <S.Alert>
                  This is a demo checkout. Use any card details. No actual payment will be processed.
                </S.Alert>

                <S.FormGroup>
                  <S.Label>Card Number</S.Label>
                  <S.Input
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label>Cardholder Name</S.Label>
                  <S.Input
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </S.FormGroup>

                <S.InputRow>
                  <S.FormGroup>
                    <S.Label>Expiry Date</S.Label>
                    <S.Input
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                      placeholder="MM/YY"
                      required
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>CVV</S.Label>
                    <S.Input
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      placeholder="123"
                      type="password"
                      required
                    />
                  </S.FormGroup>
                </S.InputRow>
              </S.CardContent>
            </S.Card>
          </S.FormSection>

          {/* Order Summary */}
          <div>
            <S.SummaryCard>
              <S.CardHeader>
                <S.CardTitle>Order Summary</S.CardTitle>
              </S.CardHeader>
              <S.CardContent>
                <S.OrderItems>
                  {cart.map(item => (
                    <S.OrderItem key={item.product.id}>
                      <span>
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </S.OrderItem>
                  ))}
                </S.OrderItems>

                <S.Separator />

                <S.SummaryRows>
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
                </S.SummaryRows>

                <S.Separator />

                <S.TotalRow>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </S.TotalRow>

                <S.SubmitButton type="submit" $disabled={loading} disabled={loading}>
                  {loading ? 'Processing...' : 'Place Order'}
                </S.SubmitButton>
              </S.CardContent>
            </S.SummaryCard>
          </div>
        </S.Grid>
      </S.Form>
    </S.Container>
  );
}
