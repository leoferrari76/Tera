---
tags:
  - ecossistema-literario
  - discovery
  - journey-map
  - ia-socrates
  - mentoria-suzana
data e hora: 2026-05-06
Area: Projetos Pessoais / Produto
---

## Contexto

Projeto de produto pessoal desenvolvido no contexto da Mentoria Suzana.
Plataforma de leitura com IA que trata a leitura como uma **intervenção no estado interno** do usuário — não como repositório de conteúdo ou e-commerce de livros.

**Desafio de Design (HMW):**
"Como podemos criar uma experiência de leitura ultra-personalizada e coletiva que gere um profundo senso de pertencimento e evolução, indo além da simples retenção de conteúdo?"

---

## Estado inicial — o que sabíamos ao começar

- Problema estrutural: **Limbo da Leitura Passiva** — conhecimento lido, mas não absorvido nem transformado
- Persona-alvo: mulheres executivas e mães (~38 anos), alta carga mental, pouco tempo
- Concorrentes diretos (Goodreads, Skoob, TAG) focam no dado estático ou curadoria rígida por gênero
- Hipótese central: recomendação por **estado interno** (não por gênero ou histórico superficial) gera mais assertividade e engajamento

---

## O que aprendemos

- A IA deve agir como **rede social de leitores**: perguntas leves, sem obrigação de resposta. Ex: *"Qual página você está?"*, *"O que você está achando?"*, *"Quer trocar ideias com alguém?"*
- Grupos de leitura: **assíncronos**, por mensagem. Sem encontros com hora marcada. Funcionam como salas de chat por livro — a usuária entra e sai quando sentir necessidade. 100% IA, sem facilitador humano.
- Aquisição: orgânico, indicação, redes sociais e mídia paga
- Conclusão do livro: usuária registra reflexões → IA responde com significado → sugere próximo livro
- Modelo de negócio: iniciar **freemium**, evoluir para assinatura mensal (tiers a definir)
- Gamificação: validada como **V2** — no V1 o foco é construir confiança e hábito antes de pontos

---

## Mapa de Incertezas

**SABEMOS**
- Problema, persona e diferencial estratégico
- Fluxo de onboarding (4 etapas da IA Sócrates)
- Lógica de match (último livro + afinidade + estado de espírito + velocidade)
- Métricas de sucesso: 70% conclusão da 1ª leitura, pertencimento >8/10
- Canal MVP para grupo: **Telegram** (melhor suporte a bots, grupos e múltiplas salas por livro)

**SUSPEITAMOS**
- Freemium reduz atrito de entrada sem comprometer percepção de valor
- O ritual de conclusão (reflexão + resposta da IA) é o momento de maior retenção emocional
- A gamificação no V2 deve ser ancorada em significado ("seu perfil evoluiu"), não em pontos genéricos

**NÃO SABEMOS**
- Tiers exatos do modelo freemium vs. assinatura
- Frequência ideal de mensagens da IA durante a leitura (sem virar ruído)
- Taxa real de engajamento nas salas de chat assíncronas

**NÃO PODEMOS SABER AINDA**
- Retenção de longo prazo (depende de validação com coorte real)
- Qual canal de aquisição vai converter melhor para essa persona

---

## Persona — Hipótese

**Nome:** Renata (hipótese — baseada no perfil do briefing)
- Executiva ou mãe, ~38 anos, alta carga mental
- Tentou manter hábito de leitura, mas o conhecimento "escorre pelos dedos"
- Frustrada com algoritmos superficiais e clubes do livro com hora marcada
- Busca expansão intelectual, mas precisa que o produto respeite sua energia real
- **Critério de valor:** *sentir que foi entendida antes de receber uma recomendação*
- **Risco de experiência:** qualquer recomendação genérica quebra a confiança no sistema

---

## Journey Map Completo

### Etapa 1 — Descoberta
- **Ação:** Encontra o produto via post, indicação ou anúncio
- **Objetivo:** Entender se isso é diferente do que já tentou
- **Touchpoints:** Instagram, indicação direta, landing page
- **Emoção:** Reconhecimento — *"isso é exatamente o que eu sinto"*
- **Dor:** Ceticismo — *"mais um app que vai durar 2 semanas"*
- **Oportunidade:** O copy precisa nomear a dor antes de vender a solução

### Etapa 2 — Decisão de entrar
- **Ação:** Clica, lê proposta de valor, cria conta
- **Objetivo:** Confirmar que vale o esforço de começar
- **Touchpoints:** Landing page, tela de cadastro
- **Emoção:** Cautelosamente animada
- **Dor:** Atrito de cadastro + medo de mais um formulário inútil
- **Oportunidade:** Freemium elimina barreira financeira; onboarding deve começar com personalidade logo na 1ª pergunta

### Etapa 3 — Onboarding (IA Sócrates) ✅
- **Ação:** Responde 4 perguntas projetivas
- **Objetivo:** Ser entendida de verdade
- **Touchpoints:** Interface conversacional
- **Emoção:** Surpresa positiva — *"como ela sabia?"*
- **Dor:** Medo de responder "errado" e receber recomendação genérica
- **Oportunidade:** O momento "uau" do produto — a entrega da recomendação precisa ter copy preciso e empático
- **Entrega:** Recomendação personalizada + nome do grupo + contexto do porquê

> **Fluxo das 4 etapas:**
> 1. Histórico: último livro lido + nota de energia (0–10)
> 2. Afinidade: qual "estante" me atrai (Vida Real / Futuro & Estratégia / Profundidade)
> 3. Estado de espírito: Modo Bateria Fraca ou Modo Expansão
> 4. Velocidade de cruzeiro: 15 min/dia (Pílulas) ou 30 min+ (Mergulho Profundo)

