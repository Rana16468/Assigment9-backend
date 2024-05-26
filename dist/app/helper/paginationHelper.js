"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Node: Pagination Function , I have to Flowing Dont Repeat yourself functionality 
const calculatePagination = (options) => {
    const page = Number(options === null || options === void 0 ? void 0 : options.page) || 1;
    const limit = Number(options === null || options === void 0 ? void 0 : options.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || "desc";
    return {
        page, limit, skip, sortBy, sortOrder
    };
};
exports.default = calculatePagination;
