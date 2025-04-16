package com.example.EmprestimoLivro.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Livro implements Serializable {
    @ManyToMany(mappedBy = "livros")
    private Set<Emprestimo> emprestimos;

    public Livro(Long id, String nome, String autor, long isbn, String genero){
        this.id = id;
        this.nome = nome;
        this.autor = autor;
        this.isbn = isbn;
        this.genero = genero;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String autor;
    private long isbn;
    private String genero;

}
