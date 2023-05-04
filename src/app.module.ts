import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { VmModule } from './vm/vm.module';
import { HttpModule } from '@nestjs/axios';

/**
 * Controle do modulo de produtos
 */
@Module({
  imports: [VmModule, ProdutoModule, HttpModule],
})

export class AppModule {}
