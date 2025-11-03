import React from 'react';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { orders, products } from '../lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/styled';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/styled';
import { Badge } from '../components/styled';
import * as S from './AdminDashboardPage.styled';

export function AdminDashboardPage() {
  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const averageOrderValue = totalRevenue / totalOrders;

  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

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

  const getStatusColorHex = (status: string) => {
    switch (status) {
      case 'pending':
        return '#eab308';
      case 'processing':
        return '#3b82f6';
      case 'shipped':
        return '#a855f7';
      case 'delivered':
        return '#22c55e';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <S.Container>
      <S.Title>Dashboard</S.Title>

      {/* Stats Cards */}
      <S.StatsGrid>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <S.IconWrapper>
              <DollarSign />
            </S.IconWrapper>
          </CardHeader>
          <CardContent>
            <S.StatValue $primary>${totalRevenue.toFixed(2)}</S.StatValue>
            <S.StatLabel>From {totalOrders} orders</S.StatLabel>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Orders</CardTitle>
            <S.IconWrapper>
              <ShoppingBag />
            </S.IconWrapper>
          </CardHeader>
          <CardContent>
            <S.StatValue>{totalOrders}</S.StatValue>
            <S.StatLabel>
              {ordersByStatus.pending || 0} pending
            </S.StatLabel>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Products</CardTitle>
            <S.IconWrapper>
              <Package />
            </S.IconWrapper>
          </CardHeader>
          <CardContent>
            <S.StatValue>{totalProducts}</S.StatValue>
            <S.StatLabel>
              {products.filter(p => p.stock > 0).length} in stock
            </S.StatLabel>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg. Order Value</CardTitle>
            <S.IconWrapper>
              <TrendingUp />
            </S.IconWrapper>
          </CardHeader>
          <CardContent>
            <S.StatValue $primary>${averageOrderValue.toFixed(2)}</S.StatValue>
            <S.StatLabel>Per order</S.StatLabel>
          </CardContent>
        </Card>
      </S.StatsGrid>

      {/* Order Status Breakdown */}
      <S.TwoColumnGrid>
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <S.StatusList>
              {Object.entries(ordersByStatus).map(([status, count]) => (
                <S.StatusItem key={status}>
                  <S.StatusLabel>
                    <S.StatusDot $color={getStatusColorHex(status)} />
                    <S.StatusText>{status}</S.StatusText>
                  </S.StatusLabel>
                  <S.StatusCount>{count}</S.StatusCount>
                </S.StatusItem>
              ))}
            </S.StatusList>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <S.LowStockList>
              {products
                .filter(p => p.stock < 5)
                .map(product => (
                  <S.LowStockItem key={product.id}>
                    <span>{product.name}</span>
                    <Badge className="bg-orange-500">
                      {product.stock} left
                    </Badge>
                  </S.LowStockItem>
                ))}
              {products.filter(p => p.stock < 5).length === 0 && (
                <S.EmptyState>All products well-stocked</S.EmptyState>
              )}
            </S.LowStockList>
          </CardContent>
        </Card>
      </S.TwoColumnGrid>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userName}</TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </S.Container>
  );
}
