/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/ts/pos/CaliculateCoinNumber.ts":
/*!************************************************!*\
  !*** ./wwwroot/ts/pos/CaliculateCoinNumber.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaliculateCoinNumber: () => (/* binding */ CaliculateCoinNumber)
/* harmony export */ });
/* harmony import */ var _root_share_SetEventListner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/SetEventListner */ "./wwwroot/ts/share/SetEventListner.ts");

class CaliculateCoinNumber {
    constructor() {
        this.setCoin = () => {
            Array.from(document.getElementsByClassName("order")).forEach((element) => {
                const htmlElement = element;
                const coinNumberElement = htmlElement.querySelector(".coin_number");
                const coinNumberShowElement = htmlElement.querySelector(".coin_number_show");
                // const coinNumberModalShowElement = <HTMLInputElement>htmlElement.querySelector(".coin_number_modal_show");
                let coinNumber = 0;
                if (coinNumberElement == null) {
                    return;
                }
                _root_share_SetEventListner__WEBPACK_IMPORTED_MODULE_0__.SetEventListner.setEvent(element, "change", ".order_number", async (event) => {
                    //(<HTMLInputElement>element.querySelector(".order_number_modal")).value = (<HTMLInputElement>event.target).value;
                    coinNumber = this.caliculate(htmlElement, event.currentTarget.classList.contains('alcohol_order'));
                    coinNumberElement.value = coinNumber.toString();
                    coinNumberShowElement.innerText = coinNumber.toString();
                    // coinNumberModalShowElement.innerText = coinNumber.toString();
                });
                _root_share_SetEventListner__WEBPACK_IMPORTED_MODULE_0__.SetEventListner.setEvent(element, "change", ".alcohol_amount", async (event) => {
                    // (<HTMLInputElement>element.querySelector(".alcohol_amount_modal")).value = (<HTMLInputElement>event.target).value;
                    coinNumber = this.caliculate(htmlElement, true);
                    coinNumberElement.value = coinNumber.toString();
                    coinNumberShowElement.innerText = coinNumber.toString();
                    // coinNumberModalShowElement.innerText = coinNumber.toString();
                });
                /*
                SetEventListner.setEvent(
                    <HTMLElement>element,
                    "change",
                    ".order_number_modal",
                    async (event: Event) => {
                        (<HTMLInputElement>element.querySelector(".order_number")).value = (<HTMLInputElement>event.target).value;
                        coinNumber = this.caliculateCoinNumber(htmlElement);
                        coinNumberElement.value = coinNumber.toString();
                        coinNumberShowElement.innerText = coinNumber.toString();
                        coinNumberModalShowElement.innerText = coinNumber.toString();
                    }
                );
    
                SetEventListner.setEvent(
                    <HTMLElement>element,
                    "change",
                    ".alcohol_amount_modal",
                    async (event: Event) => {
                        (<HTMLInputElement>element.querySelector(".alcohol_amount")).value = (<HTMLInputElement>event.target).value;
                        coinNumber = this.caliculateCoinNumber(htmlElement);
                        coinNumberElement.value = coinNumber.toString();
                        coinNumberShowElement.innerText = coinNumber.toString();
                        coinNumberModalShowElement.innerText = coinNumber.toString();
                    }
                );
                */
            });
        };
        this.caliculate = (htmlElement, isAlcohol) => {
            if (isAlcohol) {
                return this.caliculateAlcoholCoinNumber(htmlElement);
            }
            else {
                return this.caliculateCoinNumber(htmlElement);
            }
        };
        this.caliculateCoinNumber = (htmlElement) => {
            const purhcase_coin_number = parseInt(htmlElement.querySelector(".purhcase_coin_number")?.value ?? "0");
            const orderNumber = parseInt(htmlElement.querySelector(".order_number")?.value ?? "0");
            if (orderNumber == 0) {
                return 0;
            }
            return purhcase_coin_number * orderNumber;
        };
        this.caliculateAlcoholCoinNumber = (htmlElement) => {
            const alcoholAmount = parseInt(htmlElement.querySelector(".alcohol_amount")?.value ?? "0");
            const orderNumber = parseInt(htmlElement.querySelector(".order_number")?.value ?? "0");
            const coinPer2shaku = parseInt(htmlElement.querySelector(".coin_per_2shaku")?.value ?? "0");
            const leftAmount = parseInt(htmlElement.querySelector(".left_amount")?.value ?? "0");
            let coinNumber = 0;
            let adjustmentCoin = 0;
            let orderAmount = 0;
            if (orderNumber == 0) {
                return 0;
            }
            if (alcoholAmount == 0) {
                orderAmount = Math.floor(leftAmount / 36);
                adjustmentCoin = coinPer2shaku * Math.floor(leftAmount / 180);
            }
            else {
                orderAmount = Math.floor(alcoholAmount / 36);
                adjustmentCoin = coinPer2shaku * Math.floor(alcoholAmount / 180);
            }
            coinNumber = (coinPer2shaku * orderAmount - adjustmentCoin) * orderNumber;
            return coinNumber;
        };
    }
}


