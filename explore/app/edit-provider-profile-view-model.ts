import { Observable, Frame } from '@nativescript/core';
import { Provider } from './models/provider.model';

export class EditProviderProfileViewModel extends Observable {
    private _provider: Provider;

    constructor(provider: Provider) {
        super();
        this._provider = { ...provider };
    }

    get provider(): Provider {
        return this._provider;
    }

    onChangePhoto() {
        // In a real app, implement photo picker
        alert('Photo picker functionality coming soon!');
    }

    onSave() {
        // Validate
        if (!this._provider.name) {
            alert('Please enter your business name');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._provider.contactDetails.email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!this._provider.contactDetails.phone) {
            alert('Please enter a phone number');
            return;
        }

        // In a real app, save to backend here
        Frame.topmost().goBack();
    }
}