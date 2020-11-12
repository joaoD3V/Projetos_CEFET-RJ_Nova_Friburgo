# Sunshine App

## Autores


João Pedro ([@joaoD3V](https://github.com/joaoD3V))

Lucas Azevedo ([@lucas-az](https://github.com/lucas-az))


---




## Instalação e execução

**Instalação das dependências**
```
npm install
```
**Execução**

Executar em modo de desenvolvimento (com hot reload)
```
npm run dev
```

Executar servidor para notificação (com hot reload)
```
npm run serve
```

Compilar para produção
```
npm run build
```

Executar testes
```
npm run test
```

Executar lint
```
npm run lint
```
## Configurações para desenvolvimento

1. Instale os seguintes plugins no seu editor de código. (Sugestão: VSCode)
    * [ESlint](https://eslint.org/)
    * [EditorConfig](https://editorconfig.org/)

## Fluxo de desenvolvimento (Git e GitLab)

1. Antes de iniciar o desenvolvimento em uma nova tarefa, atualize o repositório local.
  ```
  git pull
  ```

2. Inicie o trabalho na tarefa criando uma nova _branch_ a partir da _branch_ `master`.
    * Padrão para nomeação da branch: `[issue_id]-[branch_description]`.
  ```
  git checkout -b 1-header-component
  ```

3. Ao finalizar a tarefa, realize o _commit_ referenciando a tarefa no GitLab (`#[issue_id]`).
  ```
  git commit -m "Adiciona componente para cabeçalho (#1)"
  ```

4. Envie a branch para o repositório remoto e solicite o merge.
  ```
  git push origin 1-header-component
  ```
5. Outro integrante do grupo deve verificar a solicitação e realizar o _merge_ da _branch_ da tarefa na _branch_ `master`.<br>
Obs.: Caso seja necessário alteração, comunique ao autor da tarefa

## Links úteis
| | |
|---|---|
| Typescript | https://www.typescriptlang.org/docs/ |
| Material | https://material.io/develop/web/docs/ |
| Sonarqube | https://docs.sonarqube.org/latest/ |
