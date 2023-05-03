import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { VmEhUnica } from "../validacao/VmEhUnica.validator";

/**
 * DTO para validar a atualização de uma VM. Os campos são opcionais,
 * assim, é possível atualizar parcialmente uma VM.
 */
export class AtualizaVmDTO {  

    @IsOptional()
    @VmEhUnica({message: 'Já existe uma VM cadastrada com esse nome'})
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsOptional()
    @IsNotEmpty({ message: 'a localizacao não pode ser vazia' })
    localizacao: string;
}