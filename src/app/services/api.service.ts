/**
 * Created by ApolloYr on 2/5/2018.
 */
import { Injectable } from "@angular/core";
import { BasicApi } from "./basicapi.service";

@Injectable()
export class Api extends BasicApi {
    donate(data: any) {
        return this.post('/donation/create', data);
    }

    cryptoDonation() {
        return this.get('/donation/cryptoDonation');
    }
}