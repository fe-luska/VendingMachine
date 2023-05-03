import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { VmRepository } from "../vm.respository";

/**
 * Validator assincrono que testa se já existe uma VM na database com o mesmo nome,
 * a fim de evitar duplicatas
 */
@Injectable()
@ValidatorConstraint({ async: true }) // validador assincrono
export class VmEhUnicoValidator implements ValidatorConstraintInterface {

    constructor(private vmRepository: VmRepository) {}
    
    /**
     * Valida se já existe uma VM com o mesmo nome
     * @param nomeVm Nome da VM a testar
     * @param validationArguments opcional
     * @return (boolean) - true: VM ainda não existe, false: VM já existente
     */
    async validate(nomeVm: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const vmDuplicadaExiste = await this.vmRepository.existeVm(nomeVm);
        return !vmDuplicadaExiste;
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
 * Exporta a função VmEhUnica para ser usado como decorator
 * para validação assincrono nos DTOs
 * @param opcoesDeValidacao 
 * @returns 
 */
export const VmEhUnica = (opcoesDeValidacao: ValidationOptions) => {
    
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: VmEhUnicoValidator
        });
    }
}