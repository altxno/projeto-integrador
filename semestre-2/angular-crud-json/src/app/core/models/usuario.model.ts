// Formato da conta usado pelo login, perfil e serviços de autenticação.
export interface Usuario {
  // Pode faltar antes de o usuário ser gravado pela primeira vez.
  id?: string | number;
  nome: string;
  email: string;
  // Opcional porque algumas telas não precisam enviar ou exibir a senha.
  senha?: string;
}
