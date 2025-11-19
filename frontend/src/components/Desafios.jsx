// src/components/Desafios.jsx
import { useState, useEffect } from "react"
import Header from "./Header"
import desafiosData from "../data/desafios.json"
import ModalDesafio from "./ModalDesafio"

function Desafios() {
  const [desafios] = useState(desafiosData)
  const [desafioSelecionado, setDesafioSelecionado] = useState(null)
  const [progresso, setProgresso] = useState({})

  useEffect(() => {
    const salvo = localStorage.getItem("progressoDesafios")
    if (salvo) setProgresso(JSON.parse(salvo))
  }, [])

  function atualizarProgresso(id, concluido) {
    const novo = { ...progresso, [id]: concluido }
    setProgresso(novo)
    localStorage.setItem("progressoDesafios", JSON.stringify(novo))
  }

  const concluidos = Object.values(progresso).filter((v) => v).length
  const total = desafios.length
  const porcentagem = Math.round((concluidos / total) * 100)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        
        {/* Dashboard de progresso */}
        <section className="bg-gradient-to-r from-indigo-700/40 via-purple-700/40 to-indigo-900/40 border border-indigo-600/30 p-6 rounded-2xl shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-semibold">Seu progresso nos desafios</h2>

          <p className="text-sm text-slate-300 mt-1">
            {concluidos} de {total} desafios concluídos
          </p>

          <div className="mt-4 w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500"
              style={{ width: `${porcentagem}%` }}
            ></div>
          </div>

          <p className="text-xs text-slate-400 mt-2">
            Continue avançando! 💪
          </p>
        </section>

        {/* Cards dos desafios */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Desafios disponíveis</h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {desafios.map((d) => (
              <article
                key={d.id}
                className="rounded-2xl p-5 bg-slate-800/60 border border-indigo-600/30 shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 transition cursor-pointer
                bg-gradient-to-br from-slate-900 via-indigo-900/20 to-purple-900/20"
              >
                <h4 className="text-lg font-semibold text-indigo-300">
                  {d.titulo}
                </h4>
                <p className="text-sm text-slate-300 mt-2 line-clamp-3">
                  {d.descricao}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-600/30 text-indigo-200 border border-indigo-500/30">
                    {d.nivel}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-600/30 text-purple-200 border border-purple-500/30">
                    {d.area}
                  </span>
                </div>

                <button
                  onClick={() => setDesafioSelecionado(d)}
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 py-2 text-sm font-medium shadow-md"
                >
                  Ver desafio
                </button>

                {progresso[d.id] ? (
                  <p className="mt-2 text-xs text-emerald-400 font-medium">
                    ✔ Desafio concluído
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">
                    Não concluído
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      {desafioSelecionado && (
        <ModalDesafio
          desafio={desafioSelecionado}
          onClose={() => setDesafioSelecionado(null)}
          atualizarProgresso={atualizarProgresso}
          concluido={progresso[desafioSelecionado.id]}
        />
      )}
    </div>
  )
}

export default Desafios
