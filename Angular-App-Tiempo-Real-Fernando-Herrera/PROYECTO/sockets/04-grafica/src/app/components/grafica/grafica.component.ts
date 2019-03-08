import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

    // lineChart
    public lineChartData: Array<any> = [
      {data: [0, 0, 0, 0], label: 'Ventas'}
    ];
    public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  constructor( private http: HttpClient,
                public wsService: WebsocketService) { }

  ngOnInit() {

    this.getData();
    this.escucharSocket();

    // setInterval(() => {

    //   const newData = [
    //   Math.round( Math.random() * 100 ),
    //   Math.round( Math.random() * 100 ),
    //   Math.round( Math.random() * 100 ),
    //   Math.round( Math.random() * 100 )
    //   ];

    // this.lineChartData = [
    //   { data: newData, label: 'Ventas'}
    // ];

    // }, 3000);
  }

  getData() {

    this.http.get('http://localhost:5000/grafica').subscribe((data: any) => {
      console.log(data);
      this.lineChartData = data;
    });

  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe( (data: any) => {
      console.log(data);
      this.lineChartData = data;
    });
  }


}
