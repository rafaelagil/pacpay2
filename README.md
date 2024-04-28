Aproveitamento de código para Analise SONARQUBE

# Obejetivo
Criar um projeto que atenda as necessidades de negocio utilizando análise de métricas do SONARQUBE

# SonarQube Arquitetura
Suporta diversas linguagens

É possível utilizar um ou mais SonarScanners para análise dos projetos e para integração com servidores de Integração Contínua

Vários plugins podem ser instalados, melhorando ainda mais as necessidades

No banco de dados criado são armazenadas as configurações e os dados de análises dos projetos

Os desenvolvedores codificam na IDE de sua preferência e usam o SonarLint para executar a análise local.

Desenvolvedores fazem Check In/Push do código para o controle de versão (git, SVN, TFVC, …)

O Servidor de Integração Contínua (se configurado) aciona uma construção automática e a execução do SonarScanner necessária para executar a análise do SonarQube

O relatório de análise é enviado ao SonarQube Server para processamento.

O SonarQube Server processa e armazena os resultados do relatório de análise no banco de dados do SonarQube e exibe os resultados na interface do usuário.

Os desenvolvedores revisam e discutem os seus problemas, e traçam uma estratégia para gerenciar e reduzir sua dívida técnica auxiliados pela visibilidade das métricas do SonarQube.

Utilizando APIs do sonar é possível extrair dados, gerar relatórios e automatizar configurações.

## Configuração


Você pode fazer a análise do seu projeto utilizando o SonarQube já disponível nos nossos servidores, ou pode subir uma instância local utilizando ou não o docker, para fazer uma análise prévia.



Sonar Local

## Para subir uma instância com Docker :

No PowerShell verifique se possui o Docker instalado
docker -v

Caso não possua, efetue o download e siga o passo a passo indicado para instalação.
Depois, baixe a imagem do sonar docker pull sonarqube
Execute o container utilizando a porta 9000 docker run -d --name sonarqube -p 9000:9000 sonarqube
Faça o login em http://localhost:9000 com as credenciais de administrador do sistema (admin / admin) e siga o tutorial para analisar seu projeto.
Na tela de projetos, selecione a opção Generate Token, preenchendo o campo com um nome de token de sua escolha. Guarde este token, já que ele será utilizado para utilizar a ferramenta posteriormente.
Para mais informações acesse: https://hub.docker.com/_/sonarqube
Para subir uma instância localmente siga o passo-a-passo abaixo:

O único pré-requisito para executar o SonarQube é ter o Java instalado em sua máquina. Para maiores detalhes veja o item Java neste manual.
Faça o downloadda versão community do SonarQube
Descompacte-o em C:\sonarqube ou no diretório desejado
Inicie o SonarQube Server
No Windows, execute:
C:\sonarqube\bin\windows-x86-xx\StartSonar.bat

Na tela de projetos, selecione a opção Generate Token, preenchendo o campo com um nome de token de sua escolha. Guarde este token, já que ele será utilizado para utilizar a ferramenta posteriormente.
Faça o login em http://localhost:9000 com as credenciais de administrador do sistema (admin / admin) e siga o tutorial para analisar seu projeto.
Analisando o Código Fonte
Após definir se seu projeto será analisado localmente ou no servidor já disponível, você estará pronto para instalar um analisador e começar a criar projetos.

Mas antes, vamos entender alguns dos parâmetros mais utilizados:

Chave	Descrição	Padrão	Obrigatório
|sonar.host.url	URL do servidor|	http://localhost:9000	|sim
|sonar.projectKey	| A chave exclusiva do projeto. Os caracteres permitidos são: |letras, números, -, _,. e:	|	sim
|sonar.projectName| Nome do projeto que será exibido na interface da web| não
|sonar.login	O token de autenticação de um usuário do SonarQube com a permissão executar análise no projeto.|		não
|sonar.exclusions	Excluir arquivos e/ou diretórios da análise	Veja exemplos abaixo:|	não

Obs1.: Para compartilhar os parâmetros de análise entre um subconjunto de projetos, configure os valores no arquivo SonarQube.Analysis.xml encontrado no diretório do SonarScanner.

