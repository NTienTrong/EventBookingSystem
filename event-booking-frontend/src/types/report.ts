export interface ReportDTO {
  revenueData?: Array<{
    month: string;
    revenue: number;
  }>;
  ticketTypeData?: Array<{
    name: string;
    revenue: number;
    eventName: string;
    price: number;
    quantity: number;
  }>;
  popularEvents?: Array<{
    name: string;
    tickets: number;
  }>;
  summary?: {
    totalRevenue: number;
    totalTickets: number;
    totalEvents: number;
    averageTicketPrice: number;
  };
  userActivity?: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    userActivityData: Array<{
      date: string;
      active: number;
      new: number;
    }>;
  };
  userTicketHistory?: Array<{
    userId: number;
    userName: string;
    email: string;
    totalTickets: number;
    totalSpent: number;
    lastPurchase: string;
    events: string[];
  }>;
  userEventHistory?: Array<{
    eventId: number;
    eventName: string;
    date: string;
    totalParticipants: number;
    userDemographics: {
      ageGroups: Array<{
        range: string;
        count: number;
      }>;
      gender: Array<{
        name: string;
        count: number;
      }>;
    };
  }>;
  startDate?: string;
  endDate?: string;
} 