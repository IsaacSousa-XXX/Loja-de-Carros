import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Login {
  credenciais = {
    email: '',
    senha: ''
  };

  statusMensagem: string = '';
  carregando: boolean = false;

  // Injetamos o Router para mudar de página, e o ChangeDetector para atualizar a tela
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  async fazerLogin() {
    if (!this.credenciais.email || !this.credenciais.senha) {
      this.statusMensagem = 'Preencha todos os campos.';
      return;
    }

    this.carregando = true;
    this.statusMensagem = 'Verificando credenciais...';

    try {
      const resposta = await fetch('http://localhost:8000/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.credenciais)
      });

      const textoResposta = await resposta.text();

      try {
        const resultado = JSON.parse(textoResposta);

        if (resultado.sucesso) {
          this.statusMensagem = 'Acesso liberado! Redirecionando...';
          
          setTimeout(() => {
            if (this.credenciais.email === 'admin@koc.com') {
              // GRAVA O CRACHÁ DE ADMIN NO NAVEGADOR
              localStorage.setItem('koc_perfil', 'admin');
              this.router.navigate(['/estoque']); 
            } else {
              // GRAVA O CRACHÁ DE CLIENTE COMUM
              localStorage.setItem('koc_perfil', 'cliente');
              this.router.navigate(['/vitrine']); 
            }
          }, 800); 
          
        } else {
          this.statusMensagem = resultado.mensagem; // Ex: E-mail ou senha incorretos
        }
      } catch (erroJson) {
        console.error('O PHP retornou um erro em texto:', textoResposta);
        this.statusMensagem = 'Erro no servidor. Aperte F12 para olhar o Console.';
      }

    } catch (erro) {
      console.error('Erro de requisição:', erro);
      this.statusMensagem = 'Erro de conexão. O PHP está rodando?';
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }
}