
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/registro"
  },
  {
    "renderMode": 2,
    "redirectTo": "/clientes/novo",
    "route": "/cadastrar"
  },
  {
    "renderMode": 2,
    "redirectTo": "/clientes",
    "route": "/listagem"
  },
  {
    "renderMode": 2,
    "redirectTo": "/clientes",
    "route": "/consultar"
  },
  {
    "renderMode": 1,
    "redirectTo": "/alterar/clientes/editar/:id",
    "route": "/alterar/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/clientes",
    "route": "/excluir"
  },
  {
    "renderMode": 2,
    "route": "/pedidos"
  },
  {
    "renderMode": 2,
    "route": "/pedidos/novo"
  },
  {
    "renderMode": 1,
    "route": "/pedidos/editar/*"
  },
  {
    "renderMode": 2,
    "route": "/clientes"
  },
  {
    "renderMode": 2,
    "route": "/clientes/novo"
  },
  {
    "renderMode": 1,
    "route": "/clientes/editar/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 69544, hash: '3cbfe197daa0d4cb9ae99539bae5366e18c9a05009be08c600aa93e5200490fc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22306, hash: '0db1b1311a23c08a967a23b08b13ee642383a41d2523a04afaf20ec8f33f0b0f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 144801, hash: '24cb0ba3e3a80bbf2b4d290c6bb1a7b12c73c9053a4b69790e1b5013170ceae0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'pedidos/index.html': {size: 144801, hash: '24cb0ba3e3a80bbf2b4d290c6bb1a7b12c73c9053a4b69790e1b5013170ceae0', text: () => import('./assets-chunks/pedidos_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 144801, hash: '24cb0ba3e3a80bbf2b4d290c6bb1a7b12c73c9053a4b69790e1b5013170ceae0', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'registro/index.html': {size: 149060, hash: 'd9987ff1d33f26d6bb8390e714f4cc5e6ab4d34a7ee1c822e94ec5a48654a5e3', text: () => import('./assets-chunks/registro_index_html.mjs').then(m => m.default)},
    'clientes/index.html': {size: 144801, hash: 'f837ce9bfd7ad6ebeab17a6ef638a469e2c36f531491f766e52d43d65ceb24d2', text: () => import('./assets-chunks/clientes_index_html.mjs').then(m => m.default)},
    'pedidos/novo/index.html': {size: 144801, hash: 'f837ce9bfd7ad6ebeab17a6ef638a469e2c36f531491f766e52d43d65ceb24d2', text: () => import('./assets-chunks/pedidos_novo_index_html.mjs').then(m => m.default)},
    'clientes/novo/index.html': {size: 144801, hash: 'f837ce9bfd7ad6ebeab17a6ef638a469e2c36f531491f766e52d43d65ceb24d2', text: () => import('./assets-chunks/clientes_novo_index_html.mjs').then(m => m.default)},
    'styles-UMB4GSBZ.css': {size: 88759, hash: 'VJk8U+8wi6o', text: () => import('./assets-chunks/styles-UMB4GSBZ_css.mjs').then(m => m.default)}
  },
};
