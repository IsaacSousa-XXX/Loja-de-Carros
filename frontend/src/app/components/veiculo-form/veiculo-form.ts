import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class VeiculoForm {
  // Objeto atualizado com TODOS os 10 campos
  novoVeiculo = {
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

  constructor(private cdr: ChangeDetectorRef) {}

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

      const textoResposta = await resposta.text();

      try {
        const resultado = JSON.parse(textoResposta);

        if (resultado.sucesso) {
          this.statusMensagem = 'Veículo cadastrado com sucesso na garagem!';
          
          // Limpa o formulário com TODOS os campos
          this.novoVeiculo = { 
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
        } else {
          this.statusMensagem = 'Erro no banco: ' + resultado.mensagem;
        }

        // Atualiza a tela
        this.cdr.detectChanges(); 

      } catch (erroJson) {
        console.error('O PHP retornou um erro em texto:', textoResposta);
        this.statusMensagem = 'Erro de formatação. Aperte F12 e olhe o Console!';
        this.cdr.detectChanges();
      }

    } catch (erro) {
      console.error('Erro de requisição:', erro);
      this.statusMensagem = 'Erro ao conectar com o servidor PHP.';
      this.cdr.detectChanges();
    }
  }
}