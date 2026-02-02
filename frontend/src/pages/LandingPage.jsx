import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Building2, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const navigate = useNavigate();

  const propertyTypes = [
    {
      icon: Home,
      title: 'Rooms',
      description: 'Perfect for students and professionals',
      type: 'room'
    },
    {
      icon: Building2,
      title: 'Houses',
      description: 'Ideal for families and long-term stays',
      type: 'house'
    },
    {
      icon: Mountain,
      title: 'Lodges',
      description: 'Great for vacations and getaways',
      type: 'lodge'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1F2937' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="landing-hero-title">
            Find Your Perfect Rental Space
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto" data-testid="landing-hero-subtitle">
            Discover rooms, houses, and lodges for short or long-term stays. Your next home is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/listings')}
              style={{ backgroundColor: '#2563EB', color: 'white' }}
              className="text-lg px-8 py-6"
              data-testid="landing-browse-listings-button"
            >
              Browse Listings
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/add-listing')}
              className="text-lg px-8 py-6 bg-white"
              style={{ color: '#1F2937' }}
              data-testid="landing-list-property-button"
            >
              List Your Property
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: '#1F2937' }}>
            What are you looking for?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.type}
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500"
                  onClick={() => navigate(`/listings?type=${type.type}`)}
                  data-testid={`property-type-card-${type.type}`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="mb-4 inline-flex p-4 rounded-full" style={{ backgroundColor: '#EFF6FF' }}>
                      <Icon className="h-12 w-12" style={{ color: '#2563EB' }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F2937' }}>
                      {type.title}
                    </h3>
                    <p className="text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#1F2937' }}>
                Why Choose RentSpace?
              </h2>
              <ul className="space-y-4">
                {[
                  'Wide variety of properties across multiple locations',
                  'Flexible rental durations - night, week, or month',
                  'Verified listings with detailed information',
                  'Easy-to-use search and filter options',
                  'Save your favorite properties for later'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://via.placeholder.com/600x400/2563EB/FFFFFF?text=Happy+Renters"
                alt="Happy renters"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#2563EB' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of happy renters and landlords on RentSpace
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/listings')}
            className="text-lg px-8 py-6"
            style={{ backgroundColor: 'white', color: '#2563EB' }}
            data-testid="landing-cta-button"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
