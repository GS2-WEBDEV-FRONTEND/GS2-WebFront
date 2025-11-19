// src/components/ModalProfissional.jsx
import { useState } from 'react'

function ModalProfissional({ profissional, onClose }) {
  if (!profissional) return null

  const [nomeRemetente, setNomeRemetente] = useState('')
  const [emailRemetente, setEmailRemetente] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [status, setStatus] = useState(null) // 'sucesso' | 'erro' | null

  async function handleEnviarMensagem(e) {
    e.preventDefault()
    setStatus(null)

    if (!mensagem.trim()) {
      setStatus('erro')
      return
    }

    try {
      setEnviando(true)

      const resposta = await fetch('http://localhost:3000/api/mensagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profissionalId: profissional.id,
          profissionalNome: profissional.nome,
          mensagem,
          nomeRemetente,
          emailRemetente,
        }),
      })

      if (!resposta.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      setStatus('sucesso')
      setMensagem('')
      // Se quiser, também limpa nome/email:
      // setNomeRemetente('')
      // setEmailRemetente('')
    } catch (erro) {
      console.error('Erro ao enviar mensagem:', erro)
      setStatus('erro')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-xs font-semibold text-white flex items-center justify-center">
              {profissional.nome
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                {profissional.nome}
              </h2>
              <p className="text-xs text-slate-500">
                {profissional.cargo} • {profissional.cidade}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
          >
            Fechar
          </button>
        </div>

        {/* Corpo */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-4 text-xs text-slate-700">
          {/* Sobre */}
          {profissional.descricao && (
            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">Sobre</h3>
              <p className="text-slate-600">{profissional.descricao}</p>
            </section>
          )}

          {/* Habilidades */}
          {profissional.habilidades && profissional.habilidades.length > 0 && (
            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">Habilidades</h3>
              <div className="flex flex-wrap gap-1.5">
                {profissional.habilidades.map((hab) => (
                  <span
                    key={hab}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                  >
                    {hab}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Formação */}
          {profissional.formacao && (
            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">Formação</h3>
              <p className="text-slate-600">{profissional.formacao}</p>
            </section>
          )}

          {/* Experiências */}
          {profissional.experiencias && profissional.experiencias.length > 0 && (
            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">Experiências</h3>
              <ul className="list-disc space-y-1 pl-4 text-slate-600">
                {profissional.experiencias.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Contato */}
          {profissional.contato && (
            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">Contato</h3>
              <div className="space-y-1 text-slate-600">
                {profissional.contato.email && (
                  <p>
                    <span className="font-medium">E-mail: </span>
                    {profissional.contato.email}
                  </p>
                )}
                {profissional.contato.linkedin && (
                  <p>
                    <span className="font-medium">LinkedIn: </span>
                    <a
                      href={profissional.contato.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      {profissional.contato.linkedin}
                    </a>
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Formulário de mensagem */}
          <section className="space-y-2 pt-2 border-t border-slate-200">
            <h3 className="font-semibold text-slate-900">
              Enviar mensagem para {profissional.nome}
            </h3>
            <form onSubmit={handleEnviarMensagem} className="space-y-2">
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-slate-600">
                    Seu nome (opcional)
                  </label>
                  <input
                    type="text"
                    value={nomeRemetente}
                    onChange={(e) => setNomeRemetente(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-slate-600">
                    Seu e-mail (opcional)
                  </label>
                  <input
                    type="email"
                    value={emailRemetente}
                    onChange={(e) => setEmailRemetente(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-600">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  placeholder="Escreva aqui a mensagem que será enviada para este profissional..."
                />
              </div>

              {status === 'erro' && (
                <p className="text-[11px] text-red-500">
                  Não foi possível enviar a mensagem. Verifique se o campo
                  mensagem está preenchido ou tente novamente.
                </p>
              )}
              {status === 'sucesso' && (
                <p className="text-[11px] text-emerald-600">
                  Mensagem enviada com sucesso! (já está registrada no backend)
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={enviando}
                  className="rounded-xl bg-indigo-600 px-3 py-2 text-[11px] font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                >
                  {enviando ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ModalProfissional
