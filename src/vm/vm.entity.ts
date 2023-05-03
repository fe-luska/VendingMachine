import { ProdutoRepository } from "src/produto/produto.respository";

/**
 * Entidade que representa uma VM
 */
export class VmEntity {
    nome: string;
    localizacao: string;
    listaProdutos: ProdutoRepository;
}