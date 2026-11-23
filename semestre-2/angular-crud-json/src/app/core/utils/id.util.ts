interface RegistroComId {
  id?: string | number;
}

export function proximoIdNumerico(registros: RegistroComId[]): string {
  const maiorId = registros.reduce((maior, registro) => {
    const id = String(registro.id ?? '');
    if (!/^\d+$/.test(id)) return maior;

    const numero = Number(id);
    return Number.isSafeInteger(numero) ? Math.max(maior, numero) : maior;
  }, 0);

  return String(maiorId + 1);
}
