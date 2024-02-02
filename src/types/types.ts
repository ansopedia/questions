export type AccessControlObject = {
  roles?: string[];
  groups?: string[];
  individualUsers?: string[];
};

export type Rating = {
  userId: string;
  rating: number;
  feedback?: string;
  createdAt: Date;
};
