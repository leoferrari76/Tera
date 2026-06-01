const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});
app.use(express.static(__dirname));

const SOCRATES_PROMPT = `Você é a IA Travez, um mentor literário elegante, provocativo e acessível.

O leitor concluiu o livro '[LIVRO_CONCLUIDO]', de [AUTOR_CONCLUIDO].

A escolha do leitor para a próxima experiência foi: [OPCAO_ESCOLHIDA].

Com base nisso, recomende exatamente 2 livros.

Critérios:
- Se o leitor escolheu mesmo autor, TODOS os livros sugeridos devem obrigatoriamente ser de [AUTOR_CONCLUIDO].
- Na modalidade mesmo autor, NÃO sugira livros de outros autores nesta modalidade. Não pode haver exceção. Não pode misturar autores.
- Se [AUTOR_CONCLUIDO] tiver poucas obras conhecidas, ainda assim sugira apenas obras de [AUTOR_CONCLUIDO].
- Se escolheu estilo ou tema parecido, sugira obras que conversem com alienação, absurdo, burocracia, identidade, solidão ou crítica social.
- Se escolheu experiência completamente nova, sugira livros de outro tom, estilo ou universo literário, mas ainda relevantes para ampliar repertório.

Para cada livro, retorne:
1. Título
2. Autor
3. Por que ler agora
4. Que tipo de experiência o leitor pode esperar
5. Uma frase curta de convite à leitura
6. Texto de busca para Amazon contendo título e autor

Use português do Brasil.
Evite respostas genéricas.
Não invente obras inexistentes.
Retorne somente JSON válido no formato:
{"recommendations":[{"title":"","author":"","reason":"","experience":"","invitation":"","amazonQuery":""}]}`;

const optionLabels = {
  same_author: 'Quero conhecer mais obras do mesmo autor',
  similar_style_or_theme: 'Quero algo parecido em estilo ou tema',
  completely_new: 'Quero uma experiência completamente nova'
};

