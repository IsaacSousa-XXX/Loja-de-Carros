import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Cadastro {
  novoUsuario = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  statusMensagem: string = '';
  carregando: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  async cadastrarConta() {
    // Rastreador para provar que o botão está vivo no F12
    console.log('Botão acionado! Dados lidos:', this.novoUsuario);

    // 1. Verifica se tem algum campo em branco
    if (!this.novoUsuario.nome || !this.novoUsuario.email || !this.novoUsuario.senha || !this.novoUsuario.confirmarSenha) {
      this.statusMensagem = 'Preencha todos os campos.';
      this.cdr.detectChanges(); // <-- Faltava isto! Força a tela a mostrar o erro
      return;
    }

    // 2. Verifica se as senhas batem
    if (this.novoUsuario.senha !== this.novoUsuario.confirmarSenha) {
      this.statusMensagem = 'As senhas não coincidem!';
      this.cdr.detectChanges(); // <-- Faltava isto! Força a tela a mostrar o erro
      return;
    }

    this.carregando = true;
    this.statusMensagem = 'Criando sua credencial...';
    this.cdr.detectChanges(); // Atualiza a tela para mostrar que está a processar

    try {
      const resposta = await fetch('http://localhost:8000/cadastrar_usuario.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: this.novoUsuario.nome,
          email: this.novoUsuario.email,
          senha: this.novoUsuario.senha
        })
      });

      const textoResposta = await resposta.text();

      try {
        const resultado = JSON.parse(textoResposta);

        if (resultado.sucesso) {
          this.statusMensagem = 'Conta criada com sucesso! Redirecionando...';
          this.cdr.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/']); 
          }, 1500);
        } else {
          this.statusMensagem = resultado.mensagem;
          this.cdr.detectChanges();
        }
      } catch (e) {
        this.statusMensagem = 'Erro no servidor ao processar o cadastro.';
        this.cdr.detectChanges();
      }
    } catch (erro) {
      this.statusMensagem = 'Erro de conexão com o servidor.';
      this.cdr.detectChanges();
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }
}