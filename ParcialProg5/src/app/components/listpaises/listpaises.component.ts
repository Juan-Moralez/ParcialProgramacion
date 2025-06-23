import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-listpaises',
  imports: [],
  templateUrl: './listpaises.html',
  styleUrl: './listpaises.css'
})
export class ListpaisesComponents implements OnInit{
  constructor(public PaisesService: PaisesService){}
  
  ngOnInit() {
    this.PaisesService.getAllpaises()
  }
 

}
