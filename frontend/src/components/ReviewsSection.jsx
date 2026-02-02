import { Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const ReviewsSection = ({ reviews, rating, reviewCount }) => {
  const getRatingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      breakdown[review.rating] = (breakdown[review.rating] || 0) + 1;
    });
    return breakdown;
  };

  const ratingBreakdown = getRatingBreakdown();
  const totalReviews = reviews.length;

  return (
    <Card data-testid="reviews-section">
      <CardHeader>
        <CardTitle className="text-lg" style={{ color: '#1F2937' }}>
          Reviews & Ratings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold" style={{ color: '#2563EB' }} data-testid="overall-rating">
              {rating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600" data-testid="review-count">
              Based on {reviewCount} reviews
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">{stars} star</span>
                <Progress 
                  value={totalReviews > 0 ? (ratingBreakdown[stars] / totalReviews) * 100 : 0} 
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-600 w-8">{ratingBreakdown[stars]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold" style={{ color: '#1F2937' }}>Recent Reviews</h3>
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0" data-testid={`review-${review.id}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold" style={{ color: '#1F2937' }}>{review.author}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
