import { NavigatedData, Page } from '@nativescript/core';
import { EditProviderProfileViewModel } from './edit-provider-profile-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const provider = args.context;
    
    if (!page.bindingContext) {
        page.bindingContext = new EditProviderProfileViewModel(provider);
    }
}