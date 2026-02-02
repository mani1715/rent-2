import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { addFavorite, removeFavorite, isFavorite } from '@/utils/localStorage';

export const ListingCard = ({ listing }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(listing.id));
  }, [listing.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(listing.id);
      setFavorite(false);
    } else {
      addFavorite(listing.id);
      setFavorite(true);
    }
  };

  const formatPrice = () => {
    return `$${listing.price}/${listing.duration}`;
  };

  const getTypeColor = () => {
    switch (listing.type) {
      case 'room':
        return '#2563EB';
      case 'house':
        return '#10B981';
      case 'lodge':
        return '#1F2937';
      default:
        return '#1F2937';
    }
  };

  return (
    <Link to={`/listing/${listing.id}`} data-testid={`listing-card-${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
            data-testid={`favorite-button-${listing.id}`}
          >
            <Heart
              className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          <Badge
            className="absolute top-3 left-3"
            style={{ backgroundColor: getTypeColor(), color: 'white' }}
            data-testid={`listing-type-badge-${listing.id}`}
          >
            {listing.type.toUpperCase()}
          </Badge>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2" style={{ color: '#1F2937' }} data-testid={`listing-title-${listing.id}`}>
            {listing.title}
          </h3>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span data-testid={`listing-location-${listing.id}`}>{listing.location}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{listing.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{listing.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <Maximize className="h-4 w-4 mr-1" />
              <span>{listing.size} sqft</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-2xl font-bold" style={{ color: '#2563EB' }} data-testid={`listing-price-${listing.id}`}>
              {formatPrice()}
            </span>
            <Button
              size="sm"
              style={{ backgroundColor: '#10B981', color: 'white' }}
              onClick={(e) => e.preventDefault()}
              data-testid={`view-details-button-${listing.id}`}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
