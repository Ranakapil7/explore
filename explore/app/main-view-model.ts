import { Observable, ObservableArray, GestureEventData, Frame } from '@nativescript/core';
import { Experience } from './models/experience.model';
import { User } from './models/user.model';

export class HelloWorldModel extends Observable {
  private _experiences: ObservableArray<Experience>;
  private _likedExperiences: ObservableArray<Experience>;
  private _currentMood: number;
  private _currentIndex: number;
  private _currentUser: User;
  private _currentTab: string = 'discover';
  private _allExperiences: Experience[];

  constructor() {
    super();
    
    this._currentMood = 50;
    this._currentIndex = 0;
    this._experiences = new ObservableArray<Experience>();
    this._likedExperiences = new ObservableArray<Experience>();
    
    // Initialize with sample data
    this.loadSampleExperiences();
    this.initializeUser();
  }

  private initializeUser() {
    try {
      // Create a sample user
      this._currentUser = {
        id: 'sample-user',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        bio: 'Adventure enthusiast and nature lover',
        preferences: {
          activityTypes: ["outdoor", "wellness", "cultural"],
          moodRange: { min: 0, max: 100 },
          maxDistance: 50
        },
        likedExperiences: []
      };
      this.notifyPropertyChange('currentUser', this._currentUser);
    } catch (error) {
      console.error('Error initializing user:', error);
    }
  }

  private loadSampleExperiences() {
    try {
      this._allExperiences = [
        // Calming Activities (0-20 mood)
        {
          id: "1",
          title: "Meditation Session",
          description: "Find peace with guided meditation",
          imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Zen Center" },
          moodScore: 15,
          activityType: "wellness",
          contactDetails: { phone: "555-0101", email: "zen@example.com", website: "www.zencenter.com" },
          rating: 4.8,
          reviews: []
        },
        {
          id: "2",
          title: "Gentle Yoga",
          description: "Relaxing yoga session for beginners",
          imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Wellness Studio" },
          moodScore: 18,
          activityType: "wellness",
          contactDetails: { phone: "555-0102", email: "yoga@example.com", website: "www.gentleyoga.com" },
          rating: 4.6,
          reviews: []
        },
        {
          id: "3",
          title: "Tea Garden Visit",
          description: "Peaceful tea tasting experience",
          imageUrl: "https://images.unsplash.com/photo-1546845776-2e3a62a97441?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Japanese Garden" },
          moodScore: 20,
          activityType: "cultural",
          contactDetails: { phone: "555-0103", email: "tea@example.com", website: "www.teagarden.com" },
          rating: 4.7,
          reviews: []
        },
        // Mild Activities (20-40 mood)
        {
          id: "4",
          title: "Art Therapy Session",
          description: "Express yourself through art",
          imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Art Studio" },
          moodScore: 35,
          activityType: "wellness",
          contactDetails: { phone: "555-0104", email: "art@example.com", website: "www.arttherapy.com" },
          rating: 4.5,
          reviews: []
        },
        {
          id: "5",
          title: "Nature Walk",
          description: "Guided nature walk in the botanical gardens",
          imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Botanical Gardens" },
          moodScore: 38,
          activityType: "outdoor",
          contactDetails: { phone: "555-0105", email: "nature@example.com", website: "www.botanicalgarden.com" },
          rating: 4.4,
          reviews: []
        },
        // Moderate Activities (40-60 mood)
        {
          id: "6",
          title: "Cooking Class",
          description: "Learn to cook Italian cuisine",
          imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Culinary School" },
          moodScore: 55,
          activityType: "indoor",
          contactDetails: { phone: "555-0106", email: "cooking@example.com", website: "www.cookingschool.com" },
          rating: 4.9,
          reviews: []
        },
        {
          id: "7",
          title: "Pottery Workshop",
          description: "Create your own ceramic pieces",
          imageUrl: "https://images.unsplash.com/photo-1565193298357-c5b46b0506d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Pottery Studio" },
          moodScore: 58,
          activityType: "indoor",
          contactDetails: { phone: "555-0107", email: "pottery@example.com", website: "www.potterystudio.com" },
          rating: 4.7,
          reviews: []
        },
        // Energetic Activities (60-80 mood)
        {
          id: "8",
          title: "Dance Workshop",
          description: "Learn Latin dance moves",
          imageUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Dance Studio" },
          moodScore: 75,
          activityType: "indoor",
          contactDetails: { phone: "555-0108", email: "dance@example.com", website: "www.dancestudio.com" },
          rating: 4.8,
          reviews: []
        },
        {
          id: "9",
          title: "Rock Climbing",
          description: "Indoor climbing experience",
          imageUrl: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Climbing Gym" },
          moodScore: 78,
          activityType: "indoor",
          contactDetails: { phone: "555-0109", email: "climb@example.com", website: "www.climbinggym.com" },
          rating: 4.6,
          reviews: []
        },
        // Adventure Activities (80-100 mood)
        {
          id: "10",
          title: "Skydiving Experience",
          description: "Tandem skydiving adventure",
          imageUrl: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Skydiving Center" },
          moodScore: 95,
          activityType: "outdoor",
          contactDetails: { phone: "555-0110", email: "sky@example.com", website: "www.skydiving.com" },
          rating: 4.9,
          reviews: []
        },
        {
          id: "11",
          title: "Surfing Lessons",
          description: "Catch your first wave",
          imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          location: { latitude: 34.0522, longitude: -118.2437, address: "Beach" },
          moodScore: 90,
          activityType: "outdoor",
          contactDetails: { phone: "555-0111", email: "surf@example.com", website: "www.surflessons.com" },
          rating: 4.7,
          reviews: []
        }
      ];

