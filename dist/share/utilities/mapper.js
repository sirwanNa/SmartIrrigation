"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
class Mapper {
    static Map(input) {
        const output = {};
        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                output[key] = input[key];
            }
        }
        return output;
    }
}
exports.Mapper = Mapper;
