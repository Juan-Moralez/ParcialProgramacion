import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { Observable } from 'rxjs'; // Necesario para tipar 'apiCall'

@Component({
  selector: 'app-listpaises',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule], // Asegúrate de que FormsModule esté aquí
  templateUrl: './listpaises.html',
  styleUrl: './listpaises.css'
})
export class ListpaisesComponent implements OnInit {
  countries: any[] = [];
  errorMessage: string = '';
  loading: boolean = true;
  
  // Propiedades para los filtros
  filterName: string = '';
  filterRegion: string = '';

  constructor(private paisesService: PaisesService) {}

  ngOnInit(): void {
    // Carga inicial de países (se verificará si hay filtros al inicio)
    this.loadCountries();
  }

  /**
   * Carga países basándose en los valores actuales de los filtros.
   * Determina qué método del servicio API debe llamar.
   */
  loadCountries(): void {
    this.loading = true; // Establece el estado de carga a true antes de la llamada a la API
    this.errorMessage = ''; // Limpia cualquier mensaje de error previo

    let apiCall: Observable<any[]>; // Declara una variable para contener el Observable de la llamada a la API

    // Lógica para decidir qué método de la API llamar según los filtros
    if (this.filterName.trim() !== '') { // Si hay texto en el filtro de nombre (ignorando espacios en blanco)
      // Si el usuario ingresó un nombre, busca por nombre
      apiCall = this.paisesService.getPaisesByName(this.filterName.trim());
    } else if (this.filterRegion !== '') { // Si se seleccionó una región (y no hay nombre ingresado)
      // Si se seleccionó una región, filtra por región
      apiCall = this.paisesService.getPaisesByRegion(this.filterRegion);
    } else {
      // Si no hay ningún filtro activo (nombre o región están vacíos), trae todos los países
      apiCall = this.paisesService.getAllpaises();
    }

    // Suscríbete al Observable resultante de la llamada a la API
    apiCall.subscribe({
      next: (data: any[]) => {
        console.log('Datos de la API recibidos (con filtros aplicados si los hay):', data); // Para depuración
        this.countries = data;
        this.loading = false; // Datos cargados, detiene el estado de carga

        if (data.length === 0) {
          this.errorMessage = 'No se encontraron países que coincidan con los filtros aplicados.';
        }
      },
      error: (error: any) => {
        console.error('Error al obtener países con filtros:', error); // Registra el error completo
        // Proporciona un mensaje de error más amigable según el estado HTTP
        if (error.status === 404 && this.filterName.trim() !== '') {
          this.errorMessage = `No se encontró ningún país con el nombre "${this.filterName}".`;
        } else {
          this.errorMessage = 'No se pudieron cargar los países. Por favor, inténtalo de nuevo más tarde.';
        }
        this.loading = false; // La carga finalizó incluso si hubo un error
      }
    });
  }

  /**
   * Se llama desde el HTML cuando un campo de filtro cambia.
   * Activa la carga de países con los nuevos valores de filtro.
   */
  applyFilter(): void {
    // Esta función simplemente activa la función principal loadCountries,
    // que luego decide cómo obtener los datos basándose en los valores de filtro actuales.
    this.loadCountries();
  }
}