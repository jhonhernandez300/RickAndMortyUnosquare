import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Res } from '../../models/Res';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-detail-character',
  templateUrl: './detail-character.component.html',
  styleUrls: ['./detail-character.component.css']
})
export class DetailCharacterComponent {

  resultCharacter$: Observable<Res>;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private rickService: CharacterService
  ) {
    this.resultCharacter$ = this.route.params.pipe(
      switchMap(params => this.rickService.getCharacter(params['id'])),
      catchError(err => {
        console.error('Error obteniendo el personaje:', err);
        this.errorMessage = 'No se pudo cargar la información del personaje.';
        return [];
      })
    );
  }
}
