import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogoComponent} from '../dialogo/dialogo.component';
import { NomeDialogoComponent } from '../dialogo-nome/dialogo-nome.component';
import { PrecoDialogoComponent } from '../dialogo-preco/dialogo-preco.component';
import { TipoDialogoComponent } from '../dialogo-tipo/dialogo-tipo.component';
import { ConsoleDialogoComponent } from '../dialogo-console/dialogo-console.component';

interface RetroGames {
  name: string;
  historia: string;
  price: number;
  tipos: string[];
  console: string;
  edited: boolean;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    PesquisaComponent,
    MatPaginator,
    MatDialogModule,
  ],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})

export class ListaComponent {

  RetroGames = [
      { name: 'Super Mario Bros',historia:'', console: 'NES', price: 30, tipos: ['plataforma'], edited: false },
      { name: 'The Legend of Zelda', historia:'', console: 'NES', price: 40, tipos: ['aventura'], edited: false },
      { name: 'Final Fantasy', historia:'', console: 'NES', price: 50, tipos: ['RPG'], edited: false },
      { name: 'Sonic the Hedgehog', historia:'', console: 'Sega Genesis', price: 35, tipos: ['plataforma'], edited: false },
      { name: 'Street Fighter II', historia:'', console: 'SNES', price: 25, tipos: ['ação'], edited: false },
      { name: 'Chrono Trigger', historia:'', console: 'SNES', price: 60, tipos: ['RPG'], edited: false },
      { name: 'Metroid', historia:'', console: 'NES', price: 45, tipos: ['ação', 'aventura'], edited: false },
      { name: 'Castlevania',historia:'', console: 'NES', price: 40, tipos: ['plataforma', 'ação'], edited: false },
      { name: 'EarthBound', historia:'', console: 'SNES', price: 70, tipos: ['RPG'], edited: false },
      { name: 'Mega Man X', historia:'', console: 'SNES', price: 35, tipos: ['ação', 'plataforma'], edited: false }  
  ];

  paginatedGames: RetroGames[] = [];
  itemsPerPage = 5;
  pageIndex=0;

  formData: any = { name: '', historia: '', price: null, tipos: [], console: '' };
  TipoGames: string[] = ['Aventura', 'Plataforma', 'Ação', 'RPG'];
  showForm: boolean = false;
  filteredGames = [...this.RetroGames];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.updatePaginatedGames();
  }

  ngOnChanges() {
    this.updatePaginatedGames();
  }


  updatePaginatedGames() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
  
    this.paginatedGames = this.filteredGames.slice(startIndex, endIndex);
  }

  filterGames(selectedCategories: any) {
    this.filteredGames = this.RetroGames.filter(retroGames =>
      retroGames.tipos.some(tipos => selectedCategories[tipos])
    );
    this.pageIndex = 0; 
    this.updatePaginatedGames(); 
  }

  
  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.updatePaginatedGames();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  constructor(private dialog: MatDialog) {}


  addGame() {
    if (this.formData.historia.split('.').length < 3) {
      this.openDialoghistoria();
      return;
    }
    if (this.formData.name.length == 0) {
      this.openDialogNome();
      return;
    }
    if (this.formData.price == 0 || this.formData.price == null) {
      this.openDialogPreco();
      return;
    }
    if (this.formData.console.split('.').length < 1 ) {
      this.openDialogConsole();
      return;
    }

    this.RetroGames.push({ ...this.formData });
    this.formData = { name: '', historia: '', price: null, tipos: [], console: '' };
    this.filteredGames = [...this.RetroGames];
    this.toggleForm();
    this.showForm = false;
  }

  openDialoghistoria() {
    this.dialog.open(DialogoComponent);
  }
  openDialogNome() {
    this.dialog.open(NomeDialogoComponent);
  }
  openDialogPreco() {
    this.dialog.open(PrecoDialogoComponent);
  }
  openDialogTipo() {
    this.dialog.open(TipoDialogoComponent);
  }
  openDialogConsole() {
    this.dialog.open(ConsoleDialogoComponent);
  }

  onTiposChange(tipos: string, isChecked: boolean) {
    if (isChecked) {
      this.formData.tipos.push(tipos);
    } else {
      this.formData.tipos = this.formData.tipos.filter((t: string) => t !== tipos);
      this.openDialogTipo();
    }
  }

  deleteGames(index: number) {
    this.RetroGames.splice(index, 1);
    this.updatePaginatedGames();
  }
  

  editGames(index: number) {
    this.formData = { ...this.RetroGames[index] };
    this.showForm = true;
  
    this.RetroGames.splice(index, 1);
  }
}