/***/ }),

/***/ "./wwwroot/ts/pos/OrderEntity.ts":
/*!***************************************!*\
  !*** ./wwwroot/ts/pos/OrderEntity.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderEntity: () => (/* binding */ OrderEntity)
/* harmony export */ });
class OrderEntity {
    constructor(resultId, category, orderNumber, orderCoins, alcoholAmount = 0) {
        this.ResultId = resultId;
        this.Category = category;
        this.OrderNumber = orderNumber;
        this.OrderCoins = orderCoins;
        this.AlcoholAmount = alcoholAmount;
    }
}


/***/ }),

/***/ "./wwwroot/ts/pos/StockOrder.ts":
/*!**************************************!*\
  !*** ./wwwroot/ts/pos/StockOrder.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StockOrder: () => (/* binding */ StockOrder)
/* harmony export */ });
/* harmony import */ var _root_share_SetEventListner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/SetEventListner */ "./wwwroot/ts/share/SetEventListner.ts");
/* harmony import */ var _root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/share/LocalStrage */ "./wwwroot/ts/share/LocalStrage.ts");
/* harmony import */ var _OrderEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OrderEntity */ "./wwwroot/ts/pos/OrderEntity.ts");



class StockOrder {
    constructor() {
        this.addOrder = () => {
            Array.from(document.getElementsByClassName("purchase_order")).forEach((element) => {
                const htmlElement = element;
                _root_share_SetEventListner__WEBPACK_IMPORTED_MODULE_0__.SetEventListner.setEvent(element, "click", ".order_button", async (event) => {
                    const resultId = parseInt(htmlElement.querySelector('.alchol_info').dataset.result_id);
                    const category = parseInt(htmlElement.querySelector('.category')?.value ?? "0");
                    const alcoholAmount = parseInt(htmlElement.querySelector(".alcohol_amount")?.value ?? "0");
                    const orderNumber = parseInt(htmlElement.querySelector(".order_number")?.value ?? "0");
                    const coinNumber = parseInt(htmlElement.querySelector(".coin_number")?.value ?? "0");
                    let orderEntityList = [];
                    const orderEntity = new _OrderEntity__WEBPACK_IMPORTED_MODULE_2__.OrderEntity(resultId, category, orderNumber, coinNumber, alcoholAmount);
                    if (_root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_1__.LocalStrage.check("OrderEntityList")) {
                        orderEntityList = _root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_1__.LocalStrage.get("OrderEntityList");
                    }
                    orderEntityList.push(orderEntity);
                    // 二回以上注文されていた場合、数量を合計して一つにまとめる
                    _root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_1__.LocalStrage.set("OrderEntityList", this.Deduplication(orderEntityList));
                    window.alert("追加成功");
                });
            });
        };
        this.Deduplication = (array) => {
            // IDごとに合計
            const map = new Map();
            array.forEach(item => {
                const key = `${item.ResultId}_${item.AlcoholAmount}`;
                if (map.has(key)) {
                    map.get(key).OrderNumber += item.OrderNumber;
                }
                else {
                    map.set(key, { ...item });
                }
            });
            return Array.from(map.values());
        };
    }
}


/***/ }),

/***/ "./wwwroot/ts/share/BackButton.ts":
/*!****************************************!*\
  !*** ./wwwroot/ts/share/BackButton.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackButton: () => (/* binding */ BackButton)
/* harmony export */ });
class BackButton {
    constructor() {
        this.Buck = () => {
            const element = document.getElementById('back');
            element.addEventListener("click", () => {
                history.back();
            });
        };
    }
}


/***/ }),

/***/ "./wwwroot/ts/share/BlurImage.ts":
/*!***************************************!*\
  !*** ./wwwroot/ts/share/BlurImage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlurImage: () => (/* binding */ BlurImage)
/* harmony export */ });
class BlurImage {
    static initBlurUp(container = document) {
        container.querySelectorAll('img.blur-up').forEach(_img => {
            const img = _img;
            const hdSrc = img.dataset.src;
            if (!hdSrc || img.classList.contains('loaded'))
                return;
            const onHDLoad = () => {
                img.classList.add('loaded');
                img.removeEventListener('load', onHDLoad);
            };
            const loadHDImage = () => {
                img.addEventListener('load', onHDLoad);
                img.src = hdSrc;
            };
            if (img.loading === 'lazy' && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            loadHDImage();
                            obs.unobserve(img);
                        }
                    });
                });
                observer.observe(img);
            }
            else {
                loadHDImage();
            }
        });
    }
    static loaded() {
        document.addEventListener('DOMContentLoaded', () => {
            BlurImage.initBlurUp(document);
        });
    }
}


/***/ }),

/***/ "./wwwroot/ts/share/ControlModal.ts":
/*!******************************************!*\
  !*** ./wwwroot/ts/share/ControlModal.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ControlModal: () => (/* binding */ ControlModal)
