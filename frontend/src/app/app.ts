//import { Estoque } from './components/estoque/estoque';
//import { Login } from './components/login/login';
//import { Dashboard } from './components/dashboard/dashboard';
import { VeiculoForm } from './components/veiculo-form/veiculo-form';
//import { Detalhes } from './components/detalhes/detalhes';
//import { CadastroConta } from './components/cadastro/cadastro';
import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [VeiculoForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
