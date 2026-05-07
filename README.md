# Mentor de Evolução — MVP Prototype

Plataforma de leitura com IA que trata cada livro como uma **intervenção no estado interno** do usuário — não como repositório de conteúdo ou e-commerce de livros.

Desenvolvido no contexto da Mentoria Suzana como projeto de produto pessoal.

---

## O Produto

A IA Sócrates conduz um onboarding de 4 perguntas projetivas (energia, afinidade, estado de espírito e ritmo) para recomendar o livro certo no momento certo. Os grupos de leitura são 100% assíncronos, sem encontros com hora marcada. O ritual de conclusão — onde a usuária registra reflexões e a IA responde com significado — é o principal driver de retenção emocional.

**Persona-alvo:** Renata — executiva ou mãe, ~38 anos, alta carga mental, frustrada com recomendações genéricas e clubes do livro tradicionais.

**Canal de MVP:** Telegram (melhor suporte a bots nativos e múltiplas salas por livro).

---

## Arquivos

### Protótipos navegáveis (HTML)

Os três fluxos são arquivos independentes conectados entre si. Abra qualquer um diretamente no navegador — sem servidor necessário.

#### `mentor-evolucao-onboarding.html`
Fluxo 1 — Onboarding com a IA Sócrates.

- Tela de boas-vindas com apresentação do produto
- 4 etapas projetivas: histórico + energia → afinidade de estante → estado de espírito → velocidade de cruzeiro
- Entrega personalizada: nome do livro, grupo de leitura e justificativa empática da recomendação
- 6 combinações de resultado mapeadas (Afinidade × Estado de Espírito)

#### `mentor-evolucao-home.html`
Fluxo 2 — Home + Sala de Leitura.

- Dashboard principal: livro em progresso, streak de leitura, tempo acumulado
- Nudge da IA Sócrates ("Qual página você está?")
- Sala de chat assíncrono do grupo por livro
- Envio de mensagens funcional com resposta automática da IA

#### `mentor-evolucao-conclusao.html`
Fluxo 3 — Conclusão do livro + Próximo ciclo.

- Tela de conquista com animação e stats da jornada (dias, páginas, tempo)
- Campo de reflexão aberto com chips de prompt sugeridos
- Resposta da IA que espelha a reflexão + insight de evolução de perfil
- Toggle para compartilhar reflexão com o grupo
- Recomendação do próximo livro com badge "↑ evolução do perfil"

---

### Variantes de tema claro

Versões alternativas dos três fluxos com fundo claro, para testes de acessibilidade e comparação de experiência.

- `mentor-evolucao-onboarding-light.html`
- `mentor-evolucao-home-light.html`
- `mentor-evolucao-conclusao-light.html`

---

### `mentor-evolucao-apresentacao.html`
Apresentação da demo — 10 slides navegáveis.

Cobre o problema, a persona, a solução, o funcionamento da IA Sócrates, a jornada completa, os fluxos do protótipo, o modelo de negócio e o mapa de incertezas. Os slides do protótipo têm links diretos para os arquivos HTML acima.

**Navegação:** teclas `←` `→`, clique nos pips ou swipe em touch.

| Slide | Conteúdo |
|---|---|
| 01 | Capa |
| 02 | O Problema — Limbo da Leitura Passiva |
| 03 | Persona — Renata |
| 04 | Solução — comparativo com concorrentes |
| 05 | IA Sócrates — as 4 perguntas e saída |
| 06 | Jornada completa — 7 etapas |
| 07 | Demo MVP — links para os 3 fluxos |
| 08 | Modelo de negócio — Freemium |
| 09 | Mapa de incertezas |
| 10 | Próximos passos + CTAs |

---

### `Discovery Ecossistema Inteligência Literária - 06-05-26.md`
Documento de discovery do produto — fonte de verdade do projeto.

Contém o contexto completo, o problema estrutural identificado, os aprendizados da fase de pesquisa, o mapa de incertezas (sabemos / suspeitamos / não sabemos), a hipótese de persona detalhada, o journey map completo das 7 etapas e o racional de cada decisão de design e produto tomada até aqui.

---

## Design System

Todos os arquivos compartilham o mesmo sistema visual:

- **Fundo:** gradiente radial quente escuro (`#0A0806`)
- **Tipografia display:** Cormorant Garamond (literário, editorial)
- **Tipografia de labels:** IBM Plex Mono (typewriter, dados)
- **Tipografia de corpo:** Lato 300
- **Acento:** dourado `#C49A3C` com variantes `#DCBC62` e `#F0D48C`
- **Textura:** grain animado via SVG filter
- **Animações:** reveals por elemento com `animation-delay` em cascata; transições de slide com `translateY + scale`

---

## Como usar

1. Clone o repositório
2. Abra `mentor-evolucao-apresentacao.html` no navegador para ver a apresentação completa
3. A partir do slide 07, clique nos cards para abrir cada fluxo diretamente
4. Ou abra qualquer fluxo HTML individualmente para navegar o protótipo isolado

Não há dependências externas além das Google Fonts (carregadas via CDN). Funciona offline se as fontes já estiverem em cache.

---

## Status — V1

| Entregável | Status |
|---|---|
| Protótipo — Onboarding IA Sócrates | ✅ Concluído |
| Protótipo — Home + Sala de Leitura | ✅ Concluído |
| Protótipo — Conclusão + Próximo ciclo | ✅ Concluído |
| Apresentação da demo | ✅ Concluído |
| Tiers do modelo freemium | ⬜ Pendente |
| Recrutamento da 1ª coorte (Concierge MVP) | ⬜ Pendente |
