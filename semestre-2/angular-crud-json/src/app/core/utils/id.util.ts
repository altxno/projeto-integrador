// Descreve o mínimo que cada registro precisa ter para entrar no cálculo:
// um id que pode vir da API como texto ou como número, e que também pode faltar.
interface RegistroComId {
  id?: string | number;
}

// Recebe os registros existentes e devolve como texto o próximo ID numérico.
export function proximoIdNumerico(registros: RegistroComId[]): string {
  // Percorre a lista e guarda o maior ID numérico válido encontrado até agora.
  const maiorId = registros.reduce((maior, registro) => {
    // Converte o ID para texto. Se ele não existir, usa texto vazio.
    const id = String(registro.id ?? '');

    // A expressão regular ^\d+$ aceita somente um ou mais dígitos de ponta a ponta.
    // IDs antigos como "abc-123" não participam do cálculo.
    if (!/^\d+$/.test(id)) return maior;

    // Converte o ID aceito de texto para número.
    const numero = Number(id);

    // Number.isSafeInteger evita usar valores que ultrapassam a precisão segura
    // dos números inteiros do JavaScript; Math.max mantém o maior ID encontrado.
    return Number.isSafeInteger(numero) ? Math.max(maior, numero) : maior;
  }, 0);

  // Soma 1 ao maior ID. Se não havia IDs numéricos, o maior começa em 0,
  // então o primeiro ID gerado é "1". String mantém o formato esperado pela API.
  return String(maiorId + 1);
}
