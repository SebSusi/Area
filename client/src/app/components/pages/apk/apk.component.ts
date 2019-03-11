import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-apk',
    templateUrl: './apk.component.html',
    styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        this.downloadApk();
    }

    downloadApk() {
        const link = document.createElement('a');
        link.download = 'client.apk';
        link.href = '/usr/apkBuild/client.apk';
//        link.href = 'assets/client.apk';
        link.href = 'usr/';
        link.click();
    }

}
