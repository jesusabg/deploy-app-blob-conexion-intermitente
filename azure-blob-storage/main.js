(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\w10\Downloads\angular-azure-blob-storage-sas-example-main\src\main.ts */"zUnb");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** os (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "QElt":
/*!***********************************************!*\
  !*** ./src/app/azure-blob-storage.service.ts ***!
  \***********************************************/
/*! exports provided: AzureBlobStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureBlobStorageService", function() { return AzureBlobStorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _azure_storage_blob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @azure/storage-blob */ "MC4u");




class AzureBlobStorageService {
    constructor() {
        // Enter your storage account name
        this.picturesAccount = "ngblobstest";
        // container name
        this.picturesContainer = "pictures";
    }
    // +IMAGES
    uploadImage(sas, content, name, handler) {
        this.uploadBlob(content, name, this.containerClient(sas), handler);
    }
    listImages(sas) {
        return this.listBlobs(this.containerClient(sas));
    }
    downloadImage(sas, name, handler) {
        this.downloadBlob(name, this.containerClient(sas), handler);
    }
    deleteImage(sas, name, handler) {
        this.deleteBlob(name, this.containerClient(sas), handler);
    }
    // -IMAGES
    // private uploadBlob(content: Blob, name: string, client: ContainerClient, handler: () => void) {
    //   let blockBlobClient = client.getBlockBlobClient(name);
    //   blockBlobClient.uploadData(
    //     content, { blobHTTPHeaders: { 
    //     blobContentType: content.type 
    //   } })
    //     .then(() => handler())
    // }
    uploadBlob(content, name, client, handler) {
        let blockBlobClient = client.getBlockBlobClient(name);
        blockBlobClient.uploadData(content, {
            maxSingleShotSize: 1 * 1024 * 1024,
            blockSize: 1 * 1024 * 1024,
            concurrency: 20,
            blobHTTPHeaders: { blobContentType: content.type },
            onProgress: (ev) => {
                console.log(ev);
                let mb = (ev.loadedBytes / (1e+6));
                console.log(`se han subido: ${mb} Megabytes`);
            },
        })
            .then(() => handler());
    }
    listBlobs(client) {
        var e_1, _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = [];
            let blobs = client.listBlobsFlat();
            try {
                for (var blobs_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__asyncValues"])(blobs), blobs_1_1; blobs_1_1 = yield blobs_1.next(), !blobs_1_1.done;) {
                    const blob = blobs_1_1.value;
                    result.push(blob.name);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return)) yield _a.call(blobs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        });
    }
    downloadBlob(name, client, handler) {
        const blobClient = client.getBlobClient(name);
        blobClient.download().then(resp => {
            resp.blobBody.then(blob => {
                handler(blob);
            });
        });
    }
    deleteBlob(name, client, handler) {
        client.deleteBlob(name).then(() => {
            handler();
        });
    }
    containerClient(sas) {
        return new _azure_storage_blob__WEBPACK_IMPORTED_MODULE_2__["BlobServiceClient"](`https://${this.picturesAccount}.blob.core.windows.net?${sas}`)
            .getContainerClient(this.picturesContainer);
    }
}
AzureBlobStorageService.ɵfac = function AzureBlobStorageService_Factory(t) { return new (t || AzureBlobStorageService)(); };
AzureBlobStorageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AzureBlobStorageService, factory: AzureBlobStorageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AzureBlobStorageService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sas_sas_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sas/sas.component */ "qoE+");



