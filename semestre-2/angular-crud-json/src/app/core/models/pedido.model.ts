export type StatusPedido = 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';

export interface Pedido {
  id?: string | number;
  usuarioId: string | number;
  titulo: string;
  descricao: string;
  clienteId: string | number;
  clienteNome: string;
  tipoArte: string;
  valor: number;
  dataEntrega: string;
  status: StatusPedido;
}
