import { Module } from "@nestjs/common";
import { VmController } from "./vm.controller";
import { VmRepository } from "./vm.respository";
import { VmEhUnicaValidator } from "./validacao/VmEhUnica.validator";
import { ProdutoModule } from "src/produto/produto.module";
import { ProdutoController } from "src/produto/produto.controller";

@Module({
    // imports: [ProdutoModule],
    controllers: [VmController],
    providers: [VmRepository, VmEhUnicaValidator]
})

export class VmModule {}