import { create } from 'zustand';
import { Event, EventAnalytics, Ticket, StaffInvite } from '../types/event';
import { format, isPast, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { showSuccessMessage, showErrorMessage } from '../utils/notifications';
import { validateEventSubmission, validateStaffInvite, validateTicket } from '../utils/validation';

interface EventState {
  events: Event[];
  tickets: Ticket[];
  staffInvites: StaffInvite[];
  analytics: EventAnalytics;
  addEvent: (event: Partial<Event>) => Promise<boolean>;
  addTicket: (ticket: Partial<Ticket>) => Promise<boolean>;
  addStaffInvite: (invite: Partial<StaffInvite>) => Promise<boolean>;
  getEventsByClub: (club: string) => Event[];
  getTicketsByClub: (club: string) => Ticket[];
  getInvitesByClub: (club: string) => StaffInvite[];
  getUpcomingEvents: () => Event[];
  getPastEvents: () => Event[];
  getPendingApprovals: () => Event[];
  getApprovedEvents: () => Event[];
  checkOverlap: (date: string, startTime: string, endTime: string, venue: string) => boolean;
  updateAnalytics: () => void;
  getInvitesByCategory: (category: 'pending' | 'approved') => StaffInvite[];
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [
    {
      id: '1',
      title: 'Tech Workshop',
      club: 'Tech Club',
      date: '2025-03-25',
      startTime: '10:00',
      endTime: '12:00',
      venue: 'Main Auditorium',
      building: 'Main Building',
      description: 'Annual tech workshop',
      status: 'approved',
      clubLogo: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&q=80&w=2000',
      eventPoster: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2000',
      staffCoordinator: {
        id: 'cs1',
        name: 'Dr. John Smith',
        department: 'Computer Science'
      },
      createdAt: '2025-03-20T10:00:00Z',
      updatedAt: '2025-03-20T10:00:00Z',
      expectedAttendees: 200,
      requirements: 'Projector, Sound System'
    }
  ],
  
  tickets: [
    {
      id: '1',
      club: 'Tech Club',
      title: 'Venue Overlap Issue',
      description: 'Schedule conflict with Science Club event',
      status: 'pending',
      createdAt: '2025-03-20T10:00:00Z',
      priority: 'high',
      category: 'Venue',
      attachments: []
    }
  ],

  staffInvites: [
    {
      id: '1',
      club: 'Tech Club',
      staffId: 'cs1',
      staffName: 'Dr. John Smith',
      department: 'Computer Science',
      role: 'Event Coordinator',
      status: 'pending',
      createdAt: '2025-03-20T10:00:00Z',
      description: 'We need your expertise for our upcoming tech workshop',
      category: 'pending'
    }
  ],
  
  analytics: {
    clubEvents: [
      { club: 'Tech Club', count: 15 },
      { club: 'Science Club', count: 12 },
      { club: 'Arts Club', count: 8 }
    ],
    buildingUsage: [
      { building: 'Main Building', count: 25 },
      { building: 'Science Block', count: 18 },
      { building: 'Library Building', count: 12 }
    ],
    upcomingEvents: [],
    totalEvents: 45,
    pendingApprovals: 5,
    ticketsByPriority: [
      { priority: 'High', count: 5 },
      { priority: 'Medium', count: 8 },
      { priority: 'Low', count: 3 }
    ],
    invitesByDepartment: [
      { department: 'Computer Science', count: 10 },
      { department: 'Physics', count: 7 },
      { department: 'Mathematics', count: 5 }
    ],
    eventsByStatus: [
      { status: 'Approved', count: 30 },
      { status: 'Pending', count: 10 },
      { status: 'Rejected', count: 5 }
    ],
    monthlyEventCount: [
      { month: 'January', count: 8 },
      { month: 'February', count: 12 },
      { month: 'March', count: 15 }
    ]
  },

  addEvent: async (eventData) => {
    const errors = validateEventSubmission(eventData);
    if (errors.length > 0) {
      showErrorMessage('Please fix the validation errors');
      return false;
    }

    const hasOverlap = get().checkOverlap(
      eventData.date!,
      eventData.startTime!,
      eventData.endTime!,
      eventData.venue!
    );

    if (hasOverlap) {
      showErrorMessage('There is a scheduling conflict with another event');
      return false;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData as Event,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    set(state => ({
      events: [...state.events, newEvent]
    }));

    showSuccessMessage('Event request submitted successfully');
    get().updateAnalytics();
    return true;
  },

  addTicket: async (ticketData) => {
    const errors = validateTicket(
      ticketData.title!,
      ticketData.description!,
      ticketData.category!,
      ticketData.priority!
    );

    if (errors.length > 0) {
      showErrorMessage('Please fix the validation errors');
      return false;
    }

    const newTicket: Ticket = {
      id: Date.now().toString(),
      ...ticketData as Ticket,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    set(state => ({
      tickets: [...state.tickets, newTicket]
    }));

    showSuccessMessage('Ticket created successfully');
    return true;
  },

  addStaffInvite: async (inviteData) => {
    const errors = validateStaffInvite(
      inviteData.department!,
      inviteData.staffId!,
      inviteData.role!,
      inviteData.description!
    );

    if (errors.length > 0) {
      showErrorMessage('Please fix the validation errors');
      return false;
    }

    const newInvite: StaffInvite = {
      id: Date.now().toString(),
      ...inviteData as StaffInvite,
      status: 'pending',
      createdAt: new Date().toISOString(),
      category: 'pending'
    };

    set(state => ({
      staffInvites: [...state.staffInvites, newInvite]
    }));

    showSuccessMessage('Staff invitation sent successfully');
    return true;
  },

  getEventsByClub: (club) => {
    return get().events.filter(event => event.club === club);
  },

  getTicketsByClub: (club) => {
    return get().tickets.filter(ticket => ticket.club === club);
  },

  getInvitesByClub: (club) => {
    return get().staffInvites.filter(invite => invite.club === club);
  },

  getUpcomingEvents: () => {
    const now = new Date();
    return get().events
      .filter(event => {
        const eventDate = parseISO(`${event.date}T${event.startTime}`);
        return !isPast(eventDate) && event.status === 'approved';
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  getPastEvents: () => {
    const now = new Date();
    return get().events
      .filter(event => {
        const eventDate = parseISO(`${event.date}T${event.startTime}`);
        return isPast(eventDate) && event.status === 'approved';
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getPendingApprovals: () => {
    return get().events
      .filter(event => event.status === 'pending')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getApprovedEvents: () => {
    return get().events
      .filter(event => event.status === 'approved')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },

  getInvitesByCategory: (category) => {
    return get().staffInvites
      .filter(invite => invite.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  checkOverlap: (date, startTime, endTime, venue) => {
    const events = get().events;
    const checkTime = new Date(`${date}T${startTime}`);
    
    // Check if the event is at least 24 hours in advance
    const now = new Date();
    const timeDiff = checkTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    if (hoursDiff < 24) {
      return true; // Overlap if less than 24 hours notice
    }

    return events.some(event => {
      if (event.venue !== venue || event.date !== date) return false;

      const eventStart = new Date(`${event.date}T${event.startTime}`);
      const eventEnd = new Date(`${event.date}T${event.endTime}`);
      const newStart = new Date(`${date}T${startTime}`);
      const newEnd = new Date(`${date}T${endTime}`);

      return (newStart < eventEnd && newEnd > eventStart);
    });
  },

  updateAnalytics: () => {
    const events = get().events;
    const tickets = get().tickets;
    const invites = get().staffInvites;
    const now = new Date();
    const currentMonth = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    set(state => ({
      analytics: {
        ...state.analytics,
        clubEvents: updateClubEventCount(events),
        buildingUsage: updateBuildingUsage(events),
        upcomingEvents: get().getUpcomingEvents(),
        totalEvents: events.length,
        pendingApprovals: events.filter(e => e.status === 'pending').length,
        ticketsByPriority: updateTicketsByPriority(tickets),
        invitesByDepartment: updateInvitesByDepartment(invites),
        eventsByStatus: updateEventsByStatus(events),
        monthlyEventCount: updateMonthlyEventCount(events)
      }
    }));
  }
}));

function updateClubEventCount(events: Event[]) {
  const clubCounts = events.reduce((acc, event) => {
    acc[event.club] = (acc[event.club] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(clubCounts).map(([club, count]) => ({
    club,
    count
  }));
}

function updateBuildingUsage(events: Event[]) {
  const buildingCounts = events.reduce((acc, event) => {
    acc[event.building] = (acc[event.building] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(buildingCounts).map(([building, count]) => ({
    building,
    count
  }));
}

function updateTicketsByPriority(tickets: Ticket[]) {
  const priorityCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(priorityCounts).map(([priority, count]) => ({
    priority,
    count
  }));
}

function updateInvitesByDepartment(invites: StaffInvite[]) {
  const departmentCounts = invites.reduce((acc, invite) => {
    acc[invite.department] = (acc[invite.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(departmentCounts).map(([department, count]) => ({
    department,
    count
  }));
}

function updateEventsByStatus(events: Event[]) {
  const statusCounts = events.reduce((acc, event) => {
    acc[event.status] = (acc[event.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(statusCounts).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count
  }));
}

function updateMonthlyEventCount(events: Event[]) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const monthCounts = events.reduce((acc, event) => {
    const month = new Date(event.date).getMonth();
    acc[months[month]] = (acc[months[month]] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(monthCounts).map(([month, count]) => ({
    month,
    count
  }));
}