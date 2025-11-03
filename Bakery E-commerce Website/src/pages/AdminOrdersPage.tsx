import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { orders as initialOrders } from '../lib/mockData';
import { Order } from '../types';
import { Button, Input } from '../components/styled';
import { Card, CardContent, CardHeader } from '../components/styled';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/styled';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/styled';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/styled';
import { Badge, Separator } from '../components/styled';
import * as S from './AdminPages.styled';

export function AdminOrdersPage() {
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = ordersList.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrdersList(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus as Order['status'], updatedAt: new Date().toISOString() }
          : order
      )
    );
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => 
        prev ? { ...prev, status: newStatus as Order['status'], updatedAt: new Date().toISOString() } : null
      );
    }
  };

  return (
    <S.Container>
      <S.Title>Orders Management</S.Title>

      <Card>
        <CardHeader>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <S.SearchWrapper style={{ flex: 1 }}>
              <Search />
              <Input
                placeholder="Search by order ID, customer name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </S.SearchWrapper>
            <div style={{ width: '200px' }}>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userName}</TableCell>
                  <TableCell className="text-gray-600">{order.userEmail}</TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div style={{ width: '140px' }}>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      $variant="ghost"
                      $size="icon"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <S.OrderDetails>
              {/* Customer Info */}
              <S.OrderSection>
                <S.OrderSectionTitle>Customer Information</S.OrderSectionTitle>
                <S.OrderInfo>
                  <S.OrderInfoRow>
                    <S.OrderInfoLabel>Name:</S.OrderInfoLabel>
                    <S.OrderInfoValue>{selectedOrder.userName}</S.OrderInfoValue>
                  </S.OrderInfoRow>
                  <S.OrderInfoRow>
                    <S.OrderInfoLabel>Email:</S.OrderInfoLabel>
                    <S.OrderInfoValue>{selectedOrder.userEmail}</S.OrderInfoValue>
                  </S.OrderInfoRow>
                </S.OrderInfo>
              </S.OrderSection>

              {/* Order Items */}
              <S.OrderSection>
                <S.OrderSectionTitle>Order Items</S.OrderSectionTitle>
                <S.OrderItemsList>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index}>
                      <S.OrderItem>
                        <S.OrderItemInfo>
                          <S.OrderItemName>{item.productName}</S.OrderItemName>
                          <S.OrderItemQuantity>Quantity: {item.quantity}</S.OrderItemQuantity>
                        </S.OrderItemInfo>
                        <div style={{ textAlign: 'right' }}>
                          <p>${item.price.toFixed(2)} each</p>
                          <S.OrderItemPrice>
                            ${(item.price * item.quantity).toFixed(2)}
                          </S.OrderItemPrice>
                        </div>
                      </S.OrderItem>
                      {index < selectedOrder.items.length - 1 && <Separator />}
                    </div>
                  ))}
                </S.OrderItemsList>
              </S.OrderSection>

              {/* Shipping Address */}
              <S.OrderSection>
                <S.OrderSectionTitle>Shipping Address</S.OrderSectionTitle>
                <S.OrderInfo>
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </S.OrderInfo>
              </S.OrderSection>

              {/* Order Summary */}
              <S.OrderSection>
                <S.OrderSectionTitle>Order Summary</S.OrderSectionTitle>
                <S.OrderInfo>
                  <S.OrderInfoRow>
                    <S.OrderInfoLabel>Subtotal</S.OrderInfoLabel>
                    <S.OrderInfoValue>${(selectedOrder.total / 1.15 - 5).toFixed(2)}</S.OrderInfoValue>
                  </S.OrderInfoRow>
                  <S.OrderInfoRow>
                    <S.OrderInfoLabel>Shipping</S.OrderInfoLabel>
                    <S.OrderInfoValue>$5.00</S.OrderInfoValue>
                  </S.OrderInfoRow>
                  <S.OrderInfoRow>
                    <S.OrderInfoLabel>Tax</S.OrderInfoLabel>
                    <S.OrderInfoValue>${((selectedOrder.total / 1.15 - 5) * 0.1).toFixed(2)}</S.OrderInfoValue>
                  </S.OrderInfoRow>
                  <Separator />
                  <S.OrderInfoRow>
                    <S.OrderInfoValue style={{ fontWeight: 600 }}>Total</S.OrderInfoValue>
                    <S.OrderItemPrice>${selectedOrder.total.toFixed(2)}</S.OrderItemPrice>
                  </S.OrderInfoRow>
                </S.OrderInfo>
              </S.OrderSection>

              {/* Status Update */}
              <S.FormField>
                <S.OrderSectionTitle>Update Order Status</S.OrderSectionTitle>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => handleStatusChange(selectedOrder.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </S.FormField>
            </S.OrderDetails>
          )}
        </DialogContent>
      </Dialog>
    </S.Container>
  );
}
