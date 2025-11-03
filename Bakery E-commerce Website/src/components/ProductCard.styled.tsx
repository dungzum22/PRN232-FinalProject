import styled from 'styled-components';

export const Card = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(217, 119, 87, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: translateY(-4px);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(249, 241, 234, 0.3), rgba(245, 230, 211, 0.2));
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 500ms ease-in-out;
  }
  
  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent, transparent);
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.normal};
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

export const Badge = styled.span<{ $variant?: 'default' | 'outline' | 'warning' | 'error' }>`
  position: ${({ $variant }) => ($variant === 'outline' ? 'static' : 'absolute')};
  top: ${({ $variant }) => ($variant === 'outline' ? 'auto' : '0.75rem')};
  right: ${({ $variant }) => ($variant === 'outline' ? 'auto' : '0.75rem')};
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'outline':
        return `
          background: transparent;
          border: 1px solid rgba(217, 119, 87, 0.3);
          color: ${theme.colors.primary};
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
        `;
      case 'error':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
    }
  }}
`;

export const Content = styled.div`
  padding: 1.25rem;
`;

export const CategoryBadge = styled(Badge)`
  margin-bottom: 0.5rem;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  
  svg {
    height: 1rem;
    width: 1rem;
    fill: #fbbf24;
    color: #fbbf24;
  }
`;

export const RatingText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export const ReviewCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Footer = styled.div`
  padding: 0 1.25rem 1.25rem;
`;

export const AddToCartButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $disabled }) => 
    $disabled ? theme.colors.textMuted : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  
  &:hover {
    ${({ theme, $disabled }) => !$disabled && `
      background: ${theme.colors.primaryDark};
      box-shadow: ${theme.shadows.lg};
      transform: translateY(-2px);
    `}
  }
  
  &:active {
    ${({ $disabled }) => !$disabled && `
      transform: translateY(0);
    `}
  }
  
  svg {
    margin-right: 0.5rem;
    height: 1rem;
    width: 1rem;
  }
`;

