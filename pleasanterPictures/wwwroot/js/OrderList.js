/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/ts/OrderList/CaliculateTotalCoins.ts":
/*!******************************************************!*\
  !*** ./wwwroot/ts/OrderList/CaliculateTotalCoins.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaliculateTotalCoins: () => (/* binding */ CaliculateTotalCoins)
/* harmony export */ });
class CaliculateTotalCoins {
    constructor() {
        this.SetTotalCoins = () => {
            const orderListElement = document.getElementById("order_list");
            orderListElement.addEventListener("change", () => {
                this.Set();
            });
        };
        this.Set = () => {
            const coins = Array.from(document.getElementsByClassName("coin_number"))
                .map(coinNumberElement => parseInt(coinNumberElement.value))
                .reduce((sum, element) => sum + element, 0);
            document.getElementById("pon_coins_input").value = coins.toString();
            document.getElementById("pon_coins").innerText = coins.toString();
        };
        this.Set();
    }
}


/***/ }),

/***/ "./wwwroot/ts/OrderList/GetOrderList.ts":
/*!**********************************************!*\
  !*** ./wwwroot/ts/OrderList/GetOrderList.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GetOrderList: () => (/* binding */ GetOrderList)
/* harmony export */ });
/* harmony import */ var _root_share_Counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/Counter */ "./wwwroot/ts/share/Counter.ts");
/* harmony import */ var _root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/share/LocalStrage */ "./wwwroot/ts/share/LocalStrage.ts");
/* harmony import */ var _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/share/FetchApi */ "./wwwroot/ts/share/FetchApi.ts");
/* harmony import */ var _root_share_BlurImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root//share/BlurImage */ "./wwwroot/ts/share/BlurImage.ts");
/* harmony import */ var _pos_CaliculateCoinNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pos//CaliculateCoinNumber */ "./wwwroot/ts/pos/CaliculateCoinNumber.ts");
/* harmony import */ var _CaliculateTotalCoins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CaliculateTotalCoins */ "./wwwroot/ts/OrderList/CaliculateTotalCoins.ts");






class GetOrderList {
    constructor() {
        this.setOrderList = () => {
            const counter = new _root_share_Counter__WEBPACK_IMPORTED_MODULE_0__.Counter();
            let orderEntityList = [];
            if (_root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_1__.LocalStrage.check("OrderEntityList")) {
                orderEntityList = _root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_1__.LocalStrage.get("OrderEntityList");
            }
            this.send(orderEntityList).then((data) => {
                const orderListElement = document.getElementById("order_list");
                orderListElement.innerHTML = data;
                // カウンターをアクティブ
                counter.SetCounter();
                // ぼかしの解除
                _root_share_BlurImage__WEBPACK_IMPORTED_MODULE_3__.BlurImage.initBlurUp(orderListElement);
                // コインの計算をセット
                const caliculateCoinNumber = new _pos_CaliculateCoinNumber__WEBPACK_IMPORTED_MODULE_4__.CaliculateCoinNumber();
                const caliculateTotalCoins = new _CaliculateTotalCoins__WEBPACK_IMPORTED_MODULE_5__.CaliculateTotalCoins();
                caliculateCoinNumber.setCoin();
                caliculateTotalCoins.SetTotalCoins();
            });
        };
        this.send = async (orderEntityList) => {
            const fetchApi = new _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_2__.FetchApi();
            return await fetchApi.send(this.url, this.method, this.headers, orderEntityList, this.responseKind).then(async (data) => {
                return data;
            }).catch(e => {
                throw e;
            });
        };
        this.url = '/Pos/OrderListContents';
        this.method = 'POST';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.responseKind = "text";
    }
}


/***/ }),

/***/ "./wwwroot/ts/OrderList/SendOrder.ts":
/*!*******************************************!*\
  !*** ./wwwroot/ts/OrderList/SendOrder.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SendOrder: () => (/* binding */ SendOrder)
