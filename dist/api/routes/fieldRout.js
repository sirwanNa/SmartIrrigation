"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fieldController_1 = require("../controllers/fieldController");
const router = (0, express_1.Router)();
const FieldRepository = new FieldRepository();
const controller = new fieldController_1.FieldController(FieldRepository);
router.get('/Field/:id', controller.getFieldAsync);
router.get('/Field/getFieldsList/', controller.getFieldsListAsync);
router.post('/Field/create/', controller.createFieldAsync);
router.put('/Field/update/', controller.updateFieldAsync);
router.delete('/Field/delete/', controller.deleteFieldAsync);
exports.default = router;
