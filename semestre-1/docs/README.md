# Documentacao - Projeto Integrador

Documentacao academica do Projeto Integrador do primeiro semestre do curso 
de Analise e Desenvolvimento de Sistemas - Centro Universitario Senac.

## Tecnologias

### LaTeX

- **Distribuicao:** MiKTeX
- **Classe:** abnTeX2
- **Motivo:** O abnTeX2 e uma classe LaTeX desenvolvida especificamente para 
documentos academicos brasileiros, fornecendo formatacao conforme as normas 
da ABNT diretamente, sem necessidade de ajustes manuais.

### Editor

- **Ferramenta:** Visual Studio Code
- **Extensoes utilizadas:**
    - LaTeX Workshop - compilacao e preview do documento
    - Error Lens - exibicao de erros inline
    - GitLens - controle de versao integrado ao editor

## Estrutura do projeto

```
docs/
├── main.tex
├── referencias.bib
└── (demais arquivos e capitulos)
```

## Descricao dos arquivos

- **main.tex** - arquivo principal do documento, contem capa, folha de rosto, 
sumario e importa os capitulos
- **referencias.bib** - base de referencias bibliograficas no formato BibTeX, 
formatadas conforme ABNT

## Como compilar

Abrir o arquivo `main.tex` no VS Code com a extensao LaTeX Workshop instalada e 
usar o comando de build da extensao. O MiKTeX gerencia automaticamente os pacotes 
necessarios na primeira compilacao.

## Normas

A documentacao segue as normas ABNT aplicaveis a trabalhos academicos, garantidas 
pela classe abnTeX2.