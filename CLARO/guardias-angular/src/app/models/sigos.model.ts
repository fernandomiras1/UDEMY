export class SigosContact {
  constructor(
      public end_date: string,
      public mensaje_error: string,
      public numberid: number,
      public orderid: number,
      public resultado: string,
      public start_date: string,
      public tipo: string,
      public direction?: string
  ) { }
}
