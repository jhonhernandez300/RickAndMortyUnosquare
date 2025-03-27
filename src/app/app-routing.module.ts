import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from '../app/components/character/character.component';
import { DetailCharacterComponent } from '../app/components/detail-character/detail-character.component';

const routes: Routes = [
  { path: 'character', component: CharacterComponent },
  { path: 'character/:id', component: DetailCharacterComponent }, // Ruta de detalles
  { path: '', redirectTo: '/character', pathMatch: 'full' },
  { path: '**', redirectTo: '/character', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
