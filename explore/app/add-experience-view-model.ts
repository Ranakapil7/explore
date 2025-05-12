import { Observable, Frame, ObservableArray } from '@nativescript/core';
import { Experience } from './models/experience.model';
import * as imagepicker from "@nativescript/imagepicker";

interface Photo {
    url: string;
}

export class AddExperienceViewModel extends Observable {
    private _experience: Experience;
    private _isEditing: boolean;
    private _photos: ObservableArray<Photo>;
    private static _experiences = new ObservableArray<Experience>();

    constructor(existingExperience?: Experience) {
        super();
        this._isEditing = !!existingExperience;
        this._photos = new ObservableArray<Photo>();
        
        if (existingExperience) {
            this._experience = { ...existingExperience };
            // If there are existing photos, add them to the photos array
            if (this._experience.imageUrl) {
                this._photos.push({ url: this._experience.imageUrl });
            }
            if (this._experience.additionalImages) {
                this._experience.additionalImages.forEach(url => {
                    this._photos.push({ url });
                });
            }
        } else {
            this._experience = {
                id: Date.now().toString(),
                title: "",
                description: "",
                imageUrl: "",
                additionalImages: [],
                location: {
                    latitude: 0,
                    longitude: 0,
                    address: ""
                },
                moodScore: 50,
                activityType: "",
                contactDetails: {
                    phone: "",
                    email: "",
                    website: ""
                },
                rating: 0,
                reviews: []
            };
        }
    }

    get experience(): Experience {
        return this._experience;
    }

    get isEditing(): boolean {
        return this._isEditing;
    }

    get photos(): ObservableArray<Photo> {
        return this._photos;
    }

    getMoodEmoji(moodScore: number): string {
        if (moodScore < 20) return "😢";
        if (moodScore < 40) return "😕";
        if (moodScore < 60) return "😊";
        if (moodScore < 80) return "😃";
        return "🤩";
    }

    getMoodText(moodScore: number): string {
        if (moodScore < 20) return "Best when feeling down";
        if (moodScore < 40) return "Good for low energy days";
        if (moodScore < 60) return "Perfect for neutral moods";
        if (moodScore < 80) return "Great when feeling good";
        return "Ideal for high energy days!";
    }

    async onAddPhoto() {
        const context = imagepicker.create({
            mode: "multiple"
        });

        try {
            const selection = await context.authorize();
            if (selection) {
                const imageAssets = await context.present();
                imageAssets.forEach(asset => {
                    // In a real app, you would upload the image to a server here
                    // For now, we'll use a placeholder URL
                    this._photos.push({
                        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    });
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    onRemovePhoto(args) {
        const index = args.object.bindingContext.index;
        this._photos.splice(index, 1);
    }

    onSave() {
        // Validate required fields
        if (!this._experience.title || !this._experience.description || !this._experience.location.address) {
            alert("Please fill in all required fields");
            return;
        }

        if (this._photos.length === 0) {
            alert("Please add at least one photo");
            return;
        }

        // Update experience with photos
        this._experience.imageUrl = this._photos.getItem(0).url;
        this._experience.additionalImages = this._photos
            .slice(1)
            .map(photo => photo.url);

        if (this._isEditing) {
            // Update existing experience
            const index = AddExperienceViewModel._experiences.findIndex(e => e.id === this._experience.id);
            if (index !== -1) {
                AddExperienceViewModel._experiences.setItem(index, this._experience);
            }
        } else {
            // Add new experience
            AddExperienceViewModel._experiences.push(this._experience);
        }

        // In a real app, save to backend here
        Frame.topmost().goBack();
    }

    static get experiences(): ObservableArray<Experience> {
        return this._experiences;
    }
}