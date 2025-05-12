import { NavigatedData, Page } from '@nativescript/core';
import { AddExperienceViewModel } from './add-experience-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const experience = args.context;
    
    if (!page.bindingContext) {
        page.bindingContext = new AddExperienceViewModel(experience);
    }
}