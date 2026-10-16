package com.pi;
import java.util.Scanner;
public class Main
{
    public static void main(String[] args)
    {
        String nome;
        System.out.println("Versão 1.0");
        exibirInicio();
        System.out.println("Insira o seu nome: ");
        nome = lerTexto();
        System.out.println("\nOlá, " + nome);
    }

    static void exibirInicio()
    {
        System.out.println
                ("""
                                   ▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄ ▄▄    ▄▄ ▄▄▄▄▄
                                  ██▀██  ██   ██▄▄  ██    ██ ██▄▄ 
                                  ██▀██  ██   ██▄▄▄ ██▄▄▄ ██ ██▄▄▄
                                  ════════════════════════════════
                 ╔════════════════════════════╗        ╔═════════════════════════════╗
                 ║           MENU             ║        ║            AJUDA            ║
                 ╠════════════════════════════╣        ╠═════════════════════════════╣        
                 ║1. Cadastro de clientes     ║        ║   Digite a opção numérica   ║
                 ║2. Abertura de pedidos      ║        ║     da função requerida.    ║
                 ╠════════════════════════════╣        ╠═════════════════════════════╣
                 ║3. Consulta/baixa de pedidos║        ║ Digite "SOCORRO" para obter ║
                 ╠════════════════════════════╣        ║  esse bloco de ajuda para a ║
                 ║4. Edição de pedido         ║        ║     função que estiver      ║
                 ║5. Edição de cliente        ║        ║         utilizando.         ║
                 ╚════════════════════════════╝        ╚═════════════════════════════╝

                Insira a opção: 
                """);
    }

    static String lerTexto()
    {
        Scanner input = new Scanner(System.in);
        String texto = input.nextLine();
        return texto;
    }

    static boolean validarNome(String nome)
    {
        if (nome.matches("^[A-Za-z]+\\s[A-Za-z]+$"))
        {
            System.out.println("Insira nome completo:");
            Scanner sc = new Scanner(System.in);
            nome = sc.nextLine();
            return validarNome(nome);
        }
        return true;
    }




}






/*

╔ ╗ ╚ ╝  → cantos
═          → horizontal
║          → vertical
╠ ╣        → separador lateral
╦ ╩        → separador topo/fundo
╬          → cruzamento


Cadastro de Clientes . . . . . . . . . . . . . . . . . . . . . .
abertura de Pedidos . . . . . . . . . . . . . . . . . . . . . .
Consulta e Baixa de Pedidos . . . . . . . . . . . . . . . . . .
Edição e Atualização do pedido . . . . . . . . . . . . . . . . .
Edição e atualização de dados do cliente . . . . . . . . . . . .
 */


