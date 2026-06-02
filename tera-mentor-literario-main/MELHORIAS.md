# Travez — Melhorias de Usabilidade e Beleza

Backlog priorizado para evolução do MVP. Contexto: protótipo navegável (phone-frame) para demoday.
Prioridade por **esforço × impacto**, com foco em não quebrar ao vivo e maximizar o "wow" visual.

Telas mapeadas: `onboarding.html`, `home.html` (home + sala de chat), `recomendacao.html`,
`conclusao.html` (conclusão + chat com autor + sugestões via IA), `sugestoes.html`.

---

## P0 — Riscos de quebrar na demo (resolver antes)

> Itens que podem falhar **ao vivo, na frente da banca**. Prioridade máxima.

1. **`sugestoes.html` está quebrada** — o arquivo faz `<script src="assets/travez.js">`, mas
   **esse arquivo não existe** na pasta `assets/`. Os botões chamam `chooseTravezOption()`, que
   nunca é definida → clicar não faz nada. Decisão: ou (a) **remover `sugestoes.html` do fluxo**
   (parece versão órfã/antiga — o fluxo real de sugestões já vive dentro de `conclusao.html`), ou
   (b) criar o `travez.js` faltante. Recomendo (a) para a demo.

2. **Dependências externas que falham com Wi-Fi ruim** — a demo depende de internet de evento:
   - Imagem hero do onboarding vem do **Unsplash** (`images.unsplash.com/...`). Se cair, a tela
     de boas-vindas abre sem imagem.
   - Ícones via **Lucide CDN** (`unpkg.com/lucide@latest`). Se cair, home e conclusão ficam sem ícones.
   - **Ação:** baixar a imagem hero para `assets/` e hospedar o Lucide localmente (ou inline dos
     SVGs usados). Tira o app da dependência da rede do evento.

3. **`recomendacao.html` NÃO usa a IA** — o fluxo "Nova recomendação" (a partir da home) é 100%
   estático: lê de um mapa local `books['affinity-mood']`, nunca chama a OpenAI. Só a
   `conclusao.html` chama o endpoint real `/api/travez/recommendations`. Se você for **mostrar a IA
   funcionando**, decida qual fluxo demonstrar e garanta que ele passe pela API — ou ajuste o
   roteiro da demo para usar a conclusão (que é o caminho que realmente integra).

4. **Loading falso** — onboarding e recomendacao usam `setTimeout(..., 2200)` fixo, sem chamada real.
   Para a demo tudo bem (é previsível), mas tenha consciência: o "Analisando seu perfil…" não está
   analisando nada nesses dois fluxos.

---

## P1 — Ganho visível rápido (alto impacto, baixo esforço)

> Coisas que a banca percebe na hora e custam pouco.

5. **Trocar emojis por ícones de linha** — 😴😐✨ (energia), 🌿⚡💡 (grupos), 🏠💬👤 (tab da
   sugestoes/conclusao). Quebram a estética editorial sofisticada. A `home.html` já usa **Lucide**
   com elegância — padronizar todas as telas no mesmo sistema de ícones eleva muito o acabamento.

6. **Saudação e nome dinâmicos** — a home tem "Boa tarde / Ana" fixos no HTML. Tornar a saudação
   sensível à hora (`getHours()`) e puxar o nome do onboarding (capturar no passo do livro/perfil e
   salvar no `localStorage` via o `book-context.js` que já existe).

7. **Persistir progresso do onboarding** — hoje o `state` vive só em memória; recarregar perde tudo.
   Salvar cada passo no `localStorage`. Numa demo, se algo travar e precisar dar F5, você não recomeça
   do zero.

8. **Microcopy reativo da IA** — após digitar o último livro, a IA poderia ecoar ("Atomic Habits,
   boa — então método te atrai…"). Reforça a percepção de inteligência por trás, que é o pitch.

9. **Validação do campo "último livro"** — o botão libera com `length > 2`, então espaços em branco
   passam. Adicionar `.trim()`.

---

## P2 — Acabamento e acessibilidade (pós-demo)

10. **Acessibilidade básica** — cards de seleção única são `div` com `onclick`: sem foco por teclado,
    sem `role="radio"`, sem `Enter`/`Espaço`. Adicionar `:focus-visible`, navegação por Tab e roles
    ARIA. Revisar contraste do texto `--muted` (#7A8A70) sobre creme — fica no limite do WCAG AA.

11. **Tipografia responsiva com `clamp()`** — hoje telas pequenas usam `transform: scale()` no phone
    inteiro, o que distorce tudo junto. Escalar título/margens com `clamp()` dá um resultado mais limpo.

12. **Transição direcional entre telas** — avançar desliza para a esquerda, voltar para a direita.
    Dá sensação de espaço físico. Hoje todas as `.screen` fazem o mesmo slide.

13. **Capa 3D com mais presença** — o `book-3d` (rotateY) já é ótimo; ganharia com sombra projetada
    no "chão" e leve brilho na lombada.

14. **Capas reais via API** — quando a recomendação vier dinâmica da OpenAI, integrar Google Books /
    Open Library para a capa, em vez de cair sempre no gradiente genérico. (Hoje só os 3 livros locais
    têm `.jpg` em `assets/covers/`.)

---

## P3 — Dívida técnica (não bloqueia demo)

15. **CSS duplicado** — cada HTML repete ~150 linhas idênticas de variáveis e componentes
    (`.phone`, `.card`, `.btn`, `.screen`...). Extrair para o `assets/theme.css` compartilhado
    (hoje praticamente vazio) reduz manutenção e divergências.

16. **Arquivos `-light` duplicados** — existem `home-light.html`, `conclusao-light.html`,
    `onboarding-light.html`, `sugestoes-light.html`. Se o tema é "light-only" (como diz o comentário
    no `theme.css`), são duplicatas que viram dívida — consolidar ou remover.

17. **Arquivos JS possivelmente órfãos** — `assets/socrates.js` é carregado em algum fluxo? Conferir
    se ainda é usado; senão, remover junto com `sugestoes.html`.

18. **Estado de erro real da API** — `conclusao.html` já trata erro caindo em `renderRecs([])`
    (lista vazia silenciosa). Mostrar uma mensagem amigável quando a API falha, em vez de tela vazia.

---

### Sugestão de roteiro para a demo

Fluxo mais sólido e que mostra a IA de verdade:
**onboarding → home → concluir um livro → `conclusao.html` (chat com autor + sugestões via OpenAI)**.

Evitar demonstrar ao vivo: `sugestoes.html` (quebrada) e o botão "Nova recomendação" da home
(`recomendacao.html`, que é estático e não usa IA).
