import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../models/environment';
import { Observable, tap } from 'rxjs';
import { CharacterComponent } from '../components/character/character.component';
import { Res } from '../models/Res';
import { CharacterResponse } from'../models/character-response';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  uri: string=environment.API_URL;

  constructor(private http:HttpClient) { }

  getCharacters(page: number): Observable<CharacterResponse> {
    const url = `${this.uri}/character?page=${page}`;
    return this.http.get<CharacterResponse>(url).pipe(
      tap((response: any) => console.log('CharacterResponse:', response)) // Ver en consola la respuesta
    );
  }
  

  getCharacter(characterId: number): Observable<Res> {
    return this.http.get<Res>(`${this.uri}/character/${characterId}`);
  }
  
}
