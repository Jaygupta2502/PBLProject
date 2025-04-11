import { User } from './auth';

export interface Event {
  id: string;
  title: string;
  club: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  building: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  clubLogo?: string;
  eventPoster?: string;
  staffCoordinator: {
    id: string;
    name: string;
    department: string;
  };
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
  requirements?: string;
  expectedAttendees?: number;
}

export interface Ticket {
  id: string;
  club: string;
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'in-progress';
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  resolution?: string;
  category: 'Technical' | 'Venue' | 'Equipment' | 'Other';
  attachments?: string[];
}

export interface StaffInvite {
  id: string;
  club: string;
  staffId: string;
  staffName: string;
  department: string;
  role: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  response?: string;
  description: string;
  poster?: string;
  category: 'pending' | 'approved';
  rejectionReason?: string;
}

export interface EventAnalytics {
  clubEvents: {
    club: string;
    count: number;
  }[];
  buildingUsage: {
    building: string;
    count: number;
  }[];
  upcomingEvents: Event[];
  totalEvents: number;
  pendingApprovals: number;
  ticketsByPriority: {
    priority: string;
    count: number;
  }[];
  invitesByDepartment: {
    department: string;
    count: number;
  }[];
  eventsByStatus: {
    status: string;
    count: number;
  }[];
  monthlyEventCount: {
    month: string;
    count: number;
  }[];
}

export interface ValidationError {
  field: string;
  message: string;
}