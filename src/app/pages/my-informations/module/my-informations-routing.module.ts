import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInformationsComponent } from '../components/list-informations/list-informations.component';
import { AuthGuardService } from 'src/app/shared/Auth/auth-guard.service';

const routes: Routes = [{
  path: '', component: ListInformationsComponent, canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyInformationsRoutingModule { }
