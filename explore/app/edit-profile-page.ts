import { NavigatedData, Page } from '@nativescript/core';
import { EditProfileViewModel } from './edit-profile-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const user = args.context;
    
    if (!page.bindingContext) {
        page.bindingContext = new EditProfileViewModel(user);
    }
}