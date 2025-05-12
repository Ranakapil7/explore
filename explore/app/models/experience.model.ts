export interface Experience {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  location: string;
  moodScore: number;
  activityType: string;
  contactDetails: {
    phone: string;
    email: string;
    website: string;
  };
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}