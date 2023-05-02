import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';

/**
 * Controle do modulo de produtos
 */
@Module({
  imports: [ProdutoModule],
})

export class AppModule {}
