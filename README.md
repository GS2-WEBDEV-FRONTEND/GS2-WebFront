Projeto desenvolvido para GS - FIAP 2025
Turma - 1ESPF
Integrantes:
Gabriel Dos Santos Cardoso - 562103
Lucas Oliveira Santos - 563617
Gustavo Torres Caldeira - 561613

Sobre o projeto

O FuturosTalentos é uma plataforma web construída em React + Tailwind + Node.js, que apresenta uma base de perfis profissionais fictícios estruturados conforme o modelo exigido pela FIAP.

A aplicação foi projetada para simular uma experiência semelhante a uma plataforma de talentos, permitindo:

Visualizar perfis detalhados com formações, experiências, hard skills e soft skills.

Buscar profissionais por nome, cargo, habilidades e localização.

Filtrar resultados por área e cidade.

Enviar mensagens personalizadas para os profissionais.

Registrar recomendações por meio de um formulário integrado ao backend.

Modal com informações completas baseadas em JSON local.

O projeto foi dividido em frontend e backend, seguindo boas práticas de organização.


Funcionalidades implementadas
Frontend (React + Vite + TailwindCSS)

Listagem de mais de 60 perfis profissionais
Busca em tempo real por nome, cargo, habilidades e cidade
Filtros por área e localização
Cards responsivos exibindo nome, cargo, hard skills e área
Carregamento incremental: exibição de 6 perfis por vez
Modal completo com:

    Hard skills
    Soft skills
    Experiências (objeto)
    Formação
    Projetos
    Certificações
    Idiomas
    Interesses

Contato
 Formulário de Enviar mensagem
 Formulário de Recomendar profissional
 Design dark-mode com gradientes + UI moderna
 Responsividade total (desktop / tablet / mobile)


 Backend (Node.js + Express)

O backend contém:

 Rota POST /api/mensagens → salva mensagens em mensagens.json
 Rota POST /api/recomendacoes → salva recomendações em recomendacoes.json
 Tratamento de erros
 Criação automática dos arquivos JSON se não existirem✔ CORS habilitado
 Express configurado com JSON



Como rodar o Projeto:
git clone https://github.com/SEU-USUARIO/GS2-WebFront.git
cd GS2-WebFront


Rodar o Back:
cd backend
npm install
node server.js


Rodar o Front:
cd frontend
npm install
npm run dev


JSON utilizado (base de perfis)

O arquivo Profissionais_completo.json contém:
id
nome
resumo
localizacao
area
habilidadesTecnicas
softSkills
experiencias (empresa, cargo, início, fim, descrição)
formacao
projetos
certificacoes
idiomas
areaInteresses
contato