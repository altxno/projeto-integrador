export interface Usuario {
  id?: string | number;
  nome: string;
  email: string;
  senha?: string;
}

export interface Cliente {
  id?: string | number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export type StatusPedido = 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado';

export interface Pedido {
  id?: string | number;
  titulo: string;
  descricao: string;
  clienteId: string | number;
  clienteNome: string;
  tipoArte: string;
  valor: number;
  dataEntrega: string;
  status: StatusPedido;
}
