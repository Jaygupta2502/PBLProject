import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { ValidationError } from '../types/event';

export const showValidationErrors = (errors: ValidationError[]) => {
  const errorMessages = errors.map(error => `• ${error.message}`).join('\n');
  
  Swal.fire({
    title: 'Validation Error',
    html: errorMessages.replace(/\n/g, '<br>'),
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#4F46E5'
  });
};

export const showSuccessMessage = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#FFFFFF'
    }
  });
};

export const showErrorMessage = (message: string) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#FFFFFF'
    }
  });
};

export const confirmAction = async (
  title: string,
  text: string,
  confirmButtonText: string = 'Yes',
  cancelButtonText: string = 'No'
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4F46E5',
    cancelButtonColor: '#6B7280',
    confirmButtonText,
    cancelButtonText
  });

  return result.isConfirmed;
};