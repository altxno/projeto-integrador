# CommArt

Sistema de gerenciamento de comissoes artisticas desenvolvido como Projeto Integrador do primeiro semestre do curso de Analise e Desenvolvimento de Sistemas - Centro Universitario Senac.

## Tecnologias

### Java

- **Versao:** Java 21 (LTS)
- **Distribuicao:** Microsoft
- **Motivo da versao:** O Java 21 e a versao LTS (Long-Term Support) atual, com suporte estendido e ampla adocao no mercado. Versoes LTS recebem correcoes de seguranca por anos, ao contrario das versoes de ciclo curto que ficam obsoletas em seis meses.

### Build

- **Ferramenta:** Maven
- **Motivo:** O Maven e amplamente utilizado em ambientes academicos e no mercado. Sua configuracao e centralizada no arquivo `pom.xml`, o que facilita o gerenciamento de dependencias e garante que todos os membros do grupo consigam compilar e executar o projeto de forma identica, independente do ambiente.

## Estrutura do projeto

```
src/
└── main/
    └── java/
        └── com/
            └── pi/
                ├── Main.java
                ├── Menu.java
                ├── Comissao.java
                ├── ComissaoRepository.java
                └── ComissaoService.java
```

## Descricao das classes

- **Main** - ponto de entrada da aplicacao
- **Menu** - interface de linha de comando para interacao com o usuario
- **Comissao** - modelo de dados representando uma comissao artistica
- **ComissaoRepository** - responsavel por toda a comunicacao com o banco de dados
- **ComissaoService** - regras de negocio e validacoes

## Como executar

```bash
mvn compile
mvn exec:java -Dexec.mainClass="com.pi.Main"
```