/* harmony export */ });
class ControlModal {
    constructor() {
        this.setControl = () => {
            Array.from(document.getElementsByClassName("modal_parent")).forEach((element) => {
                const modalParent = element;
                const modalElement = modalParent.querySelector(".modal_window");
                const modalWrapper = modalParent.querySelector(".modal_wrapper");
                const closeBtn = modalParent.querySelector(".close_modal");
                const openBtn = modalParent.querySelector(".open_modal");
                if (closeBtn && modalWrapper) {
                    closeBtn.addEventListener("click", () => {
                        this.hidden(modalWrapper);
                    });
                }
                if (modalWrapper && modalElement) {
                    modalWrapper.addEventListener("click", (event) => {
                        if (!modalElement.contains(event.target)) {
                            this.hidden(modalWrapper);
                        }
                    });
                }
                if (openBtn && modalWrapper) {
                    openBtn.addEventListener("click", () => {
                        this.show(modalWrapper);
                    });
                }
            });
        };
        this.show = (modalWrapper) => {
            modalWrapper.classList.remove("nodisplay");
        };
        this.hidden = (modalWrapper) => {
            modalWrapper.classList.add("nodisplay");
        };
    }
}


/***/ }),

/***/ "./wwwroot/ts/share/LocalStrage.ts":
/*!*****************************************!*\
  !*** ./wwwroot/ts/share/LocalStrage.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStrage: () => (/* binding */ LocalStrage)
/* harmony export */ });
class LocalStrage {
    static set(Obj_name, Obj) {
        window.sessionStorage.setItem(Obj_name, JSON.stringify(Obj));
    }
    static get(objName) {
        const obj = window.sessionStorage.getItem(objName);
        if (!this.check(objName)) {
            return false;
        }
        if (obj === null) {
            throw new Error("未知のエラー");
        }
        const parser = function (_k, v) { return v.toString().indexOf('function') === 0 ? eval('(' + v + ')') : v; };
        return JSON.parse(obj, parser);
    }
    static check(Obj_name) {
        if (window.sessionStorage.getItem(Obj_name)) {
            return true;
        }
        else {
            return false;
        }
    }
    static delete() {
        window.sessionStorage.clear();
    }
}


/***/ }),

/***/ "./wwwroot/ts/share/SetEventListner.ts":
/*!*********************************************!*\
  !*** ./wwwroot/ts/share/SetEventListner.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetEventListner: () => (/* binding */ SetEventListner)
/* harmony export */ });
class SetEventListner {
}
SetEventListner.setEvent = (parentElement, type, targetName, callback, atOnce = false) => {
    const returnHandler = (event) => {
        const targetElement = parentElement?.querySelector(targetName);
        if (event.target == targetElement) {
            callback(event);
            if (atOnce) {
                parentElement?.removeEventListener(type, returnHandler);
            }
        }
    };
    parentElement?.addEventListener(type, returnHandler);
    return returnHandler;
};
SetEventListner.setEventAll = (parentElement, type, targetName, callback, atOnce = false) => {
    const returnHandler = (event) => {
        const targetElements = parentElement?.querySelectorAll(targetName);
        if (targetElements && Array.from(targetElements).includes(event.target)) {
            callback(event);
            if (atOnce) {
                parentElement?.removeEventListener(type, returnHandler);
            }
        }
    };
    parentElement?.addEventListener(type, returnHandler);
    return returnHandler;
};
SetEventListner.removeEvent = (parentElement, type, handler) => {
    parentElement?.removeEventListener(type, handler);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./wwwroot/ts/pos/Index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root_share_ControlModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/ControlModal */ "./wwwroot/ts/share/ControlModal.ts");
/* harmony import */ var _root_share_BackButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root//share/BackButton */ "./wwwroot/ts/share/BackButton.ts");
/* harmony import */ var _root_share_BlurImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root//share/BlurImage */ "./wwwroot/ts/share/BlurImage.ts");
/* harmony import */ var _CaliculateCoinNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CaliculateCoinNumber */ "./wwwroot/ts/pos/CaliculateCoinNumber.ts");
/* harmony import */ var _StockOrder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StockOrder */ "./wwwroot/ts/pos/StockOrder.ts");





(async () => {
    const controlModal = new _root_share_ControlModal__WEBPACK_IMPORTED_MODULE_0__.ControlModal();
    const caliculateCoinNumber = new _CaliculateCoinNumber__WEBPACK_IMPORTED_MODULE_3__.CaliculateCoinNumber();
    const stockOrder = new _StockOrder__WEBPACK_IMPORTED_MODULE_4__.StockOrder();
    const backButton = new _root_share_BackButton__WEBPACK_IMPORTED_MODULE_1__.BackButton();
    controlModal.setControl();
    caliculateCoinNumber.setCoin();
    stockOrder.addOrder();
    backButton.Buck();
    _root_share_BlurImage__WEBPACK_IMPORTED_MODULE_2__.BlurImage.loaded();
})();

})();

/******/ })()
;
//# sourceMappingURL=pos.js.map