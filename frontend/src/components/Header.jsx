// src/components/Header.jsx
function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-800/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-md">
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

        <button
            onClick={() => window.location.href = "/desafios"}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-md hover:bg-indigo-700 transition"
>
          Ver desafios
        </button>
      </div>
    </header>
  );
}

export default Header;
