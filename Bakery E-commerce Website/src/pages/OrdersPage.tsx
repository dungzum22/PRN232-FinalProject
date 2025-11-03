import { useState, useEffect } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle, Star, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ReviewDialog } from '../components/ReviewDialog';
import * as api from '../lib/api';
import { Order } from '../types';
import * as S from './OrdersPage.styled';

interface OrdersPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function OrdersPage({ onNavigate }: OrdersPageProps) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; id: string; orderId: string } | null>(null);

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const fetchedOrders = await api.getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveReview = (productName: string, productId: string, orderId: string) => {
    setSelectedProduct({ name: productName, id: productId, orderId });
    setReviewDialogOpen(true);
  };

  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const activeOrders = orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

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

  const [activeTab, setActiveTab] = useState('all');

  const renderOrderCard = (order: Order) => (
    <S.OrderCard key={order.id}>
      <S.OrderHeader>
        <S.OrderInfo>
          <S.OrderTitleRow>
            <S.OrderTitle>Order #{order.id}</S.OrderTitle>
            <S.StatusBadge $status={order.status}>
              {getStatusIcon(order.status)}
              {order.status}
            </S.StatusBadge>
          </S.OrderTitleRow>
          <S.OrderDate>
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </S.OrderDate>
        </S.OrderInfo>
        <S.OrderTotal>
          <S.TotalLabel>Total</S.TotalLabel>
          <S.TotalAmount>${order.total.toFixed(2)}</S.TotalAmount>
        </S.OrderTotal>
      </S.OrderHeader>

      <S.OrderItems>
        <S.ItemsLabel>Items:</S.ItemsLabel>
        <S.ItemsList>
          {order.items.map((item, index) => (
            <S.OrderItem key={index}>
              <S.ItemName>
                {item.productName} <S.ItemQuantity>×{item.quantity}</S.ItemQuantity>
              </S.ItemName>
              <S.ItemPrice>${(item.price * item.quantity).toFixed(2)}</S.ItemPrice>
            </S.OrderItem>
          ))}
        </S.ItemsList>
      </S.OrderItems>

      <S.OrderActions>
        <S.ActionButton
          $variant="outline"
          onClick={() => onNavigate('order-detail', { orderId: order.id })}
        >
          View Details
        </S.ActionButton>
        {order.status === 'delivered' && (
          <S.ActionButton
            $variant="primary"
            onClick={() => handleLeaveReview(order.items[0].productName, order.items[0].productId, order.id)}
          >
            <Star />
            Leave Review
          </S.ActionButton>
        )}
      </S.OrderActions>
    </S.OrderCard>
  );

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <S.HeaderIcon>
            <ShoppingBag />
          </S.HeaderIcon>
          <S.HeaderText>
            <S.Title>Order History</S.Title>
            <S.Subtitle>Track and manage your orders</S.Subtitle>
          </S.HeaderText>
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <S.LoadingCard>
          <S.LoadingIcon>
            <Package />
          </S.LoadingIcon>
          <S.LoadingTitle>Loading Orders...</S.LoadingTitle>
          <S.LoadingText>
            Please wait while we fetch your order history.
          </S.LoadingText>
        </S.LoadingCard>
      ) : orders.length > 0 ? (
        <S.TabsContainer>
          <S.TabsList>
            <S.TabTrigger $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
              All Orders ({orders.length})
            </S.TabTrigger>
            <S.TabTrigger $active={activeTab === 'active'} onClick={() => setActiveTab('active')}>
              Active ({activeOrders.length})
            </S.TabTrigger>
            <S.TabTrigger $active={activeTab === 'delivered'} onClick={() => setActiveTab('delivered')}>
              Delivered ({deliveredOrders.length})
            </S.TabTrigger>
          </S.TabsList>

          {activeTab === 'all' && (
            <S.TabContent>
              {orders.map(renderOrderCard)}
            </S.TabContent>
          )}

          {activeTab === 'active' && (
            <S.TabContent>
              {activeOrders.length > 0 ? (
                activeOrders.map(renderOrderCard)
              ) : (
                <S.EmptyCard>
                  <Truck />
                  <p>No active orders</p>
                </S.EmptyCard>
              )}
            </S.TabContent>
          )}

          {activeTab === 'delivered' && (
            <S.TabContent>
              {deliveredOrders.length > 0 ? (
                deliveredOrders.map(renderOrderCard)
              ) : (
                <S.EmptyCard>
                  <CheckCircle />
                  <p>No delivered orders yet</p>
                </S.EmptyCard>
              )}
            </S.TabContent>
          )}
        </S.TabsContainer>
      ) : (
        <S.LoadingCard>
          <S.LoadingIcon>
            <Package />
          </S.LoadingIcon>
          <S.LoadingTitle>No orders yet</S.LoadingTitle>
          <S.LoadingText>
            Start shopping to place your first order and discover our delicious baked goods!
          </S.LoadingText>
          <S.BrowseButton onClick={() => onNavigate('products')}>
            Browse Products
          </S.BrowseButton>
        </S.LoadingCard>
      )}

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
