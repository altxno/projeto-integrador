import { AbstractControl, ValidationErrors } from '@angular/forms';

// Função validadora personalizada para um campo de formulário do Angular.
// O Angular passa o controle do campo e espera null (sem erro) ou um objeto de erro.
export function validarCpf(control: AbstractControl): ValidationErrors | null {
  // Aceita somente os 11 dígitos ou o formato 000.000.000-00.
  const valor = String(control.value ?? '').trim();

  // Campo vazio não é responsabilidade deste validador; Validators.required verifica isso.
  // null informa ao Angular que esta função não encontrou erro de CPF.
  if (!valor) {
    return null;
  }

  if (!/^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(valor)) {
    return { cpfInvalido: true };
  }

  const cpf = valor.replace(/\D/g, '');

  // Exige 11 dígitos e rejeita sequências repetidas, como 11111111111.
  // Na regex: ^ marca o início, (\d) captura um dígito, \1 repete o capturado,
  // {10} exige dez repetições adicionais, e $ marca o fim da sequência.
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    // O objeto informa ao Angular que o campo tem o erro "cpfInvalido".
    return { cpfInvalido: true };
  }

  // Soma os nove primeiros dígitos multiplicados por pesos de 10 até 2.
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    // Number transforma o caractere do CPF em número; cpf[i] acessa a posição i.
    soma += Number(cpf[i]) * (10 - i);
  }

  // Usa o resto da divisão por 11 para calcular o primeiro dígito verificador.
  let resto = (soma * 10) % 11;
  // Se o resultado for 10, o dígito verificador correspondente é 0.
  if (resto === 10) resto = 0;

  // O primeiro dígito calculado precisa ser igual ao décimo dígito do CPF.
  if (resto !== Number(cpf[9])) {
    return { cpfInvalido: true };
  }

  // Agora soma os nove dígitos iniciais e o primeiro verificador, com pesos de 11 até 2.
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }

  // Calcula o segundo dígito verificador usando a mesma regra de módulo 11.
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  // O segundo dígito calculado precisa ser igual ao último dígito do CPF.
  if (resto !== Number(cpf[10])) {
    return { cpfInvalido: true };
  }

  // Os dois dígitos verificadores conferem; null significa que não há erro.
  return null;
}
