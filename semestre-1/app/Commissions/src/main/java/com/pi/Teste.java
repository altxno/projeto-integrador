package com.pi;

import java.util.Scanner;

public class Teste {

    Scanner input = new Scanner(System.in);

    public static String ValidarNome(String nome)
    {
        if (nome.matches("^[A-Za-z]+\\s[A-Za-z]+$"))
        {
            System.out.println("Insira nome completo:");
            Scanner sc = new Scanner(System.in);
            nome = sc.nextLine();
            return ValidarNome(nome);
        }
        return nome;
    }

    public static String ValidarCPF(String cpf)
    {
        if (cpf.matches("^[[0-9]{11}]$"))
        {
            System.out.println("Insira CPF:");
            Scanner sc = new Scanner(System.in);
            cpf = sc.nextLine();
            return ValidarNome(cpf);
        }
        return cpf;
    }






    //METODOS FIM
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // MENU
        int opcaoExec = 0;
        int opcaoMenu;
        // var criar cliente
        String nomeCliente, sobrenomeCliente, cpf, celular, logradouro, bairro, numCasa, complemento, cep;
        // var criar pedido
        String tela, materiais, prazo, obs;
        double valor;
        // var editar pedido, reusar criar pedido(?)
        int editarOp;

        do {
            System.out.println("Escolha uma operação:");
            System.out.println("1- Cadastro Cliente");
            System.out.println("2- Cadastro Pedido");
            System.out.println("3- Consulta Cliente");
            System.out.println("4- Consulta Pedido");
            opcaoMenu = sc.nextInt();

            switch (opcaoMenu) {

//CRIAR CLIENTE
                case 1:
                    // talvez mudar pra caixa de aviso
                    System.out.println("Insira o nome do cliente:");
                    nomeCliente = sc.next();
                    System.out.println("Insira o sobrenome do cliente:");
                    sobrenomeCliente = sc.next();
                    System.out.println("Insira o CPF do cliente:");
                    cpf = sc.nextLine();
                    System.out.println("Insira o celular do cliente:");
                    celular = sc.next();
                    System.out.println("Insira o logradouro:");
                    logradouro = sc.next();
                    System.out.println("Insira o bairro:");
                    bairro = sc.next();
                    System.out.println("Insira o número da casa:");
                    numCasa = sc.next();
                    System.out.println("Insira o complemento:");
                    complemento = sc.next();
                    System.out.println("Insira o CEP:");
                    cep = sc.next();

                    // validar cada um
                    // jogar pro banco
                    System.out.println("Cliente Cadastrado");
                    break;
// CRIAR PEDIDO
                case 2:
                    // talvez mudar pra caixa de aviso
                    System.out.println("Selecione o cliente:");
                    // informação banco de dados
                    System.out.println("Informe o tamanho da tela:");
                    tela = sc.next();
                    System.out.println("Informe os materias utilizados:");
                    materiais = sc.next();
                    System.out.println("Informe o prazo:");
                    // pegar info data (?)
                    prazo = sc.next();
                    System.out.println("Informe o valor:");
                    valor = sc.nextFloat();
                    System.out.println("Informe as observações:");
                    obs = sc.next();

                    // validar cada um
                    // jogar pro banco
                    System.out.println("Pedido Cadastrado");
                    break;
// CONSULTAR E EDITAR PEDIDO
                case 3:
                    // talvez mudar pra caixa de aviso
                    System.out.println("Selecione o CPF do cliente:");
                    // informação banco de dados
                    System.out.println("Selecione o pedido:");
                    // informação banco de dados
// *MOSTRAR DADOS PEDIDO banco
                    System.out.println("Editar pedido?");
                    System.out.println("1-Sim, 2-Não");
                    editarOp = sc.nextInt();
                    switch (editarOp) {
                        case 1:
                            System.out.println("Informe o tamanho da tela:");
                            tela = sc.next();
                            System.out.println("Infrome os materias utilizados:");
                            materiais = sc.next();
                            System.out.println("Informe o prazo:");
                            // pegar info data (?)
                            prazo = sc.next();
                            System.out.println("Informe o valor:");
                            valor = sc.nextFloat();
                            System.out.println("Informe as observações:");
                            obs = sc.next();

                            System.out.println("Pedido Editado");
                            break;
                        case 2:
                            break;
                        default:
                            System.out.println("Opção inválida");
                            return;
                    }
                    break;
//EDITAR CLIENTE
                case 4:
                    // talvez mudar pra caixa de aviso
                    System.out.println("Selecione o cliente:");
                    // informação banco de dados
                    System.out.println("Insira o nome do cliente:");
                    nomeCliente = sc.next();
                    System.out.println("Insira o sobrenome do cliente:");
                    sobrenomeCliente = sc.next();
                    System.out.println("Insira o CPF do cliente:");
                    cpf = sc.next();
                    System.out.println("Insira o celular do cliente:");
                    celular = sc.next();
                    System.out.println("Insira o logradouro:");
                    logradouro = sc.next();
                    System.out.println("Insira o bairro:");
                    bairro = sc.next();
                    System.out.println("Insira o número da casa:");
                    numCasa = sc.next();
                    System.out.println("Insira o complemento:");
                    complemento = sc.next();
                    System.out.println("Insira o CEP:");
                    cep = sc.next();

                    // validar cada um
                    // jogar pro banco
                    System.out.println("Clente Editado");
                    break;

                default:
                    System.out.println("Opção inválida");
                    return;
            }// fim switch menu

            System.out.println("Realizar outra operação?");
            System.out.println("1-Sim, 2-Não");
            opcaoMenu = sc.nextInt();
            switch (opcaoMenu) {

                case 1:
                    break;
                case 2:
                    System.out.println("Operação finalizada.");
                    opcaoExec =1;
                    break;
                default:
                    System.out.println("Opção inválida");
                    return;
            }
        }//fim "do"
        while (opcaoExec == 0);
    }
}

