import { NavigatedData, Page } from '@nativescript/core';
import { ProviderViewModel } from './provider-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new ProviderViewModel();
    }
}