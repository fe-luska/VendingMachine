import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ProdutoRepository } from "../produto.respository";

/**
 * Validator assincrono que testa se já existe um produto na database com o mesmo nome,
 * a fim de evitar duplicatas
 */
@Injectable()
@ValidatorConstraint({ async: true }) // validador assincrono
export class ProdutoEhUnicoValidator implements ValidatorConstraintInterface {

    constructor(private produtoRepository: ProdutoRepository) {}
    
    /**
     * Valida se já existe um produto com o mesmo nome
     * @param nomeProduto Nome do produto a testar
     * @param validationArguments opcional
     * @return (boolean) - true: produto ainda não existe, false: produto já existente
     */
    async validate(nomeProduto: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const produtoDuplicadoExiste = await this.produtoRepository.existeProduto(nomeProduto);
        return !produtoDuplicadoExiste;
    }

    /**
     * Lança um erro caso o validator seja usado errado
     * @param validationArguments opcional
     */
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new Error("Erro: método não encontrado.");
    }

}

/**
 * Exporta a função produtoEhUnico para ser usado como decorator
 * para validação assincrono nos DTOs
 * @param opcoesDeValidacao 
 * @returns 
 */
export const ProdutoEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: ProdutoEhUnicoValidator
        });
    }
}