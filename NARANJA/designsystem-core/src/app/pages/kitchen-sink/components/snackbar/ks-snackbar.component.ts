import { Component, OnInit } from '@angular/core';
import { ISnackbarData, NGZSnackbarService } from '../../../../../lib/src/components/snackbar/services/snackbar.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'dsn-kssnackbar',
  templateUrl: './ks-snackbar.component.html',
  styleUrls: ['./ks-snackbar.component.scss']
})
export class KsSnackbarComponent implements OnInit {
  closeButton: boolean;
  isVisible: boolean;
  public onActionAfterClose$: Observable<any>;
  public onActionAfterClose: Subject<void> = new Subject();
  public onActionSubscription: Subscription;
  public onActionAfterClose2$: Observable<any>;
  public onActionAfterClose2: Subject<void> = new Subject();
  public onActionSubscription2: Subscription;

  constructor(private snackService: NGZSnackbarService) {}

  ngOnInit() {
    this.onActionAfterClose$ = this.onActionAfterClose.asObservable();
    this.onActionSubscription = this.onActionAfterClose$.subscribe((result) => {
      this.eventDemo();
    });

    this.onActionAfterClose2$ = this.onActionAfterClose2.asObservable();
    this.onActionSubscription2 = this.onActionAfterClose2$.subscribe((result) => {
      this.eventDemo2();
    });

    this.closeButton = true;
    this.isVisible = false;

  }

  eventDemo() {
  }

  eventDemo2() {
    this.snackService.closeSnackbar();
  }

  displaySnackbar() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'Se descargó tu resumen.'
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose);
  }

  displaySnackbarDos() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'Se descargó tu resumen de cuenta con éxito. Ya podés revisarlo y pagarlo online.',
      hasDuration: false
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose2);
  }

  displaySnackbarTres() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'No hay conexión a internet.',
      eventName: 'Reintentar'
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose2);
  }

  displaySnackbarCuatro() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'No se pudo cargar el turno en la lista. Puede que haya fallado la conexión a internet.',
      eventName: 'Reintentar'
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose2);
  }
}
