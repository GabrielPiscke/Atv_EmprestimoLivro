package com.example.EmprestimoLivro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDto {
    private long id;
    private String nome;
    private String sobrenome;
    private String cpf;
}
