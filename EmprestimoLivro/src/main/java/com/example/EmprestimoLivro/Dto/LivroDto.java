package com.example.EmprestimoLivro.Dto;

import com.example.EmprestimoLivro.Entity.Emprestimo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LivroDto implements Serializable {

    @JsonIgnoreProperties("livros")
    private Emprestimo emprestimo;

    private long id;
    private String nome;
    private String autor;
    private long isbn;
    private String genero;
}