### Etapa 4 — Ativação (primeiros 3 dias)
- **Ação:** Recebe o livro, entra na sala do grupo, começa a ler
- **Objetivo:** Sentir que faz parte de algo e que a recomendação faz sentido
- **Touchpoints:** Notificação de boas-vindas, primeiro acesso à sala, primeira mensagem da IA
- **Emoção:** Curiosidade + senso de pertencimento nascendo
- **Dor:** Se a sala estiver silenciosa, o momentum quebra
- **Oportunidade:** IA deve fazer a 1ª pergunta nas primeiras 24h — algo leve, sem pressão de resposta

### Etapa 5 — Jornada de leitura
- **Ação:** Sessões diárias, interações esporádicas na sala
- **Objetivo:** Manter ritmo sem culpa, sentir que não está sozinha
- **Touchpoints:** Notificações da IA, sala de chat do livro
- **Emoção:** Fluxo quando engajada / culpa quando perde dias
- **Dor:** Rotina quebra e a plataforma some — sem ninguém perguntando como ela está
- **Oportunidade:** IA como rede social: presença constante, leve, sem cobrar. *"Qual página você está?"*, *"Quer trocar ideia com alguém da sala?"*

### Etapa 6 — Conclusão do livro
- **Ação:** Termina o livro, registra suas considerações
- **Objetivo:** Sentir que a leitura deixou algo real
- **Touchpoints:** Tela de conclusão, campo de reflexão aberto, resposta da IA
- **Emoção:** Realização + leve nostalgia do grupo
- **Dor:** Terminar e não saber o que fazer a seguir — vazio pós-livro
- **Oportunidade:** Ritual de conclusão — IA lê a reflexão e responde com significado antes de sugerir o próximo. É aqui que se mede pertencimento >8. V2: badge, streak, destaque na sala.

### Etapa 7 — Próximo ciclo
- **Ação:** IA sugere próximo livro baseado na jornada completa + novo estado interno
- **Objetivo:** Sentir que evoluiu — e querer continuar
- **Touchpoints:** Tela de nova recomendação, novo grupo
- **Emoção:** Identidade literária se formando — *"sou alguém que lê e cresce"*
- **Dor:** Nova recomendação genérica quebra a confiança no sistema
- **Oportunidade:** IA usa histórico completo para mostrar evolução — *"Da última vez você estava em Bateria Fraca. Agora está em Expansão. Isso muda tudo."*

---

## Decisões tomadas

| Decisão | Por quê |
|---|---|
| Canal MVP = Telegram | Melhor suporte a bots nativos, múltiplas salas por livro, acessível para o perfil da persona |
| Grupos assíncronos, sem encontros marcados | Persona tem rotina intensa — horário fixo seria barreira de retenção |
| Gamificação = V2 | No V1, foco em confiança e hábito. Pontos antes disso podem parecer superficiais para a persona |
| Modelo freemium → assinatura | Reduz atrito de entrada; tiers ainda a definir |
| IA = rede social de leitores | Perguntas leves sem obrigação de resposta — presença sem pressão |

---

## Protótipo HTML — Status

Demo navegável construída em HTML/CSS/JS. 3 fluxos completos e conectados.
**Arquivos em:** `/Users/leonardoferrari/Documents/Meu claude/`

### Fluxo 1 — Onboarding IA Sócrates ✅
`onboarding.html`
- Boas-vindas → 4 passos projetivos → entrega personalizada
- 6 combinações de livro/grupo mapeadas (afin. × estado de espírito)

### Fluxo 2 — Home + Sala de Leitura ✅
`home.html`
- Home: livro em progresso, stats (streak, tempo), nudge da IA, preview da sala
- Sala: chat assíncrono com IA Sócrates + grupo, envio funcional (IA responde automaticamente)

### Fluxo 3 — Conclusão + Próximo ciclo ✅
`conclusao.html`
- Conquista: glow animado, stats da jornada (12 dias · 178 páginas · ~4h)
- Reflexão: chips de prompt + campo aberto
- Resposta da IA: espelha reflexão + insight de perfil + toggle para compartilhar com grupo
- Próximo ciclo: novo livro com badge "↑ evolução do perfil" mostrando progressão

### Design — Passagem visual completa ✅ 2026-05-06
- Background com gradiente radial quente nos 3 arquivos — mais profundidade e atmosfera
- Cards com gradiente sutil em vez de cor plana — mais materiais, menos flat
- Botão principal com gradiente dourado + sombra colorida
- Phone shell com glow externo dourado
- Tipografia com `letter-spacing` negativo nos títulos — estilo mais editorial
- Transições com `cubic-bezier` — movimentos mais naturais
- Livros em perspectiva 3D real (`rotateY`) com hover interativo (Fluxo 1 e 3)
- Barra de progresso com gradiente dourado + dot animado no card do livro (Fluxo 2)
- Dois níveis de glow animado na tela de conquista (Fluxo 3)
- Toggle da reflexão com gradiente dourado quando ativo

---

## Próximos passos

- [x] Protótipo navegável — fluxo de onboarding ✅ 2026-05-06
- [x] Tela de Home / Dashboard ✅ 2026-05-06
- [x] Simulação de sala de leitura ✅ 2026-05-06
- [x] Tela de conclusão + ritual de reflexão ✅ 2026-05-06
- [ ] Definir tiers do modelo freemium vs. assinatura
- [ ] Recrutar 1ª coorte de teste (Concierge MVP)
