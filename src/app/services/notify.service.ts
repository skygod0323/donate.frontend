/**
 * Created by ApolloYr on 1/29/2018.
 */
import { Injectable, ViewContainerRef } from "@angular/core";
import {MessageService} from 'primeng/api';
import { SettingsService } from "./setting.service";

@Injectable()
export class NotifyService {

    constructor(
        public messageService: MessageService,
        public setting: SettingsService
    ) {
    }

    showNotification(type: any, message: any) {
        if (type == 'error') {
            this.messageService.add({ key: 'error', severity: type, summary: message, life: 60000 });
        } else {
            this.messageService.add({ key: 'success', severity: type, summary: message });
        }

    }

    showLoading() {
        this.setting.loading = true;
    }

    hideLoading() {
        this.setting.loading = false;
    }
}
