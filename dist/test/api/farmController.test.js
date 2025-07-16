"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// testFarmController.ts
const axios_1 = __importDefault(require("axios"));
const farmType_1 = require("../../core/domain/enums/farmType");
const irrigationType_1 = require("../../core/domain/enums/irrigationType");
const baseURL = 'http://localhost:4000'; // Change this to your API base
let createdFarmId;
const testFarm = {
    id: 1,
    name: 'Plain Test Farm',
    farmType: farmType_1.FarmType.FieldCrop,
    irrigationType: irrigationType_1.IrrigationType.Drip,
    createdDate: new Date('1/1/2025')
};
async function runTests() {
    console.log('Starting FarmController Tests...\n');
    // 1. Create farm (POST)
    try {
        const createRes = await axios_1.default.post(`${baseURL}/api/v1//farm/create/`, testFarm);
        console.log('✔️  Create Farm:', createRes.status, createRes.data);
        // Get the ID from a follow-up list request
        const farmsList = await axios_1.default.get(`${baseURL}/api/v1//farm/getfarmsList/`);
        const lastFarm = farmsList.data.find(f => f.name === testFarm.name);
        if (!lastFarm)
            throw new Error('❌ Created farm not found in list.');
        createdFarmId = lastFarm.id;
    }
    catch (err) {
        console.error('❌ Create Farm Failed:', err);
        return;
    }
    // // 2. Get farm by ID (GET)
    // try {
    //   const getRes = await axios.get<FarmDTO>(`${baseURL}/farms/${createdFarmId}`);
    //   console.log('✔️  Get Farm:', getRes.status, getRes.data);
    // } catch (err) {
    //   console.error('❌ Get Farm Failed:', err);
    // }
    // // 3. Get all farms (GET)
    // try {
    //   const listRes = await axios.get<FarmDTO[]>(`${baseURL}/farms`);
    //   console.log('✔️  Get All Farms:', listRes.status, listRes.data.length, 'farms');
    // } catch (err) {
    //   console.error('❌ Get All Farms Failed:', err);
    // }
    // // 4. Update farm (PUT)
    // try {
    //   const updatedFarm: FarmDTO = {
    //     ...testFarm,
    //     id: createdFarmId,
    //     name: 'Updated Plain Farm',
    //   };
    //   const updateRes = await axios.put(`${baseURL}/farms/${createdFarmId}`, updatedFarm);
    //   console.log('✔️  Update Farm:', updateRes.status, updateRes.data);
    // } catch (err) {
    //   console.error('❌ Update Farm Failed:', err);
    // }
    // // 5. Delete farm (DELETE)
    // try {
    //   const deleteRes = await axios.delete(`${baseURL}/farms/${createdFarmId}`);
    //   console.log('✔️  Delete Farm:', deleteRes.status);
    // } catch (err) {
    //   console.error('❌ Delete Farm Failed:', err);
    // }
    // // 6. Verify deletion (should be 404)
    // try {
    //   await axios.get(`${baseURL}/farms/${createdFarmId}`);
    //   console.error('❌ Farm was not deleted!');
    // } catch (err: any) {
    //   if (err.response?.status === 404) {
    //     console.log('✔️  Confirm Deletion: 404 Not Found');
    //   } else {
    //     console.error('❌ Unexpected error during delete check:', err);
    //   }
    // }
    console.log('\nFarmController Test Finished.');
}
runTests();
