// src/components/Header.jsx
function Header() {
  const rota = window.location.pathname

  const handleLogoClick = () => {
    // Só volta pra home se estiver na página de desafios
    if (rota === "/desafios") {
      window.location.href = "/"
    }
  }

  return (
    <header className="border-b border-slate-700 bg-slate-800/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo + texto */}
        <div
          className={`flex items-center gap-3 ${
            rota === "/desafios" ? "cursor-pointer" : ""
          }`}
          onClick={handleLogoClick}
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold shadow-md">
            FT
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-100 tracking-tight">
              FuturoTalentos
            </h1>
            <p className="text-xs text-slate-400">
              Conectando pessoas, competências e propósito
            </p>
          </div>
        </div>

        {/* Botão ver desafios */}
        <button
          onClick={() => (window.location.href = "/desafios")}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 shadow-md hover:bg-indigo-700 transition"
        >
          Ver desafios
        </button>
      </div>
    </header>
  )
}

export default Header