class AppComponent {
    constructor() {
        this.title = 'azure-blob-storage';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-sas");
    } }, directives: [_sas_sas_component__WEBPACK_IMPORTED_MODULE_1__["SasComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _sas_sas_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sas/sas.component */ "qoE+");





class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _sas_sas_component__WEBPACK_IMPORTED_MODULE_3__["SasComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                    _sas_sas_component__WEBPACK_IMPORTED_MODULE_3__["SasComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "qoE+":
/*!**************************************!*\
  !*** ./src/app/sas/sas.component.ts ***!
  \**************************************/
/*! exports provided: SasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SasComponent", function() { return SasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _azure_blob_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../azure-blob-storage.service */ "QElt");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




function SasComponent_li_7_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SasComponent_li_7_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const pic_r2 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.deleteImage(pic_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Borrar");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SasComponent_li_7_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const pic_r2 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.downloadImage(pic_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Vista previa");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const pic_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Nombre: ", pic_r2, "");
} }
function SasComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class SasComponent {
    constructor(blobService) {
        this.blobService = blobService;
        // SAS (shared access signatures)
        this.sas = "sp=racwdl&st=2022-07-22T00:34:20Z&se=2022-08-22T08:34:20Z&spr=https&sv=2021-06-08&sr=c&sig=ZjPjMaD0kwEwRVFJZwqJQ4fo%2FQ088xY%2FOAKkT%2BU1ZCU%3D";
        this.picturesList = [];
        this.picturesDownloaded = [];
    }
    ngOnInit() {
        this.reloadImages();
    }
    // public setSas(event) {
    //   this.sas = event.target.value
    // }
    imageSelected(file) {
        this.blobService.uploadImage(this.sas, file, file.name, () => {
            this.reloadImages();
        });
    }
    deleteImage(name) {
        this.blobService.deleteImage(this.sas, name, () => {
            this.reloadImages();
        });
    }
    downloadImage(name) {
        const para = document.getElementById('vistaPreviaImage');
        this.blobService.downloadImage(this.sas, name, blob => {
            let url = window.URL.createObjectURL(blob);
            para.setAttribute('src', url);
            document.getElementById("myDIV").appendChild(para);
            // window.open(url);
        });
    }
    reloadImages() {
        this.blobService.listImages(this.sas).then(list => {
            this.picturesList = list;
            const array = [];
            this.picturesDownloaded = array;
            for (let name of this.picturesList) {
                this.blobService.downloadImage(this.sas, name, blob => {
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        array.push(reader.result);
                    };
                });
            }
        });
    }
}
SasComponent.ɵfac = function SasComponent_Factory(t) { return new (t || SasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_azure_blob_storage_service__WEBPACK_IMPORTED_MODULE_1__["AzureBlobStorageService"])); };
SasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SasComponent, selectors: [["app-sas"]], decls: 12, vars: 2, consts: [[1, "text-center", "mb-4"], [1, "text-center"], [1, "list-group", 2, "width", "60%", "margin", "0 auto", "min-width", "400px"], [1, "list-group-item", "list-group-item-action", 2, "display", "flex", "justify-content", "space-evenly"], ["type", "file", 1, "m-2", "pb-5", "form-control", "form-control-lg", 3, "change"], ["class", "list-group-item list-group-item-action", "style", "display:flex;  justify-content: center;", 4, "ngFor", "ngForOf"], ["id", "myDIV", 4, "ngIf"], [1, "list-group-item", "list-group-item-action", 2, "display", "flex", "justify-content", "center"], [1, "col-6", 2, "font-size", "15px"], [1, "col-6", 2, "gap", "15px", "display", "flex"], [1, "btn", "btn-danger", "btn-lg", 3, "click"], ["download", "pic", 1, "btn", "btn-success", 3, "click"], ["id", "myDIV"], ["id", "vistaPreviaImage", "src", "https://www.pulsorunner.com/wp-content/uploads/2014/10/default-img.gif", 1, "card-img"]], template: function SasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Carga de archivos con conexi\u00F3n intermitente");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Lista de archivos en Blob Storage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function SasComponent_Template_input_change_6_listener($event) { return ctx.imageSelected($event.target.files[0]); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SasComponent_li_7_Template, 8, 1, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Vista previa");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, SasComponent_div_11_Template, 2, 0, "div", 6);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.picturesList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.picturesList.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Nhcy9zYXMuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SasComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-sas',
                templateUrl: './sas.component.html',
                styleUrls: ['./sas.component.css']
            }]
    }], function () { return [{ type: _azure_blob_storage_service__WEBPACK_IMPORTED_MODULE_1__["AzureBlobStorageService"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map