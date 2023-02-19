import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from 'projects/admin/src/app/app.module';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import(`./tasks/tasks.module`).then(m => m.TasksModule)
  },
  {
    path: 'auth',
    loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