Obs 2.: Para ver mais parâmetros que podem ser utilizados, acesse a documentação oficial em: https://docs.sonarqube.org/latest/analysis/analysis-parameters/

#sonar.exclusions Exemplos:

Excluir todas as classes terminadas por "Bean"
sonar.exclusions=**/* Bean.java, **/*DTO.java

Excluir todas as classes no diretório "src/main/java/org/sonar"
sonar.exclusions=src/main/java/org/sonar/*

Excluir todos os arquivos no diretório "dist" e seus subdiretórios
sonar.exclusions=site/dist/**

Excluir todos os arquivos no diretório e subdiretórios de "bank" cuja extensão é .js
sonar.exclusions=bank/**/*.js

Essas exclusões podem ser úteis para ajustar a análise às necessidades específicas do projeto e para evitar análises desnecessárias de partes do código que não são relevantes para o contexto atual. Essas exclusões ajudam a focar a análise nas partes relevantes do código e a evitar falsos positivos.

Mais detalhes e exemplos em: https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/

# Tipo de Análise

Mesmo que você não possua uma esteira de entrega contínua é possível analisar o código, desde que ele esteja atualizado na sua máquina.
Isso significa que, mesmo que você não esteja usando uma ferramenta de integração contínua (CI) para automatizar o processo de análise do código-fonte em cada alteração ou commit, você ainda pode executar análises estáticas no seu código localmente, desde que você tenha uma cópia atualizada do código na sua máquina.

Normalmente, em uma esteira de entrega contínua, o código é automaticamente analisado sempre que há uma nova alteração no repositório de código. Isso é útil para identificar problemas de qualidade do código o mais rápido possível.

No entanto, mesmo sem essa automação, você pode realizar análises estáticas do código localmente para identificar problemas de qualidade, como vulnerabilidades de segurança, bugs potenciais, má prática de codificação, entre outros. Isso é especialmente útil durante o desenvolvimento, pois permite que você corrija problemas enquanto trabalha no código, em vez de esperar até que seja enviado para o repositório central.

Para fazer isso, você deve instalar e configurar o scanner mais adequado às suas necessidades:

MSBuild para .NET Framework 4.6+
MSBuild para .NET Core 2.0+
SonarScanner para outros


# MSBuild .NET Framework 4.6+

1. Faça o downloaddo SonarScanner para MSBuild .Net Framework 4.6+
2. Descompacte-o em c:\sonarscanner-msbuild, por exemplo
3. No PowerShell, acesse o diretório onde consta a sua aplicação
4. Execute os comandos abaixo para executar a análise substituindo os &lt;parâmetros&gt; necessários:
Begin : Conecta-se ao MSBuild, faz o download dos perfis de qualidade do SonarQube, as configurações e prepara seu projeto para a análise.
&lt;diretório do SonarScanner.MSBuild.exe&gt; begin /k:&lt;"chave-do-projeto"&gt; /n:"Nome do projeto" /d:sonar.host.url=&lt;url do server que será gerada a análise&gt;

### obs:
1. Build : Entre as etapas "begin" e "end", você precisa construir seu projeto, executar testes e gerar dados de cobertura de código. C:\Arquivos de Programas (x86)\MSBuild\14.0\Bin\MSBuild.exe &lt;diretório da solution.sln&gt; /t:Rebuild
2. End : Ele limpa os hooks do MSBuild, coleta os dados de análise gerados pela construção, os resultados do teste, a cobertura do código e, em seguida, carrega tudo para o SonarQube.
&lt;diretório do SonarScanner.MSBuild.exe&gt; end

# MSBuild .NET Core 2.0+
1.Faça o downloaddo SonarScanner para MSBuild .Net Core 2.0+
2.Descompacte-o em c:\sonarscanner-msbuild, por exemplo
3.No PowerShell, acesse o diretório onde consta a sua aplicação
4.Execute os comandos abaixo para executar a análise substituindo os &lt;parâmetros&gt; necessários:

Begin : Conecta-se ao MSBuild, faz o download dos perfis de qualidade do SonarQube, as configurações e prepara seu projeto para a análise.
dotnet &lt;diretório do SonarScanner.MSBuild.dll&gt; begin /k:"chave-do-projeto" /n:"Nome do projeto" /d:sonar.host.url=&lt;url do server que será gerada a análise&gt;

