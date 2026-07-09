import { RouterModule } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [CommonModule, RouterModule] // Essencial para usarmos o *ngFor e *ngIf no HTML
})
export class Dashboard implements OnInit {
  // Array que vai guardar a lista de veículos que vier do banco
  estoque: any[] = [];
  carregando: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  // O ngOnInit roda automaticamente assim que a página é aberta
  ngOnInit() {
    this.carregarEstoqueVitrine();
  }

  async carregarEstoqueVitrine() {
    try {
      const resposta = await fetch('http://localhost:8000/listar_veiculos.php');
      const resultado = await resposta.json();

      if (resultado.sucesso) {
        // Guarda os dados na variável
        this.estoque = resultado.dados;
      } else {
        console.error('Erro retornado pelo banco:', resultado.mensagem);
      }
    } catch (erro) {
      console.error('Erro de conexão. O PHP está rodando?', erro);
    } finally {
      // Tira o status de carregamento e avisa o Angular para atualizar a tela
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }
}