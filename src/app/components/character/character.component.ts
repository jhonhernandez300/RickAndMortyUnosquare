import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Res } from '../../models/Res';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  characteres: Res[] = [];
  filterText: string = '';
  isLoading: boolean = false;

  constructor(private service: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.service.getCharacters(this.page).subscribe({
      next: (resp) => {
        this.characteres = resp.results; // Reemplaza en lugar de concatenar
        this.page = 1; // Reiniciar paginación
      },
      error: (error) => console.error('Error loading characters:', error),
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  get filteredCharacters(): Res[] {
    const lowerCaseFilter = this.filterText.trim().toLowerCase();
    return this.characteres.filter(character =>
      character.name.toLowerCase().includes(lowerCaseFilter) ||
      character.species.toLowerCase().includes(lowerCaseFilter)
    );
  }

  get paginatedCharacters(): Res[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.filteredCharacters.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCharacters.length / this.pageSize);
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }
  
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  goToPage(page: number): void {
    this.page = page;
  }
}
