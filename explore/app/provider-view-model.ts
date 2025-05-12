import { Observable, ObservableArray, Frame } from '@nativescript/core';
import { Experience } from './models/experience.model';
import { Provider } from './models/provider.model';

export class ProviderViewModel extends Observable {
    private _provider: Provider;
    private _experiences: ObservableArray<Experience>;

    constructor() {
        super();
        this._experiences = new ObservableArray<Experience>();
        this.initializeProvider();
        this.loadExperiences();
    }

    private initializeProvider() {
        this._provider = {
            id: "1",
            name: "Adventure Tours Inc.",
            avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            bio: "Creating unforgettable experiences since 2010",
            contactDetails: {
                email: "info@adventuretours.com",
                phone: "555-0123",
                website: "www.adventuretours.com"
            }
        };
    }

    private loadExperiences() {
        // Sample experiences for the provider
        const sampleExperiences = [
            {
                id: "1",
                title: "Mountain Hiking",
                description: "Guided hiking experience",
                imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                location: { latitude: 34.0522, longitude: -118.2437, address: "Mountain Trail" },
                moodScore: 75,
                activityType: "outdoor",
                contactDetails: { phone: "555-0101", email: "hike@example.com", website: "www.hiking.com" },
                rating: 4.8,
                reviews: []
            },
            {
                id: "2",
                title: "Rock Climbing Adventure",
                description: "Outdoor rock climbing for all levels",
                imageUrl: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                location: { latitude: 34.1522, longitude: -118.1437, address: "Climbing Rocks" },
                moodScore: 85,
                activityType: "outdoor",
                contactDetails: { phone: "555-0102", email: "climb@example.com", website: "www.rockclimbing.com" },
                rating: 4.9,
                reviews: []
            },
            {
                id: "3",
                title: "Kayaking Tour",
                description: "Explore the coastline by kayak",
                imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                location: { latitude: 34.0322, longitude: -118.5437, address: "Beach Launch" },
                moodScore: 65,
                activityType: "outdoor",
                contactDetails: { phone: "555-0103", email: "kayak@example.com", website: "www.kayaktours.com" },
                rating: 4.7,
                reviews: []
            }
        ];
        
        this._experiences.push(...sampleExperiences);
    }

    get provider(): Provider {
        return this._provider;
    }

    set provider(value: Provider) {
        this._provider = value;
        this.notifyPropertyChange('provider', value);
    }

    get experiences(): ObservableArray<Experience> {
        return this._experiences;
    }

    onAddExperience() {
        try {
            Frame.topmost().navigate({
                moduleName: "add-experience-page",
                transition: {
                    name: "slide"
                }
            });
        } catch (error) {
            console.error('Error navigating to add experience:', error);
        }
    }

    onEditExperience(args) {
        try {
            const experience = args.object.bindingContext;
            if (!experience) {
                console.error('No experience to edit');
                return;
            }
            
            Frame.topmost().navigate({
                moduleName: "add-experience-page",
                context: experience,
                transition: {
                    name: "slide"
                }
            });
        } catch (error) {
            console.error('Error navigating to edit experience:', error);
        }
    }

    onEditProfile() {
        try {
            Frame.topmost().navigate({
                moduleName: "edit-provider-profile-page",
                context: this._provider,
                transition: {
                    name: "slide"
                }
            });
        } catch (error) {
            console.error('Error navigating to edit profile:', error);
        }
    }
}