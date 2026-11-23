import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validador de formulário Angular: devolve null quando aceita o telefone ou
// um objeto com nome de erro quando encontra um valor inválido.
export function validarTelefone(control: AbstractControl): ValidationErrors | null {
  // Garante texto e remove espaços das pontas antes de validar.
  const valor = String(control.value ?? '').trim();

  // Campo vazio fica a cargo de Validators.required, caso seja obrigatório.
  if (!valor) {
    return null;
  }

  // Permite dígitos e sinais comuns de telefone, mas rejeita letras.
  if (!/^[\d+().\s-]+$/.test(valor)) {
    return { telefoneInvalido: true };
  }

  // Para contar, remove tudo que não seja dígito.
  let digitos = valor.replace(/\D/g, '');

  // Se veio com código internacional do Brasil (55), tira esse prefixo
  // somente quando o número tem o tamanho de um telefone brasileiro completo.
  if (digitos.startsWith('55') && (digitos.length === 12 || digitos.length === 13)) {
    digitos = digitos.slice(2);
  }

  // Após a limpeza, telefone brasileiro deve ter DDD + 8 ou 9 dígitos.
  return digitos.length === 10 || digitos.length === 11
    ? null
    : { telefoneInvalido: true };
}
