// src/components/ModalProfissional.jsx

function ModalProfissional({ profissional, onClose }) {
  if (!profissional) return null

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
        </div>

        {/* Rodapé com ações */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-3">
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
            onClick={() => alert('Simulação: recomendação enviada!')}
          >
            Recomendar profissional
          </button>
          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-3 py-2 text-[11px] font-medium text-white hover:bg-indigo-700"
            onClick={() => alert('Simulação: mensagem enviada!')}
          >
            Enviar mensagem
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalProfissional
