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
