import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CreateProdutoDTO } from "./dto/CreateProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoRepository } from "./produto.respository";

/**
 * Controlador dos produtos. Os produtos são salvos no ProdutoRepository.
 */
@Controller('/produtos')
export class ProdutoController {

    constructor(private produtoRepository: ProdutoRepository) {

    }

    /**
     * Cria o produto através de um Post. Produto já chega com os dados
     * validados através do DTO CreateProdutoDTO.
     * @param produto (CreateProdutoDTO) Produto validado
     */
    @Post()
    async createProduto(@Body() produto: CreateProdutoDTO) {
        
        // Converte o produto de CreateProdutoDTO para um ProdutoEntity
        const produtoEntity = new ProdutoEntity();
        produtoEntity.nome = produto.nome;
        produtoEntity.preco = produto.preco;
        produtoEntity.tipo = produto.tipo;

        // Salva o produto no array produtos[]
        this.produtoRepository.salvar(produto);

        return {
            nome: produtoEntity.nome,
            mensagem: "Produto adicionado com sucesso"
        }
    }

    /**
     * Implementa o Get request. Lista os produtos da database.
     * @returns lista dos produtos salvos
     */
    @Get()
    async listarProdutos() {
        return this.produtoRepository.listar();
    }

    /**
     * Atualiza as informações de um produto. Implementa o Put request.
     * @param nome
     * @param novosDados 
     * @returns produto atualizado, mensagem
     */
    @Put('/:nome')
    async atualizaProduto(@Param('nome') nome: string, @Body() novosDados: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoRepository.atualiza(nome, novosDados);

        return {
            produto: produtoAtualizado,
            mensagem: 'Produto atualizado com sucesso',
        }
    }

    
    /**
     * Deleta um produto pelo seu nome. 
     * @param nome 
     * @returns Produto removido, mensagem
     */
    @Delete('/:nome')
    async removeUsuario(@Param('nome') nome: string) {
        const produtoRemovido = await this.produtoRepository.remove(nome);

        return {
            produto: produtoRemovido,
            mensagem: 'Produto removido com sucesso'
        }
    }

}