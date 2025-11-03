import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(217, 119, 87, 0.05);
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ImageContainer = styled.div`
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: fit-content;
`;

export const ProductTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Stars = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    height: 1.25rem;
    width: 1.25rem;
  }
`;

export const RatingText = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const Price = styled.div`
  margin-bottom: 1.5rem;
  
  span {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Stock = styled.div`
  margin-bottom: 1.5rem;
  
  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const Separator = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 1.5rem 0;
`;

export const QuantitySection = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const QuantityButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    ${({ $disabled, theme }) => !$disabled && `
      background: rgba(217, 119, 87, 0.05);
      border-color: ${theme.colors.primary};
    `}
  }
  
  svg {
    height: 1rem;
    width: 1rem;
  }
`;

export const QuantityDisplay = styled.span`
  width: 3rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export const AddToCartButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 2rem;
  background: ${({ theme, $disabled }) => 
    $disabled ? theme.colors.textMuted : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    ${({ theme, $disabled }) => !$disabled && `
      background: ${theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    `}
  }
  
  svg {
    margin-right: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  }
`;

export const ReviewsSection = styled.div`
  margin-top: 3rem;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

export const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const ReviewAuthor = styled.div``;

export const ReviewName = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: 0.25rem;
`;

export const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  
  svg {
    height: 1rem;
    width: 1rem;
  }
`;

export const ReviewDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ReviewComment = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

export const ReviewFormCard = styled(ReviewCard)`
  margin-bottom: 1.5rem;
`;

export const ReviewFormTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const RatingSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    
    svg {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  resize: vertical;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SubmitButton = styled.button<{ $disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $disabled }) => 
    $disabled ? theme.colors.textMuted : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    ${({ theme, $disabled }) => !$disabled && `
      background: ${theme.colors.primaryDark};
    `}
  }
`;

export const EmptyReviews = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 2rem 0;
`;

export const LoadingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
`;

export const LoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(217, 119, 87, 0.3);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