/* harmony export */ });
/* harmony import */ var _root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/LocalStrage */ "./wwwroot/ts/share/LocalStrage.ts");
/* harmony import */ var _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/share/FetchApi */ "./wwwroot/ts/share/FetchApi.ts");
/* harmony import */ var _pos_OrderEntity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pos/OrderEntity */ "./wwwroot/ts/pos/OrderEntity.ts");



class SendOrder {
    constructor() {
        this.setOrderList = () => {
            document.getElementById("send_order")?.addEventListener("click", async () => {
                const orderButton = document.getElementById("send_order");
                // ボタンを殺す
                orderButton.disabled = true;
                const orderElements = Array.from(document.getElementsByClassName("order"));
                let orderEntityList = [];
                if (orderElements.length > 0) {
                    Array.from(document.getElementsByClassName("order")).forEach((orderElement) => {
                        const alcoholAmountElement = orderElement.querySelector(".alcohol_amount");
                        const alcoholAmount = alcoholAmountElement ? parseInt(alcoholAmountElement.value) : 0;
                        orderEntityList.push(new _pos_OrderEntity__WEBPACK_IMPORTED_MODULE_2__.OrderEntity(parseInt(orderElement.dataset.result_id), parseInt(orderElement.querySelector('.category')?.value ?? "0"), parseInt(orderElement.querySelector(".order_number").value), parseInt(orderElement.querySelector(".coin_number").value), alcoholAmount));
                    });
                    const orderObjectList = orderEntityList.map(order => ({
                        ResultId: order.ResultId,
                        Category: order.Category,
                        OrderNumber: order.OrderNumber,
                        OrderCoins: order.OrderCoins,
                        AlcoholAmount: order.AlcoholAmount
                    })).filter(x => x.OrderNumber != 0);
                    this.send(orderObjectList).then((data) => {
                        const result = JSON.parse(data);
                        if (result.status == "200") {
                            // オーダーのストックをクリア
                            _root_share_LocalStrage__WEBPACK_IMPORTED_MODULE_0__.LocalStrage.delete();
                            // 画面をクリア
                            document.getElementById("order_list").innerHTML = "";
                            document.getElementById("pon_coins").innerText = "0";
                            document.getElementById("pon_coins_input").value = "0";
                        }
                        orderButton.disabled = false;
                        window.alert(result.message);
                    });
                }
            });
        };
        this.send = async (orderEntityList) => {
            const fetchApi = new _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_1__.FetchApi();
            return await fetchApi.send(this.url, this.method, this.headers, orderEntityList, this.responseKind).then(async (data) => {
                return data;
            }).catch(e => {
                throw e;
            });
        };
        this.url = '/Pos/SendOrder';
        this.method = 'POST';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.responseKind = "text";
    }
}


/***/ }),

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

/***/ "./wwwroot/ts/share/Counter.ts":
/*!*************************************!*\
  !*** ./wwwroot/ts/share/Counter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Counter: () => (/* binding */ Counter)
