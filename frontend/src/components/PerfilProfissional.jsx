// src/components/PerfilProfissional.jsx
import { useState } from 'react'
import Header from './Header'
import ModalProfissional from './ModalProfissional'
import profissionaisData from '../data/Profissionais.json'

function PerfilProfissional() {
  const [profissionais] = useState(profissionaisData)
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null)

  const [termoBusca, setTermoBusca] = useState('')
  const [filtroArea, setFiltroArea] = useState('Todas')
  const [filtroCidade, setFiltroCidade] = useState('Todas')

  function abrirModal(pessoa) {
    setProfissionalSelecionado(pessoa)
  }

  function fecharModal() {
    setProfissionalSelecionado(null)
  }

  // Lista de áreas e cidades únicas para popular os selects
  const areasUnicas = Array.from(new Set(profissionais.map((p) => p.area)))
  const cidadesUnicas = Array.from(new Set(profissionais.map((p) => p.cidade)))

  // Aplica busca + filtros
  const profissionaisFiltrados = profissionais.filter((pessoa) => {
    const termo = termoBusca.toLowerCase().trim()

    const correspondeBusca =
      !termo ||
      pessoa.nome.toLowerCase().includes(termo) ||
      pessoa.cargo.toLowerCase().includes(termo) ||
      pessoa.descricao.toLowerCase().includes(termo) ||
      pessoa.habilidades.some((h) => h.toLowerCase().includes(termo))

    const correspondeArea = filtroArea === 'Todas' || pessoa.area === filtroArea
    const correspondeCidade =
      filtroCidade === 'Todas' || pessoa.cidade === filtroCidade

    return correspondeBusca && correspondeArea && correspondeCidade
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-900 text-slate-100">
        <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
          {/* HERO */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                🔮 Futuro do Trabalho
                <span className="inline-block h-1 w-1 rounded-full bg-indigo-400" />
                Plataforma colaborativa
              </span>

              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
                Conecte talentos, competências e propósito em um só lugar.
              </h2>

              <p className="text-sm md:text-base text-slate-300 max-w-xl">
                Explore perfis de profissionais, descubra habilidades técnicas e
                comportamentais e crie conexões estratégicas para um futuro do
                trabalho mais justo, inclusivo e sustentável.
              </p>

              {/* Busca / filtros */}
              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  placeholder="Buscar por nome, cargo, habilidade..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                />
                <div className="flex gap-2">
                  <select
                    value={filtroArea}
                    onChange={(e) => setFiltroArea(e.target.value)}
                    className="w-full md:w-40 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  >
                    <option value="Todas">Todas as áreas</option>
                    {areasUnicas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filtroCidade}
                    onChange={(e) => setFiltroCidade(e.target.value)}
                    className="w-full md:w-40 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  >
                    <option value="Todas">Todas as cidades</option>
                    {cidadesUnicas.map((cidade) => (
                      <option key={cidade} value={cidade}>
                        {cidade}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Card lateral */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5 shadow-lg shadow-black/40">
              <h3 className="text-sm font-semibold text-slate-100 mb-3">
                Visão geral da rede
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div className="rounded-xl bg-slate-900/70 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Profissionais
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-300">
                    {profissionais.length}+
                  </p>
                  <p className="text-[11px] text-slate-400">áreas variadas</p>
                </div>
                <div className="rounded-xl bg-slate-900/70 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Tecnologias
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-300">
                    40+
                  </p>
                  <p className="text-[11px] text-slate-400">stack moderna</p>
                </div>
                <div className="rounded-xl bg-slate-900/70 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Conexões
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-300">
                    120+
                  </p>
                  <p className="text-[11px] text-slate-400">recomendações</p>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-slate-400">
                *Os filtros acima permitem explorar diferentes áreas, cidades e
                habilidades dos profissionais cadastrados.
              </p>
            </div>
          </div>

          {/* LISTA DE CARDS */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Profissionais em destaque
              </h3>
              <span className="text-xs text-slate-400">
                Clique em um card para ver o perfil completo
              </span>
            </div>

            {profissionaisFiltrados.length === 0 ? (
              <p className="text-xs text-slate-400">
                Nenhum profissional encontrado com os filtros atuais.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profissionaisFiltrados.map((pessoa) => (
                  <article
                    key={pessoa.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/80 p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-xs font-semibold text-white flex items-center justify-center">
                        {pessoa.nome
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-100">
                          {pessoa.nome}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {pessoa.cargo} • {pessoa.cidade}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-slate-300">
                      {pessoa.descricao}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pessoa.habilidades.slice(0, 4).map((hab) => (
                        <span
                          key={hab}
                          className="rounded-full bg-slate-900/70 px-2 py-0.5 text-[11px] text-slate-200 group-hover:bg-indigo-500/20 group-hover:text-indigo-100"
                        >
                          {hab}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => abrirModal(pessoa)}
                      className="mt-4 w-full rounded-xl border border-slate-600 bg-slate-900/60 px-3 py-2 text-xs font-medium text-slate-100 transition group-hover:border-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-100"
                    >
                      Ver perfil completo
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>

      {profissionalSelecionado && (
        <ModalProfissional
          profissional={profissionalSelecionado}
          onClose={fecharModal}
        />
      )}
    </div>
  )
}

export default PerfilProfissional