### obs:
1. Build : Entre as etapas "begin" e "end", você precisa construir seu projeto, executar testes e gerar dados de cobertura de código.
2. dotnet build &lt;diretório da solution.sln&gt;

End : Ele limpa os hooks do MSBuild, coleta os dados de análise gerados pela construção, os resultados do teste, a cobertura do código e, em seguida, carrega tudo para o SonarQube.
dotnet &lt;diretório do SonarScanner.MSBuild.dll&gt; end

### SonarScanner
1. Faça o download do SonarScanner

2. Descompacte-o em c:\sonarscanner, por exemplo

3. Atualize as configurações globais para apontar para o seu servidor SonarQube editando &lt;diretorio_instalacao&gt;/conf/sonar-scanner.properties:

4. Adicione o diretório &lt;diretorio_instalacao&gt;/bin ao seu path.

5. Para configurar path: - ■■ Localize o diretório de instalação do SonarScanner - ■■** Windows 10 - Pesquise por Variáveis de Ambiente e selecione Editar as variáveis de ambiente do sistema** - ■■ Clique no botão Variáveis de ambiente - ■■ Sob Variáveis do sistema , encontre Path e clique em Editar - ■■ Clique em Novo e adicione o diretório &lt;diretorio_instalacao&gt;/bin - ■■ Clique em OK e Aplicar alterações quando solicitado

6. Você pode verificar sua instalação abrindo um novo shell e executando o comando sonar-scanner -h (na plataforma Windows, o comando é sonar-scanner.bat -h). Você deve obter uma saída assim:

7. Crie um arquivo de configuração no diretório raiz do projeto: sonar-project.properties

### sonar-project.properties

## EXEMPLO

#dotnet sonarscanner begin /k:"projeto_chave" /d:sonar.host.url="http://localhost:9000" /d:sonar.login="seu_token_de_autenticação"
dotnet build
dotnet sonarscanner end /d:sonar.login="seu_token_de_autenticação"

* Execute o seguinte comando no diretório base do projeto para ativar a análise:
sonar-scanner

# SonarLint

O SonarLint é uma extensão IDE que ajuda a detectar e corrigir problemas de qualidade enquanto você escreve o código.

Como um verificador ortográfico, o SonarLint elimina falhas para que possam ser corrigidas antes de confirmar o código.

Acesse https://www.sonarlint.org/ e escolha a extensão para sua IDE favorita.

# Instalação Java

No PowerShell verifique se possui o jdk 17 instalado

java -version

Caso não possua, efetue o download

Execute o instalador do Java. Anote o diretório de instalação, pois você precisará disso mais tarde.
Quando a instalação do Java estiver concluída, verifique se a variável de ambiente JAVA_HOME foi configurada corretamente.
Abra um prompt de comando, digite
echo %JAVA_HOME%

Se você vir um caminho para o diretório de instalação do Java, a variável de ambiente JAVA_Home foi configurada corretamente.
Exemplo:

Se nada for exibido ou somente %JAVA_HOME% for retornado, você precisará configurar a variável de ambiente JAVA_HOME manualmente.

Para configurar a variável JAVA_HOME:

Localize o diretório de instalação Java

Se você não alterou o caminho durante a instalação, ele será parecido com isso C:\Program Files\Java\17.0.10

Windows 11 - Pesquise por Variáveis de Ambiente e selecione Editar as variáveis de ambiente do sistema

Clique no botão Variáveis de ambiente

Sob Variáveis do sistema , clique em Novo

No campo Nome da variável , insira JAVA_HOME

No campo Valor da variável , insira o seu caminho da instalação do JDK

Clique em OK e Aplicar alterações quando solicitado

Você precisará fechar e abrir novamente qualquer janela de comando que estava aberta antes de fazer estas alterações, já que não há como recarregar variáveis de ambiente de um prompt de comando ativo. Se as alterações não entrarem em vigor depois de abrir novamente a janela de comando, reinicie o Windows.


### PRINCIPAIS MÉTRICAS SONARQUBE

## Quality Profiles

Os Quality Profiles são funcionalidades bastante importantes para a evolução de qualidade. Com eles, é possível criar limites de regras ativas de forma customizada e realizar etapas de evolução dessas regras por projeto, possibilitando sua continuidade.

É uma configuração que define um conjunto de regras e parâmetros para análise estática de código.

Esses perfis são usados para garantir que o código-fonte de um projeto atenda a determinados padrões de qualidade, seguindo boas práticas de programação, evitando bugs comuns e vulnerabilidades de segurança. Eles podem incluir regras para métricas de código, como complexidade ciclomática, cobertura de testes, conformidade com padrões de codificação e detecção de vulnerabilidades conhecidas.

Os Quality Profiles são altamente personalizáveis, permitindo que as equipes de desenvolvimento adaptem as regras de acordo com as necessidades específicas de seus projetos e padrões de codificação internos. Isso ajuda a garantir consistência e qualidade no código-fonte ao longo do tempo.


## Quality Gates

Já os Quality Gates definem metas de qualidade que o projeto deverá superar para se tornar apto a passar pelo gate. Basicamente, o projeto deve atender às métricas baseadas nas regras ativas criadas pelo quality profile usado pelo projeto. É uma etapa de extrema relevância para a estrutura de confiabilidade.

São critérios definidos para avaliar a qualidade do código-fonte de um projeto durante seu ciclo de desenvolvimento. Eles são uma parte essencial das práticas de integração contínua e entrega contínua (CI/CD), onde o código é frequentemente integrado e testado automaticamente.

Os Quality Gates são usados para determinar se um build ou uma versão de software atende aos padrões de qualidade exigidos antes de serem considerados prontos para implantação. Eles podem incluir critérios relacionados à qualidade do código, como cobertura de testes, conformidade com padrões de codificação, ausência de vulnerabilidades de segurança conhecidas, complexidade do código, entre outros.

Quando um build ou versão do software é submetido a um Quality Gate, ele passa por uma série de verificações automatizadas. Se o código atender a todos os critérios definidos pelo Quality Gate, ele é considerado aprovado e pode prosseguir para implantação. Caso contrário, se alguma das condições não for atendida, o build pode ser marcado como falha e exigir intervenção manual para correção dos problemas identificados.

Os Quality Gates ajudam a garantir que apenas código de alta qualidade e funcionalmente seguro seja implantado em produção, reduzindo o risco de problemas e falhas no software em operação. Eles também promovem a consistência e a conformidade com os padrões de qualidade estabelecidos pela equipe de desenvolvimento.

## Quality Profiles

São funcionalidades bastante importantes para a evolução de qualidade. Com eles, é possível criar limites de regras ativas de forma customizada e realizar etapas de evolução dessas regras por projeto, possibilitando sua continuidade.
São conjuntos de regras e configurações utilizadas em ferramentas de análise estática de código para avaliar a qualidade e a conformidade do código-fonte com padrões específicos. 
Esses perfis podem incluir uma variedade de regras e métricas para avaliar diferentes aspectos do código, como legibilidade, eficiência, segurança e conformidade com padrões de codificação. Por exemplo, um Quality Profile pode conter regras para detectar código duplicado, complexidade excessiva, vulnerabilidades de segurança conhecidas, falta de documentação ou não conformidade com convenções de nomenclatura.

Os Quality Profiles são altamente configuráveis, permitindo que as equipes de desenvolvimento personalizem as regras de acordo com as necessidades e padrões específicos de seus projetos. Isso ajuda a manter um código-fonte consistente, de alta qualidade e de fácil manutenção ao longo do tempo.

Ao analisar o código-fonte durante o desenvolvimento, as ferramentas de análise estática, como o SonarQube, aplicam as regras definidas nos Quality Profiles e fornecem feedback aos desenvolvedores sobre áreas que precisam ser melhoradas para garantir a qualidade e a segurança do código. Isso permite que as equipes identifiquem e corrijam problemas de forma proativa, antes que eles se tornem problemas maiores ou afetem a funcionalidade do software em produção.









Esse documento foi baseado na documentação oficial do SonarQube que pode ser encontrada em: https://docs.sonarqube.org/latest





