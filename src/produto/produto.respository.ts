import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

/**
 * Repositório onde os produtos são salvos.
 * Executa operações sobre produtos.
 */
@Injectable()
export class ProdutoRepository {

    // Array onde são salvos os produtos.
    private produtos: ProdutoEntity[] = [];
    public path: string;

    /**
     * Salva o produto do tipo ProdutoEntity no array produtos[]
     * @param produto (ProdutoEntity) produto a ser salvo
     */
    async salvar(produto: ProdutoEntity) {
        this.produtos.push(produto);
    }

    /**
     * Lista os produtos salvos
     * @returns Lista dos produtos salvos
     */
    async listar() {
        return this.produtos;
    }

    /**
     * Checa se há algum produto com o mesmo nome no banco de dados
     * 
     * @param nomeProduto 
     * @returns boolean: 1 caso o produto ainda não exista, 0 caso exista
     */
    async existeProduto(nomeProduto: string) {

        // itera pelos produtos[] até encontrar um com o mesmo nome
        const possivelProduto = this.produtos.find(
            produto => produto.nome === nomeProduto
        );

        return possivelProduto !== undefined;
    }

    /**
     * Busca o produto pelo nome na base de dados, lança um erro caso não exista
     * @param nome 
     * @returns produto encontrado
     */
    private buscaPorNome(nome: string) {
        // Procura um produto salvo com o mesmo nome
        const possivelProduto = this.produtos.find(
            produtoSalvo => produtoSalvo.nome === nome
        );

        // Produto não encontrado na base de dados
        if(!possivelProduto) {
            throw new Error('Produto não existe');
        }

        return possivelProduto;
    }

    /**
     * Atualiza um produto
     * @param nome 
     * @param produtoAtualizado 
     * @returns (ProdutoEntity) produto atualizado
     */
    async atualiza(nome: string, produtoAtualizado: Partial<ProdutoEntity>) {
        
        // Busca o produto na base de dados pelo nome
        const produto = this.buscaPorNome(nome);
    
        // Atualiza o produto com as novas informações
        Object.entries(produtoAtualizado).forEach(([chave, valor]) => {
            produto[chave] = valor;
        });
    
        return produto;
    }

    /**
     * Remove um produto pelo nome
     * @param nome 
     * @returns produto removido
     */
    async remove(nome: string) {
        // Busca o produto na base de dados pelo nome
        const produto = this.buscaPorNome(nome);

        this.produtos = this.produtos.filter(
            produtoSalvo => produtoSalvo.nome !== nome
        );

        return produto;
    }
}