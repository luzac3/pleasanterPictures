/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/ts/Collection/JumpDetail.ts":
/*!*********************************************!*\
  !*** ./wwwroot/ts/Collection/JumpDetail.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JumpDetail: () => (/* binding */ JumpDetail)
/* harmony export */ });
class JumpDetail {
    constructor() {
        this.Jump = () => {
            const elements = Array.from(document.getElementsByClassName('alcohol_order'));
            elements.forEach((element) => {
                if (element.classList.contains("detail_link")) {
                    const alcoholInfo = element.querySelector('.alchol_info');
                    alcoholInfo.addEventListener("click", () => {
                        const alcoholId = alcoholInfo.dataset.result_id;
                        location.href = `/Collection/AlcoholDetail/${alcoholId}`;
                    });
                }
            });
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
/*!****************************************!*\
  !*** ./wwwroot/ts/Collection/Index.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root_share_ControlModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/share/ControlModal */ "./wwwroot/ts/share/ControlModal.ts");
/* harmony import */ var _root_share_BackButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root//share/BackButton */ "./wwwroot/ts/share/BackButton.ts");
/* harmony import */ var _JumpDetail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JumpDetail */ "./wwwroot/ts/Collection/JumpDetail.ts");



(async () => {
    const controlModal = new _root_share_ControlModal__WEBPACK_IMPORTED_MODULE_0__.ControlModal();
    const jumpDetail = new _JumpDetail__WEBPACK_IMPORTED_MODULE_2__.JumpDetail();
    const backButton = new _root_share_BackButton__WEBPACK_IMPORTED_MODULE_1__.BackButton();
    controlModal.setControl();
    jumpDetail.Jump();
    backButton.Buck();
})();

})();

/******/ })()
;
//# sourceMappingURL=Collection.js.map