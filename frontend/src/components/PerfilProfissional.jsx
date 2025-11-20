import { useState, useEffect } from "react"
import Header from "./Header"
import ModalProfissional from "./ModalProfissional"
import profissionaisData from "../data/Profissionais_completo.json"

function PerfilProfissional() {
  const [profissionais] = useState(profissionaisData)
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null)

  const [termoBusca, setTermoBusca] = useState("")
  const [filtroArea, setFiltroArea] = useState("Todas")
  const [filtroLocalizacao, setFiltroLocalizacao] = useState("Todas")

  // Exibir 6 profissionais no início
  const [limiteExibicao, setLimiteExibicao] = useState(6)

  function abrirModal(pessoa) {
    setProfissionalSelecionado(pessoa)
  }

  function fecharModal() {
    setProfissionalSelecionado(null)
  }

  const areasUnicas = Array.from(
    new Set(
      profissionais
        .map((p) => p.area)
        .filter((v) => v) // evita "undefined" na lista
    )
  )

  const localizacoesUnicas = Array.from(
    new Set(
      profissionais
        .map((p) => p.localizacao || p.cidade || "")
        .filter((v) => v)
    )
  )

  const profissionaisFiltrados = profissionais.filter((pessoa) => {
    const termo = termoBusca.toLowerCase().trim()

    const localizacao = (pessoa.localizacao || pessoa.cidade || "").toLowerCase()

    const habilidadesTecnicas =
      pessoa.habilidadesTecnicas || pessoa.habilidades || []
    const softSkills = pessoa.softSkills || []

    const correspondeBusca =
      !termo ||
      pessoa.nome.toLowerCase().includes(termo) ||
      (pessoa.cargo || "").toLowerCase().includes(termo) ||
      (pessoa.resumo || pessoa.descricao || "").toLowerCase().includes(termo) ||
      habilidadesTecnicas.some((h) => h.toLowerCase().includes(termo)) ||
      softSkills.some((s) => s.toLowerCase().includes(termo)) ||
      localizacao.includes(termo)

    const correspondeArea = filtroArea === "Todas" || pessoa.area === filtroArea

    const correspondeLocalizacao =
      filtroLocalizacao === "Todas" ||
      (pessoa.localizacao || pessoa.cidade) === filtroLocalizacao

    return correspondeBusca && correspondeArea && correspondeLocalizacao
  })

  const total = profissionais.length
  const totalFiltrados = profissionaisFiltrados.length

  const filtrosAtivos =
    termoBusca ||
    (filtroArea && filtroArea !== "Todas") ||
    (filtroLocalizacao && filtroLocalizacao !== "Todas")

  // Sempre que filtros mudarem → volta a exibir 6
  useEffect(() => {
    setLimiteExibicao(6)
  }, [termoBusca, filtroArea, filtroLocalizacao])

  const profissionaisExibidos = profissionaisFiltrados.slice(0, limiteExibicao)

  const podeCarregarMais = limiteExibicao < totalFiltrados

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_55%)] opacity-70" />

      <div className="relative z-10">
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
          <section className="rounded-3xl border border-slate-800/80 bg-slate-900/80 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-md px-5 py-7 md:px-8 md:py-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)] items-start">
              {/* Esquerda */}
              <div className="space-y-5">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-200">
                    Plataforma FuturosTalentos
                    <span className="inline-block h-1 w-1 rounded-full bg-indigo-400" />
                    Perfis completos
                  </span>

                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
                      Explore o perfil completo de talentos em diferentes áreas.
                    </h2>
                    <p className="text-sm md:text-[15px] text-slate-300 max-w-xl">
                      Filtre por área, localização ou habilidades técnicas.
                    </p>
                  </div>
                </div>

                {/* Busca + filtros */}
                <div className="mt-4 space-y-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Buscar por nome, cargo, tecnologia, cidade..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-3 pr-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                      />
                    </div>

                    <div className="flex gap-2">
                      <select
                        value={filtroArea}
                        onChange={(e) => setFiltroArea(e.target.value)}
                        className="w-full md:w-40 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs md:text-sm text-slate-100"
                      >
                        <option value="Todas">Todas as áreas</option>
                        {areasUnicas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filtroLocalizacao}
                        onChange={(e) => setFiltroLocalizacao(e.target.value)}
                        className="w-full md:w-44 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs md:text-sm text-slate-100"
                      >
                        <option value="Todas">Todas as localizações</option>
                        {localizacoesUnicas.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
                      {totalFiltrados} de {total} profissionais encontrados
                    </span>

                    {filtrosAtivos && (
                      <>
                        {termoBusca && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 border border-indigo-500/40 px-2.5 py-1 text-indigo-100">
                            Busca:{" "}
                            <span className="font-medium">{termoBusca}</span>
                          </span>
                        )}
                        {filtroArea !== "Todas" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 border border-purple-500/40 px-2.5 py-1 text-purple-100">
                            Área:{" "}
                            <span className="font-medium">{filtroArea}</span>
                          </span>
                        )}
                        {filtroLocalizacao !== "Todas" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 border border-sky-500/40 px-2.5 py-1 text-sky-100">
                            Localização:{" "}
                            <span className="font-medium">
                              {filtroLocalizacao}
                            </span>
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setTermoBusca("")
                            setFiltroArea("Todas")
                            setFiltroLocalizacao("Todas")
                          }}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-600 px-2.5 py-1 text-slate-300 hover:bg-slate-800/80"
                        >
                          Limpar filtros
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Direita — stats */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-lg shadow-black/40">
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  Visão geral da base de talentos
                </h3>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-700/80">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Perfis
                    </p>
                    <p className="mt-1 text-lg font-semibold text-indigo-300">
                      {total}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-700/80">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Áreas
                    </p>
                    <p className="mt-1 text-lg font-semibold text-indigo-300">
                      {areasUnicas.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-700/80">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Cidades
                    </p>
                    <p className="mt-1 text-lg font-semibold text-indigo-300">
                      {localizacoesUnicas.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LISTA DE PROFISSIONAIS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-100">
                  Profissionais em destaque
                </h3>
                <span className="text-[11px] text-slate-400">
                  Mostrando {profissionaisExibidos.length} de {totalFiltrados}{" "}
                  resultados
                </span>
              </div>

              {profissionaisFiltrados.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center text-sm text-slate-300">
                  <p className="font-medium mb-1">
                    Nenhum profissional encontrado com os filtros atuais.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {profissionaisExibidos.map((pessoa) => {
                      const iniciais = pessoa.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)

                      const resumo =
                        pessoa.resumo ||
                        pessoa.descricao ||
                        "Profissional em destaque."

                      const localizacao =
                        pessoa.localizacao || pessoa.cidade || "Brasil"

                      const habilidadesTecnicas =
                        pessoa.habilidadesTecnicas ||
                        pessoa.habilidades ||
                        []

                      const avatarUrl =
                        pessoa.foto ||
                        `https://i.pravatar.cc/150?u=${encodeURIComponent(
                          pessoa.email || pessoa.nome
                        )}`

                      return (
                        <article
                          key={pessoa.id}
                          className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:-translate-y-1 hover:border-indigo-400/80 hover:shadow-lg hover:shadow-indigo-500/25"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full border border-slate-700 overflow-hidden flex items-center justify-center bg-slate-900 text-xs font-semibold text-slate-100">
                              <img
                                src={avatarUrl}
                                alt={pessoa.nome}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none"
                                  e.target.parentElement.textContent = iniciais
                                }}
                              />
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-slate-100">
                                {pessoa.nome}
                              </h4>
                              <p className="text-xs text-slate-400">
                                {pessoa.cargo || "Profissional"}
                              </p>
                              <p className="mt-1 text-[11px] text-indigo-300">
                                {pessoa.area} • {localizacao}
                              </p>
                            </div>
                          </div>

                          <p className="mt-2 text-xs text-slate-300 line-clamp-3">
                            {resumo}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {habilidadesTecnicas.slice(0, 4).map((hab) => (
                              <span
                                key={hab}
                                className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] text-slate-200 group-hover:bg-indigo-500/25 group-hover:text-indigo-100"
                              >
                                {hab}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => abrirModal(pessoa)}
                            className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-100 transition group-hover:border-indigo-400 group-hover:bg-indigo-600/20"
                          >
                            Ver perfil completo
                          </button>
                        </article>
                      )
                    })}
                  </div>

                  {/* Botão carregar mais */}
                  {podeCarregarMais && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setLimiteExibicao((valor) =>
                            Math.min(valor + 6, totalFiltrados)
                          )
                        }
                        className="rounded-full border border-indigo-500/70 bg-indigo-600/20 px-4 py-2 text-xs font-medium text-indigo-100 hover:bg-indigo-500/30 hover:border-indigo-400"
                      >
                        Carregar mais profissionais
                      </button>
                    </div>
                  )}
                </>
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
    </div>
  )
}

export default PerfilProfissional
