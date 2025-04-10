package com.example.EmprestimoLivro.Controller;

import com.example.EmprestimoLivro.Dto.EmprestimoDtoRequest;
import com.example.EmprestimoLivro.Dto.EmprestimoDtoResponse;
import com.example.EmprestimoLivro.Entity.Emprestimo;
import com.example.EmprestimoLivro.Service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/emprestimo")
public class EmprestimoController {
    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public ResponseEntity<List<Emprestimo>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(emprestimoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmprestimoDtoResponse> getById(@PathVariable Long id){
        Optional<EmprestimoDtoResponse> emprestimoDTO = emprestimoService.getById(id);
        if(emprestimoDTO.isPresent()){
            return ResponseEntity.ok(emprestimoDTO.get());
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        //return emprestimoDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EmprestimoDtoResponse> created(@RequestBody EmprestimoDtoRequest emprestimoDtoRequest){
        EmprestimoDtoResponse emprestimo = emprestimoService.saveDto(emprestimoDtoRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(emprestimo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmprestimoDtoResponse> update(@PathVariable Long id, @RequestBody EmprestimoDtoRequest emprestimoDTORequest){
        Optional<EmprestimoDtoResponse> emprestimoDTOResponse = emprestimoService.updateEmprestimo(id, emprestimoDTORequest);
        if (emprestimoDTOResponse.isPresent()){
            return ResponseEntity.ok(emprestimoDTOResponse.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (emprestimoService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
