/**
 * Define o tema (claro/escuro) ANTES da primeira pintura, evitando
 * o "flash" de tema errado. Respeita a escolha salva ou o sistema.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('tema');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
