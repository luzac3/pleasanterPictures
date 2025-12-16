/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/ts/Coins/CreatePaypalButton.ts":
/*!************************************************!*\
  !*** ./wwwroot/ts/Coins/CreatePaypalButton.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreatePaypalButton: () => (/* binding */ CreatePaypalButton)
/* harmony export */ });
/* harmony import */ var _SendCoins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SendCoins */ "./wwwroot/ts/Coins/SendCoins.ts");

class CreatePaypalButton {
    constructor() {
        this.SetPaypalButton = () => {
            if (document.getElementsByClassName('purcahse_coins').length === 0) {
                return;
            }
            this.Create(120, 1, '#paypal_button_120');
            this.Create(600, 6, '#paypal_button_600');
            this.Create(1200, 13, '#paypal_button_1200');
            this.Create(3600, 40, '#paypal_button_3600');
            this.Create(6000, 68, '#paypal_button_6000');
            this.Create(12000, 140, '#paypal_button_12000');
        };
        this.Create = (value, coins, buttonContainer) => {
            paypal.Buttons({
                createOrder: (data, actions) => {
                    // 支払い金額などを指定
                    return actions.order.create({
                        purchase_units: [{
                                amount: {
                                    value: value
                                }
                            }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        const sendCoins = new _SendCoins__WEBPACK_IMPORTED_MODULE_0__.SendCoins();
                        sendCoins.setCoinsData(value, coins, details);
                    });
                }
            }).render(buttonContainer);
        };
    }
}


/***/ }),

/***/ "./wwwroot/ts/Coins/GiveCoins.ts":
/*!***************************************!*\
  !*** ./wwwroot/ts/Coins/GiveCoins.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GiveCoins: () => (/* binding */ GiveCoins)
/* harmony export */ });
/* harmony import */ var _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/FetchApi */ "./wwwroot/ts/share/FetchApi.ts");

class GiveCoins {
    constructor() {
        this.setCoinsData = () => {
            const forUserCdElement = document.getElementById("for_user_cd");
            const counterNumberElement = document.getElementsByClassName("counter")[0].querySelector(".counter_number");
            const giveElement = document.getElementById("give");
            giveElement.onclick = () => {
                const giveCoinsEntity = {
                    ForUserCd: Number(forUserCdElement.value),
                    Coins: Number(counterNumberElement.value),
                    Value: 0
                };
                if (giveElement != null) {
                    const coinsRate = Math.round(Number(counterNumberElement.value) * 0.2) == 0 ? 1 : Math.round(Number(counterNumberElement.value) * 0.2);
                    if (window.confirm("コイン" + coinsRate + "枚が手数料として引かれます。よろしいですか？")) {
                        this.send(giveCoinsEntity).then((data) => {
                            const response = JSON.parse(data);
                            console.log(response.StatusCode);
                            if (response.StatusCode == "200" || "OK") {
                                window.alert('譲渡が完了しました');
                            }
                            else // removed by dead control flow
{}
                        });
                    }
                }
            };
        };
        this.send = async (giveCoinsEntity) => {
            const fetchApi = new _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_0__.FetchApi();
            return await fetchApi.send(this.url, this.method, this.headers, giveCoinsEntity, this.responseKind).then(async (data) => {
                return data;
            }).catch(e => {
                throw e;
            });
        };
        this.url = '/Coins/GiveCoins';
        this.method = 'POST';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.responseKind = "text";
    }
}


/***/ }),

/***/ "./wwwroot/ts/Coins/SendCoins.ts":
/*!***************************************!*\
  !*** ./wwwroot/ts/Coins/SendCoins.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SendCoins: () => (/* binding */ SendCoins)
/* harmony export */ });
/* harmony import */ var _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/FetchApi */ "./wwwroot/ts/share/FetchApi.ts");

class SendCoins {
    constructor() {
        this.setCoinsData = (value, coins, details) => {
            let coinsEntity = {
                coins: coins,
                value: value
            };
            this.send(coinsEntity).then((data) => {
                console.log(details);
                console.log(data);
                // details.payer.name.given_name
                alert('支払いが完了しました');
            });
        };
        this.send = async (coinsEntity) => {
            const fetchApi = new _root_share_FetchApi__WEBPACK_IMPORTED_MODULE_0__.FetchApi();
            return await fetchApi.send(this.url, this.method, this.headers, coinsEntity, this.responseKind).then(async (data) => {
                return data;
            }).catch(e => {
                throw e;
            });
        };
        this.url = '/Coins/PaymentComplete';
        this.method = 'POST';
        this.headers = {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.responseKind = "text";
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
/*!***********************************!*\
  !*** ./wwwroot/ts/Coins/Index.ts ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root_share_Counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/Counter */ "./wwwroot/ts/share/Counter.ts");
/* harmony import */ var _CreatePaypalButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreatePaypalButton */ "./wwwroot/ts/Coins/CreatePaypalButton.ts");
/* harmony import */ var _root_share_BackButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root//share/BackButton */ "./wwwroot/ts/share/BackButton.ts");
/* harmony import */ var _GiveCoins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GiveCoins */ "./wwwroot/ts/Coins/GiveCoins.ts");




(() => {
    const counter = new _root_share_Counter__WEBPACK_IMPORTED_MODULE_0__.Counter();
    const createPaypalButton = new _CreatePaypalButton__WEBPACK_IMPORTED_MODULE_1__.CreatePaypalButton();
    const backButton = new _root_share_BackButton__WEBPACK_IMPORTED_MODULE_2__.BackButton();
    const giveCoins = new _GiveCoins__WEBPACK_IMPORTED_MODULE_3__.GiveCoins();
    createPaypalButton.SetPaypalButton();
    counter.SetCounter();
    backButton.Buck();
    giveCoins.setCoinsData();
})();

})();

/******/ })()
;
//# sourceMappingURL=Coins.js.map