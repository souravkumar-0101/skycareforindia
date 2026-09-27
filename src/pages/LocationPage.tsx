import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SearchInput } from '../components/common/Input';
import { ALL_SEARCHABLE_CITIES } from '../data/mockData';
import { UserLocation } from '../types/weather';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Globe, 
  Check, 
  ChevronRight,
  Compass
} from 'lucide-react';

export const LocationPage: React.FC = () => {
  const { 
    addLocationByData, 
    activeLocationId, 
    locations, 
    navigateTo, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Filter searchable Indian cities
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return ALL_SEARCHABLE_CITIES;
    const q = searchQuery.toLowerCase();
    return ALL_SEARCHABLE_CITIES.filter(
      (c) =>
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const currentLoc: UserLocation = {
            id: 'loc-current',
            city: 'Vadodara',
            state: 'Gujarat',
            country: 'India',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timezone: 'Asia/Kolkata',
            isCurrent: true,
          };
          addLocationByData(currentLoc);
          showToast('GPS Location Detected', 'Using your location in India', 'success');
          navigateTo('home');
        },
        () => {
          setIsLocating(false);
          const fallbackLoc: UserLocation = ALL_SEARCHABLE_CITIES[0];
          addLocationByData({ ...fallbackLoc, isCurrent: true });
          showToast('Location Set', 'Using Vadodara, Gujarat (Central Station)', 'info');
          navigateTo('home');
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
      const fallbackLoc: UserLocation = ALL_SEARCHABLE_CITIES[0];
      addLocationByData({ ...fallbackLoc, isCurrent: true });
      navigateTo('home');
    }
  };

  const handleSelectCity = (city: UserLocation) => {
    addLocationByData(city);
    navigateTo('home');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skycare-skyBlue/30 text-skycare-sun text-xs font-semibold mb-3 border border-skycare-sun/30">
          <Compass className="w-3.5 h-3.5" />
          <span>Indian Location Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
          Know the weather around you.
        </h1>
        <p className="mt-1 text-sm sm:text-base text-skycare-cloud/70">
          Choose a location in India to personalize your forecast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={handleUseCurrentLocation}
          className="p-6 rounded-3xl bg-gradient-to-br from-skycare-skyBlue/70 via-skycare-darkBlue to-skycare-navy border border-skycare-sun/40 shadow-lg shadow-skycare-navy cursor-pointer hover:scale-[1.01] transition-all group select-none"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-skycare-sun text-skycare-navy font-bold shadow-md shadow-skycare-sun/20">
              <Navigation className={`w-6 h-6 ${isLocating ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-skycare-sun">
              Instant GPS
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-display mb-1">
            Use My Current Location
          </h3>
          <p className="text-xs text-skycare-cloud/70 leading-relaxed">
            Automatically detect your local weather with precision Indian atmospheric telemetry.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-skycare-darkBlue/70 border border-skycare-softBlue/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-skycare-navy text-skycare-accentCyan">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-skycare-cloud/60">
                Pan-India Coverage
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Search Cities Across India
            </h3>
            <p className="text-xs text-skycare-cloud/70 leading-relaxed">
              Explore forecasts across 28+ major Indian metropolitan areas, towns, and travel destinations.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
          <Search className="w-4 h-4 text-skycare-sun" />
          <span>Search by City or State</span>
        </h3>
        <SearchInput
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Search by city (e.g. Vadodara, Ahmedabad, Mumbai, Delhi, Bengaluru, Chennai)..."
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-skycare-cloud/60">
          <span>Matching Locations ({filteredCities.length})</span>
          <span>Click to select and view forecast</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredCities.map((city) => {
            const isAlreadyActive = locations.some(
              (l) => l.location.id === city.id && l.location.id === activeLocationId
            );

            return (
              <button
                key={city.id}
                onClick={() => handleSelectCity(city)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-skycare-sun ${
                  isAlreadyActive
                    ? 'bg-skycare-skyBlue/60 border-skycare-sun shadow-sm ring-1 ring-skycare-sun'
                    : 'bg-skycare-darkBlue/50 border-skycare-softBlue/20 hover:border-skycare-softBlue/60 hover:bg-skycare-darkBlue/90'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-skycare-navy text-skycare-sun shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate group-hover:text-skycare-sun transition-colors">
                      {city.city}
                    </h4>
                    <p className="text-xs text-skycare-cloud/60 truncate">
                      {city.state}, India
                    </p>
                  </div>
                </div>

                {isAlreadyActive ? (
                  <span className="p-1 rounded-full bg-skycare-sun text-skycare-navy shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-skycare-cloud/40 group-hover:text-skycare-sun group-hover:translate-x-0.5 transition-all shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
