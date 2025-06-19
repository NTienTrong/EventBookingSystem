import axios from 'axios';
import { BookingRequest } from '@/types/booking';
import { API_URL } from '../config';
import { eventsApi } from './events';
import { UserDTO } from '@/types/user';

export const bookingsApi = {
  createBooking: async (eventId: number, data: BookingRequest) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('No user found');
    }

    const user: UserDTO = JSON.parse(userStr);
    if (!user.id) {
      throw new Error('Invalid user data');
    }
    
    // Get event price
    const event = await eventsApi.getEventById(eventId.toString());
    
    const response = await axios.post(`${API_URL}/bookings`, {
      eventId: Number(eventId),
      userId: Number(user.id),
      tickets: data.tickets,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      totalAmount: Number(data.totalAmount),
      numberOfTickets: Number(data.numberOfTickets),
      paymentMethod: data.paymentMethod,
      bookingTime: new Date().toISOString()
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}; 