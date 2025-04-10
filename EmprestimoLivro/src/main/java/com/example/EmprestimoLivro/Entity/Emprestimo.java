package com.example.EmprestimoLivro.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @ManyToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    @JsonBackReference
    private Cliente cliente;

    @OneToMany(mappedBy = "emprestimo", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Livro> livros;

    private long id;
    private Date data_inicial;
    private Date data_final;
}
