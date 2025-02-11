"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchErrors = (controller) => async (req, res, next) => {
    try {
        return await controller(req, res, next);
    }
    catch (error) {
        return next(error);
    }
};
exports.default = catchErrors;
