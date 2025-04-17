package com.example.EmprestimoLivro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDto implements Serializable {
    private long id;
    private String nome;
    private String sobrenome;
    private String cpf;
}
