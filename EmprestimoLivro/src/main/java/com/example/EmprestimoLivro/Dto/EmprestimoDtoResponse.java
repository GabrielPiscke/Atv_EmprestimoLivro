package com.example.EmprestimoLivro.Dto;

import com.example.EmprestimoLivro.Entity.Cliente;
import com.example.EmprestimoLivro.Entity.Livro;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmprestimoDtoResponse implements Serializable {
    private long id;
    private Date data_inicial;
    private Date data_final;
    private List<Livro> livro;
    private Cliente cliente;
}
