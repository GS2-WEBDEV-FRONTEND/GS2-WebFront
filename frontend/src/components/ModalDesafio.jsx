// src/components/ModalDesafio.jsx
import { useState } from "react"

function ModalDesafio({ desafio, onClose, atualizarProgresso, concluido }) {
  if (!desafio) return null

  const [linkEntrega, setLinkEntrega] = useState("")
  const [descricaoEntrega, setDescricaoEntrega] = useState("")
  const [nomeUsuario, setNomeUsuario] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [status, setStatus] = useState(null) // 'sucesso' | 'erro' | 'incompleto'

  async function handleEnviarEntrega(e) {
    e.preventDefault()
    setStatus(null)

    if (!linkEntrega.trim()) {
      setStatus("incompleto")
      return
    }

    try {
      setEnviando(true)

      const resposta = await fetch("http://localhost:3000/api/entregas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desafioId: desafio.id,
          tituloDesafio: desafio.titulo,
          linkEntrega,
          descricaoEntrega,
          nomeUsuario,
        }),
      })

      if (!resposta.ok) {
        throw new Error("Erro ao registrar entrega")
      }

      setStatus("sucesso")
      atualizarProgresso(desafio.id, true)
      // Se quiser limpar o form:
      // setLinkEntrega("")
      // setDescricaoEntrega("")
    } catch (erro) {
      console.error("Erro ao enviar entrega:", erro)
      setStatus("erro")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-slate-900 border border-indigo-600/40 shadow-2xl rounded-2xl w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-indigo-300">
            {desafio.titulo}
          </h2>
          <button
            className="text-slate-400 hover:text-slate-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Conteúdo texto do desafio */}
        <p className="mt-3 text-sm text-slate-300">{desafio.descricao}</p>

        <section className="mt-5">
          <h3 className="text-sm font-semibold text-purple-300">
            Entrega esperada
          </h3>
          <p className="text-xs text-slate-400 mt-1">{desafio.entrega}</p>
        </section>

        <section className="mt-5">
          <h3 className="text-sm font-semibold text-purple-300">
            Critérios de avaliação
          </h3>
          <ul className="list-disc pl-5 mt-1 text-xs text-slate-400 space-y-1">
            {desafio.criterios.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Formulário de entrega */}
        <section className="mt-6 border-t border-slate-700 pt-4">
          <h3 className="text-sm font-semibold text-indigo-200">
            Enviar entrega deste desafio
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Envie o link da sua entrega (GitHub, Figma, Power BI, Google Drive etc.) e, se quiser, um breve resumo do que você fez.
          </p>

          <form onSubmit={handleEnviarEntrega} className="mt-3 space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Seu nome (opcional)
              </label>
              <input
                type="text"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Link da entrega <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={linkEntrega}
                onChange={(e) => setLinkEntrega(e.target.value)}
                placeholder="https://github.com/..., https://figma.com/..., https://... "
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Descrição da entrega (opcional)
              </label>
              <textarea
                value={descricaoEntrega}
                onChange={(e) => setDescricaoEntrega(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                placeholder="Explique rapidamente o que você fez, tecnologias utilizadas, foco da solução..."
              />
            </div>

            {status === "incompleto" && (
              <p className="text-[11px] text-yellow-400">
                Preencha pelo menos o link da entrega antes de enviar.
              </p>
            )}
            {status === "erro" && (
              <p className="text-[11px] text-red-400">
                Ocorreu um erro ao registrar sua entrega. Tente novamente.
              </p>
            )}
            {status === "sucesso" && (
              <p className="text-[11px] text-emerald-400">
                Entrega registrada com sucesso! (Ela já está salva no backend e o desafio foi marcado como concluído.)
              </p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700"
              >
                Fechar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="px-4 py-2 text-xs font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:bg-slate-600"
              >
                {enviando ? "Enviando..." : "Enviar entrega"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ModalDesafio
