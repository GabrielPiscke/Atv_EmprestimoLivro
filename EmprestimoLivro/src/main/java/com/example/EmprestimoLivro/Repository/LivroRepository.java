package com.example.EmprestimoLivro.Repository;

import com.example.EmprestimoLivro.Entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findAllByGenero (String genero);
}
