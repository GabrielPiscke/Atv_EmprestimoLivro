package com.example.EmprestimoLivro.Repository;

import com.example.EmprestimoLivro.Entity.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
}
