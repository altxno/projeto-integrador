import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pedidos/editar/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'clientes/editar/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'alterar/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
