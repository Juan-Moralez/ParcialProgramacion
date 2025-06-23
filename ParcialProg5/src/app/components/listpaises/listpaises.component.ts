import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-listpaises',
  standalone: true,
  imports: [CommonModule,NgIf,NgFor],
  templateUrl: './listpaises.html',
  styleUrl: './listpaises.css'
})
export class ListpaisesComponent implements OnInit{
countries: any[] = [];
errorMessage: string = '';
loading: boolean = true;
  constructor(private paisesService: PaisesService){}
  ngOnInit(): void {
    this.paisesService.getAllpaises().subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false; // Datos cargados, detiene el estado de carga
      },
      error: (error) => {
        console.error('Error al obtener países:', error);
        this.errorMessage = 'No se pudieron cargar los países. Por favor, inténtalo de nuevo más tarde.';
        this.loading = false; // La carga finalizó incluso con un error
      }
    });  
 
 

}}
