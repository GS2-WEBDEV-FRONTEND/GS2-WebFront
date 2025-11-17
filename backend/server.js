// backend/server.js
const express = require('express')
const app = express()
const PORT = 3000

// Habilita JSON no body (pra POST etc, se precisar depois)
app.use(express.json())

// CORS simples pra liberar o acesso do frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})

// Rota de teste
app.get('/', (req, res) => {
  res.send('API GS2 WebFront backend está rodando 🚀')
})

// Rota de exemplo para profissionais (vamos trocar depois pelo JSON real)
app.get('/api/profissionais', (req, res) => {
  const profissionais = [
    {
      id: 1,
      nome: 'Ana Silva',
      cargo: 'Engenheira de Software',
      localizacao: 'São Paulo/SP',
    },
    {
      id: 2,
      nome: 'João Santos',
      cargo: 'UX Designer',
      localizacao: 'Curitiba/PR',
    },
  ]

  res.json(profissionais)
})

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`)
})
