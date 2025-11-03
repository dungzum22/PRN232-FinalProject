import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Header } from './components/Header';
import { AdminSidebar } from './components/AdminSidebar';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminCategoriesPage } from './pages/AdminCategoriesPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { Toaster } from './components/ui/sonner';

type Page = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'login' 
  | 'register'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'order-detail'
  | 'notifications'
  | 'admin'
  | 'admin-products'
  | 'admin-categories'
  | 'admin-orders';

interface NavigationState {
  page: Page;
  data?: any;
}

function AppContent() {
  const { user, isAdmin } = useAuth();
  const [navigation, setNavigation] = useState<NavigationState>({ page: 'home' });

  const handleNavigate = (page: Page, data?: any) => {
    setNavigation({ page, data });
    window.scrollTo(0, 0);
  };

  // Redirect logic
  useEffect(() => {
    const currentPage = navigation.page;
    
    // Redirect to login if accessing protected pages without auth
    if (!user && ['cart', 'checkout', 'orders', 'order-detail', 'notifications'].includes(currentPage)) {
      setNavigation({ page: 'login' });
      return;
    }

    // Redirect to home if non-admin tries to access admin pages
    if (!isAdmin && currentPage.startsWith('admin')) {
      setNavigation({ page: 'home' });
      return;
    }

    // Redirect admin to dashboard if accessing customer pages
    if (isAdmin && ['cart', 'checkout', 'orders', 'order-detail', 'notifications'].includes(currentPage)) {
      setNavigation({ page: 'admin' });
      return;
    }
  }, [user, isAdmin, navigation.page]);

  const renderPage = () => {
    switch (navigation.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'product-detail':
        return <ProductDetailPage productId={navigation.data?.productId} onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'orders':
        return <OrdersPage onNavigate={handleNavigate} />;
      case 'order-detail':
        return <OrderDetailPage orderId={navigation.data?.orderId} onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'admin-products':
        return <AdminProductsPage />;
      case 'admin-categories':
        return <AdminCategoriesPage />;
      case 'admin-orders':
        return <AdminOrdersPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminPage = navigation.page.startsWith('admin');

  return (
    <div className="min-h-screen bg-background">
      {!isAdminPage && <Header onNavigate={handleNavigate} currentPage={navigation.page} />}
      
      {isAdminPage ? (
        <div className="flex">
          <AdminSidebar currentPage={navigation.page} onNavigate={handleNavigate} />
          <main className="flex-1">
            {renderPage()}
          </main>
        </div>
      ) : (
        <main>
          {renderPage()}
        </main>
      )}
      
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
