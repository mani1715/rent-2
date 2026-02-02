import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mockListings } from '@/data/mockListings';
import { MapPreview } from '@/components/MapPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, MapPin, Bed, Bath, Maximize, CheckCircle2 } from 'lucide-react';
import { addFavorite, removeFavorite, isFavorite } from '@/utils/localStorage';

function ListingDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  
  const listingId = parseInt(params.id);
  const currentListing = mockListings.find(item => item.id === listingId);

  useEffect(() => {
    if (currentListing) {
      const isFav = isFavorite(currentListing.id);
      setFavorite(isFav);
    }
  }, [currentListing]);

  function handleFavoriteClick() {
    if (currentListing) {
      if (favorite) {
        removeFavorite(currentListing.id);
        setFavorite(false);
      } else {
        addFavorite(currentListing.id);
        setFavorite(true);
      }
    }
  }

  if (!currentListing) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <p className="text-xl text-gray-600">Property not found</p>
      </div>
    );
  }

  let badgeColor = '#1F2937';
  if (currentListing.type === 'room') badgeColor = '#2563EB';
  else if (currentListing.type === 'house') badgeColor = '#10B981';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6" data-testid="back-button">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={currentListing.images[0]}
                  alt={currentListing.title}
                  className="w-full h-96 object-cover"
                  data-testid="listing-detail-image"
                />
                <Badge
                  className="absolute top-4 left-4 text-sm px-3 py-1"
                  style={{ backgroundColor: badgeColor, color: 'white' }}
                  data-testid="listing-detail-type-badge"
                >
                  {currentListing.type.toUpperCase()}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }} data-testid="listing-detail-title">
                      {currentListing.title}
                    </h1>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span data-testid="listing-detail-location">{currentListing.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleFavoriteClick}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    data-testid="listing-detail-favorite-button"
                  >
                    <Heart className={`h-6 w-6 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>

                <div className="flex items-center gap-6 py-4 border-y border-gray-200 mb-6">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-semibold" data-testid="listing-detail-bedrooms">{currentListing.bedrooms}</span>
                    <span className="text-gray-600 ml-1">Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-semibold" data-testid="listing-detail-bathrooms">{currentListing.bathrooms}</span>
                    <span className="text-gray-600 ml-1">Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-semibold" data-testid="listing-detail-size">{currentListing.size}</span>
                    <span className="text-gray-600 ml-1">sqft</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3" style={{ color: '#1F2937' }}>
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed" data-testid="listing-detail-description">
                    {currentListing.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: '#1F2937' }}>
                    Features & Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {currentListing.features.map((feature, index) => (
                      <div key={index} className="flex items-center" data-testid={`feature-${index}`}>
                        <CheckCircle2 className="h-5 w-5 mr-2" style={{ color: '#10B981' }} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <MapPreview coordinates={currentListing.coordinates} location={currentListing.location} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Price</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold" style={{ color: '#2563EB' }} data-testid="listing-detail-price">
                      ${currentListing.price}
                    </span>
                    <span className="text-xl text-gray-600 ml-2">/ {currentListing.duration}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    style={{ backgroundColor: '#10B981', color: 'white' }}
                    data-testid="contact-owner-button"
                  >
                    Contact Owner
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    data-testid="schedule-visit-button"
                  >
                    Schedule Visit
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-3" style={{ color: '#1F2937' }}>
                    Property Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{currentListing.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode:</span>
                      <span className="font-medium capitalize">{currentListing.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{currentListing.size} sqft</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetailPage;
