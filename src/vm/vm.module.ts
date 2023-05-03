import { Module } from "@nestjs/common";
import { VmController } from "./vm.controller";
import { VmRepository } from "./vm.respository";
import { VmEhUnicaValidator } from "./validacao/VmEhUnica.validator";

@Module({
    controllers: [VmController],
    providers: [VmRepository, VmEhUnicaValidator]
})

export class VmModule {}