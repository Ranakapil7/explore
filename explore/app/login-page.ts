import { NavigatedData, Page } from '@nativescript/core';
import { LoginViewModel } from './login-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new LoginViewModel();
}