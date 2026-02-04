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
        return 'hsl(230, 45%, 55%)'; // secondary
      case 'house':
        return 'hsl(168, 65%, 50%)'; // accent
      case 'lodge':
        return 'hsl(215, 25%, 27%)'; // primary
      case 'apartment':
        return 'hsl(230, 45%, 55%)'; // secondary
      case 'villa':
        return 'hsl(168, 65%, 50%)'; // accent
      case 'cottage':
        return 'hsl(215, 25%, 27%)'; // primary
      default:
        return 'hsl(230, 45%, 55%)'; // secondary
    }
  };

  return (
    <Link to={`/listing/${listing.id}`} data-testid={`listing-card-${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-soft-lg transition-all duration-300 h-full group">
        <div className="relative">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-white rounded-full p-2.5 shadow-soft hover:shadow-soft-md hover:scale-110 transition-all"
            data-testid={`favorite-button-${listing.id}`}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${favorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
            />
          </button>
          <Badge
            className="absolute top-3 left-3 font-semibold rounded-lg shadow-soft"
            style={{ backgroundColor: getTypeColor(), color: 'white' }}
            data-testid={`listing-type-badge-${listing.id}`}
          >
            {listing.type.toUpperCase()}
          </Badge>
        </div>

        <CardContent className="p-5">
          <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-secondary transition-colors" data-testid={`listing-title-${listing.id}`}>
            {listing.title}
          </h3>

          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1.5 text-accent" />
            <span data-testid={`listing-location-${listing.id}`}>{listing.location}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1.5" />
              <span>{listing.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1.5" />
              <span>{listing.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <Maximize className="h-4 w-4 mr-1.5" />
              <span>{listing.size} sqft</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-2xl font-bold text-secondary" data-testid={`listing-price-${listing.id}`}>
              {formatPrice()}
            </span>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-white font-semibold"
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
