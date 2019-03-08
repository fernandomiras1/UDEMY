import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {


  constructor( private http: HttpClient,
    public wsService: WebsocketService) { }

  public barChartLabels: string[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5'];
  public barChartType = 'bar';

  public barChartData: any[] = [
    {data: [0, 0, 0, 0, 0], label: 'Pregunta'}
  ];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  ngOnInit() {
    this.getData();
    this.escucharSocket();
  }

  getData() {

    this.http.get('http://localhost:5000/encuesta').subscribe((data: any) => {
      console.log(data);
      this.barChartData = data;
    });

  }

  escucharSocket() {
    this.wsService.listen('cambio-encuenta').subscribe( (data: any) => {
      console.log(data);
      this.barChartData = data;
    });
  }

}
