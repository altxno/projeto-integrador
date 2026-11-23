// Formato de dados usado para clientes na interface e na comunicação com a API.
export interface Cliente {
  // O ID pode faltar antes do cadastro; registros antigos podem ter ID textual.
  id?: string | number;
  // Identifica qual conta é dona deste cliente.
  usuarioId: string | number;
  // Informações preenchidas no formulário do cliente.
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}
