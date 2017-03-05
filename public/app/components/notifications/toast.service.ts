import { Injectable } from '@angular/core';

declare var Materialize: any;

@Injectable()
export class ToastService {

    public static toast(message) {
        Materialize.toast(message, 5000)
    }
}