/* harmony export */ });
class Counter {
    constructor() {
        this.SetCounter = () => {
            const counterElements = Array.from(document.getElementsByClassName('counter'));
            counterElements.forEach((element) => {
                const counterElement = element;
                const incrementButtonElement = counterElement.querySelector('.counter_increment');
                const decrementButtonElement = counterElement.querySelector('.counter_decrement');
                if (!counterElement) {
                    return;
                }
                this.HandlePress(counterElement, incrementButtonElement, 1);
                this.HandlePress(counterElement, decrementButtonElement, -1);
            });
        };
        this.ChangeValue = (counterElement, delta) => {
            const decrementNumberElement = counterElement.querySelector('.counter_number');
            const max = parseInt(counterElement.max) || 100;
            const min = parseInt(counterElement.min) || 0;
            let value = parseInt(decrementNumberElement.value) || 0;
            value += delta;
            value = Math.max(min, Math.min(max, value));
            decrementNumberElement.value = String(value);
            const event = new Event('change', { bubbles: true });
            decrementNumberElement.dispatchEvent(event);
        };
        this.HandlePress = (counterElement, buttonElement, delta) => {
            const interval = 200; // 長押し時の間隔(ms)
            let timer;
            let step = 1;
            let longPressStep = 5;
            buttonElement.addEventListener('mousedown', () => {
                step = 1;
                this.ChangeValue(counterElement, delta);
                const repeat = () => {
                    step = longPressStep;
                    this.ChangeValue(counterElement, delta * step);
                    timer = setTimeout(repeat, interval);
                }; // 0.5秒後に長押し判定
                timer = setTimeout(repeat, 500);
            });
            buttonElement.addEventListener('mouseup', () => {
                clearTimeout(timer);
            });
            buttonElement.addEventListener('mouseleave', () => {
                clearTimeout(timer);
            });
            buttonElement.addEventListener('touchend', () => {
                clearTimeout(timer);
            });
        };
    }
}


/***/ }),

/***/ "./wwwroot/ts/share/FetchApi.ts":
/*!**************************************!*\
  !*** ./wwwroot/ts/share/FetchApi.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchApi: () => (/* binding */ FetchApi)
/* harmony export */ });
var _a;
class FetchApi {
    constructor() {
        this.send = async (url, method, headers, body, responseKind = "json", needResponseData = true) => {
            let request;
            if (method == "GET") {
                request = new Request(url, {
                    method: method,
                    headers: headers
                });
            }
            else {
                request = new Request(url, {
                    method: method,
                    headers: headers,
                    body: JSON.stringify(body)
                });
            }
            ManageLoadElement.set();
            const response = await fetch(request).catch(e => { throw e; });
            if (!response.ok) {
                ManageLoadElement.remove();
                throw new Error(response.statusText);
            }
            if (!needResponseData) {
                ManageLoadElement.remove();
                return;
            }
            switch (responseKind) {
                case "json":
                    return await this.fetchResonse(response.json()).catch(e => { throw e; });
                case "text":
                    return await this.fetchResonse(response.text()).catch(e => { throw e; });
            }
        };
    }
    async fetchResonse(response) {
        return await response.then(data => {
            return data;
        })
            .catch(error => {
            // エラー処理
            console.log(error);
            throw error;
        })
            .finally(() => {
            ManageLoadElement.remove();
        });
    }
}
class ManageLoadElement {
}
_a = ManageLoadElement;
ManageLoadElement.loadElement = document.getElementById("loading-overlay");
ManageLoadElement.set = () => {
    if (_a.loadElement == null) {
        return;
    }
    _a.loadElement.classList.remove("nodisplay");
};
ManageLoadElement.remove = () => {
    if (_a.loadElement == null) {
        return;
    }
    _a.loadElement.classList.add("nodisplay");
};


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
/*!***************************************!*\
  !*** ./wwwroot/ts/OrderList/Index.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root_share_BackButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root//share/BackButton */ "./wwwroot/ts/share/BackButton.ts");
/* harmony import */ var _GetOrderList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GetOrderList */ "./wwwroot/ts/OrderList/GetOrderList.ts");
/* harmony import */ var _SendOrder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SendOrder */ "./wwwroot/ts/OrderList/SendOrder.ts");



(async () => {
    const backButton = new _root_share_BackButton__WEBPACK_IMPORTED_MODULE_0__.BackButton();
    const getOrderList = new _GetOrderList__WEBPACK_IMPORTED_MODULE_1__.GetOrderList();
    const sendOrder = new _SendOrder__WEBPACK_IMPORTED_MODULE_2__.SendOrder();
    backButton.Buck();
    getOrderList.setOrderList();
    sendOrder.setOrderList();
})();

})();

/******/ })()
;
//# sourceMappingURL=OrderList.js.map