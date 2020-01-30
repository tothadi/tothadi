import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ContactComponent } from './contact/contact.component';
import { PrevWorkComponent } from './prev-work/prev-work.component';
import { IntroComponent } from './intro/intro.component';
import { GreetingComponent } from './greeting/greeting.component';


const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'prev-work', component: PrevWorkComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'greeting', component: GreetingComponent },
  { path: '', redirectTo: '/greeting', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
