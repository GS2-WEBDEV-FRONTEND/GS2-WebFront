// src/components/PerfilProfissional.jsx
import { useState } from 'react'
import Header from './Header'
import ModalProfissional from './ModalProfissional'
import profissionaisData from '../data/profissionais.json'

function PerfilProfissional() {
  const [profissionais] = useState(profissionaisData)
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null)

  function abrirModal(pessoa) {
    setProfissionalSelecionado(pessoa)
  }

  function fecharModal() {
    setProfissionalSelecionado(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-900 text-slate-100 transition-colors">
        <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
          {/* HERO */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-700/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                Futuro do Trabalho
                <span className="inline-block h-1 w-1 rounded-full bg-indigo-400" />
                Plataforma colaborativa
              </span>

              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Conecte talentos, competências e propósito em um só lugar.
              </h2>

              <p className="text-sm md:text-base text-slate-300 max-w-xl">
                Explore perfis de profissionais, descubra habilidades técnicas e
                comportamentais e crie conexões estratégicas para um futuro do
                trabalho mais justo, inclusivo e sustentável.
              </p>

              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  placeholder="Buscar por nome, cargo ou tecnologia..."
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/70"
                />
                <div className="flex gap-2">
                  <select className="w-full md:w-40 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/70">
                    <option>Área</option>
                  </select>
                  <select className="w-full md:w-40 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/70">
                    <option>Cidade</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CARD LATERAL */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/90 p-5 shadow-lg shadow-black/20">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">
                Visão geral da rede
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                
                <div className="rounded-xl bg-slate-800 p-3 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Profissionais
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-400">
                    {profissionais.length}+
                  </p>
                  <p className="text-[11px] text-slate-400">áreas variadas</p>
                </div>

                <div className="rounded-xl bg-slate-800 p-3 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Tecnologias
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-400">
                    40+
                  </p>
                  <p className="text-[11px] text-slate-400">stack moderna</p>
                </div>

                <div className="rounded-xl bg-slate-800 p-3 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Conexões
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-400">
                    120+
                  </p>
                  <p className="text-[11px] text-slate-400">recomendações</p>
                </div>
              </div>
            </div>
          </div>

          {/* CARDS */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200">
              Profissionais em destaque
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profissionais.map((pessoa) => (
                <article
                  key={pessoa.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-indigo-500/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-xs font-semibold text-white flex items-center justify-center">
                      {pessoa.nome.split(' ').map((n) => n[0]).join('').slice(0, 2)}
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
                        className="rounded-full bg-slate-700 px-2 py-0.5 text-[11px] text-slate-300 group-hover:bg-indigo-600/20 group-hover:text-indigo-300"
                      >
                        {hab}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => abrirModal(pessoa)}
                    className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition group-hover:border-indigo-500 group-hover:bg-indigo-600/20 group-hover:text-indigo-300"
                  >
                    Ver perfil completo
                  </button>
                </article>
              ))}
            </div>
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