function normalizeAuthor(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sameAuthorRecommendations(author) {
  const byAuthor = {
    [normalizeAuthor('Franz Kafka')]: [
      ['O Processo', 'Franz Kafka', 'Para continuar no universo kafkiano da culpa sem forma, da lei opaca e da ansiedade social.', 'Uma travessia claustrofóbica por burocracia, acusação e impotência.', 'Entre em um labirinto onde a pergunta pesa mais que a resposta.'],
      ['O Castelo', 'Franz Kafka', 'Para aprofundar a sensação de busca por reconhecimento diante de instituições inalcançáveis.', 'Uma experiência lenta, estranha e hipnótica sobre exclusão e autoridade.', 'Acompanhe alguém que tenta chegar ao centro, mas encontra apenas portas.']
    ],
    [normalizeAuthor('Socorro Acioli')]: [
      ['Oração para Desaparecer', 'Socorro Acioli', 'Para continuar na voz de uma autora que trabalha memória, pertencimento e mistério com delicadeza.', 'Uma experiência sensível, simbólica e atravessada por busca interior.', 'Entre em uma história onde desaparecer também pode ser uma forma de se encontrar.'],
      ['Ela Tem Olhos de Céu', 'Socorro Acioli', 'Para seguir explorando o imaginário popular, o afeto e o encantamento que atravessam a obra da autora.', 'Uma leitura poética, luminosa e delicadamente fantástica.', 'Deixe que o extraordinário apareça no meio da vida comum.'],
      ['A Bailarina Fantasma', 'Socorro Acioli', 'Para permanecer no encontro entre memória, assombro e delicadeza que marca a autora.', 'Uma experiência breve, atmosférica e encantada.', 'Siga uma presença que dança entre mistério e afeto.']
    ],
    [normalizeAuthor('Nir Eyal')]: [
      ['Indistraível', 'Nir Eyal', 'Para aprofundar a relação entre atenção, comportamento e escolhas depois de uma leitura sobre formação de hábitos.', 'Uma experiência prática, direta e voltada à autonomia.', 'Leia para recuperar o controle do que captura sua atenção.'],
      ['Hooked', 'Nir Eyal', 'Para revisitar os mecanismos de produto e comportamento a partir de uma nova camada de aplicação.', 'Uma leitura objetiva, analítica e acionável.', 'Volte ao ciclo do hábito com olhos mais críticos.']
    ]
  };

  return byAuthor[normalizeAuthor(author)] || [
    [`Obra de ${author}`, author, `Para permanecer na voz literária de ${author}, sem deslocar a experiência para outro autor.`, 'Uma continuação focada em reconhecer recorrências, temas e estilo do mesmo percurso autoral.', `Siga com ${author} e observe o que se repete, muda ou aprofunda.`],
    [`Outra obra de ${author}`, author, `Para ampliar a leitura dentro da mesma autoria e manter coerência com a escolha do leitor.`, 'Uma experiência de continuidade autoral, feita para comparar atmosfera, linguagem e inquietações.', `Permaneça no mesmo universo autoral por mais algumas páginas.`]
  ];
}

function fallbackRecommendations(option, completedAuthor = 'Franz Kafka') {
  const common = {
    same_author: sameAuthorRecommendations(completedAuthor),
    similar_style_or_theme: [
      ['O Estrangeiro', 'Albert Camus', 'Para seguir investigando deslocamento, absurdo e a frieza do mundo diante de uma consciência isolada.', 'Uma leitura seca, luminosa e inquietante.', 'Entre em uma narrativa onde sentir pouco também vira condenação.'],
      ['Memórias do Subsolo', 'Fiódor Dostoiévski', 'Para aprofundar a voz de alguém dividido entre lucidez, ressentimento e autossabotagem.', 'Uma experiência intensa, psicológica e desconfortavelmente íntima.', 'Desça alguns degraus na mente de quem não consegue fazer paz consigo.']
    ],
    completely_new: [
      ['A Hora da Estrela', 'Clarice Lispector', 'Para mudar de atmosfera sem abandonar a pergunta sobre invisibilidade e existência.', 'Uma experiência lírica, cortante e profundamente humana.', 'Conheça uma vida pequena apenas para descobrir que nada nela é pequeno.'],
      ['O Velho e o Mar', 'Ernest Hemingway', 'Para sair do confinamento kafkiano e entrar em uma solidão mais aberta, física e simbólica.', 'Uma leitura limpa, marítima e meditativa.', 'Acompanhe uma luta simples que carrega uma dignidade imensa.']
    ]
  };

  return {
    recommendations: (common[option] || common.similar_style_or_theme).slice(0, 2).map(([title, author, reason, experience, invitation]) => ({
      title,
      author,
      reason,
      experience,
      invitation,
      amazonQuery: `${title} ${author}`
    }))
  };
}

function isValidForOption(payload, option, expectedAuthor) {
  const recommendations = payload?.recommendations || [];
  if (recommendations.length !== 2) return false;
  if (option !== 'same_author') return true;
  const expected = normalizeAuthor(expectedAuthor);
  return recommendations.every(item => normalizeAuthor(item.author) === expected);
}

function parseRecommendations(text) {
  const cleaned = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  const parsed = JSON.parse(cleaned);
  if (!Array.isArray(parsed.recommendations)) throw new Error('Invalid recommendation shape');
  return {
    recommendations: parsed.recommendations.slice(0, 2).map(item => ({
      title: String(item.title || '').trim(),
      author: String(item.author || '').trim(),
      reason: String(item.reason || '').trim(),
      experience: String(item.experience || '').trim(),
      invitation: String(item.invitation || '').trim(),
      amazonQuery: String(item.amazonQuery || `${item.title || ''} ${item.author || ''}`).trim()
    })).filter(item => item.title && item.author)
  };
}

app.post('/api/travez/recommendations', async (req, res) => {
  try {
    const option = String(req.body?.option || '');
    if (!optionLabels[option]) {
      return res.status(400).json({ error: 'Opção inválida.' });
    }

    const userContext = {
      completedBook: req.body?.completedBook || 'A Metamorfose',
      completedAuthor: req.body?.completedAuthor || 'Franz Kafka',
      selectedOption: optionLabels[option],
      journeyContext: req.body?.journeyContext || 'Leitor acabou de concluir a obra e busca uma nova experiência literária.'
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'coloque_sua_chave_aqui') {
      return res.json(fallbackRecommendations(option, userContext.completedAuthor));
    }

    const prompt = SOCRATES_PROMPT
      .replaceAll('[LIVRO_CONCLUIDO]', userContext.completedBook)
      .replaceAll('[AUTOR_CONCLUIDO]', userContext.completedAuthor)
      .replace('[OPCAO_ESCOLHIDA]', optionLabels[option]);

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        input: [
          {
            role: 'system',
            content: prompt
          },
          {
            role: 'user',
            content: `Contexto da jornada:\n${JSON.stringify(userContext, null, 2)}\n\nResponda somente em JSON válido no formato: {"recommendations":[{"title":"","author":"","reason":"","experience":"","invitation":"","amazonQuery":""}]}`
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('OpenAI API error:', details);
      return res.status(502).json({ error: 'Falha ao consultar a LLM.' });
    }

    const data = await response.json();
    const text = data.output_text || data.output?.flatMap(item => item.content || []).map(item => item.text || '').join('\n') || '';
    const parsed = parseRecommendations(text);
    if (!isValidForOption(parsed, option, userContext.completedAuthor)) {
      console.warn('LLM returned invalid recommendations for option, using fallback.', {
        option,
        expectedAuthor: userContext.completedAuthor,
        returnedAuthors: parsed.recommendations.map(item => item.author)
      });
      return res.json(fallbackRecommendations(option, userContext.completedAuthor));
    }

    return res.json(parsed);
  } catch (error) {
    console.error(error);
    return res.json(fallbackRecommendations(String(req.body?.option || ''), req.body?.completedAuthor || 'Franz Kafka'));
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'onboarding.html'));
});

app.listen(port, () => {
  console.log(`Mentor Literário disponível em http://localhost:${port}`);
});
