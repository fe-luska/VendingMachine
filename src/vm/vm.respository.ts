import { Injectable } from "@nestjs/common";
import { VmEntity } from "./vm.entity";

/**
 * Repositório onde as VMs são salvas.
 * Executa operações sobre as VMs.
 */
@Injectable()
export class VmRepository {

    // Array onde são salvos as VMs.
    private vms: VmEntity[] = [];

    /**
     * Salva a VM (VmEntity) no array vms[]
     * @param vm (VmEntity) vm a ser salva
     */
    async salvar(vm: VmEntity) {
        this.vms.push(vm);
    }
    
    /**
     * Lista as vms do database
     * @returns Lista das VMs salvas
     */
    async listar() {
        return this.vms;
    }

    /**
     * Checa se há alguma VM com o mesmo nome no banco de dados
     * 
     * @param nomeVm 
     * @returns boolean: 1 caso a VM ainda não exista, 0 caso exista
     */
    async existeVm(nomeVm: string) {

        // itera pelo array vms[] até encontrar uma com o mesmo nome
        const possivelVm = this.vms.find(
            vm => vm.nome === nomeVm
        );

        return possivelVm !== undefined;
    }

    /**
     * Busca a VM pelo nome na base de dados, lança um erro caso não exista
     * @param nome 
     * @returns VM encontrada
     */
    private buscaPorNome(nome: string) {
        // Procura uma VM salva com o mesmo nome
        const possivelVm = this.vms.find(
            vmSalva => vmSalva.nome === nome
        );

        // VM não encontrada na base de dados
        if(!possivelVm) {
            throw new Error('VM não existe');
        }

        return possivelVm;
    }

    /**
     * Atualiza uma VM
     * @param nome 
     * @param vmAtualizada
     * @returns (VmEntity) VM atualizada (parcial)
     */
    async atualiza(nome: string, vmAtualizada: Partial<VmEntity>) {
        
        // Busca a VM na base de dados pelo nome
        const vm = this.buscaPorNome(nome);
    
        // Atualiza a VM com as novas informações
        Object.entries(vmAtualizada).forEach(([chave, valor]) => {
            vm[chave] = valor;
        });
    
        return vm;
    }

    /**
     * Remove uma VM pelo nome
     * @param nome 
     * @returns VM removida
     */
    async remove(nome: string) {

        // Busca a VM na base de dados pelo nome, lança um erro caso não exista
        const vm = this.buscaPorNome(nome);

        // Remove a VM encontrada
        this.vms = this.vms.filter(
            vmSalva => vmSalva.nome !== nome
        );

        return vm;
    }
}