package com.example.EmprestimoLivro.Service;

import com.example.EmprestimoLivro.Dto.ClienteDto;
import com.example.EmprestimoLivro.Entity.Cliente;
import com.example.EmprestimoLivro.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienterepository;

    public Cliente fromDTO(ClienteDto clienteDto){
        Cliente cliente = new Cliente();
        cliente.setNome(clienteDto.getNome());
        cliente.setSobrenome(clienteDto.getSobrenome());
        cliente.setCpf(clienteDto.getCpf());

        return cliente;
    }

    public ClienteDto toDTO(Cliente cliente){
        ClienteDto clienteDTO = new ClienteDto();
        clienteDTO.setId(cliente.getId());
        clienteDTO.setNome(cliente.getNome());
        clienteDTO.setSobrenome(cliente.getSobrenome());
        clienteDTO.setCpf(cliente.getCpf());

        return clienteDTO;
    }

    public List<Cliente> getAll(){
        return clienterepository.findAll();
    }

    public List<Cliente> getByNome(String nome){
        return clienterepository.findAllByNome(nome);
//        return livrorepository.findById(id).map(this::toDTO);
    }

    public Optional<ClienteDto> getById(Long id){
        Optional<Cliente> optionalCliente = clienterepository.findById(id);
        if(optionalCliente.isPresent()){
            return Optional.of(this.toDTO(optionalCliente.get()));
        }else {
            return Optional.empty();
        }
//        return clienterepository.findById(id).map(this::toDTO);
    }

    public ClienteDto saveDto(ClienteDto clienteDTO){
        Cliente cliente = this.fromDTO(clienteDTO);
        Cliente clienteBd = clienterepository.save(cliente);
        return this.toDTO(clienteBd);
    }

    public Optional<ClienteDto> updateCliente(Long id, ClienteDto clienteDTO){
        Optional<Cliente> optionalCliente = clienterepository.findById(id);
        if(optionalCliente.isPresent()){
            Cliente cliente = optionalCliente.get();
            cliente.setNome(clienteDTO.getNome());
            cliente.setSobrenome(clienteDTO.getSobrenome());
            cliente.setCpf(clienteDTO.getCpf());

            Cliente clienteUpdate = clienterepository.save(cliente);

            return Optional.of(this.toDTO(clienteUpdate));
        }else {
            return Optional.empty();
        }
    }
    public boolean delete(Long id){
        if(clienterepository.existsById(id)){
            clienterepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
