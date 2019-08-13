import { HttpClient, HttpHeaders } from '@angular/common/http';

export class RestaurantService {
    constructor(private http: HttpClient ) {}

    public serach(query: string = '') {
        // reemplazamos el espacio por %20
        return this.http.get('https://developers.zomato.com/api/v2.1/search?count=10&q=' + query.replace(/ /g, '%20'),
        {
            headers: this.commonHeaders()
        });
    }

    private commonHeaders() {
        return new HttpHeaders({
            "user-key": "9dce66993fcff67065ba6ccb2b085a61"
        });
    }
}