package com.example.EmprestimoLivro.Controller;

import com.example.EmprestimoLivro.Dto.ClienteDto;
import com.example.EmprestimoLivro.Entity.Cliente;
import com.example.EmprestimoLivro.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<ClienteDto> created(@RequestBody ClienteDto clienteDto){
        ClienteDto cliente = clienteService.saveDto(clienteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(clienteService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDto> getById(@PathVariable Long id){
        Optional<ClienteDto> clienteDTO = clienteService.getById(id);
        if(clienteDTO.isPresent()){
            return ResponseEntity.ok(clienteDTO.get());
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        //return clienteDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDto> update(@PathVariable Long id, @RequestBody ClienteDto clienteDTO){
        Optional<ClienteDto> clienteDTOOptional = clienteService.updateCliente(id, clienteDTO);
        if (clienteDTOOptional.isPresent()){
            return ResponseEntity.ok(clienteDTOOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(clienteService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
