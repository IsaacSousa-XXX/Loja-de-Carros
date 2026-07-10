import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Detalhes } from './components/detalhes/detalhes';
import { VeiculoForm } from './components/veiculo-form/veiculo-form';
import { Login } from './components/login/login';       
import { Estoque } from './components/estoque/estoque'; 
import { Cadastro } from './components/cadastro/cadastro';


export const routes: Routes = [
  // 1. Agora a rota inicial vazia carrega o Login direto!
  { path: '', component: Login }, 
  
  // 2. Mudamos a vitrine do cliente para responder em /vitrine
  { path: 'vitrine', component: Dashboard }, 
  
  { path: 'estoque', component: Estoque },
  { path: 'cadastrar', component: VeiculoForm },
  { path: 'detalhes/:id', component: Detalhes },
  { path: 'editar/:id', component: VeiculoForm },
  { path: 'cadastro', component: Cadastro },
];