import React from 'react';
import { LayoutDashboard, Package, FolderTree, ShoppingBag } from 'lucide-react';
import * as S from './AdminSidebar.styled';

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  const menuItems = [
    { id: 'admin', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-products', label: 'Products', icon: Package },
    { id: 'admin-categories', label: 'Categories', icon: FolderTree },
    { id: 'admin-orders', label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <S.SidebarContainer>
      <S.SidebarContent>
        <S.SidebarTitle>Admin Panel</S.SidebarTitle>
        <S.Nav>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <S.NavButton
                key={item.id}
                onClick={() => onNavigate(item.id)}
                $active={isActive}
              >
                <Icon />
                <span>{item.label}</span>
              </S.NavButton>
            );
          })}
        </S.Nav>
      </S.SidebarContent>
    </S.SidebarContainer>
  );
}
