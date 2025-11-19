import { useState } from "react"
import Header from "./Header"
import ModalProfissional from "./ModalProfissional"
import profissionaisData from "../data/Profissionais.json"

function PerfilProfissional() {
  const [profissionais] = useState(profissionaisData)
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null)

  const [termoBusca, setTermoBusca] = useState("")
  const [filtroArea, setFiltroArea] = useState("Todas")
  const [filtroCidade, setFiltroCidade] = useState("Todas")

  function abrirModal(pessoa) {
    setProfissionalSelecionado(pessoa)
  }

  function fecharModal() {
    setProfissionalSelecionado(null)
  }

  const areasUnicas = Array.from(new Set(profissionais.map((p) => p.area)))
  const cidadesUnicas = Array.from(new Set(profissionais.map((p) => p.cidade)))

  const profissionaisFiltrados = profissionais.filter((pessoa) => {
    const termo = termoBusca.toLowerCase().trim()

    const correspondeBusca =
      !termo ||
      pessoa.nome.toLowerCase().includes(termo) ||
      pessoa.cargo.toLowerCase().includes(termo) ||
      pessoa.descricao.toLowerCase().includes(termo) ||
      pessoa.habilidades.some((h) => h.toLowerCase().includes(termo))

    const correspondeArea =
      filtroArea === "Todas" || pessoa.area === filtroArea
    const correspondeCidade =
      filtroCidade === "Todas" || pessoa.cidade === filtroCidade

    return correspondeBusca && correspondeArea && correspondeCidade
  })

  const total = profissionais.length
  const totalFiltrados = profissionaisFiltrados.length

  const filtrosAtivos =
    termoBusca ||
    (filtroArea && filtroArea !== "Todas") ||
    (filtroCidade && filtroCidade !== "Todas")

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Fundo com gradiente suave */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_55%)] opacity-70" />
      <div className="relative z-10">
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
          {/* “Cardão” principal da página */}
          <section className="rounded-3xl border border-slate-800/80 bg-slate-900/80 shadow-[0_18px_45px_rgba(15,23,42,0.85)] backdrop-blur-md px-5 py-7 md:px-8 md:py-8 space-y-8">
            {/* HERO + filtros + stats */}
            <div className="grid gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)] items-start">
              {/* Lado esquerdo: título + busca + filtros */}
              <div className="space-y-5">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-200">
                     Plataforma FuturoTalentos
                    <span className="inline-block h-1 w-1 rounded-full bg-indigo-400" />
                    Rede colaborativa
                  </span>

                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
                      Descubra talentos, competências e conexões em um só lugar.
                    </h2>
                    <p className="text-sm md:text-[15px] text-slate-300 max-w-xl">
                      Navegue por perfis reais, explore habilidades técnicas e
                      comportamentais e crie conexões que fazem sentido para o
                      futuro do trabalho.
                    </p>
                  </div>
                </div>

                {/* Busca + filtros */}
                <div className="mt-4 space-y-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="flex-1 relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
                        
                      </span>
                      <input
                        type="text"
                        placeholder="Buscar por nome, cargo, habilidade..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/80 pl-8 pr-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={filtroArea}
                        onChange={(e) => setFiltroArea(e.target.value)}
                        className="w-full md:w-40 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs md:text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
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
                        className="w-full md:w-40 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs md:text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
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

                  {/* Chips de filtros ativos */}
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
                       {totalFiltrados} de {total} profissionais exibidos
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
                        {filtroCidade !== "Todas" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 border border-sky-500/40 px-2.5 py-1 text-sky-100">
                             Cidade:{" "}
                            <span className="font-medium">{filtroCidade}</span>
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setTermoBusca("")
                            setFiltroArea("Todas")
                            setFiltroCidade("Todas")
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

              {/* Lado direito: painel de stats */}
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-lg shadow-black/40">
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  Visão geral da rede
                </h3>
                <p className="text-[11px] text-slate-400 mb-3">
                  Dados fictícios para simular uma plataforma em crescimento.
                </p>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-700/80">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Profissionais
                    </p>
                    <p className="mt-1 text-lg font-semibold text-indigo-300">
                      {total}+
                    </p>
                    <p className="text-[11px] text-slate-400">multidisciplinares</p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-700/80">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Habilidades
                    </p>
                    <p className="mt-1 text-lg font-semibold text-indigo-300">
                      40+
                    </p>
                    <p className="text-[11px] text-slate-400">tecn. & comport.</p>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-700/80">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Conexões
                    </p>
                    <p className="mt-1 text-lg font-semibold text-indigo-300">
                      120+
                    </p>
                    <p className="text-[11px] text-slate-400">recomendações</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-[11px] text-slate-400">
                  <p>
                     Dica: experimente combinar filtros de área, cidade e
                    habilidades para encontrar perfis específicos.
                  </p>
                  <p>
                     Você também pode enviar mensagens diretas para cada
                    profissional pelo perfil completo.
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de profissionais */}
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  Profissionais em destaque
                </h3>
              
              </div>

              {profissionaisFiltrados.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center text-sm text-slate-300">
                  <p className="font-medium mb-1">
                    Nenhum profissional encontrado com os filtros atuais. 
                  </p>
                  <p className="text-xs text-slate-400">
                    Tente remover alguns filtros, alterar o termo de busca ou
                    selecionar “Todas as áreas” e “Todas as cidades”.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {profissionaisFiltrados.map((pessoa) => (
                    <article
                      key={pessoa.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-400/80 hover:shadow-lg hover:shadow-indigo-500/25"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-xs font-semibold text-white flex items-center justify-center">
                          {pessoa.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-50">
                            {pessoa.nome}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {pessoa.cargo} • {pessoa.cidade}
                          </p>
                          <p className="mt-1 text-[11px] text-indigo-300">
                            {pessoa.area}
                          </p>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-3">
                        {pessoa.descricao}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {pessoa.habilidades.slice(0, 4).map((hab) => (
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
                        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-100 transition group-hover:border-indigo-400 group-hover:bg-indigo-600/20 group-hover:text-indigo-100"
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

        {/* Modal do profissional */}
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
