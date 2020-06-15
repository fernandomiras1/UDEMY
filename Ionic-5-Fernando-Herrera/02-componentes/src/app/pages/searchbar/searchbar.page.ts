import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.page.html',
  styleUrls: ['./searchbar.page.scss'],
})
export class SearchbarPage implements OnInit {
  textoBuscar = '';
  albumes: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAlbums().subscribe((albumes: any) => {
      console.log(albumes);
      this.albumes = albumes;
    });
  }

  buscar(event: CustomEvent ) {
    this.textoBuscar = event.detail.value;
  }

}
