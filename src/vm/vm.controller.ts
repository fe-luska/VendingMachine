import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AtualizaVmDTO } from "./dto/AtualizaVm.dto";
import { CreateVmDTO } from "./dto/CreateVm.dto";
import { VmEntity } from "./vm.entity";
import { VmRepository } from "./vm.respository";

/**
 * Controlador das VMs. As VMs são salvas no VmRepository.
 */
@Controller('/vms')
export class VmController {

    constructor(private vmRepository: VmRepository) {

    }

    /**
     * Cria a VM através de um Post. VM já chega com os dados
     * validados através do DTO CreateVmDTO.
     * @param vm (CreateVmDTO) VM validada
     */
    @Post()
    async createProduto(@Body() vm: CreateVmDTO) {
        
        // Converte a VM de CreateVmDTO para um VmEntity
        const vmEntity = new VmEntity();
        vmEntity.nome = vm.nome;
        vmEntity.localizacao = vm.localizacao;

        // Salva a VM no array vms[]
        this.vmRepository.salvar(vmEntity);

        return {
            nome: vmEntity.nome,
            mensagem: "VM adicionada com sucesso"
        }
    }

    /**
     * Implementa o Get request. Lista as VMs da database.
     * @returns lista das vms salvas
     */
    @Get()
    async listarVms() {
        return this.vmRepository.listar();
    }

    /**
     * Atualiza as informações de uma VM. Implementa o Put request.
     * @param nome
     * @param novosDados 
     * @returns VM atualizado, mensagem
     */
    @Put('/:nome')
    async atualizaVm(@Param('nome') nome: string, @Body() novosDados: AtualizaVmDTO) {
        const vmAtualizada = await this.vmRepository.atualiza(nome, novosDados);

        return {
            VM: vmAtualizada,
            mensagem: 'VM atualizada com sucesso',
        }
    }

    
    /**
     * Deleta uma VM pelo seu nome. 
     * @param nome 
     * @returns VM removida, mensagem
     */
    @Delete('/:nome')
    async removeVm(@Param('nome') nome: string) {
        const vmRemovido = await this.vmRepository.remove(nome);

        return {
            VM: vmRemovido,
            mensagem: 'VM removida com sucesso'
        }
    }

}