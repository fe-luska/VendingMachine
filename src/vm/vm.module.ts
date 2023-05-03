import { Module } from "@nestjs/common";
import { VmController } from "./vm.controller";
import { VmRepository } from "./vm.respository";
import { VmEhUnicoValidator } from "./validacao/VmEhUnica.validator";

@Module({
    controllers: [VmController],
    providers: [VmRepository, VmEhUnicoValidator]
})

export class VmModule {}