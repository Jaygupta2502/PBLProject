export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'SUB_ADMIN' 
  | 'SUB_SUB_ADMIN' 
  | 'CLUB_PRESIDENT' 
  | 'VICE_PRESIDENT' 
  | 'SECRETARY';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  club?: string;
}