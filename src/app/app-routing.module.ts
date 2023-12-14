import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimilarComponent } from './similar/similar.component';

const routes: Routes = [{ path: '', component: HomeComponent }, { path: 'similar/:id/:name', component: SimilarComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
