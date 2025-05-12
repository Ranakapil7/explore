import { Observable, Utils } from '@nativescript/core';
import { Experience } from './models/experience.model';
import * as geolocation from '@nativescript/geolocation';

export class ExperienceDetailsViewModel extends Observable {
    private _experience: Experience;
    private _rating: number = 0;
    private _review: string = '';

    constructor(experience: Experience) {
        super();
        this._experience = experience;
    }

    get experience(): Experience {
        return this._experience;
    }

    get rating(): number {
        return this._rating;
    }

    get review(): string {
        return this._review;
    }

    set review(value: string) {
        if (this._review !== value) {
            this._review = value;
            this.notifyPropertyChange('review', value);
        }
    }

    getMoodText(moodScore: number): string {
        if (moodScore < 20) return "Best when feeling down";
        if (moodScore < 40) return "Good for low energy days";
        if (moodScore < 60) return "Perfect for neutral moods";
        if (moodScore < 80) return "Great when feeling good";
        return "Ideal for high energy days!";
    }

    getMoodEmoji(moodScore: number): string {
        if (moodScore < 20) return "😢";
        if (moodScore < 40) return "😕";
        if (moodScore < 60) return "😊";
        if (moodScore < 80) return "😃";
        return "🤩";
    }

    onRate(args) {
        const rating = parseInt(args.object.get('data-rating'));
        this._rating = rating;
        this.notifyPropertyChange('rating', rating);
    }

    onSubmitRating() {
        if (this._rating === 0) {
            alert('Please select a rating');
            return;
        }

        // Update the experience's rating
        const newRating = {
            rating: this._rating,
            review: this._review,
            userId: "current-user-id", // In a real app, get from auth
            date: new Date()
        };

        this._experience.reviews.push(newRating);
        
        // Calculate new average rating
        const totalRating = this._experience.reviews.reduce((sum, review) => sum + review.rating, 0);
        this._experience.rating = totalRating / this._experience.reviews.length;
        
        // In a real app, save to backend here
        alert('Thank you for your rating!');
        
        // Reset form
        this._rating = 0;
        this._review = '';
        this.notifyPropertyChange('rating', 0);
        this.notifyPropertyChange('review', '');
    }

    onCall() {
        Utils.openUrl(`tel:${this._experience.contactDetails.phone}`);
    }

    onEmail() {
        Utils.openUrl(`mailto:${this._experience.contactDetails.email}`);
    }

    onWebsite() {
        Utils.openUrl(`https://${this._experience.contactDetails.website}`);
    }

    async onOpenMap() {
        const hasPermission = await geolocation.enableLocationRequest();
        if (hasPermission) {
            const lat = this._experience.location.latitude;
            const lng = this._experience.location.longitude;
            Utils.openUrl(`geo:${lat},${lng}?q=${encodeURIComponent(this._experience.location.address)}`);
        }
    }

    onBook() {
        // Implement booking functionality
        alert("Booking feature coming soon!");
    }
}