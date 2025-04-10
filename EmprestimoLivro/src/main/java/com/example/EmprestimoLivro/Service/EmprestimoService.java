package com.example.EmprestimoLivro.Service;

import com.example.EmprestimoLivro.Dto.EmprestimoDtoRequest;
import com.example.EmprestimoLivro.Dto.EmprestimoDtoResponse;
import com.example.EmprestimoLivro.Entity.Emprestimo;
import com.example.EmprestimoLivro.Repository.EmprestimoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmprestimoService {
    @Autowired
    private EmprestimoRepository emprestimorepository;

    // teremos dois objetos DTO para ser trabalhado devido
    // a entrada das informações de alunos não serem feitas pelo Emprestimo , ou seja o EmprestimoDtoRequest nao tem o aluno
    // no caso da saida de dados, ao retornar um emprestimo será retornado o seus alunos, assim será utilizado Emprestimo DtoResponse

    // converte de EmprestimoDtoRequest para Emprestimo
    public Emprestimo fromDTO(EmprestimoDtoRequest emprestimodtorequest){
        Emprestimo emprestimo = new Emprestimo ();
        emprestimo.setData_inicial(emprestimodtorequest.getData_inicial());
        emprestimo.setData_final(emprestimodtorequest.getData_final());
        emprestimo.setCliente(emprestimodtorequest.getCliente());

        return emprestimo;
    }

    // converte de Emprestimo  para Emprestimo DTO response
    public EmprestimoDtoResponse toDTO(Emprestimo emprestimo){
        EmprestimoDtoResponse emprestimodtoresponse = new EmprestimoDtoResponse();
        emprestimodtoresponse.setId(emprestimo.getId());
        emprestimodtoresponse.setCliente(emprestimo.getCliente());
        emprestimodtoresponse.setLivro(emprestimo.getLivros());
        emprestimodtoresponse.setData_inicial(emprestimo.getData_inicial());
        emprestimodtoresponse.setData_final(emprestimo.getData_final());

        return emprestimodtoresponse;
    }

    public List<Emprestimo> getAll(){
        return emprestimorepository.findAll();
    }

    public Optional<EmprestimoDtoResponse> getById(Long id){
        Optional<Emprestimo> optionalEmprestimo = emprestimorepository.findById(id);
        if(optionalEmprestimo.isPresent()){// verifica se encontrou algum professor
            return Optional.of(this.toDTO(optionalEmprestimo.get()));
        }else {
            return Optional.empty(); // um objeto Optional vazio.
        }
//        return professorRepository.findById(id).map(this::toDTO);
    }

    public EmprestimoDtoResponse saveDto(EmprestimoDtoRequest emprestimodtorequest){
        Emprestimo emprestimo = this.fromDTO(emprestimodtorequest);
        Emprestimo emprestimoBd = emprestimorepository.save(emprestimo);
        return this.toDTO(emprestimoBd);
    }

    public Optional<EmprestimoDtoResponse> updateEmprestimo (Long id, EmprestimoDtoRequest emprestimodtorequest){
        Optional<Emprestimo> optionalEmprestimo = emprestimorepository.findById(id);
        if(optionalEmprestimo.isPresent()){
            Emprestimo emprestimo = optionalEmprestimo.get();
            emprestimo.setData_inicial(emprestimodtorequest.getData_inicial());
            emprestimo.setData_final(emprestimodtorequest.getData_final());
            emprestimo.setCliente(emprestimodtorequest.getCliente());

            Emprestimo emprestimoUpdate = emprestimorepository.save(emprestimo);

            return Optional.of(this.toDTO(emprestimoUpdate));
        }else {
            return Optional.empty();
        }
    }

    public boolean delete(Long id){
        if(emprestimorepository.existsById(id)){
            emprestimorepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
