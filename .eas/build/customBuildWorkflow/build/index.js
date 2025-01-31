/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 144:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const child_process_1 = __nccwpck_require__(81);
function customBuildWorkflow(ctx_1, _a) {
    return __awaiter(this, arguments, void 0, function* (ctx, { outputs }) {
        try {
            ctx.logger.info("🔍 Running tests...");
            (0, child_process_1.execSync)("npm test", { stdio: "inherit" });
            ctx.logger.info("🔍 Checking TypeScript errors...");
            (0, child_process_1.execSync)("tsc --noEmit", { stdio: "inherit" });
            ctx.logger.info("🚀 Running EAS Build...");
            (0, child_process_1.execSync)("eas build --platform ios --profile production --non-interactive", { stdio: "inherit" });
            ctx.logger.info("🔍 Checking if EAS Update exists...");
            try {
                (0, child_process_1.execSync)("eas update:check", { stdio: "inherit" });
                ctx.logger.info("✅ EAS Update exists, skipping submit.");
                outputs.shouldSubmit.set("false"); // EAS Update がある場合は Submit しない
            }
            catch (_b) {
                ctx.logger.info("⚡ No EAS Update found, submitting...");
                (0, child_process_1.execSync)('eas update --branch production --message "New update"', {
                    stdio: "inherit",
                });
                outputs.shouldSubmit.set("true");
            }
            if (outputs.shouldSubmit.value === "true") {
                ctx.logger.info("🚀 Submitting to App Store / Google Play...");
                (0, child_process_1.execSync)("eas submit --platform all --non-interactive", {
                    stdio: "inherit",
                });
            }
            ctx.logger.info("🎉 Build & Deployment completed successfully!");
        }
        catch (error) {
            ctx.logger.error("❌ Build failed:", error);
            throw error;
        }
    });
}
exports["default"] = customBuildWorkflow;


/***/ }),

/***/ 81:
/***/ ((module) => {

module.exports = require("child_process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(144);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;