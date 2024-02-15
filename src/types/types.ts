export type AccessControlObject = {
  roles: string[];
  collaborators: string[];
};

export type Rating = {
  userId: string;
  rating: number;
  feedback?: string;
  createdAt: Date;
};

export type Status = 'pending' | 'approved' | 'rejected';
