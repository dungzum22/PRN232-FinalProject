import React, { useState } from 'react';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './styled';
import { Button } from './styled';
import { Textarea, Label } from './styled';
import { toast } from 'sonner@2.0.3';

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productId: string;
  orderId: string;
}

export function ReviewDialog({ 
  open, 
  onOpenChange, 
  productName, 
  productId,
  orderId 
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, save the review to localStorage or backend
      const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const newReview = {
        id: `rev-${Date.now()}`,
        productId,
        orderId,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('reviews', JSON.stringify([...existingReviews, newReview]));
      
      toast.success('Review submitted successfully!');
      setIsSubmitting(false);
      setRating(0);
      setComment('');
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <p style={{ color: '#8b7355', marginTop: '0.5rem' }}>
            Share your experience with {productName}
          </p>
        </DialogHeader>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
          {/* Rating Stars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label>Your Rating</Label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    padding: 0
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Star
                    style={{
                      width: '2rem',
                      height: '2rem',
                      fill: star <= (hoveredRating || rating) ? '#facc15' : 'none',
                      color: star <= (hoveredRating || rating) ? '#facc15' : '#d1d5db'
                    }}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p style={{ fontSize: '0.875rem', color: '#8b7355' }}>
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Label htmlFor="review-comment">Your Review</Label>
            <Textarea
              id="review-comment"
              placeholder="Tell us about your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              style={{ resize: 'none' }}
            />
            <p style={{ fontSize: '0.875rem', color: '#8b7355' }}>
              {comment.length}/500 characters
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button
            $variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
