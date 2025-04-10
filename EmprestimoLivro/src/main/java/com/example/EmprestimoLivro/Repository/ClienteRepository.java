package com.example.EmprestimoLivro.Repository;

import com.example.EmprestimoLivro.Entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
