package com.example.EmprestimoLivro.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ManyToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    @JsonBackReference
    private Emprestimo emprestimo;

    private long id;
    private String nome;
    private String autor;
    private long isbn;
    private String genero;

}
