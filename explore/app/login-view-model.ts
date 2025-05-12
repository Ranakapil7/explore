import { Observable, Frame } from '@nativescript/core';
import { authService } from './services/supabase';

export class LoginViewModel extends Observable {
    private _isUserType: boolean;
    private _email: string;
    private _password: string;
    private _isLoading: boolean;

    constructor() {
        super();
        this._isUserType = true;
        this._email = "";
        this._password = "";
        this._isLoading = false;
    }

    get isUserType(): boolean {
        return this._isUserType;
    }

    set isUserType(value: boolean) {
        if (this._isUserType !== value) {
            this._isUserType = value;
            this.notifyPropertyChange('isUserType', value);
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    onSelectUserType() {
        this.isUserType = true;
    }

    onSelectProviderType() {
        this.isUserType = false;
    }

    async onLogin() {
        if (!this._email || !this._password) {
            alert('Please enter both email and password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            this.isLoading = true;
            const response = await authService.signIn(this._email, this._password);
            
            if (response?.user) {
                this.navigateToMainPage();
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        } finally {
            this.isLoading = false;
        }
    }

    async onRegister() {
        if (!this._email || !this._password) {
            alert('Please enter both email and password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            this.isLoading = true;
            const response = await authService.signUp(this._email, this._password, !this._isUserType);
            
            if (response?.user) {
                alert('Registration successful! Please check your email to verify your account.');
                // Automatically log in after registration
                await this.onLogin();
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        } finally {
            this.isLoading = false;
        }
    }

    onSkipLogin() {
        this.navigateToMainPage();
    }

    private navigateToMainPage() {
        try {
            const moduleName = this._isUserType ? 'main-page' : 'provider-page';
            const frame = Frame.topmost();
            
            if (!frame) {
                console.error('Navigation frame not found');
                return;
            }

            frame.navigate({
                moduleName,
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'fade',
                    duration: 200
                }
            });
        } catch (error) {
            console.error('Navigation error:', error);
            // Try simple navigation as fallback
            const frame = Frame.topmost();
            if (frame) {
                const moduleName = this._isUserType ? 'main-page' : 'provider-page';
                frame.navigate(moduleName);
            }
        }
    }
}