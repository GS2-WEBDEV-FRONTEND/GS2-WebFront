// backend/server.js
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

// Caminho do arquivo de entregas
const ENTREGAS_FILE = path.join(__dirname, 'entregas.json')

// Armazenamento em memória
const mensagens = []
let entregas = []

// Carregar entregas salvas do arquivo (se existir)
function carregarEntregasDoArquivo() {
  try {
    if (fs.existsSync(ENTREGAS_FILE)) {
      const conteudo = fs.readFileSync(ENTREGAS_FILE, 'utf8')
      if (conteudo.trim().length > 0) {
        entregas = JSON.parse(conteudo)
      } else {
        entregas = []
      }
      console.log(`📂 ${entregas.length} entregas carregadas de ${ENTREGAS_FILE}`)
    } else {
      entregas = []
      console.log('📂 Nenhum arquivo de entregas encontrado, iniciando vazio.')
    }
  } catch (erro) {
    console.error('❌ Erro ao carregar entregas do arquivo:', erro)
    entregas = []
  }
}

// Salvar entregas no arquivo
function salvarEntregasNoArquivo() {
  try {
    fs.writeFileSync(ENTREGAS_FILE, JSON.stringify(entregas, null, 2), 'utf8')
    console.log(`💾 Entregas salvas em ${ENTREGAS_FILE}`)
  } catch (erro) {
    console.error('❌ Erro ao salvar entregas no arquivo:', erro)
  }
}

// Carrega entregas logo que o servidor sobe
carregarEntregasDoArquivo()

app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.get('/', (req, res) => {
  res.send('API GS2 WebFront backend está rodando 🚀')
})

// Exemplo de profissionais (opcional)
app.get('/api/profissionais', (req, res) => {
  const profissionais = [
    {
      id: 1,
      nome: 'Ana Silva',
      cargo: 'Engenheira de Software',
      cidade: 'São Paulo/SP',
    },
    {
      id: 2,
      nome: 'João Santos',
      cargo: 'UX Designer',
      cidade: 'Curitiba/PR',
    },
  ]

  res.json(profissionais)
})

// ✅ Rota para envio de mensagem a profissional
app.post('/api/mensagens', (req, res) => {
  const {
    profissionalId,
    profissionalNome,
    mensagem,
    nomeRemetente,
    emailRemetente,
  } = req.body || {}

  if (!profissionalId || !mensagem) {
    return res.status(400).json({
      erro: 'profissionalId e mensagem são obrigatórios.',
    })
  }

  const novaMensagem = {
    id: mensagens.length + 1,
    profissionalId,
    profissionalNome: profissionalNome || null,
    mensagem,
    nomeRemetente: nomeRemetente || null,
    emailRemetente: emailRemetente || null,
    dataEnvio: new Date().toISOString(),
  }

  mensagens.push(novaMensagem)
  console.log('📨 Nova mensagem recebida:', novaMensagem)

  return res.status(201).json({
    ok: true,
    mensagem: 'Mensagem enviada com sucesso para o backend.',
  })
})

// ✅ Rota para envio de entrega de desafio (link + descrição)
app.post('/api/entregas', (req, res) => {
  const { desafioId, tituloDesafio, linkEntrega, descricaoEntrega, nomeUsuario } =
    req.body || {}

  if (!desafioId || !linkEntrega) {
    return res.status(400).json({
      erro: 'desafioId e linkEntrega são obrigatórios.',
    })
  }

  const novaEntrega = {
    id: entregas.length + 1,
    desafioId,
    tituloDesafio: tituloDesafio || null,
    linkEntrega,
    descricaoEntrega: descricaoEntrega || null,
    nomeUsuario: nomeUsuario || null,
    dataEnvio: new Date().toISOString(),
  }

  entregas.push(novaEntrega)
  console.log('✅ Nova entrega de desafio recebida:', novaEntrega)

  // 💾 Salva imediatamente no arquivo JSON
  salvarEntregasNoArquivo()

  return res.status(201).json({
    ok: true,
    mensagem: 'Entrega registrada com sucesso no backend e salva em arquivo.',
  })
})

// Rota para listar entregas (pra você / professor ver tudo)
app.get('/api/entregas', (req, res) => {
  res.json(entregas)
})

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`)
  console.log(`📁 Arquivo de entregas: ${ENTREGAS_FILE}`)
})
