import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ProdutoEhUnico } from "../validacao/ProdutoEhUnico.validator";

/**
 * DTO para validar a atualização de um produto. Os campos são opcionais,
 * assim, é possível atualizar parcialmente um produto.
 */
export class AtualizaProdutoDTO {  

    @IsOptional()
    @ProdutoEhUnico({message: 'Já existe um produto cadastrado com esse nome'})
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsOptional()
    @IsNotEmpty({ message: 'O tipo não pode ser vazio' })
    tipo: string;

    @IsOptional()
    @IsNotEmpty({ message: 'O preço não pode ser vazio' })
    preco: string;
}