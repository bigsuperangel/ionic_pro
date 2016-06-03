import {Injectable} from '@angular/core';
import {CONSTANT} from '../utils/constant';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class MyfocusData {

    constructor(private http: Http) {
    }

    queryMyFocus(pageNo:number) {

        return new Promise(resolve => {
            this.http.get(CONSTANT.SERVICE_API_URL + 'myFocus.do?pageNo='+pageNo)
                .subscribe((res: Response) => {
                    let json = res.json();
                    console.log(json);
                    resolve(json);
                }, (err: any) => { // on error
                    console.error(err);
                });
        });
    }

}
