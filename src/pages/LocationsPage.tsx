import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LocationCard } from '../components/weather/LocationCard';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { SearchInput } from '../components/common/Input';
import { ALL_SEARCHABLE_CITIES } from '../data/mockData';
import { UserLocation } from '../types/weather';
import { 
  MapPin, 
  Plus, 
  Check
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const LocationsPage: React.FC = () => {
  const { 
    locations, 
    activeLocationId, 
    setActiveLocation, 
    removeLocation, 
    addLocationByData, 
    navigateTo,
    settings
  } = useApp();

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customCityName, setCustomCityName] = useState('');
  const [customStateName, setCustomStateName] = useState('');

  const filteredCities = ALL_SEARCHABLE_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCity = (city: UserLocation) => {
    addLocationByData(city);
    setIsAddModalOpen(false);
    setSearchQuery('');
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityName.trim()) return;

    const newLoc: UserLocation = {
      id: `loc-custom-${Date.now()}`,
      city: customCityName.trim(),
      state: customStateName.trim() || 'India',
      country: 'India',
      latitude: 22.0,
      longitude: 75.0,
      timezone: 'Asia/Kolkata',
    };

    addLocationByData(newLoc);
    setCustomCityName('');
    setCustomStateName('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-skycare-softBlue/20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skycare-skyBlue/30 text-skycare-sun text-xs font-semibold mb-2 border border-skycare-sun/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pan-India City Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            {t.yourLocations}
          </h1>
          <p className="text-xs sm:text-sm text-skycare-cloud/70">
            Monitor, compare, and switch between your home, work, and travel destinations in India.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4 text-skycare-navy" />}
        >
          {t.addLocationBtn}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {locations.map((loc) => (
          <LocationCard
            key={loc.location.id}
            weather={loc}
            isActive={loc.location.id === activeLocationId}
            onMakeActive={() => setActiveLocation(loc.location.id)}
            onDelete={() => removeLocation(loc.location.id)}
            onViewWeather={() => {
              setActiveLocation(loc.location.id);
              navigateTo('weather');
            }}
          />
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add an Indian Location"
        subtitle="Search across states or enter a custom town."
        maxWidth="lg"
      >
        <div className="space-y-5 text-left">
          <SearchInput
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Search city or state (e.g. Pune, Jaipur, Kochi, Surat)..."
          />

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-skycare-cloud/60 block">
              Suggested Indian Cities
            </span>
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
              {filteredCities.map((c) => {
                const isSaved = locations.some((l) => l.location.city.toLowerCase() === c.city.toLowerCase());
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-skycare-navy/70 border border-skycare-softBlue/20 hover:border-skycare-softBlue/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-skycare-darkBlue text-skycare-sun">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{c.city}</h4>
                        <p className="text-xs text-skycare-cloud/60">{c.state}, India</p>
                      </div>
                    </div>

                    {isSaved ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-skycare-accentEmerald">
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </span>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAddCity(c)}
                        leftIcon={<Plus className="w-3.5 h-3.5" />}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleAddCustom} className="pt-4 border-t border-skycare-softBlue/20 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="City Name (e.g. Anand, Navsari)..."
                value={customCityName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomCityName(e.target.value)}
                className="flex-1 bg-skycare-navy/80 border border-skycare-softBlue/30 rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-skycare-cloud/40 focus:outline-none focus:ring-2 focus:ring-skycare-sun"
              />
              <input
                type="text"
                placeholder="State (e.g. Gujarat)"
                value={customStateName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomStateName(e.target.value)}
                className="w-1/3 bg-skycare-navy/80 border border-skycare-softBlue/30 rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-skycare-cloud/40 focus:outline-none focus:ring-2 focus:ring-skycare-sun"
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={!customCityName.trim()}
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
