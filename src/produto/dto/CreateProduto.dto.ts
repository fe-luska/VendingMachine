import { IsNotEmpty, IsNumber } from "class-validator";
import { ProdutoEhUnico } from "../validacao/ProdutoEhUnico.validator";

/**
 * DTO para validar a criação de um novo produto
 */
export class CreateProdutoDTO {  

    // Nome do produto, deve ser string não vazia
    @ProdutoEhUnico({message: 'Já existe um produto cadastrado com esse nome'})
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    // Tipo do produto, string
    @IsNotEmpty({ message: 'O tipo não pode ser vazio' })
    tipo: string;

    // Preço do produto, string
    @IsNotEmpty({ message: 'O preço não pode ser vazio' })
    preco: string;
}