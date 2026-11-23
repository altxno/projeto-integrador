import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validarTelefone(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value ?? '').trim();

  if (!valor) {
    return null;
  }

  if (!/^[\d+().\s-]+$/.test(valor)) {
    return { telefoneInvalido: true };
  }

  let digitos = valor.replace(/\D/g, '');

  if (digitos.startsWith('55') && (digitos.length === 12 || digitos.length === 13)) {
    digitos = digitos.slice(2);
  }

  return digitos.length === 10 || digitos.length === 11
    ? null
    : { telefoneInvalido: true };
}
