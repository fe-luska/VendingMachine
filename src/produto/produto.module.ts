import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.respository";
import { ProdutoEhUnicoValidator } from "./validacao/ProdutoEhUnico.validator";

@Module({
    controllers: [ProdutoController],
    providers: [ProdutoRepository, ProdutoEhUnicoValidator]
})

export class ProdutoModule {}