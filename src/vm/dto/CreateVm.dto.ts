import { IsNotEmpty} from "class-validator";
import { ProdutoRepository } from "src/produto/produto.respository";
import { VmEhUnica } from "../validacao/VmEhUnica.validator";

/**
 * DTO para validar a criação de uma nova Vending Machine
 */
export class CreateVmDTO {  

    // Nome da VM, deve ser string não vazia
    @VmEhUnica({message: 'Já existe uma VM cadastrado com esse nome'})
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    // Localização da VM, deve ser string não vazia
    @IsNotEmpty({ message: 'O tipo não pode ser vazio' })
    localizacao: string;

    // Referencia ao repositorio dos produtos dessa VM
    listaProdutos: ProdutoRepository
}