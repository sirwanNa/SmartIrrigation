"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFarmCommand = void 0;
class GetFarmCommand {
    constructor(farmRepository) {
        this._farmRepository = farmRepository;
    }
    execute() {
        if (this.Id === undefined)
            throw new Error('Id is undefined');
        return this._farmRepository.getFarm(this.Id);
    }
}
exports.GetFarmCommand = GetFarmCommand;
// export class GetFarmCommand implements ICommand {
//   constructor(public readonly id: number) {}
// }
// export class GetFarmCommandHandler implements ICommandHandler<GetFarmCommand, FarmDTO> {
//   constructor(private readonly farmRepository: IFarmRepository) {}
//   public handle(command: GetFarmCommand): FarmDTO {
//     return this.farmRepository.getFarm(command.id);
//   }
// }
