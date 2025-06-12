import { useState } from 'react';
import { Event, EventFilter } from '@/types/event';
import { eventsApi } from '@/services/api/events';

export const useEvents = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEvents = async (filter?: EventFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.getEvents(filter);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEventById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.getEventById(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.createEvent(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, data: Partial<Event>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.updateEvent(id, data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.deleteEvent(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.getCategories();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getCategories,
  };
}; 