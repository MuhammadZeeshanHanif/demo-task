import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListingComponent } from './components/brand-listing/brand-listing.component';

const routes: Routes = [
  {
    path: '',
    component: BrandListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
