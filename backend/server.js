const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Função helper para ler JSON com segurança

function lerJSON(caminho) {
  try {
    if (!fs.existsSync(caminho)) return [];
    const conteudo = fs.readFileSync(caminho, "utf8");
    return conteudo.trim() ? JSON.parse(conteudo) : [];
  } catch (erro) {
    console.error("Erro ao ler JSON:", erro);
    return [];
  }
}

// Função helper para salvar JSON com segurança

function salvarJSON(caminho, dados) {
  try {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), "utf8");
    return true;
  } catch (erro) {
    console.error("Erro ao salvar JSON:", erro);
    return false;
  }
}

// Caminhos dos arquivos
const mensagensPath = path.join(__dirname, "mensagens.json");
const recomendacoesPath = path.join(__dirname, "recomendacoes.json");

// ROTA 01 → ENVIAR MENSAGEM PARA PROFISSIONAL

app.post("/api/mensagens", (req, res) => {
  const {
    profissionalId,
    profissionalNome,
    nomeRemetente,
    emailRemetente,
    mensagem,
  } = req.body;

  if (!profissionalId || !mensagem || !mensagem.trim()) {
    return res
      .status(400)
      .json({ erro: "profissionalId e mensagem são obrigatórios." });
  }

  const novaMensagem = {
    id: Date.now(),
    profissionalId,
    profissionalNome: profissionalNome || null,
    nomeRemetente: nomeRemetente || null,
    emailRemetente: emailRemetente || null,
    mensagem: mensagem.trim(),
    dataHora: new Date().toISOString(),
  };

  const lista = lerJSON(mensagensPath);
  lista.push(novaMensagem);

  if (!salvarJSON(mensagensPath, lista)) {
    return res
      .status(500)
      .json({ erro: "Erro ao salvar mensagem no servidor." });
  }

  return res.json({ sucesso: true, mensagem: "Mensagem enviada com sucesso." });
});

// ROTA 02 → RECOMENDAR PROFISSIONAL

app.post("/api/recomendacoes", (req, res) => {
  const {
    profissionalId,
    profissionalNome,
    nomeRecomendante,
    emailRecomendante,
    motivo,
    contexto,
  } = req.body;

  if (!profissionalId || !motivo || !motivo.trim()) {
    return res
      .status(400)
      .json({ erro: "profissionalId e motivo são obrigatórios." });
  }

  const recomendacao = {
    id: Date.now(),
    profissionalId,
    profissionalNome: profissionalNome || null,
    nomeRecomendante: nomeRecomendante || null,
    emailRecomendante: emailRecomendante || null,
    motivo: motivo.trim(),
    contexto: contexto ? contexto.trim() : null,
    dataHora: new Date().toISOString(),
  };

  const lista = lerJSON(recomendacoesPath);
  lista.push(recomendacao);

  if (!salvarJSON(recomendacoesPath, lista)) {
    return res
      .status(500)
      .json({ erro: "Erro ao salvar recomendação no servidor." });
  }

  return res.json({
    sucesso: true,
    mensagem: "Recomendação registrada com sucesso.",
  });
});

// ROTA PARA TESTAR SE O BACKEND ESTÁ ONLINE

app.get("/", (req, res) => {
  res.send("Backend FuturosTalentos está online! ");
});

// INICIAR SERVIDOR

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
