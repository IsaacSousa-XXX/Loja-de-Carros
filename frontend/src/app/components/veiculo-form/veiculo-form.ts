import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class VeiculoForm implements OnInit {
  // Objeto preparado para receber o ID também
  novoVeiculo: any = {
    id: null,
    modelo: '',
    marca: '',
    ano: null,
    categoria: '',
    preco: null,
    imagem_url: '',
    quilometragem: '',
    motor: '',
    placa_final: '',
    revisao: 'Em dia'
  };

  statusMensagem: string = '';
  modoEdicao: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Captura o ID da URL se ele existir (ex: /editar/3)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.carregarDadosDoVeiculo(id);
    }
  }

  async carregarDadosDoVeiculo(id: string) {
    try {
      const resposta = await fetch(`http://localhost:8000/buscar_veiculo.php?id=${id}`);
      const resultado = await resposta.json();

      if (resultado.sucesso) {
        this.novoVeiculo = resultado.dados;
      } else {
        this.statusMensagem = 'Erro ao carregar: ' + resultado.mensagem;
      }
    } catch (erro) {
      this.statusMensagem = 'Erro de conexão ao buscar dados.';
    } finally {
      this.cdr.detectChanges();
    }
  }

  async salvarNoBanco() {
    this.statusMensagem = 'Salvando...';

    // Se estiver no modoEdicao usa o editar.php, senão usa o cadastrar.php
    const url = this.modoEdicao 
      ? 'http://localhost:8000/editar_veiculo.php' 
      : 'http://localhost:8000/cadastrar_veiculo.php';

    try {
      const resposta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.novoVeiculo)
      });

      const textoResposta = await resposta.text();

      try {
        const resultado = JSON.parse(textoResposta);

        if (resultado.sucesso) {
          this.statusMensagem = this.modoEdicao 
            ? 'Veículo atualizado com sucesso!' 
            : 'Veículo cadastrado com sucesso na garagem!';
          
          // Se editou, redireciona de volta para o estoque após 1.2 segundos
          if (this.modoEdicao) {
            setTimeout(() => {
              this.router.navigate(['/estoque']);
            }, 1200);
          } else {
            // Se cadastrou novo, apenas limpa a tela
            this.novoVeiculo = { 
              id: null, modelo: '', marca: '', ano: null, categoria: '', preco: null, imagem_url: '',
              quilometragem: '', motor: '', placa_final: '', revisao: 'Em dia'
            };
          }
        } else {
          this.statusMensagem = 'Erro: ' + resultado.mensagem;
        }
        this.cdr.detectChanges(); 

      } catch (erroJson) {
        const erroLimpo = textoResposta.replace(/(<([^>]+)>)/gi, "").substring(0, 150);
        this.statusMensagem = 'Erro no PHP: ' + erroLimpo;
        this.cdr.detectChanges();
      }

    } catch (erro) {
      this.statusMensagem = 'Erro ao conectar com o servidor PHP.';
      this.cdr.detectChanges();
    }
  }
  aoSelecionarImagem(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        // ATENÇÃO AQUI: Troque 'veiculo' pelo nome exato da variável que 
        // guarda os dados do seu formulário (ex: this.novoVeiculo, this.dadosForm, etc)
        this.novoVeiculo.imagem_url = e.target.result; 
      };
      
      reader.readAsDataURL(file); 
    }
  }
}