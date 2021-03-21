import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailviewComponent } from './detailview/detailview.component';
import { ListviewComponent } from './listview/listview.component';


const routes: Routes = [
  {path: "", component: ListviewComponent},
  {path: "track", component: DetailviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
