export type AccessControlObject = {
  roles: string[];
  individualUsers: string[];
};

export type Rating = {
  userId: string;
  rating: number;
  feedback?: string;
  createdAt: Date;
};
