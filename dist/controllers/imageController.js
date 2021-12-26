"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = exports.isExist = void 0;
var fs = __importStar(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var processImage = function (filename, width, height) { return __awaiter(void 0, void 0, void 0, function () {
    var Image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sharp_1.default)("./full/".concat(filename, ".jpg"))
                    .resize(parseInt(width), parseInt(height))
                    .toFile("".concat(filename).concat(width, "x").concat(height, ".jpg"))];
            case 1:
                Image = _a.sent();
                return [2 /*return*/, Image];
        }
    });
}); };
exports.processImage = processImage;
var readImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, width, height;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, filename = _a.filename, width = _a.width, height = _a.height;
                return [4 /*yield*/, fs.readFile("".concat(filename).concat(width, "x").concat(height, ".jpg"), function (err, data) {
                        if (err)
                            throw err; // Fail if the file can't be read.
                        res.writeHead(200, { "Content-Type": "image/jpg" });
                        res.end(data); // Send the file data to the browser.
                    })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
var isExist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, width, height;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, filename = _a.filename, width = _a.width, height = _a.height;
                console.log("check step");
                if (!fs.existsSync("./".concat(filename).concat(width, "x").concat(height, ".jpg"))) return [3 /*break*/, 2];
                console.log("done lol mawgod");
                return [4 /*yield*/, readImage(req, res)];
            case 1:
                _b.sent();
                return [3 /*break*/, 6];
            case 2:
                console.log("la2 msh hena");
                return [4 /*yield*/, processImage(filename, width, height)];
            case 3:
                _b.sent();
                return [4 /*yield*/, console.log("reesized")];
            case 4:
                _b.sent();
                return [4 /*yield*/, readImage(req, res)];
            case 5:
                _b.sent();
                console.log(res.statusCode);
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.isExist = isExist;
// https://tqtoz.sse.codesandbox.io/api/images?filename=palmtunnel&width=600&height=400
