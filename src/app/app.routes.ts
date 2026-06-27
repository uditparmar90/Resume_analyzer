import { Routes } from '@angular/router';
import { Index } from './index';
import { Analyze } from './analyze/analyze';

export const routes: Routes = [
    {path: '',component: Index},
    {path: 'analyze',component: Analyze},

];
