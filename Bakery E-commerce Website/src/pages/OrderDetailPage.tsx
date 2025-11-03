import React, { useState } from 'react';
import { Clock, Package, Truck, CheckCircle, MapPin, Star } from 'lucide-react';
import { orders } from '../lib/mockData';
import { Button } from '../components/styled';
import { Card, CardContent, CardHeader, CardTitle } from '../components/styled';
import { Badge } from '../components/styled';
import { Separator } from '../components/styled';
import { ReviewDialog } from '../components/ReviewDialog';
import * as S from './OrderDetailPage.styled';

interface OrderDetailPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

export function OrderDetailPage({ orderId, onNavigate }: OrderDetailPageProps) {
  const order = orders.find(o => o.id === orderId);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; id: string; orderId: string } | null>(null);

  const handleLeaveReview = (productName: string, productId: string) => {
    setSelectedProduct({ name: productName, id: productId, orderId });
    setReviewDialogOpen(true);
  };

  if (!order) {
    return (
      <S.Container>
        <S.EmptyState>
          <p>Order not found</p>
          <Button onClick={() => onNavigate('orders')}>Back to Orders</Button>
        </S.EmptyState>
      </S.Container>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const orderSteps = [
    { status: 'pending', label: 'Order Placed', icon: Clock, completed: true },
    { 
      status: 'processing', 
      label: 'Processing', 
      icon: Package, 
      completed: ['processing', 'shipped', 'delivered'].includes(order.status) 
    },
    { 
      status: 'shipped', 
      label: 'Shipped', 
      icon: Truck, 
      completed: ['shipped', 'delivered'].includes(order.status) 
    },
    { 
      status: 'delivered', 
      label: 'Delivered', 
      icon: CheckCircle, 
      completed: order.status === 'delivered' 
    },
  ];

  return (
    <S.Container>
      <S.BackButton onClick={() => onNavigate('orders')}>
        ← Back to Orders
      </S.BackButton>

      <S.OrderHeader>
        <S.OrderHeaderTop>
          <S.OrderTitle>Order #{order.id}</S.OrderTitle>
          <Badge className={getStatusColor(order.status)}>
            {order.status}
          </Badge>
        </S.OrderHeaderTop>
        <S.OrderDate>
          Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
          {new Date(order.createdAt).toLocaleTimeString()}
        </S.OrderDate>
      </S.OrderHeader>

      {/* Order Status Timeline */}
      {order.status !== 'cancelled' && (
        <Card style={{ marginBottom: '1.5rem' }}>
          <CardContent>
            <S.StatusTracker>
              {orderSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <S.StatusStep key={step.status} $completed={step.completed}>
                    <S.StatusIcon $completed={step.completed}>
                      <Icon />
                    </S.StatusIcon>
                    <S.StatusLabel $completed={step.completed}>{step.label}</S.StatusLabel>
                  </S.StatusStep>
                );
              })}
            </S.StatusTracker>
          </CardContent>
        </Card>
      )}

      <S.TwoColumnGrid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <S.OrderItemsList>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <S.OrderItem>
                      <S.ProductInfo>
                        <S.ProductName>{item.productName}</S.ProductName>
                        <S.ProductQuantity>
                          Quantity: {item.quantity}
                        </S.ProductQuantity>
                        {order.status === 'delivered' && (
                          <Button
                            $variant="ghost"
                            $size="sm"
                            onClick={() => handleLeaveReview(item.productName, item.productId)}
                            style={{
                              height: 'auto',
                              padding: 0,
                              marginTop: '0.5rem',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Star style={{ marginRight: '0.25rem', width: '0.75rem', height: '0.75rem' }} />
                            Write a review
                          </Button>
                        )}
                      </S.ProductInfo>
                      <div style={{ textAlign: 'right' }}>
                        <S.ProductQuantity>${item.price.toFixed(2)} each</S.ProductQuantity>
                        <S.ProductPrice>
                          ${(item.price * item.quantity).toFixed(2)}
                        </S.ProductPrice>
                      </div>
                    </S.OrderItem>
                    {index < order.items.length - 1 && <Separator style={{ marginTop: '1rem' }} />}
                  </div>
                ))}
              </S.OrderItemsList>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin style={{ width: '1.25rem', height: '1.25rem' }} />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <S.AddressInfo>
                <S.AddressIcon>
                  <MapPin />
                </S.AddressIcon>
                <S.AddressText>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </S.AddressText>
              </S.AddressInfo>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card style={{ position: 'sticky', top: '6rem' }}>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <S.SummaryRow>
                  <S.SummaryLabel>Subtotal</S.SummaryLabel>
                  <S.SummaryValue>${(order.total / 1.15 - 5).toFixed(2)}</S.SummaryValue>
                </S.SummaryRow>
                <S.SummaryRow>
                  <S.SummaryLabel>Shipping</S.SummaryLabel>
                  <S.SummaryValue>$5.00</S.SummaryValue>
                </S.SummaryRow>
                <S.SummaryRow>
                  <S.SummaryLabel>Tax</S.SummaryLabel>
                  <S.SummaryValue>${((order.total / 1.15 - 5) * 0.1).toFixed(2)}</S.SummaryValue>
                </S.SummaryRow>

                <Separator />

                <S.TotalRow>
                  <S.SummaryLabel>Total</S.SummaryLabel>
                  <S.SummaryValue style={{ fontSize: '1.25rem' }}>${order.total.toFixed(2)}</S.SummaryValue>
                </S.TotalRow>

                {order.status === 'delivered' && (
                  <Button
                    style={{ width: '100%', marginTop: '1rem' }}
                    onClick={() => handleLeaveReview(order.items[0].productName, order.items[0].productId)}
                  >
                    <Star style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }} />
                    Leave Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </S.TwoColumnGrid>

      {selectedProduct && (
        <ReviewDialog
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          productName={selectedProduct.name}
          productId={selectedProduct.id}
          orderId={selectedProduct.orderId}
        />
      )}
    </S.Container>
  );
}
