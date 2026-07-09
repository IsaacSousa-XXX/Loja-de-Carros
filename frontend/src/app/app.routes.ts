import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Detalhes } from './components/detalhes/detalhes';

export const routes: Routes = [
  // A rota vazia '' é a página inicial (Vitrine)
  { path: '', component: Dashboard },
  
  // A rota de detalhes recebe um parâmetro dinâmico chamado ':id'
  { path: 'detalhes/:id', component: Detalhes }
];