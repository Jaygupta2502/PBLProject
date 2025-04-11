import { create } from 'zustand';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    // This is a mock login - replace with actual API call
    const mockUsers: Record<string, User> = {
      'dean@university.edu': {
        id: '1',
        email: 'dean@university.edu',
        name: 'Dr. Smith',
        role: 'SUPER_ADMIN'
      },
      'hod@university.edu': {
        id: '2',
        email: 'hod@university.edu',
        name: 'Dr. Johnson',
        role: 'SUB_ADMIN',
        department: 'Computer Science'
      },
      'coordinator@university.edu': {
        id: '3',
        email: 'coordinator@university.edu',
        name: 'Prof. Williams',
        role: 'SUB_SUB_ADMIN',
        department: 'Computer Science'
      },
      'president@university.edu': {
        id: '4',
        email: 'president@university.edu',
        name: 'John Doe',
        role: 'CLUB_PRESIDENT',
        club: 'Tech Club'
      }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers[email];
    if (user && password === 'password') {
      set({ user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));