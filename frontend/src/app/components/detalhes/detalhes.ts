import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Detalhes implements OnInit {
  @ViewChild('galeria') galeria!: ElementRef;
  
  fotoAtual: number = 1;
  totalFotos: number = 10; // Deixaremos fixo por enquanto até o banco gerenciar fotos múltiplas
  
  veiculo: any = null; // Vai guardar os dados da Twister ou do carro selecionado
  carregando: boolean = true;

  // Injetamos o ActivatedRoute para ler a URL
  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Pega o ID da barra de endereços
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarDadosDoVeiculo(id);
    }
  }

  async buscarDadosDoVeiculo(id: string) {
    try {
      const resposta = await fetch(`http://localhost:8000/buscar_veiculo.php?id=${id}`);
      const resultado = await resposta.json();

      if (resultado.sucesso) {
        this.veiculo = resultado.dados;
      }
    } catch (erro) {
      console.error('Erro ao buscar detalhes:', erro);
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  // ... (Mantenha as suas funções passarDireita, passarEsquerda e atualizarContador aqui em baixo sem mexer) ...
  passarDireita() { this.galeria.nativeElement.scrollBy({ left: window.innerWidth, behavior: 'smooth' }); }
  passarEsquerda() { this.galeria.nativeElement.scrollBy({ left: -window.innerWidth, behavior: 'smooth' }); }
  atualizarContador() {
    const elemento = this.galeria.nativeElement;
    this.fotoAtual = Math.round(elemento.scrollLeft / elemento.clientWidth) + 1;
  }
}