import { format, isAfter, isBefore, parseISO, addHours } from 'date-fns';
import { Event, ValidationError } from '../types/event';

export const validateEventSubmission = (formData: Partial<Event>): ValidationError[] => {
  const errors: ValidationError[] = [];
  const now = new Date();

  // Required fields
  if (!formData.title?.trim()) {
    errors.push({ field: 'title', message: 'Event title is required' });
  }

  if (!formData.date) {
    errors.push({ field: 'date', message: 'Event date is required' });
  } else {
    const eventDate = parseISO(formData.date);
    if (isBefore(eventDate, now)) {
      errors.push({ field: 'date', message: 'Event date must be in the future' });
    }
  }

  if (!formData.startTime) {
    errors.push({ field: 'startTime', message: 'Start time is required' });
  }

  if (!formData.endTime) {
    errors.push({ field: 'endTime', message: 'End time is required' });
  }

  // Time validation
  if (formData.startTime && formData.endTime) {
    const startDateTime = parseISO(`${formData.date}T${formData.startTime}`);
    const endDateTime = parseISO(`${formData.date}T${formData.endTime}`);
    
    // Check if event is at least 24 hours in advance
    if (isBefore(startDateTime, addHours(now, 24))) {
      errors.push({ 
        field: 'date', 
        message: 'Events must be scheduled at least 24 hours in advance' 
      });
    }

    // Check if end time is after start time
    if (!isAfter(endDateTime, startDateTime)) {
      errors.push({ 
        field: 'endTime', 
        message: 'End time must be after start time' 
      });
    }

    // Check if within operating hours (9 AM - 5 PM)
    const startHour = parseInt(formData.startTime.split(':')[0]);
    const endHour = parseInt(formData.endTime.split(':')[0]);
    
    if (startHour < 9 || startHour > 17) {
      errors.push({ 
        field: 'startTime', 
        message: 'Events must be scheduled between 9 AM and 5 PM' 
      });
    }
    
    if (endHour < 9 || endHour > 17) {
      errors.push({ 
        field: 'endTime', 
        message: 'Events must end between 9 AM and 5 PM' 
      });
    }
  }

  // Venue validation
  if (!formData.venue) {
    errors.push({ field: 'venue', message: 'Venue is required' });
  }

  if (!formData.building) {
    errors.push({ field: 'building', message: 'Building is required' });
  }

  // Staff coordinator validation
  if (!formData.staffCoordinator) {
    errors.push({ 
      field: 'staffCoordinator', 
      message: 'Staff coordinator is required' 
    });
  }

  // Description validation
  if (!formData.description?.trim()) {
    errors.push({ 
      field: 'description', 
      message: 'Event description is required' 
    });
  } else if (formData.description.length < 50) {
    errors.push({ 
      field: 'description', 
      message: 'Description must be at least 50 characters long' 
    });
  }

  return errors;
};

export const validateStaffInvite = (
  department: string,
  staff: string,
  role: string,
  description: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!department) {
    errors.push({ 
      field: 'department', 
      message: 'Department is required' 
    });
  }

  if (!staff) {
    errors.push({ 
      field: 'staff', 
      message: 'Staff member selection is required' 
    });
  }

  if (!role?.trim()) {
    errors.push({ 
      field: 'role', 
      message: 'Role is required' 
    });
  }

  if (!description?.trim()) {
    errors.push({ 
      field: 'description', 
      message: 'Description is required' 
    });
  } else if (description.length < 50) {
    errors.push({ 
      field: 'description', 
      message: 'Description must be at least 50 characters long' 
    });
  }

  return errors;
};

export const validateTicket = (
  title: string,
  description: string,
  category: string,
  priority: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!title?.trim()) {
    errors.push({ 
      field: 'title', 
      message: 'Ticket title is required' 
    });
  }

  if (!description?.trim()) {
    errors.push({ 
      field: 'description', 
      message: 'Description is required' 
    });
  } else if (description.length < 50) {
    errors.push({ 
      field: 'description', 
      message: 'Description must be at least 50 characters long' 
    });
  }

  if (!category) {
    errors.push({ 
      field: 'category', 
      message: 'Category is required' 
    });
  }

  if (!priority) {
    errors.push({ 
      field: 'priority', 
      message: 'Priority level is required' 
    });
  }

  return errors;
};