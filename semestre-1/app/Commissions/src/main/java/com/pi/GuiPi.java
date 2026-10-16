/*
 * ALTINO AVILLA, GUILHERME DINIZ, TACIARA ROSENO DOS SANTOS, VIVIAN PASSOS
 * ATELIER PESSOAL
 * 15/04/2026
 */


//BARRAR DATA E CARCTERES ESPECIAIS
import java.util.ArrayList;
import java.util.Scanner;

public class GuiPi {
    static Scanner sc = new Scanner(System.in);
    static int contadorCliente = 0;
    static int contadorPedido = 0;

    //METODOS

    public static String captura(String texto) {
        if (texto.isEmpty()) {
            texto = sc.nextLine().trim();
        }
        return texto;
    }

    public static boolean especiais(String input) {

        for (int i = 0; i < input.length(); i++)
            if (input.charAt(i) == '!' || input.charAt(i) == '@' || input.charAt(i) == '#' || input.charAt(i) == '$' || input.charAt(i) == '%' ||
                    input.charAt(i) == '&' || input.charAt(i) == '*' || input.charAt(i) == '(' || input.charAt(i) == ')' || input.charAt(i) == '-' ||
                    input.charAt(i) == '+' || input.charAt(i) == '_' || input.charAt(i) == '=' || input.charAt(i) == '|' || input.charAt(i) == '/' ||
                    input.charAt(i) == '?' || input.charAt(i) == ';' || input.charAt(i) == ':' || input.charAt(i) == '.' || input.charAt(i) == ',' ||
                    input.charAt(i) == '~' || input.charAt(i) == '^' || input.charAt(i) == '[' || input.charAt(i) == ']' || input.charAt(i) == '{' ||
                    input.charAt(i) == '}' || input.charAt(i) == 'Ž' || input.charAt(i) == '`') {
                return true;
            }
        return false;
    }

    public static boolean mesesValidos(int dias, int mes) {

        if((mes == 2 && dias > 29) || ((mes == 4 || mes == 6 || mes == 9 || mes ==11) && dias > 30)) {
            return false;
        }

        return true;
    }

    public static boolean temNumero(String input) {
        for (int i = 0; i < input.length(); i++)
            if (Character.isDigit(input.charAt(i))) {
                return true;
            }
        return false;
    }

