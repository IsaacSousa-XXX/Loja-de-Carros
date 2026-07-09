import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class VeiculoForm {
  // Objeto que vai armazenar o que o usuário digitar na tela
  novoVeiculo = {
    modelo: '',
    marca: '',
    ano: null,
    categoria: '',
    preco: null,
    imagem_url: ''
  };

  statusMensagem: string = '';
  constructor(private cdr: ChangeDetectorRef) {}

  // Função que dispara quando clicamos em "Salvar"
  async salvarNoBanco() {
    this.statusMensagem = 'Salvando...';

    try {
      const resposta = await fetch('http://localhost:8000/cadastrar_veiculo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.novoVeiculo)
      });

      // Pega a resposta do PHP em texto puro primeiro
      const textoResposta = await resposta.text();

      try {
        // Tenta converter para JSON
        const resultado = JSON.parse(textoResposta);

        if (resultado.sucesso) {
          this.statusMensagem = 'Veículo cadastrado com sucesso na garagem!';
          // Limpa o formulário
          this.novoVeiculo = { modelo: '', marca: '', ano: null, categoria: '', preco: null, imagem_url: '' };
        } else {
          this.statusMensagem = 'Erro no banco: ' + resultado.mensagem;
        }
        this.cdr.detectChanges();

      } catch (erroJson) {
        // Se o PHP cuspir algum erro que não seja JSON, nós pegamos aqui!
        console.error('O PHP retornou um erro em texto:', textoResposta);
        this.statusMensagem = 'Erro de formatação. Aperte F12 e olhe o Console!';
      }

    } catch (erro) {
      console.error('Erro de requisição:', erro);
      this.statusMensagem = 'Erro ao conectar com o servidor PHP.';
    }
  }
}