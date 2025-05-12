import { NavigatedData, Page } from '@nativescript/core';
import { ExperienceDetailsViewModel } from './experience-details-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const experience = args.context;
    
    if (!page.bindingContext) {
        page.bindingContext = new ExperienceDetailsViewModel(experience);
    }
}