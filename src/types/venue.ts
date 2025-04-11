export interface Building {
  id: string;
  name: string;
  venues: Venue[];
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
  facilities: string[];
}

export interface Department {
  id: string;
  name: string;
  staff: Staff[];
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
}

export const buildings: Building[] = [
  {
    id: 'main',
    name: 'Main Building',
    venues: [
      { id: 'main-audi', name: 'Main Auditorium', capacity: 500, facilities: ['Stage', 'Sound System', 'Projector'] },
      { id: 'conference-hall', name: 'Conference Hall', capacity: 200, facilities: ['Projector', 'Video Conferencing'] }
    ]
  },
  {
    id: 'science',
    name: 'Science Block',
    venues: [
      { id: 'physics-lab', name: 'Physics Lab', capacity: 100, facilities: ['Lab Equipment', 'Smart Board'] },
      { id: 'chemistry-lab', name: 'Chemistry Lab', capacity: 100, facilities: ['Lab Equipment', 'Safety Equipment'] },
      { id: 'seminar-hall', name: 'Seminar Hall', capacity: 150, facilities: ['Projector', 'Sound System'] }
    ]
  },
  {
    id: 'tech',
    name: 'Technology Block',
    venues: [
      { id: 'computer-lab', name: 'Computer Lab', capacity: 120, facilities: ['Computers', 'Internet', 'Projector'] },
      { id: 'innovation-hub', name: 'Innovation Hub', capacity: 80, facilities: ['3D Printer', 'Workshop Tools'] }
    ]
  },
  {
    id: 'library',
    name: 'Library Building',
    venues: [
      { id: 'digital-lab', name: 'Digital Library', capacity: 100, facilities: ['Computers', 'Online Resources'] },
      { id: 'discussion-room', name: 'Discussion Room', capacity: 30, facilities: ['Whiteboard', 'Round Table'] }
    ]
  }
];

export const departments: Department[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    staff: [
      { id: 'cs1', name: 'Dr. John Smith', role: 'Professor', email: 'john.smith@university.edu' },
      { id: 'cs2', name: 'Dr. Sarah Johnson', role: 'Associate Professor', email: 'sarah.j@university.edu' }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    staff: [
      { id: 'ph1', name: 'Dr. Michael Brown', role: 'Professor', email: 'm.brown@university.edu' },
      { id: 'ph2', name: 'Dr. Emily White', role: 'Assistant Professor', email: 'e.white@university.edu' }
    ]
  },
  {
    id: 'maths',
    name: 'Mathematics',
    staff: [
      { id: 'ma1', name: 'Dr. Robert Wilson', role: 'Professor', email: 'r.wilson@university.edu' },
      { id: 'ma2', name: 'Dr. Lisa Chen', role: 'Associate Professor', email: 'l.chen@university.edu' }
    ]
  }
];