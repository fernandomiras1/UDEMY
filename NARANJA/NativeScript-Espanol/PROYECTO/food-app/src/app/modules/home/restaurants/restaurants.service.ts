import { HttpClient, HttpHeaders } from '@angular/common/http';

export class RestaurantService {
    constructor(private http: HttpClient ) {}

    public serach() {
        return this.http.get('https://developers.zomato.com/api/v2.1/search?count=10',
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