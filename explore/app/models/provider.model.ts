export interface Provider {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    contactDetails: {
        email: string;
        phone: string;
        website: string;
    };
}