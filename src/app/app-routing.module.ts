import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)
    ,ToastrModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
