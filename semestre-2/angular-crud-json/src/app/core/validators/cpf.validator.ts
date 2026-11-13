import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validarCpf(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) {
    return null;
  }

  const cpf = String(valor).replace(/\D/g, '');

  if (cpf.length !== 11) {
    return { cpfInvalido: true };
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return { cpfInvalido: true };
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9), 10)) {
    return { cpfInvalido: true };
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(10), 10)) {
    return { cpfInvalido: true };
  }

  return null;
}
