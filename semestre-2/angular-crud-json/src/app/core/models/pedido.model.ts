// Limita status a estes quatro textos para manter formulários e dados consistentes.
export type StatusPedido = 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';

// Formato de uma comissão/pedido entre telas e API.
export interface Pedido {
  // Pode estar ausente antes de criar; o serviço gera o ID ao salvar.
  id?: string | number;
  // Identifica a conta dona da comissão.
  usuarioId: string | number;
  // Dados da comissão e referência ao cliente que a solicitou.
  titulo: string;
  descricao: string;
  clienteId: string | number;
  clienteNome: string;
  tipoArte: string;
  valor: number;
  dataEntrega: string;
  status: StatusPedido;
}
