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

      <main className="flex-1 bg-slate-100">
        <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
          {/* HERO */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                 Futuro do Trabalho
                <span className="inline-block h-1 w-1 rounded-full bg-indigo-500" />
                Plataforma colaborativa
              </span>

              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Conecte talentos, competências e propósito em um só lugar.
              </h2>

              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Explore perfis de profissionais, descubra habilidades técnicas e
                comportamentais e crie conexões estratégicas para um futuro do
                trabalho mais justo, inclusivo e sustentável.
              </p>

              {/* Busca / filtros – depois damos vida nisso */}
              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  placeholder="Buscar por nome, cargo ou tecnologia..."
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                />
                <div className="flex gap-2">
                  <select className="w-full md:w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500">
                    <option>Área</option>
                  </select>
                  <select className="w-full md:w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500">
                    <option>Cidade</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card lateral – visão geral */}
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-lg shadow-slate-900/5">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                Visão geral da rede
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Profissionais
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-600">
                    {profissionais.length}+
                  </p>
                  <p className="text-[11px] text-slate-500">áreas variadas</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Tecnologias
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-600">
                    40+
                  </p>
                  <p className="text-[11px] text-slate-500">stack moderna</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Conexões
                  </p>
                  <p className="mt-1 text-lg font-semibold text-indigo-600">
                    120+
                  </p>
                  <p className="text-[11px] text-slate-500">recomendações</p>
                </div>
              </div>

            </div>
          </div>

          {/* LISTA DE CARDS DINÂMICOS */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-800">
                Profissionais em destaque
              </h3>
            
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profissionais.map((pessoa) => (
                <article
                  key={pessoa.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500/70 hover:shadow-lg hover:shadow-indigo-500/10"
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
                      <h4 className="text-sm font-semibold text-slate-900">
                        {pessoa.nome}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {pessoa.cargo} • {pessoa.cidade}
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-slate-600">
                    {pessoa.descricao}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pessoa.habilidades.slice(0, 4).map((hab) => (
                      <span
                        key={hab}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700"
                      >
                        {hab}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => abrirModal(pessoa)}
                    className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition group-hover:border-indigo-500 group-hover:bg-indigo-50 group-hover:text-indigo-700"
                  >
                    Ver perfil completo
                  </button>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>

      {/* MODAL */}
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
