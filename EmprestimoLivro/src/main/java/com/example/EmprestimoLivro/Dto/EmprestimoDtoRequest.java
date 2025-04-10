package com.example.EmprestimoLivro.Dto;

import com.example.EmprestimoLivro.Entity.Cliente;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmprestimoDtoRequest {

    private Date data_inicial;
    private Date data_final;
    private Cliente cliente;
}
