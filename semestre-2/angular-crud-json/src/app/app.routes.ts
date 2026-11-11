import { Routes } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { AlterarComponent } from './pages/alterar/alterar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { ListagemComponent } from './pages/listagem/listagem.component';

export const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'cadastrar', component: CadastrarComponent, title:'Cadastrar' },
  { path: 'consultar', component: ConsultarComponent },
  { path: 'alterar/:id', component: AlterarComponent },
  { path: 'excluir', component: ExcluirComponent },
  { path: 'listagem', component: ListagemComponent },
  { path: '**', redirectTo: 'consultar' }
];
