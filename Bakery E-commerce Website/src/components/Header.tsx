import { useState } from 'react';
import { ShoppingCart, User, LogOut, Bell, LayoutDashboard, Cake } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNotifications } from '../contexts/NotificationContext';
import * as S from './Header.styled';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { unreadCount } = useNotifications();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.LeftSection>
          <S.Logo onClick={() => onNavigate('home')}>
            <S.LogoIcon>
              <Cake />
            </S.LogoIcon>
            <S.LogoText>Sweet Bakery</S.LogoText>
          </S.Logo>

          <S.Nav>
            <S.NavButton
              onClick={() => onNavigate('home')}
              $active={currentPage === 'home'}
            >
              Home
            </S.NavButton>
            <S.NavButton
              onClick={() => onNavigate('products')}
              $active={currentPage === 'products' || currentPage === 'product-detail'}
            >
              Products
            </S.NavButton>
          </S.Nav>
        </S.LeftSection>

        <S.RightSection>
          {user ? (
            <>
              {!isAdmin && (
                <>
                  <S.IconButton onClick={() => onNavigate('notifications')}>
                    <Bell />
                    {unreadCount > 0 && (
                      <S.CartBadge>{unreadCount}</S.CartBadge>
                    )}
                  </S.IconButton>

                  <S.IconButton onClick={() => onNavigate('cart')}>
                    <ShoppingCart />
                    {cartCount > 0 && (
                      <S.CartBadge>{cartCount}</S.CartBadge>
                    )}
                  </S.IconButton>
                </>
              )}

              <S.DropdownContainer>
                <S.UserButton onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <User />
                </S.UserButton>
                <S.DropdownContent $isOpen={dropdownOpen}>
                  <div style={{ padding: '0.75rem 1rem', background: '#f9f1ea', borderRadius: '0.75rem 0.75rem 0 0' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#9a8a7d', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                  </div>
                  <S.DropdownSeparator />
                  {isAdmin ? (
                    <S.DropdownItem onClick={() => { onNavigate('admin'); setDropdownOpen(false); }}>
                      <LayoutDashboard />
                      Dashboard
                    </S.DropdownItem>
                  ) : (
                    <S.DropdownItem onClick={() => { onNavigate('orders'); setDropdownOpen(false); }}>
                      <ShoppingCart />
                      Order History
                    </S.DropdownItem>
                  )}
                  <S.DropdownSeparator />
                  <S.DropdownItem onClick={() => { logout(); setDropdownOpen(false); }} style={{ color: '#f44336' }}>
                    <LogOut />
                    Logout
                  </S.DropdownItem>
                </S.DropdownContent>
              </S.DropdownContainer>
            </>
          ) : (
            <>
              <S.AuthButton
                $variant="outline"
                onClick={() => onNavigate('login')}
              >
                Login
              </S.AuthButton>
              <S.AuthButton
                $variant="primary"
                onClick={() => onNavigate('register')}
              >
                Sign Up
              </S.AuthButton>
            </>
          )}
        </S.RightSection>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}
