"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldController = void 0;
const getFieldCommand_1 = require("../../core/application/commands/field/getFieldCommand");
const getFieldsListCommand_1 = require("../../core/application/commands/field/getFieldsListCommand");
const createFieldCommand_1 = require("../../core/application/commands/field/createFieldCommand");
const updateFieldCommand_1 = require("../../core/application/commands/field/updateFieldCommand");
const deleteFieldCommand_1 = require("../../core/application/commands/field/deleteFieldCommand");
class FieldController {
    constructor(uow, _fieldRepository) {
        this.uow = uow;
        this._fieldRepository = _fieldRepository;
        this.getFieldAsync = async (req, res) => {
            try {
                const fieldId = parseInt(req.params.id, 10);
                if (isNaN(fieldId)) {
                    res.status(400).json({ message: 'Invalid Field ID' });
                    return;
                }
                const command = new getFieldCommand_1.GetFieldCommand(this._fieldRepository);
                command.fieldId = fieldId;
                const result = await command.executeAsync();
                if (!result) {
                    res.status(404).json({ message: 'Field not found' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getField:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.getFieldsListAsync = async (req, res) => {
            try {
                const farmId = parseInt(req.params.id, 10);
                const command = new getFieldsListCommand_1.GetFieldsListCommand(this._fieldRepository, farmId);
                const result = await command.executeAsync();
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error in getFieldsList:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.createFieldAsync = async (req, res) => {
            try {
                const FieldData = req.body;
                const command = new createFieldCommand_1.CreateFieldCommand(this.uow, this._fieldRepository);
                command.fieldData = FieldData;
                const createdField = await command.executeAsync();
                res.status(201).json(createdField);
            }
            catch (error) {
                console.error('Error in creating Field:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.updateFieldAsync = async (req, res) => {
            try {
                const FieldData = req.body;
                const command = new updateFieldCommand_1.UpdateFieldCommand(this.uow, this._fieldRepository);
                command.fieldData = FieldData;
                const updatedField = await command.executeAsync();
                res.status(200).json(updatedField);
            }
            catch (error) {
                console.error('Error in updateField:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
        this.deleteFieldAsync = async (req, res) => {
            try {
                const FieldId = parseInt(req.params.id, 10);
                if (isNaN(FieldId)) {
                    res.status(400).json({ message: 'Invalid Field ID' });
                    return;
                }
                const command = new deleteFieldCommand_1.DeleteFieldCommand(this.uow, this._fieldRepository);
                command.fieldId = FieldId;
                const deleted = await command.executeAsync();
                res.status(204).json(deleted);
            }
            catch (error) {
                console.error('Error in deleteField:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        };
    }
}
exports.FieldController = FieldController;
