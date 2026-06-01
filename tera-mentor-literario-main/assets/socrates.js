(function () {
  const STORAGE_KEY = 'mentor-travez-context';
  const JOURNEY_CONTEXT = 'Leitor acabou de concluir a obra e busca uma nova experiência literária.';

  const optionLabels = {
    same_author: 'Quero conhecer mais obras do mesmo autor',
    similar_style_or_theme: 'Quero algo parecido em estilo ou tema',
    completely_new: 'Quero uma experiência completamente nova'
  };

  function suggestionsPage() {
    return 'sugestoes.html';
  }

  function defaultContext() {
    const book = window.MentorBookContext?.read?.() || {};
    return {
      completedBook: book.title || 'A Metamorfose',
      completedAuthor: book.author || 'Franz Kafka',
      coverImage: book.coverImage,
      totalPages: book.totalPages,
      journeyContext: JOURNEY_CONTEXT
    };
  }

  function readContext() {
    try {
      return { ...defaultContext(), ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') };
    } catch (error) {
      return defaultContext();
    }
  }

  function writeContext(extra) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...defaultContext(), ...extra }));
  }

  function recommendationsEndpoint() {
    if (window.location.protocol === 'file:') {
      return 'http://localhost:3000/api/travez/recommendations';
    }

    return '/api/travez/recommendations';
  }

  function statusNode() {
    return document.getElementById('travez-status');
  }

  function resultNode() {
    return document.getElementById('travez-results');
  }

  function setStatus(message, isError) {
    const node = statusNode();
    if (!node) return;
    node.textContent = message || '';
    node.classList.toggle('error', Boolean(isError));
    node.hidden = !message;
  }

  function amazonUrl(item) {
    const query = item.amazonQuery || `${item.title || ''} ${item.author || ''}`;
    return `https://www.amazon.com.br/s?k=${encodeURIComponent(query).replace(/%20/g, '+')}`;
  }

  function renderRecommendations(items) {
    const target = resultNode();
    if (!target) return;

    target.innerHTML = '';
    (items || []).slice(0, 2).forEach(item => {
      const card = document.createElement('div');
      card.className = 'travez-rec';
      card.innerHTML = `
        <p class="rec-title"></p>
        <p class="rec-author"></p>
        <p class="rec-label">Por que ler agora</p>
        <p class="rec-text rec-reason"></p>
        <p class="rec-label">Experiência esperada</p>
        <p class="rec-text rec-experience"></p>
        <p class="rec-invite"></p>
        <a class="amazon-link" target="_blank" rel="noopener noreferrer">Comprar na Amazon</a>
      `;
      card.querySelector('.rec-title').textContent = item.title;
      card.querySelector('.rec-author').textContent = item.author;
      card.querySelector('.rec-reason').textContent = item.reason;
      card.querySelector('.rec-experience').textContent = item.experience;
      card.querySelector('.rec-invite').textContent = item.invitation;
      card.querySelector('.amazon-link').href = amazonUrl(item);
      target.appendChild(card);
    });
  }

  function setOptionLoading(selected, loading) {
    document.querySelectorAll('.travez-option').forEach(button => {
      button.disabled = loading;
      button.classList.toggle('selected', button.dataset.option === selected);
    });
  }

  window.startTravezSuggestion = function startTravezSuggestion() {
    writeContext();
    window.location.href = suggestionsPage();
  };

  window.chooseTravezOption = async function chooseTravezOption(option) {
    if (!optionLabels[option]) return;

    const context = readContext();
    writeContext({
      ...context,
      selectedOption: optionLabels[option],
      option
    });

    setOptionLoading(option, true);
    renderRecommendations([]);
    setStatus('Travez está pensando na sua próxima leitura...', false);

    try {
      const response = await fetch(recommendationsEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completedBook: context.completedBook,
          completedAuthor: context.completedAuthor,
          selectedOption: optionLabels[option],
          option,
          journeyContext: context.journeyContext
        })
      });

      if (!response.ok) throw new Error('Recommendation request failed');

      const data = await response.json();
      renderRecommendations(data.recommendations);
      setStatus('', false);
    } catch (error) {
      console.error('Erro ao buscar recomendações da IA Travez:', error);
      setStatus('Não consegui buscar recomendações agora. Tente novamente em instantes.', true);
    } finally {
      setOptionLoading(option, false);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('suggestion-intro');
    if (!intro) return;
    const context = readContext();
    intro.textContent = `Você acabou de atravessar ${context.completedBook}. Agora, Travez pode sugerir uma nova experiência literária a partir do que essa obra deixou em movimento.`;
  });
})();
