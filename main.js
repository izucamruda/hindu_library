// Инициализация главной страницы
document.addEventListener('DOMContentLoaded', function() {
    // Ночной режим
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        themeToggle.textContent = document.body.classList.contains('night-mode') 
            ? 'Дневной режим' 
            : 'Ночной режим';
    });
    
    // Переход к книге
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            const bookId = card.dataset.book;
            window.location.href = `book.html?book=${bookId}`;
        });
    });
});