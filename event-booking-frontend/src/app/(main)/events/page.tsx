'use client';

import { useState } from 'react';
import { EventCard } from '@/components/events/EventCard';
import { EventFilters } from '@/components/events/EventFilters';
import { mockEvents } from '@/data/mock';
import { Event } from '@/types/event';

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);

  const handleSearch = (filters: {
    search: string;
    date: string;
    location: string;
    category: string;
  }) => {
    let results = [...mockEvents];

    if (filters.search) {
      results = results.filter(
        (event) =>
          event.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.date) {
      results = results.filter((event) => event.startDate.includes(filters.date));
    }

    if (filters.location) {
      results = results.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter((event) => event.category === filters.category);
    }

    setFilteredEvents(results);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Khám phá sự kiện</h1>
      
      <div className="mb-8">
        <EventFilters onSearch={handleSearch} />
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            Không tìm thấy sự kiện nào phù hợp với tiêu chí tìm kiếm.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: Event) => (
            <EventCard 
              key={event.id}
              id={event.id}
              title={event.name}
              description={event.description}
              image={event.image}
              date={event.startDate}
              time={event.startDate}
              location={event.location}
              price={event.tickets[0]?.price || 0}
              category={event.category}
            />
          ))}
        </div>
      )}
    </div>
  );
} 