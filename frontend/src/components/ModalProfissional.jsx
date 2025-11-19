import { useState } from "react"

function ModalProfissional({ profissional, onClose }) {
  if (!profissional) return null

  // Estado da mensagem
  const [nomeRemetente, setNomeRemetente] = useState("")
  const [emailRemetente, setEmailRemetente] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [statusEnvio, setStatusEnvio] = useState(null) // 'sucesso' | 'erro' | 'incompleto'

  // Estado da recomendação
  const [nomeRecomendante, setNomeRecomendante] = useState("")
  const [emailRecomendante, setEmailRecomendante] = useState("")
  const [motivoRecomendacao, setMotivoRecomendacao] = useState("")
  const [contextoRecomendacao, setContextoRecomendacao] = useState("")
  const [enviandoRec, setEnviandoRec] = useState(false)
  const [statusRec, setStatusRec] = useState(null) // 'sucesso' | 'erro' | 'incompleto'

  const resumo = profissional.resumo || profissional.descricao || ""
  const localizacao = profissional.localizacao || profissional.cidade || "Brasil"
  const habilidadesTecnicas =
    profissional.habilidadesTecnicas || profissional.habilidades || []
  const softSkills = profissional.softSkills || []
  const experiencias = profissional.experiencias || []
  const formacao = profissional.formacao || []
  const projetos = profissional.projetos || []
  const certificacoes = profissional.certificacoes || []
  const idiomas = profissional.idiomas || []
  const interesses = profissional.areaInteresses || []

  async function handleEnviarMensagem(e) {
    e.preventDefault()
    setStatusEnvio(null)

    if (!mensagem.trim()) {
      setStatusEnvio("incompleto")
      return
    }

    try {
      setEnviando(true)

      const resposta = await fetch("http://localhost:3000/api/mensagens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        throw new Error("Erro ao enviar mensagem")
      }

      setStatusEnvio("sucesso")
      setMensagem("")
    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro)
      setStatusEnvio("erro")
    } finally {
      setEnviando(false)
    }
  }

  async function handleRecomendar(e) {
    e.preventDefault()
    setStatusRec(null)

    if (!motivoRecomendacao.trim()) {
      setStatusRec("incompleto")
      return
    }

    try {
      setEnviandoRec(true)

      const resposta = await fetch("http://localhost:3000/api/recomendacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profissionalId: profissional.id,
          profissionalNome: profissional.nome,
          nomeRecomendante:
            nomeRecomendante || nomeRemetente || null,
          emailRecomendante:
            emailRecomendante || emailRemetente || null,
          motivo: motivoRecomendacao,
          contexto: contextoRecomendacao,
        }),
      })

      if (!resposta.ok) {
        throw new Error("Erro ao enviar recomendação")
      }

      setStatusRec("sucesso")
      setMotivoRecomendacao("")
      setContextoRecomendacao("")
    } catch (erro) {
      console.error("Erro ao enviar recomendação:", erro)
      setStatusRec("erro")
    } finally {
      setEnviandoRec(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-slate-950 border border-indigo-600/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-xs font-semibold text-white flex items-center justify-center">
              {profissional.nome
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-50">
                {profissional.nome}
              </h2>
              <p className="text-xs text-slate-300">
                {profissional.cargo} • {profissional.area}
              </p>
              <p className="text-[11px] text-indigo-300 mt-0.5">
                {localizacao}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 text-sm px-2 py-1 rounded-lg hover:bg-slate-800"
          >
            Fechar
          </button>
        </div>

        {/* Conteúdo */}
        <div className="grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-5 px-6 py-4 overflow-y-auto max-h-[78vh]">
          {/* Coluna esquerda: perfil */}
          <div className="space-y-4 pr-1">
            {/* Sobre */}
            <section>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Sobre
              </h3>
              <p className="mt-1 text-xs text-slate-300">{resumo}</p>
            </section>

            {/* Hard & Soft skills */}
            <section className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                  Hard skills
                </h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {habilidadesTecnicas.length === 0 ? (
                    <p className="text-[11px] text-slate-400">Nenhuma informação cadastrada.</p>
                  ) : (
                    habilidadesTecnicas.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] text-slate-100 border border-slate-700"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                  Soft skills
                </h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {softSkills.length === 0 ? (
                    <p className="text-[11px] text-slate-400">Nenhuma informação cadastrada.</p>
                  ) : (
                    softSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] text-slate-100 border border-slate-700"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Experiências */}
            <section>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Experiências
              </h3>
              <div className="mt-2 space-y-2">
                {experiencias.length === 0 ? (
                  <p className="text-[11px] text-slate-400">Nenhuma experiência cadastrada.</p>
                ) : (
                  experiencias.map((exp, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2"
                    >
                      <p className="text-xs font-semibold text-slate-100">
                        {exp.cargo} • {exp.empresa}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {exp.inicio} — {exp.fim}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-300">
                        {exp.descricao}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Formação */}
            <section>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Formação acadêmica
              </h3>
              <div className="mt-2 space-y-2">
                {formacao.length === 0 ? (
                  <p className="text-[11px] text-slate-400">Nenhuma formação cadastrada.</p>
                ) : (
                  formacao.map((f, idx) => (
                    <div key={idx} className="text-[11px] text-slate-300">
                      <p className="font-semibold text-slate-100">
                        {f.curso}
                      </p>
                      <p className="text-slate-400">
                        {f.instituicao} • {f.ano}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Projetos */}
            <section>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Projetos
              </h3>
              <div className="mt-2 space-y-2">
                {projetos.length === 0 ? (
                  <p className="text-[11px] text-slate-400">Nenhum projeto cadastrado.</p>
                ) : (
                  projetos.map((proj, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2"
                    >
                      <p className="text-xs font-semibold text-slate-100">
                        {proj.titulo}
                      </p>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-indigo-300 hover:text-indigo-200 break-all"
                        >
                          {proj.link}
                        </a>
                      )}
                      <p className="mt-1 text-[11px] text-slate-300">
                        {proj.descricao}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Certificações + Idiomas + Interesses */}
            <section className="grid md:grid-cols-3 gap-3">
              <div>
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                  Certificações
                </h3>
                <ul className="mt-1 list-disc list-inside text-[11px] text-slate-300">
                  {certificacoes.length === 0 ? (
                    <li className="text-slate-400">Nenhuma certificação cadastrada.</li>
                  ) : (
                    certificacoes.map((c, idx) => <li key={idx}>{c}</li>)
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                  Idiomas
                </h3>
                <ul className="mt-1 list-disc list-inside text-[11px] text-slate-300">
                  {idiomas.length === 0 ? (
                    <li className="text-slate-400">Nenhum idioma cadastrado.</li>
                  ) : (
                    idiomas.map((i, idx) => (
                      <li key={idx}>
                        {i.idioma} • {i.nivel}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                  Hobbies e interesses
                </h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {interesses.length === 0 ? (
                    <p className="text-[11px] text-slate-400">Nenhuma informação cadastrada.</p>
                  ) : (
                    interesses.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] text-slate-100 border border-slate-700"
                      >
                        {a}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Coluna direita: contato e recomendação */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-4">
            {/* Enviar mensagem */}
            <section>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Enviar mensagem para o profissional
              </h3>
              <p className="mt-1 text-[11px] text-slate-400">
                Use este espaço para enviar uma mensagem direta para este perfil.
              </p>

              <form
                onSubmit={handleEnviarMensagem}
                className="mt-3 space-y-3 text-[11px]"
              >
                <div>
                  <label className="block font-medium text-slate-200 mb-1">
                    Seu nome (opcional)
                  </label>
                  <input
                    type="text"
                    value={nomeRemetente}
                    onChange={(e) => setNomeRemetente(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-200 mb-1">
                    Seu e-mail (opcional)
                  </label>
                  <input
                    type="email"
                    value={emailRemetente}
                    onChange={(e) => setEmailRemetente(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-200 mb-1">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                    placeholder="Escreva aqui sua mensagem..."
                  />
                </div>

                {statusEnvio === "incompleto" && (
                  <p className="text-[11px] text-yellow-400">
                    Preencha pelo menos a mensagem antes de enviar.
                  </p>
                )}
                {statusEnvio === "erro" && (
                  <p className="text-[11px] text-red-400">
                    Ocorreu um erro ao enviar sua mensagem. Tente novamente.
                  </p>
                )}
                {statusEnvio === "sucesso" && (
                  <p className="text-[11px] text-emerald-400">
                    Mensagem enviada com sucesso.
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    disabled={enviando}
                    className="px-4 py-2 text-xs font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:bg-slate-700"
                  >
                    {enviando ? "Enviando..." : "Enviar mensagem"}
                  </button>
                </div>
              </form>
            </section>

            {/* Recomendar profissional */}
            <section className="mt-4 border-t border-slate-800 pt-4">
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Recomendar este profissional
              </h3>
              <p className="mt-1 text-[11px] text-slate-400">
                Registre uma recomendação para este perfil, indicando o motivo e o contexto
                (por exemplo: vaga, projeto ou equipe).
              </p>

              <form
                onSubmit={handleRecomendar}
                className="mt-3 space-y-3 text-[11px]"
              >
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block font-medium text-slate-200 mb-1">
                      Seu nome (opcional)
                    </label>
                    <input
                      type="text"
                      value={nomeRecomendante}
                      onChange={(e) => setNomeRecomendante(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                      placeholder="Caso deixe em branco, será usado o nome do campo de mensagem, se preenchido."
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-200 mb-1">
                      Seu e-mail (opcional)
                    </label>
                    <input
                      type="email"
                      value={emailRecomendante}
                      onChange={(e) => setEmailRecomendante(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                      placeholder="Caso deixe em branco, será usado o e-mail do campo de mensagem, se preenchido."
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-200 mb-1">
                    Motivo da recomendação <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={motivoRecomendacao}
                    onChange={(e) => setMotivoRecomendacao(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                    placeholder="Descreva por que você recomenda este profissional."
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-200 mb-1">
                    Contexto (vaga, projeto, equipe, empresa etc.) - opcional
                  </label>
                  <textarea
                    rows={2}
                    value={contextoRecomendacao}
                    onChange={(e) => setContextoRecomendacao(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                  />
                </div>

                {statusRec === "incompleto" && (
                  <p className="text-[11px] text-yellow-400">
                    O campo de motivo da recomendação é obrigatório.
                  </p>
                )}
                {statusRec === "erro" && (
                  <p className="text-[11px] text-red-400">
                    Ocorreu um erro ao registrar sua recomendação. Tente novamente.
                  </p>
                )}
                {statusRec === "sucesso" && (
                  <p className="text-[11px] text-emerald-400">
                    Recomendação registrada com sucesso.
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={enviandoRec}
                    className="px-4 py-2 text-xs font-medium rounded-xl border border-indigo-500/70 bg-indigo-600/20 hover:bg-indigo-500/30 hover:border-indigo-400 disabled:bg-slate-700"
                  >
                    {enviandoRec ? "Enviando recomendação..." : "Recomendar profissional"}
                  </button>
                </div>
              </form>
            </section>

            {/* Contatos */}
            <section className="mt-4 border-t border-slate-800 pt-3 text-[11px] text-slate-300">
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide mb-1">
                Contatos
              </h3>
              {profissional.contato?.email && (
                <p>
                  E-mail:{" "}
                  <a
                    href={`mailto:${profissional.contato.email}`}
                    className="text-indigo-300 hover:text-indigo-200"
                  >
                    {profissional.contato.email}
                  </a>
                </p>
              )}
              {profissional.contato?.linkedin && (
                <p className="mt-1">
                  LinkedIn:{" "}
                  <a
                    href={profissional.contato.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-300 hover:text-indigo-200 break-all"
                  >
                    {profissional.contato.linkedin}
                  </a>
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalProfissional
