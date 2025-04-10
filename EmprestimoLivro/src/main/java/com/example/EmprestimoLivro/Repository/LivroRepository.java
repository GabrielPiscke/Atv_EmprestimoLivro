package com.example.EmprestimoLivro.Repository;

import com.example.EmprestimoLivro.Entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}
