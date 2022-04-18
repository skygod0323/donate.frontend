/**
 * Created by ApolloYr on 1/28/2018.
 */

import { Injectable } from '@angular/core';
import { SettingsService } from './setting.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { NotifyService } from "./notify.service";

@Injectable()
export class BasicApi {
    constructor(private http: HttpClient,
        private router: Router,
        public settings: SettingsService,
        public notify: NotifyService
    ) {
    }

    createAuthorizationHeader() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.settings.getStorage('token'),
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
        })
        // let header = new HttpHeaders().set('Authorization', 'Bearer ' + this.settings.getStorage('token'));
        // header.append('')
        // return 
    }

    get(url: string, data?: any) {
        let headers = this.createAuthorizationHeader();

        return this.http.get(this.settings.apiUrl + url, {
            headers: headers,
            params: data
        }).pipe(res => res);
    }

    post(url: string, data: any) {
        let headers = this.createAuthorizationHeader();

        return this.http.post(this.settings.apiUrl + url, data, {
            headers
        }).pipe(res => res);
    }

    put(url: string, data: any) {
        let headers = this.createAuthorizationHeader();

        return this.http.put(this.settings.apiUrl + url, data, {
            headers: headers
        }).pipe(res => res);
    }

    uploadImage(file: any) {

        let headers = this.createAuthorizationHeader();
        var formData = new FormData();

        formData.append("file", file, file.name);

        return this.http.post(this.settings.apiUrl + '/upload/image', formData, {
            headers: headers
        }).pipe(res => res);
    }


    handleError(_parent: any, error: any) {
        if ((error.status == 401 || error.status == 400) && error.url && !error.url.endsWith('/login')) {
            console.log('unauthorized');
            if (_parent.settings) _parent.settings.setStorage('token', false);
            if (_parent.settings) _parent.settings.setAppSetting('is_loggedin', false);
            _parent.router.navigate(['/']);
        } else if (error.status == 500) {
            this.notify.hideLoading();
            //this.notify.showNotification('error', 'server error, please try later');
        }
        // In a real world app, you might use a remote logging infrastructure

        return of(error);
    }
}