      this.updateExperiencesBasedOnMood();
    } catch (error) {
      console.error('Error loading sample experiences:', error);
      // Initialize with at least one experience to prevent UI errors
      this._allExperiences = [{
        id: "1",
        title: "Sample Experience",
        description: "This is a sample experience",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        location: { latitude: 34.0522, longitude: -118.2437, address: "Sample Location" },
        moodScore: 50,
        activityType: "sample",
        contactDetails: { phone: "555-0000", email: "sample@example.com", website: "www.example.com" },
        rating: 5.0,
        reviews: []
      }];
      this._experiences.push(this._allExperiences[0]);
    }
  }

  private updateExperiencesBasedOnMood() {
    try {
      // Clear current experiences
      this._experiences.splice(0);
      
      // Filter experiences based on current mood
      const moodRange = 20; // Range above and below current mood to show
      const relevantExperiences = this._allExperiences.filter(exp => 
        Math.abs(exp.moodScore - this._currentMood) <= moodRange
      );
      
      // Sort by how close they match the current mood
      const sortedExperiences = relevantExperiences.sort((a, b) => 
        Math.abs(a.moodScore - this._currentMood) - Math.abs(b.moodScore - this._currentMood)
      );
      
      // Add filtered experiences to the observable array
      this._experiences.push(...sortedExperiences);
      this._currentIndex = 0;
      this.notifyPropertyChange('currentExperience', this.currentExperience);
    } catch (error) {
      console.error('Error updating experiences based on mood:', error);
      // If there's an error, ensure we have at least one experience
      if (this._experiences.length === 0 && this._allExperiences && this._allExperiences.length > 0) {
        this._experiences.push(this._allExperiences[0]);
        this._currentIndex = 0;
        this.notifyPropertyChange('currentExperience', this.currentExperience);
      }
    }
  }

  get currentExperience(): Experience {
    try {
      return this._experiences.getItem(this._currentIndex) || null;
    } catch (error) {
      console.error('Error getting current experience:', error);
      return null;
    }
  }

  get currentUser(): User {
    return this._currentUser;
  }

  set currentUser(value: User) {
    this._currentUser = value;
    this.notifyPropertyChange('currentUser', value);
  }

  get likedExperiences(): ObservableArray<Experience> {
    return this._likedExperiences;
  }

  get currentTab(): string {
    return this._currentTab;
  }

  set currentTab(value: string) {
    if (this._currentTab !== value) {
      this._currentTab = value;
      this.notifyPropertyChange('currentTab', value);
    }
  }

  get currentMood(): number {
    return this._currentMood;
  }

  set currentMood(value: number) {
    if (this._currentMood !== value) {
      this._currentMood = value;
      this.notifyPropertyChange('currentMood', value);
      this.notifyPropertyChange('moodText', this.moodText);
      this.notifyPropertyChange('moodEmoji', this.moodEmoji);
      this.updateExperiencesBasedOnMood();
    }
  }

  get moodText(): string {
    if (this._currentMood < 20) return "Feeling down";
    if (this._currentMood < 40) return "Could be better";
    if (this._currentMood < 60) return "Doing okay";
    if (this._currentMood < 80) return "Feeling good";
    return "Feeling amazing!";
  }

  get moodEmoji(): string {
    if (this._currentMood < 20) return "😢";
    if (this._currentMood < 40) return "😕";
    if (this._currentMood < 60) return "😊";
    if (this._currentMood < 80) return "😃";
    return "🤩";
  }

  onPan(args: GestureEventData) {
    try {
      const card = args.object;
      const deltaX = args.deltaX;

      if (args.state === 1) { // BEGAN
        card.translateX = 0;
      } else if (args.state === 2) { // CHANGED
        card.translateX = deltaX;
        card.opacity = 1 - Math.abs(deltaX) / 500;
      } else if (args.state === 3) { // ENDED
        if (Math.abs(deltaX) > 200) {
          if (deltaX > 0) {
            this.onLike();
          } else {
            this.onDislike();
          }
        }
        card.animate({
          translate: { x: 0, y: 0 },
          duration: 200,
          opacity: 1
        });
      }
    } catch (error) {
      console.error('Error in pan gesture:', error);
    }
  }

  onExperienceTap() {
    try {
      if (!this.currentExperience) {
        console.error('No current experience to navigate to');
        return;
      }
      
      const frame = Frame.topmost();
      if (!frame) {
        console.error('Navigation frame not found');
        return;
      }
      
      frame.navigate({
        moduleName: "experience-details-page",
        context: this.currentExperience,
        transition: {
          name: "slide"
        }
      });
    } catch (error) {
      console.error('Error navigating to experience details:', error);
    }
  }

  onSavedExperienceTap(args: GestureEventData) {
    try {
      const tappedItem = args.view.bindingContext as Experience;
      if (!tappedItem) {
        console.error('No experience item in tap event');
        return;
      }
      
      const frame = Frame.topmost();
      if (!frame) {
        console.error('Navigation frame not found');
        return;
      }
      
      frame.navigate({
        moduleName: "experience-details-page",
        context: tappedItem,
        transition: {
          name: "slide"
        }
      });
    } catch (error) {
      console.error('Error navigating to saved experience details:', error);
    }
  }

  onLike() {
    try {
      const experience = this.currentExperience;
      if (!experience) {
        console.error('No current experience to like');
        return;
      }
      
      if (!this._likedExperiences.some(e => e.id === experience.id)) {
        this._likedExperiences.push(experience);
      }
      this.nextExperience();
    } catch (error) {
      console.error('Error in like action:', error);
    }
  }

  onDislike() {
    try {
      this.nextExperience();
    } catch (error) {
      console.error('Error in dislike action:', error);
    }
  }

  private nextExperience() {
    try {
      if (this._currentIndex < this._experiences.length - 1) {
        this._currentIndex++;
        this.notifyPropertyChange('currentExperience', this.currentExperience);
      } else if (this._experiences.length > 0) {
        // If we're at the end, cycle back to the first experience
        this._currentIndex = 0;
        this.notifyPropertyChange('currentExperience', this.currentExperience);
      }
    } catch (error) {
      console.error('Error moving to next experience:', error);
    }
  }

  onTabTap(args) {
    try {
      const tab = args.object.get('data-tab');
      this.currentTab = tab;
    } catch (error) {
      console.error('Error changing tab:', error);
    }
  }

  onEditProfile() {
    try {
      if (!this._currentUser) {
        console.error('No current user to edit');
        return;
      }
      
      const frame = Frame.topmost();
      if (!frame) {
        console.error('Navigation frame not found');
        return;
      }
      
      frame.navigate({
        moduleName: "edit-profile-page",
        context: this._currentUser,
        transition: {
          name: "slide"
        }
      });
    } catch (error) {
      console.error('Error navigating to edit profile:', error);
    }
  }
}