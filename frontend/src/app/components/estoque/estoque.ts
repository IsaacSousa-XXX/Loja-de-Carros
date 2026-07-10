import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Estoque implements OnInit {
  veiculos: any[] = [];
  carregando: boolean = true;

  // Injetamos o NgZone para resolver o problema dos dois cliques e o Router para a navegação
  constructor(
    private cdr: ChangeDetectorRef, 
    private zone: NgZone, 
    private router: Router
  ) {}

  ngOnInit() {
    // 1. A FORÇA BRUTA: Bate a porta na cara se não tiver crachá de admin
    const perfil = localStorage.getItem('koc_perfil');
    
    if (perfil !== 'admin') {
      this.router.navigate(['/']); // Chuta pro login
      return; // Para a execução do código aqui, impedindo o carregamento da tabela
    }

    // 2. Se for admin autenticado, a vida segue e carrega a tabela do banco
    this.carregarEstoque();
  }

  async carregarEstoque() {
    try {
      const resposta = await fetch('http://localhost:8000/listar_veiculos.php');
      const resultado = await resposta.json();

      if (resultado.sucesso) {
        this.veiculos = resultado.dados;
      } else {
        console.error('Erro ao buscar estoque:', resultado.mensagem);
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  // Tratamento cirúrgico de valores numéricos
  calcularValorPatio() {
    let total = 0;
    
    for (let v of this.veiculos) {
      if (!v.preco) continue;

      // Se já for um número puro vindo do banco, soma direto
      if (typeof v.preco === 'number') {
        total += v.preco;
        continue;
      }

      // Se for string, limpa espaços e caracteres indesejados
      let precoLimpo = String(v.preco).replace(/\s/g, '');

      // Se o usuário digitou no padrão brasileiro com vírgula (ex: 8.500,00)
      if (precoLimpo.includes(',')) {
        precoLimpo = precoLimpo.replace(/\./g, '').replace(',', '.');
      } else {
        // Se só tem pontos (ex: 1.850.000 ou 8.500), remove todos para virar número limpo
        const partes = precoLimpo.split('.');
        if (partes.length > 2 || (partes.length === 2 && partes[1].length !== 2)) {
          precoLimpo = precoLimpo.replace(/\./g, '');
        }
      }

      total += parseFloat(precoLimpo) || 0;
    }

    // Formata o valor final para o padrão de exibição do pátio
    return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Exclusão com atualização instantânea no primeiro clique
  async deletarVeiculo(id: number) {
    if (confirm('Tem a certeza que deseja excluir este veículo permanentemente?')) {
      try {
        const resposta = await fetch('http://localhost:8000/excluir_veiculo.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id })
        });
        
        const resultado = await resposta.json();
        
        if (resultado.sucesso) {
          // O NgZone força o Angular a executar a linha abaixo dentro do ciclo de renderização principal
          this.zone.run(() => {
            this.veiculos = this.veiculos.filter(v => v.id !== id);
            this.cdr.detectChanges(); // Força o HTML a se redesenhar na hora
          });
        } else {
          alert('Erro ao excluir: ' + resultado.mensagem);
        }
      } catch (erro) {
        console.error('Erro de requisição:', erro);
        alert('Erro ao comunicar com o servidor.');
      }
    }
  }

  sair() {
    // 1. Arranca o crachá do navegador
    localStorage.removeItem('koc_perfil');
    
    // 2. Chuta o usuário de volta para a tela de login
    this.router.navigate(['/']);
  }
  // Só precisamos destas duas variáveis agora
  imagemUrlGerada: string = '';
  processandoImagem: boolean = false;
}