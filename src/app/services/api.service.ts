/**
 * Created by ApolloYr on 2/5/2018.
 */
import { Injectable } from "@angular/core";
import { BasicApi } from "./basicapi.service";

@Injectable()
export class Api extends BasicApi {

    createPaymentIntent(data: any) {
        return this.post('/donation/payment_intent', data);
    }

    confirmPaymentIntent(data: any) {
        return this.post('/donation/confirm_payment_intent', data);
    }

    subscribeDonation(data: any) {
        return this.post('/donation/subscribe_donation', data);
    }

    donate(data: any) {
        return this.post('/donation/create', data);
    }

    cryptoDonation() {
        return this.get('/donation/cryptoDonation');
    }

    donationSummary() {
        return this.get('/donation/summary');
    }

    donorWall() {
        return this.get('/donor_wall/donor_wall');
    }
}