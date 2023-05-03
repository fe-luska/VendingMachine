import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { VmModule } from './vm/vm.module';

/**
 * Controle do modulo de produtos
 */
@Module({
  imports: [ProdutoModule, VmModule],
})

export class AppModule {}
