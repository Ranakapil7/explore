export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  preferences: {
    activityTypes: string[];
    moodRange: {
      min: number;
      max: number;
    };
    maxDistance: number;
  };
  likedExperiences: string[];
}