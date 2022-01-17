import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudDataComponent } from './crud-data/crud-data.component';

const routes: Routes = [
  {
    path:'', redirectTo:'CrudDataComponent', pathMatch:'full'
  },
  {
    path:'CrudDataComponent', component:CrudDataComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