    public static boolean apenasNumero(String input) {
        for (int i = 0; i < input.length(); i++) {
            if (!Character.isDigit(input.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public static boolean temEspaco(String input) {
        for (int i = 0; i < input.length(); i++)
            if (input.charAt(i) == ' ') {
                return true;
            }
        return false;
    }

    public static boolean temEspacoDemais(String input) {
        for (int i = 0; i < input.length(); i++)
            if (input.charAt(i) == ' ') {
                if(input.charAt(i+1) == ' ')
                {
                    return true;
                }
            }
        return false;
    }

    public static String validarNome(String nome) {
        if (temNumero(nome) || !temEspaco(nome) || temEspacoDemais(nome) || nome.length() > 50 || nome.isBlank() || nome.isEmpty() || especiais(nome)) {
            System.out.println("Nome inválido, preencha novamente:");
            nome = sc.nextLine().trim();
            nome = captura(nome);
            nome = validarNome(nome);
        }
        return nome;
    }

    public static String validarCPF(ArrayList<String[]> clientesLista,String cpf) {
        if (!apenasNumero(cpf) || cpf.isBlank() || cpf.isEmpty() || cpf.length() != 11) {
            System.out.println("CPF inválido, preencha novamente:");
            cpf = sc.nextLine().trim();
            cpf = captura(cpf);
            cpf = validarCPF(clientesLista,cpf);
        }else if(buscarCPF(clientesLista,cpf) != -1){
            System.out.println("CPF já cadastrado, preencha novamente:");
            cpf = sc.nextLine().trim();
            cpf = captura(cpf);
            cpf = validarCPF(clientesLista,cpf);
        }
        return cpf;
    }

    public static String validarCpfPedidos(ArrayList<String[]> clientesLista,String cpf) {
        if (!apenasNumero(cpf) || cpf.isBlank() || cpf.isEmpty() || cpf.length() != 11) {
            System.out.println("CPF inválido, preencha novamente:");
            cpf = sc.nextLine().trim();
            cpf = captura(cpf);
            cpf = validarCpfPedidos(clientesLista,cpf);
        }else if(buscarCPF(clientesLista,cpf) == -1){
            System.out.println("Cliente não cadastrado, preencha novamente:");
            cpf = sc.nextLine().trim();
            cpf = captura(cpf);
            cpf = validarCpfPedidos(clientesLista,cpf);
        }
        return cpf;
    }

    public static String validarCelular(String celular) {
        if (!apenasNumero(celular) || celular.length() != 11 || celular.isBlank() || celular.isEmpty()) {
            System.out.println("Número de celular inválido, preencha novamente:");
            celular = sc.nextLine().trim();
            celular = captura(celular);
            celular = validarCelular(celular);
        }
        return celular;
    }

    public static String validarTexto(String texto) {
        if (apenasNumero(texto) || texto.length() > 100 || texto.length() < 3 || temEspacoDemais(texto) || texto.isBlank()
                || texto.isEmpty() || especiais(texto)) {
            System.out.println("Texto inválido, preencha novamente:");
            texto = sc.nextLine().trim();
            texto = captura(texto);
            texto = validarTexto(texto);
        }
        return texto;
    }

    public static String validarNumCasa(String numCasa) {
        if (!temNumero(numCasa) || numCasa.length() > 10 || numCasa.isBlank() || numCasa.isEmpty() || temEspacoDemais(numCasa)) {
            System.out.println("Número de residência inválido, preencha novamente:");
            numCasa = sc.nextLine().trim();
            numCasa = captura(numCasa);
            numCasa = validarNumCasa(numCasa);
        }
        return numCasa;
    }

    public static String validarCEP(String cep) {
        if (!apenasNumero(cep) || cep.length() != 8 || cep.isBlank() || cep.isEmpty()) {
            System.out.println("CEP inválido, preencha novamente:");
            cep = sc.nextLine().trim();
            cep = captura(cep);
            cep = validarCEP(cep);
        }
        return cep;
    }

    public static String validarTela(String tela) {
        if (!temNumero(tela) || tela.length() > 20 || tela.isBlank() || tela.isEmpty() || especiais(tela) || !Character.isDigit(tela.charAt(0))
                || temEspacoDemais(tela))  {
            System.out.println("Tamanho de tela inválido, preencha novamente:");
            tela = sc.nextLine().trim();
            tela = captura(tela);
            tela = validarTela(tela);
        }

        return tela;
    }

    public static String validarPrazo(String prazo) {
        if (!temNumero(prazo) || prazo.length() != 10 || prazo.isBlank() || prazo.isEmpty()  || prazo.charAt(2) != '/' || prazo.charAt(5) != '/') {
            System.out.println("Prazo inválido preencha novamente:");
            prazo = sc.nextLine().trim();
            prazo = captura(prazo);
            prazo = validarPrazo(prazo);
        }
        String[] parts = prazo.split("/");
        String dias = parts[0];
        String mes = parts[1];
        String ano = parts[2];
        int diasNum = Integer.parseInt(dias);
        int mesNum = Integer.parseInt(mes);
        int anoNum = Integer.parseInt(ano);
        if(!apenasNumero(dias) || !apenasNumero(mes) || !apenasNumero(ano) || diasNum < 0 || diasNum > 31 || mesNum < 0 || mesNum > 12 ||
                anoNum < 2025 || !mesesValidos(diasNum,mesNum)) {
            System.out.println("Prazo inválido preencha novamente:");
            prazo = sc.nextLine().trim();
            prazo = captura(prazo);
            prazo= validarPrazo(prazo);
        }

        return prazo;
    }

    public static double validarValor(double valor) {
        if (valor <= 0 || valor > 10000) {
            System.out.println("Valor inválido, preencha novamente:");
            valor = sc.nextDouble();
            valor = validarValor(valor);
        }
        return valor;
    }

    public static String validarId(ArrayList<String[]> clientesLista, String id) {
        for (int i = 0; i < clientesLista.size(); i++) {

            for (int j = 0; j < clientesLista.get(i).length; j += clientesLista.get(i).length) {
                if (clientesLista.get(i)[j].equals(id)) {
                    contadorCliente++;
                    id = String.valueOf(contadorCliente);
                    id = validarId(clientesLista,id);
                }
            }
        }

        return id;
    }

    public static String processarId(ArrayList<String[]> pedidosLista,String id) {
        do {
            if(acharId(pedidosLista,id).equals("falso")) {
                System.out.println("Pedido não encontrado, preencha novamente:");
                id = sc.nextLine().trim();
                id = captura(id);
                id = processarId(pedidosLista,id);

            }
        }while(acharId(pedidosLista,id).equals("falso"));
        return id;
    }

    public static void exibirCliente(ArrayList<String[]> clientesLista,String[] dados,String cpf) {
        int id = buscarPosicaoCpf(clientesLista,cpf);
        for (int j = 0; j < clientesLista.get(id).length; j++) {
            System.out.printf("%s %s%n", dados[j], clientesLista.get(id)[j]);
        }
    }

    public static void exibirPedido(ArrayList<String[]> pedidosLista,String[] dados,String idOg) {
        int id = buscarPosicaoId(pedidosLista,idOg);
        for (int j = 0; j < pedidosLista.get(id).length; j++) {
            System.out.printf("%s %s%n", dados[j], pedidosLista.get(id)[j]);
        }
    }

    public static int buscarPosicaoCpf(ArrayList<String[]> clientesLista, String cpf) {
        for (int i = 0; i < clientesLista.size(); i++) {

            for (int j = 1; j < clientesLista.get(i).length; j += clientesLista.get(i).length) {
                if (clientesLista.get(i)[j].equals(cpf)) {
                    return i;
                }
            }
        }

        return -1;
    }

    public static int buscarPosicaoId(ArrayList<String[]> clientesLista, String id) {
        for (int i = 0; i < clientesLista.size(); i++) {

            for (int j = 0; j < clientesLista.get(i).length; j += clientesLista.get(i).length) {
                if (clientesLista.get(i)[j].equals(id)) {
                    return i;
                }
            }
        }

        return -1;
    }

    public static String acharId(ArrayList<String[]> clientesLista, String id) {
        for (int i = 0; i < clientesLista.size(); i++) {

            for (int j = 0; j < clientesLista.get(i).length; j += clientesLista.get(i).length) {
                if (clientesLista.get(i)[j].equals(id)) {
                    return clientesLista.get(i)[j];
                }
            }
        }

        return "falso";
    }

    public static int buscarCPF(ArrayList<String[]> clientesLista, String cpf) {
        for (int i = 0; i < clientesLista.size(); i++) {

            for (int j = 1; j < clientesLista.get(i).length; j += clientesLista.get(i).length) {
                if (clientesLista.get(i)[j].equals(cpf)) {
                    return j;
                }
            }
        }

        return -1;
    }

    public static String[] criarCliente(ArrayList<String[]> clientesLista,String id, String cpf, String nome, String celular, String logradouro,
                                        String bairro, String numCasa, String complemento, String cep) {

        String[] novoCliente = new String[9];
        novoCliente[0] = id;
        novoCliente[1] = cpf;
        novoCliente[2] = nome;
        novoCliente[3] = celular;
        novoCliente[4] = logradouro;
        novoCliente[5] = bairro;
        novoCliente[6] = numCasa;
        novoCliente[7] = complemento;
        novoCliente[8] = cep;
        return novoCliente;
    }

    public static String[] editarCliente(ArrayList<String[]> clientesLista,String cpfOg, String cpf, String nome, String celular, String logradouro,
                                         String bairro, String numCasa, String complemento, String cep) {

        String id = String.valueOf(buscarPosicaoCpf(clientesLista,cpfOg));
        String[] clienteEditado = new String[9];
        clienteEditado[0] = id;
        clienteEditado[1] = cpf;
        clienteEditado[2] = nome;
        clienteEditado[3] = celular;
        clienteEditado[4] = logradouro;
        clienteEditado[5] = bairro;
        clienteEditado[6] = numCasa;
        clienteEditado[7] = complemento;
        clienteEditado[8] = cep;
        return clienteEditado;
    }

    public static String[] criarPedido(ArrayList<String[]> clientesLista,String id, String cpf, String tamanho, String materiais, String prazo,
                                       String valor, String obs) {

        String[] novoPedido = new String[7];
        novoPedido[0] = id;
        novoPedido[1] = cpf;
        novoPedido[2] = tamanho;
        novoPedido[3] = materiais;
        novoPedido[4] = prazo;
        novoPedido[5] = valor;
        novoPedido[6] = obs;
        return novoPedido;
    }

    public static String[] editarPedido(ArrayList<String[]> clientesLista, String cpf, String tamanho, String materiais, String prazo,
                                        String valor, String obs) {

        String id = String.valueOf(buscarPosicaoCpf(clientesLista,cpf));
        String[] pedidoEditado = new String[7];
        pedidoEditado[0] = id;
        pedidoEditado[1] = cpf;
        pedidoEditado[2] = tamanho;
        pedidoEditado[3] = materiais;
        pedidoEditado[4] = prazo;
        pedidoEditado[5] = valor;
        pedidoEditado[6] = obs;
        return pedidoEditado;
    }

    //METODOS FIM
    public static void main(String[] args) {
        // MENU
        int opcaoExec = 0;
        int opcaoMenu;
        String opcaoMenuCap;
        // var criar cliente
        String  cpf, nomeCliente, celular, logradouro, bairro, numCasa, complemento, cep;
        // var criar pedido
        String cpfPedido, tela, materiais, prazo, obs, valorPedido;
        double valor;
        // var editar pedido/cliente
        String editarOpCap,finalizarOPCap;
        int editarOp, finalizarOP;

        // LISTAS
        ArrayList<String[]> clientesLista = new ArrayList<String[]>();
        ArrayList<String[]> pedidosLista = new ArrayList<String[]>();
        ArrayList<String[]> pedidosFinalizados = new ArrayList<String[]>();

        // EXIBICAO
        String[] dadosCliente = new String[9];

        dadosCliente[0] = "Id:";
        dadosCliente[1] = "CPF:";
        dadosCliente[2] = "Nome Completo:";
        dadosCliente[3] = "Celular:";
        dadosCliente[4] = "Logradouro:";
        dadosCliente[5] = "Bairro:";
        dadosCliente[6] = "Número da casa:";
        dadosCliente[7] = "Complemento:";
        dadosCliente[8] = "CEP:";

        String[] dadosPedido = new String[7];

        dadosPedido[0] = "Id:";
        dadosPedido[1] = "CPF Cliente:";
        dadosPedido[2] = "Tamanho da Tela:";
        dadosPedido[3] = "Materiais:";
        dadosPedido[4] = "Prazo:";
        dadosPedido[5] = "Valor:";
        dadosPedido[6] = "Observações:";

        do {
            do {
                System.out.println("Escolha uma operação:");
                System.out.println("1- Cadastro Cliente");
                System.out.println("2- Cadastro Pedido");
                System.out.println("3- Editar Cliente");
                System.out.println("4- Editar Pedido");

                opcaoMenuCap = sc.nextLine().trim();
                opcaoMenuCap = captura(opcaoMenuCap);
                if(!opcaoMenuCap.equals("1") && !opcaoMenuCap.equals("2") && !opcaoMenuCap.equals("3") && !opcaoMenuCap.equals("4")) {
                    System.out.println("Opção Inválida");
                }

            }while(!opcaoMenuCap.equals("1") && !opcaoMenuCap.equals("2") && !opcaoMenuCap.equals("3") && !opcaoMenuCap.equals("4"));
            opcaoMenu = Integer.parseInt(opcaoMenuCap);

            switch (opcaoMenu) {
//CRIAR CLIENTE
                case 1:

                    String idCliente = String.valueOf(contadorCliente);
                    idCliente = validarId(clientesLista,idCliente);
                    //
                    System.out.println("Insira o CPF do cliente:");
//                    cpf = sc.nextLine().trim();
                    cpf = "22950136826";
                    cpf = captura(cpf);
                    cpf = validarCPF(clientesLista,cpf);
                    //
                    System.out.println("Insira o nome completo do cliente:");
//                    nomeCliente = sc.nextLine().trim();
                    nomeCliente = "altino ávila";
                    nomeCliente = captura(nomeCliente);
                    nomeCliente = validarNome(nomeCliente);
                    //
                    System.out.println("Insira o celular do cliente com o DDD incluso:");
//                    celular = sc.nextLine().trim();
                    celular = "11967066829";
                    celular = captura(celular);
                    celular = validarCelular(celular);
                    //
                    System.out.println("Insira o logradouro:");
//                    logradouro = sc.nextLine().trim();
                    logradouro = "rua dos xambores";
                    logradouro = captura(logradouro);
                    logradouro = validarTexto(logradouro);
                    //
                    System.out.println("Insira o bairro:");
//                    bairro = sc.nextLine().trim();
                    bairro = "parque do lago";
                    bairro = captura(bairro);
                    bairro = validarTexto(bairro);
                    //
                    System.out.println("Insira o número da casa:");
//                    numCasa = sc.nextLine();
                    numCasa = "58";
                    numCasa = captura(numCasa);
                    numCasa = validarNumCasa(numCasa);
                    //
                    System.out.println("Insira o complemento:");
//                    complemento = sc.nextLine().trim();
                    complemento = "porra";
                    complemento = captura(complemento);
                    complemento = validarTexto(complemento);
                    //
                    System.out.println("Insira o CEP:");
//                    cep = sc.nextLine().trim();
                    cep = "04702002";
                    cep = captura(cep);
                    cep = validarCEP(cep);
                    //
                    String[] novoCliente = criarCliente(clientesLista,idCliente, cpf, nomeCliente, celular, logradouro, bairro, numCasa,
                            complemento, cep);
                    contadorCliente++;

                    clientesLista.add(novoCliente);

                    System.out.println("Cliente Cadastrado");
                    exibirCliente(clientesLista,dadosCliente,cpf);

                    break;

// CRIAR PEDIDO
                case 2:

                    String idPedido = String.valueOf(contadorPedido);
                    idPedido = validarId(pedidosLista,idPedido);
                    //
                    System.out.println("Insira o CPF do cliente:");
                    cpfPedido = sc.nextLine().trim();
                    cpfPedido = captura(cpfPedido);
                    cpfPedido = validarCpfPedidos(clientesLista,cpfPedido);
                    //
                    System.out.println("Informe o tamanho da tela:");
                    tela = sc.nextLine().trim();
                    tela = captura(tela);
                    tela = validarTela(tela);
                    //
                    System.out.println("Informe os materias utilizados:");
                    materiais = sc.nextLine().trim();
                    materiais = captura(materiais);
                    materiais = validarTexto(materiais);

                    System.out.println("Informe o prazo dd/mm/aaaa:");
                    prazo = sc.nextLine().trim();
                    prazo = captura(prazo);
                    prazo = validarPrazo(prazo);
                    //
                    System.out.println("Informe o valor:");

                    valorPedido = sc.nextLine();
                    valor = Double.parseDouble(valorPedido);

//                    do {
//                        valorPedido=sc.nextLine().trim();
//                        valorPedido = captura(valorPedido);
//                        if(!apenasNumero(valorPedido)) {
//                            System.out.println("Valor inválido, preencha novamente:");
//                        }
//                    }while(!apenasNumero(valorPedido));
//                    valor = Double.parseDouble(valorPedido);
//                    validarValor(valor);
//                    valorPedido = String.valueOf(valor);



                    //
                    System.out.println("Informe as observações:");
                    obs = sc.nextLine().trim();
                    obs = captura(obs);
                    obs = validarTexto(obs);
                    //
                    System.out.println("Pedido Cadastrado");

                    String[] novoPedido = criarPedido(clientesLista,idPedido, cpfPedido, tela, materiais, prazo, valorPedido, obs);
                    contadorPedido++;

                    pedidosLista.add(novoPedido);
                    exibirPedido(pedidosLista,dadosPedido,idPedido);

                    break;
// CONSULTAR E EDITAR CLIENTE
                case 3:
                    System.out.println("Insira o CPF do cliente a ser alterado:");
                    cpfPedido = sc.nextLine().trim();
                    cpfPedido = captura(cpfPedido);
                    cpfPedido = validarCpfPedidos(clientesLista,cpfPedido);
                    //
                    System.out.println("Insira o CPF do cliente:");
                    cpf = sc.nextLine().trim();
                    cpf = captura(cpf);
                    //
                    System.out.println("Insira o nome completo do cliente:");
                    nomeCliente = sc.nextLine().trim();
                    nomeCliente = captura(nomeCliente);
                    nomeCliente = validarNome(nomeCliente);
                    //
                    System.out.println("Insira o celular do cliente com o DDD incluso:");
                    celular = sc.nextLine().trim();
                    celular = captura(celular);
                    celular = validarCelular(celular);
                    //
                    System.out.println("Insira o logradouro:");
                    logradouro = sc.nextLine().trim();
                    logradouro = captura(logradouro);
                    logradouro = validarTexto(logradouro);
                    //
                    System.out.println("Insira o bairro:");
                    bairro = sc.nextLine().trim();
                    bairro = captura(bairro);
                    bairro = validarTexto(bairro);
                    //
                    System.out.println("Insira o número da casa:");
                    numCasa = sc.nextLine();
                    numCasa = captura(numCasa);
                    numCasa = validarNumCasa(numCasa);
                    //
                    System.out.println("Insira o complemento:");
                    complemento = sc.nextLine().trim();
                    complemento = captura(complemento);
                    complemento = validarTexto(complemento);
                    //
                    System.out.println("Insira o CEP:");
                    cep = sc.nextLine().trim();
                    cep = captura(cep);
                    cep = validarCEP(cep);
                    //

                    String [] clienteEditado = editarCliente(clientesLista,cpfPedido, cpf, nomeCliente, celular, logradouro, bairro, numCasa,
                            complemento, cep);

                    System.out.println("Clente Editado");

                    clientesLista.set(buscarPosicaoCpf(clientesLista,cpfPedido), clienteEditado);
                    exibirCliente(clientesLista,dadosCliente,cpf);
                    break;

//EDITAR OU CONSULTAR PEDIDO
                case 4:

                    System.out.println("Insira o Id do pedido:");
                    idPedido = sc.nextLine().trim();
                    idPedido = captura(idPedido);
                    idPedido = processarId(pedidosLista,idPedido);
                    //
                    exibirPedido(pedidosLista,dadosPedido,idPedido);
                    //
                    do {
                        System.out.println("Editar pedido?");
                        System.out.println("1-Sim, 2-Não");
                        editarOpCap = sc.nextLine().trim();
                        editarOpCap = captura(editarOpCap);
                        if(!editarOpCap.equals("1") && !editarOpCap.equals("2")) {
                            System.out.println("Opção Inválida");
                        }
                    }while(!editarOpCap.equals("1") && !editarOpCap.equals("2"));

                    editarOp = Integer.parseInt(editarOpCap);
                    switch (editarOp) {
                        case 1:
                            System.out.println("Insira o CPF do cliente:");
                            cpfPedido = sc.nextLine().trim();
                            cpfPedido = captura(cpfPedido);
                            cpfPedido = validarCpfPedidos(clientesLista,cpfPedido);
                            //
                            System.out.println("Informe o tamanho da tela:");
                            tela = sc.nextLine().trim();
                            tela = captura(tela);
                            tela = validarTela(tela);
                            //
                            System.out.println("Informe os materias utilizados:");
                            materiais = sc.nextLine().trim();
                            materiais = captura(materiais);
                            materiais = validarTexto(materiais);

                            System.out.println("Informe o prazo dd/mm/aaaa:");
                            prazo = sc.nextLine().trim();
                            prazo = captura(prazo);
                            prazo = validarPrazo(prazo);
                            //
                            System.out.println("Informe o valor:");
                            valor = sc.nextDouble();
                            validarValor(valor);
                            valorPedido = String.valueOf(valor);
                            //
                            System.out.println("Informe as observações:");
                            obs = sc.nextLine().trim();
                            obs = captura(obs);
                            obs = validarTexto(obs);
                            //
                            String [] pedidoEditado = editarPedido(clientesLista, cpfPedido, tela, materiais, prazo, valorPedido, obs);

                            pedidosLista.set(buscarPosicaoId(pedidosLista,idPedido), pedidoEditado);
                            exibirPedido(pedidosLista,dadosPedido,idPedido);

                            System.out.println("Pedido Editado");
                            break;
                        case 2:
                            break;
                        default:
                            System.out.println("Opção inválida");
                            return;
                    }
                    //
                    do {
                        System.out.println("Finalizar pedido?");
                        System.out.println("1-Sim, 2-Não");
                        finalizarOPCap = sc.nextLine().trim();
                        finalizarOPCap = captura(finalizarOPCap);
                        if(!finalizarOPCap.equals("1") && !finalizarOPCap.equals("2")) {
                            System.out.println("Opção Inválida");
                        }
                    }while(!finalizarOPCap.equals("1") && !finalizarOPCap.equals("2"));
                    finalizarOP = Integer.parseInt(finalizarOPCap);
                    switch (finalizarOP) {
                        case 1:
                            //

                            int posicaoFinalizar = buscarPosicaoId(pedidosLista,idPedido);
                            String[] pedidoFinalizado = pedidosLista.get(posicaoFinalizar);
                            pedidosFinalizados.add(pedidoFinalizado);

                            for(int i = 0; i < pedidosFinalizados.size(); i++) {
                                for (int j = 0; j < pedidosFinalizados.get(i).length; j++) {
                                    System.out.printf("%s %s%n", dadosPedido[j], pedidosFinalizados.get(i)[j]);
                                }
                            }

                            System.out.println("Pedido Finalizado");
                            break;
                        case 2:
                            break;
                        default:
                            System.out.println("Opção inválida");
                            return;
                    }

                    break;

                default:
                    System.out.println("Opção inválida");
                    return;
            }// fim switch menu
            do {
                System.out.println("Realizar outra operação?");
                System.out.println("1-Sim, 2-Não");
                opcaoMenuCap = sc.nextLine().trim();
                opcaoMenuCap = captura(opcaoMenuCap);
                if(!opcaoMenuCap.equals("1") && !opcaoMenuCap.equals("2") && !opcaoMenuCap.equals("3") && !opcaoMenuCap.equals("4")) {
                    System.out.println("Opção Inválida");
                }

            }while(!opcaoMenuCap.equals("1") && !opcaoMenuCap.equals("2") && !opcaoMenuCap.equals("3") && !opcaoMenuCap.equals("4"));
            opcaoMenu = Integer.parseInt(opcaoMenuCap);
            switch (opcaoMenu) {

                case 1:
                    break;
                case 2:
                    System.out.println("Operação finalizada.");
                    opcaoExec = 1;
                    break;
                default:
                    System.out.println("Opção inválida");
                    return;
            }
        } // fim "do"
        while (opcaoExec == 0);
    }
}
/*
 * METODO captura É UTILIZADO NOS METODOS: validarNome,validarCPF,validarCpfPedidos,validarCelular,validarTexto, validarNumCasa, validarCEP, validarTela,
 *  validarPrazo
 * METODO especiais É UTILIZADO NOS METODOS: validarNome,validarTexto,validarTela
 * METODO mesesValidos É UTILIZADO NOS METODOS: validarPrazo
 * METODO temNumero É UTILIZADO NOS METODOS: validarNome, validarNumCasa, validarTela, validarPrazo
 * METODO apenasNumero É UTILIZADO NOS METODOS: validarCPF, validarCpfPedidos, validarCelular,validarTexto, validarCEP,validarPrazo
 * METODO temEspaco É UTILIZADO NOS METODOS: validarNome
 * METODO temEspacoDemais É UTILIZADO NOS METODOS: validarNome, validarText, validarNumCasa, validarTela
 * METODO buscarPosicaoId É UTILIZADO NOS METODOS: exibirPedido
 * METODO buscarPosicaoCpf É UTILIZADO NOS METODOS: exibirCliente
 */