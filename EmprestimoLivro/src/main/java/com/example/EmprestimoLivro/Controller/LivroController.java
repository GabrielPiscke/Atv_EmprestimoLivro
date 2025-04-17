package com.example.EmprestimoLivro.Controller;

import com.example.EmprestimoLivro.Dto.LivroDto;
import com.example.EmprestimoLivro.Entity.Livro;
import com.example.EmprestimoLivro.Service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/livro")
public class LivroController {
    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> getAll(@RequestParam(required = false) String genero){

        if(genero != null && !genero.isEmpty()){
           return livroService.getByGenero(genero);
        }else{
            return livroService.getAll();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroDto> getById(@PathVariable Long id){
        Optional<LivroDto> livroDTO = livroService.getById(id);
        if(livroDTO.isPresent()){
            return ResponseEntity.ok(livroDTO.get());
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        //return livroDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<LivroDto> created(@RequestBody LivroDto livroDto){
        LivroDto livro = livroService.saveDto(livroDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(livro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivroDto> update(@PathVariable Long id, @RequestBody LivroDto livroDTO){
        Optional<LivroDto> livroDTOOptional = livroService.updateLivro(id, livroDTO);
        if (livroDTOOptional.isPresent()){
            return ResponseEntity.ok(livroDTOOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(livroService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
