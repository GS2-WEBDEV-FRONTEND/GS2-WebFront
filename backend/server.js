// backend/server.js
const express = require('express')
const app = express()
const PORT = 3000

// Para armazenar mensagens em memória (apenas para fins de trabalho/prova)
const mensagens = []

// Habilita JSON no body
app.use(express.json())

// CORS simples pra liberar o frontend (Vite em outra porta)
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

// Rota de teste
app.get('/', (req, res) => {
  res.send('API GS2 WebFront backend está rodando 🚀')
})

// (Opcional) rota de exemplo de profissionais
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

//  NOVA ROTA: receber mensagem para profissional
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

  // Só para visualização no terminal / comprovar que foi salvo
  console.log(' Nova mensagem recebida:', novaMensagem)

  return res.status(201).json({
    ok: true,
    mensagem: 'Mensagem enviada com sucesso para o backend.',
  })
})

app.listen(PORT, () => {
  console.log(` Backend rodando em http://localhost:${PORT}`)
})
