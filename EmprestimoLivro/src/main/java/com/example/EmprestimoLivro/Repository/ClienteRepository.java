package com.example.EmprestimoLivro.Repository;

import com.example.EmprestimoLivro.Entity.Cliente;
import com.example.EmprestimoLivro.Entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findAllByNome (String nome);
}
