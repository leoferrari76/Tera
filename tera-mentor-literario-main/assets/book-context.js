(function () {
  const STORAGE_KEY = 'mentor-completed-book';
  const FALLBACK_BOOK = {
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    totalPages: 178,
    currentPage: 178,
    progress: 100,
    readingDays: 12,
    investedTime: '~4h',
    coverTitle: 'A\nMetamorfose',
    coverColor: 'linear-gradient(135deg,#2C4A3E,#1A3028)',
    coverImage: 'assets/covers/a-metamorfose.jpg',
    status: 'Concluído'
  };

  function normalizeBook(book) {
    return { ...FALLBACK_BOOK, ...(book || {}) };
  }

  window.MentorBookContext = {
    key: STORAGE_KEY,
    fallback: FALLBACK_BOOK,
    save(book) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeBook(book)));
    },
    read() {
      try {
        return normalizeBook(JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'));
      } catch (error) {
        return normalizeBook();
      }
    }
  };
})();
