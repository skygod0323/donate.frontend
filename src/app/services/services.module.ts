import { NgModule } from '@angular/core';
import { Validate } from "./validate.service";
import { SettingsService } from "./setting.service";
import { NotifyService } from "./notify.service";
import { MessageService } from 'primeng/api';
import { Api } from "./api.service";
import { BasicApi } from "./basicapi.service";

@NgModule({
    imports: [

    ],
    declarations: [],
    providers: [
        SettingsService,
        Validate,
        NotifyService,
        MessageService,
        Api,
        BasicApi,
    ],
    exports: [

    ]
})
export class ServicesModule {

}