import { Observable, Frame } from '@nativescript/core';
import { User } from './models/user.model';

export class EditProfileViewModel extends Observable {
    private _user: User;
    private _selectedActivityTypes: Set<string>;

    constructor(user: User) {
        super();
        this._user = { ...user };
        this._selectedActivityTypes = new Set(user.preferences.activityTypes);
    }

    get user(): User {
        return this._user;
    }

    isActivityTypeSelected(type: string): boolean {
        return this._selectedActivityTypes.has(type);
    }

    onToggleActivityType(args) {
        const type = args.object.get('data-type');
        if (this._selectedActivityTypes.has(type)) {
            this._selectedActivityTypes.delete(type);
        } else {
            this._selectedActivityTypes.add(type);
        }
        this._user.preferences.activityTypes = Array.from(this._selectedActivityTypes);
        this.notifyPropertyChange('user', this._user);
    }

    onChangePhoto() {
        // In a real app, implement photo picker
        alert('Photo picker functionality coming soon!');
    }

    onSave() {
        // Validate
        if (!this._user.name) {
            alert('Please enter your name');
            return;
        }

        // In a real app, save to backend here
        Frame.topmost().goBack();
    }
}