package com.example.EmprestimoLivro.Service;

import com.example.EmprestimoLivro.Dto.LivroDto;
import com.example.EmprestimoLivro.Entity.Livro;
import com.example.EmprestimoLivro.Repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {
    @Autowired
    private LivroRepository livrorepository;

    public Livro fromDTO(LivroDto livroDto){
        Livro livro = new Livro();
        livro.setNome(livroDto.getNome());
        livro.setIsbn(livroDto.getIsbn());
        livro.setAutor(livroDto.getAutor());
        livro.setGenero(livroDto.getGenero());

        return livro;
    }

    public LivroDto toDTO(Livro livro){
        LivroDto livroDTO = new LivroDto();
        livroDTO.setId(livro.getId());
        livroDTO.setNome(livro.getNome());
        livroDTO.setAutor(livro.getAutor());
        livroDTO.setIsbn(livro.getIsbn());
        livroDTO.setGenero(livro.getGenero());

        return livroDTO;
    }

    public List<Livro> getAll(){
        return livrorepository.findAll();
    }

    public Optional<LivroDto> getById(Long id){
        Optional<Livro> optionalLivro = livrorepository.findById(id);
        if(optionalLivro.isPresent()){
            return Optional.of(this.toDTO(optionalLivro.get()));
        }else {
            return Optional.empty();
        }
//        return livrorepository.findById(id).map(this::toDTO);
    }
    public List<Livro> getByGenero(String genero){
        return livrorepository.findAllByGenero(genero);
//        return livrorepository.findById(id).map(this::toDTO);
    }

    public LivroDto saveDto(LivroDto livroDTO){
        Livro livro = this.fromDTO(livroDTO);
        Livro livroBd = livrorepository.save(livro);
        return this.toDTO(livroBd);
    }

    public Optional<LivroDto> updateLivro(Long id, LivroDto livroDTO){
        Optional<Livro> optionalLivro = livrorepository.findById(id);
        if(optionalLivro.isPresent()){
            Livro livro = optionalLivro.get();
            livro.setNome(livroDTO.getNome());
            livro.setGenero(livroDTO.getGenero());
            livro.setIsbn(livroDTO.getIsbn());;
            livro.setAutor(livro.getAutor());

            Livro livroUpdate = livrorepository.save(livro);

            return Optional.of(this.toDTO(livroUpdate));
        }else {
            return Optional.empty();
        }
    }

    public boolean delete(Long id){
        if(livrorepository.existsById(id)){
            livrorepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
