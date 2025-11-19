// frontend/scripts/convertProfissionais.js
const fs = require("fs");
const path = require("path");

const origemPath = path.join(__dirname, "..", "src", "data", "Profissionais.json");
const destinoPath = path.join(__dirname, "..", "src", "data", "Profissionais_completo.json");

// Carrega JSON atual
const conteudo = fs.readFileSync(origemPath, "utf8");
const perfisOriginais = JSON.parse(conteudo);

// Helpers simples para gerar campos novos
function gerarSoftSkills(area) {
  switch (area) {
    case "Tecnologia":
      return ["Trabalho em equipe", "Resolução de problemas", "Pensamento analítico"];
    case "Dados":
      return ["Raciocínio lógico", "Curiosidade", "Comunicação clara"];
    case "Design":
      return ["Empatia", "Comunicação visual", "Colaboração"];
    case "Marketing":
      return ["Criatividade", "Comunicação", "Organização"];
    case "Recursos Humanos":
      return ["Escuta ativa", "Negociação", "Inteligência emocional"];
    case "Customer Success":
      return ["Comunicação", "Relacionamento", "Foco no cliente"];
    default:
      return ["Comunicação", "Organização", "Adaptabilidade"];
  }
}

function gerarProjetos(p) {
  return [
    {
      titulo: `Projeto destaque de ${p.nome.split(" ")[0]}`,
      link: "https://example.com/projeto",
      descricao: `Projeto em que ${p.nome.split(" ")[0]} aplicou suas principais competências na área de ${p.area}.`
    }
  ];
}

function gerarCertificacoes(area) {
  switch (area) {
    case "Tecnologia":
      return ["Scrum Foundation", "Git & Versionamento"];
    case "Dados":
      return ["Fundamentos de Análise de Dados", "Introdução a Machine Learning"];
    case "Design":
      return ["UX Fundamentals", "UI Design Essentials"];
    case "Marketing":
      return ["Marketing Digital", "Google Analytics Basics"];
    case "Recursos Humanos":
      return ["Legislação Trabalhista Básica", "Entrevistas por Competência"];
    default:
      return ["Certificação Profissional na área", "Workshop de Soft Skills"];
  }
}

function gerarIdiomas() {
  return [
    { idioma: "Português", nivel: "Nativo" },
    { idioma: "Inglês", nivel: "Intermediário" }
  ];
}

function gerarAreasInteresse(area) {
  return [area, "Inovação", "Desenvolvimento Profissional"];
}

// Faz o mapeamento para o novo formato
const perfisConvertidos = perfisOriginais.map((p) => {
  // converte experiências (antes era array de strings)
  let experiencias = [];
  if (Array.isArray(p.experiencias) && p.experiencias.length > 0) {
    experiencias = p.experiencias.map((texto, idx) => ({
      empresa: `Empresa ${idx + 1}`,
      cargo: p.cargo,
      inicio: "2021-01",
      fim: "2024-06",
      descricao: texto
    }));
  } else {
    experiencias = [
      {
        empresa: "Empresa Exemplo",
        cargo: p.cargo,
        inicio: "2022-01",
        fim: "2024-06",
        descricao: "Atuação na área principal do profissional."
      }
    ];
  }

  // converte formação (antes era string)
  let formacao = [];
  if (typeof p.formacao === "string" && p.formacao.trim() !== "") {
    formacao = [
      {
        curso: p.formacao,
        instituicao: "Instituição Exemplo",
        ano: 2022
      }
    ];
  } else {
    formacao = [
      {
        curso: "Curso Superior na área",
        instituicao: "Instituição Exemplo",
        ano: 2022
      }
    ];
  }

  return {
    // mantém tudo que já existia
    ...p,

    // novos campos exigidos pelo PDF
    foto: "", // você disse que não precisa de imagem agora
    resumo: p.descricao || "", // reaproveita a descrição como resumo/headline
    localizacao: p.cidade || "",
    habilidadesTecnicas: p.habilidades || [],
    softSkills: gerarSoftSkills(p.area),

    experiencias, // agora no formato array de objetos
    formacao,     // agora array de objetos

    projetos: gerarProjetos(p),
    certificacoes: gerarCertificacoes(p.area),
    idiomas: gerarIdiomas(),
    areaInteresses: gerarAreasInteresse(p.area)
  };
});

// Salva em um novo arquivo para não perder o original
fs.writeFileSync(destinoPath, JSON.stringify(perfisConvertidos, null, 2), "utf8");

console.log(`✅ Arquivo convertido com sucesso!
➡ Origem: ${origemPath}
➡ Destino: ${destinoPath}`);
