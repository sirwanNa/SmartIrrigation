"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CroptType = void 0;
var CroptType;
(function (CroptType) {
    CroptType[CroptType["None"] = 0] = "None";
    // 🌾 Grains & Cereals
    CroptType[CroptType["Wheat"] = 1] = "Wheat";
    CroptType[CroptType["Corn"] = 2] = "Corn";
    CroptType[CroptType["Rice"] = 4] = "Rice";
    CroptType[CroptType["Barley"] = 8] = "Barley";
    // 🥬 Vegetables
    CroptType[CroptType["Tomato"] = 16] = "Tomato";
    CroptType[CroptType["Potato"] = 32] = "Potato";
    CroptType[CroptType["Carrot"] = 64] = "Carrot";
    CroptType[CroptType["Cucumber"] = 128] = "Cucumber";
    // 🍎 Fruits
    CroptType[CroptType["Apple"] = 256] = "Apple";
    CroptType[CroptType["Orange"] = 512] = "Orange";
    CroptType[CroptType["Grape"] = 1024] = "Grape";
    CroptType[CroptType["Banana"] = 2048] = "Banana";
    // 🌰 Legumes
    CroptType[CroptType["Soybean"] = 4096] = "Soybean";
    CroptType[CroptType["Pea"] = 8192] = "Pea";
    // 🪵 Industrial
    CroptType[CroptType["Cotton"] = 16384] = "Cotton";
    CroptType[CroptType["Sugarcane"] = 32768] = "Sugarcane";
    // 🪴 Special
    CroptType[CroptType["Olive"] = 65536] = "Olive";
    CroptType[CroptType["Tea"] = 131072] = "Tea";
    CroptType[CroptType["Coffee"] = 262144] = "Coffee";
    // 🌿 Forage / Other
    CroptType[CroptType["Alfalfa"] = 524288] = "Alfalfa";
    CroptType[CroptType["Mixed"] = 1048576] = "Mixed"; // 1048576
})(CroptType || (exports.CroptType = CroptType = {}));
