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
    @ManyToOne
    @JoinColumn(name = "id_emprestimo", referencedColumnName = "id")
    @JsonBackReference
    private Emprestimo emprestimo;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String autor;
    private long isbn;
    private String genero;

}
