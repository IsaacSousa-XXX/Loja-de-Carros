import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class Dashboard implements OnInit {
  estoque: any[] = [];
  estoqueFiltrado: any[] = [];
  carregando: boolean = true;

  // Variáveis dos filtros (O erro estava aqui: faltavam estas declarações)
  filtroTermo: string = '';
  filtroMarca: string = '';
  filtroAno: string = ''; 
  filtroTipo: string = '';

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.carregarEstoqueVitrine();
  }

  async carregarEstoqueVitrine() {
    try {
      const resposta = await fetch('http://localhost:8000/listar_veiculos.php');
      const resultado = await resposta.json();
      if (resultado.sucesso) {
        this.estoque = resultado.dados;
        this.estoqueFiltrado = resultado.dados;
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  filtrar() {
    this.estoqueFiltrado = this.estoque.filter(v => {
      // Verifica se o termo de busca está no modelo ou marca
      const matchTermo = (v.modelo + ' ' + v.marca).toLowerCase().includes(this.filtroTermo.toLowerCase());
      
      // Verifica marca (se selecionada)
      const matchMarca = this.filtroMarca === '' || v.marca.toLowerCase() === this.filtroMarca.toLowerCase();
      
      // Verifica tipo (se selecionado)
      const matchTipo = this.filtroTipo === '' || v.categoria.toLowerCase() === this.filtroTipo.toLowerCase();
      
      // Verifica ano (se selecionado)
      const matchAno = this.filtroAno === '' || v.ano.toString() === this.filtroAno;

      return matchTermo && matchMarca && matchTipo && matchAno;
    });
  }

  // Não se esqueça de importar o Router e injetar no constructor se já não tiver!
  sair() {
    // 1. Arranca o crachá do navegador
    localStorage.removeItem('koc_perfil');
    
    // 2. Chuta o usuário de volta para a tela de login
    this.router.navigate(['/']);
  }
}