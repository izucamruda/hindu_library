// Данные книг
const books = {
    bgita: {
        title: "Бхагавад Гита",
        subtitle: "Песнь Господа",
        description: "Беседа между Кришной и Арджуной перед началом великой битвы на Курукшетре",
        chapters: 18,
        verses: 700,
        chaptersData: [
            { number: 1, title: "Наблюдение армий" },
            { number: 2, title: "Путь знания" },
            { number: 3, title: "Путь действия" },
            { number: 4, title: "Путь отречения" },
            { number: 5, title: "Истинное отречение" },
            { number: 6, title: "Дхьяна-йога" },
            { number: 7, title: "Познание Абсолюта" },
            { number: 8, title: "Достижение обители" },
            { number: 9, title: "Царственное знание" },
            { number: 10, title: "Божественные проявления" },
            { number: 11, title: "Вселенская форма" },
            { number: 12, title: "Преданное служение" },
            { number: 13, title: "Поле деятельности" },
            { number: 14, title: "Три гуны материи" },
            { number: 15, title: "Высшая личность" },
            { number: 16, title: "Божественные качества" },
            { number: 17, title: "Три вида веры" },
            { number: 18, title: "Совершенное отречение" }
        ]
    },
    upanishads: {
        title: "Упанишады",
        subtitle: "Философские тексты",
        description: "Древние санскритские тексты, содержащие философские концепции индуизма",
        chapters: 14,
        verses: 320,
        chaptersData: [
            { number: 1, title: "Иша" },
            { number: 2, title: "Кена" },
            { number: 3, title: "Катха" },
            { number: 4, title: "Прашна" },
            { number: 5, title: "Мундака" },
            { number: 6, title: "Мандукья" },
            { number: 7, title: "Тайттирия" },
            { number: 8, title: "Айтарея" },
            { number: 9, title: "Чхандогья" },
            { number: 10, title: "Брихадараньяка" },
            { number: 11, title: "Шветашватара" },
            { number: 12, title: "Каушитаки" },
            { number: 13, title: "Майтри" },
            { number: 14, title: "Маханараяна" }
        ]
    },
    ramayana: {
        title: "Рамаяна",
        subtitle: "Эпос о Раме и Сите",
        description: "Древнеиндийский эпос о принце Раме и его путешествии",
        chapters: 7,
        verses: 24000,
        chaptersData: [
            { number: 1, title: "Бала-канда" },
            { number: 2, title: "Айодхья-канда" },
            { number: 3, title: "Аранья-канда" },
            { number: 4, title: "Кишкиндха-канда" },
            { number: 5, title: "Сундара-канда" },
            { number: 6, title: "Юддха-канда" },
            { number: 7, title: "Уттара-канда" }
        ]
    },
    mahabharata: {
        title: "Махабхарата",
        subtitle: "Великий эпос",
        description: "Один из крупнейших эпосов мира о войне Кауравов и Пандавов",
        chapters: 18,
        verses: 100000,
        chaptersData: [
            { number: 1, title: "Ади-парва" },
            { number: 2, title: "Сабха-парва" },
            { number: 3, title: "Араньяка-парва" },
            { number: 4, title: "Вирата-парва" },
            { number: 5, title: "Удьйога-парва" },
            { number: 6, title: "Бхишма-парва" },
            { number: 7, title: "Дрона-парва" },
            { number: 8, title: "Карна-парва" },
            { number: 9, title: "Шалья-парва" },
            { number: 10, title: "Сауптика-парва" },
            { number: 11, title: "Стри-парва" },
            { number: 12, title: "Шанти-парва" },
            { number: 13, title: "Анушасана-парва" },
            { number: 14, title: "Ашвамедхика-парва" },
            { number: 15, title: "Ашрама-парва" },
            { number: 16, title: "Маусала-парва" },
            { number: 17, title: "Махапрастханика-парва" },
            { number: 18, title: "Сварга-парва" }
        ]
    }
};

// Инициализация страницы книги
document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID книги из URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('book');
    const book = books[bookId] || books.bgita;
    
    // Устанавливаем данные книги
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookSubtitle').textContent = book.subtitle;
    document.getElementById('bookDescription').textContent = book.description;
    document.getElementById('chaptersCount').textContent = book.chapters;
    document.getElementById('versesCount').textContent = book.verses.toLocaleString();
    
    // Устанавливаем изображение книги
    const bookImage = document.getElementById('bookImage');
    bookImage.innerHTML = `<h3>${book.title.split(' ').map(w => w[0]).join('')}</h3>`;
    
    // Генерируем список глав
    const chaptersGrid = document.getElementById('chaptersGrid');
    book.chaptersData.forEach(chapter => {
        const chapterCard = document.createElement('div');
        chapterCard.className = 'chapter-card';
        chapterCard.innerHTML = `
            <div class="chapter-number">${chapter.number}</div>
            <div class="chapter-title">${chapter.title}</div>
        `;
        
        // Переход к чтению главы
        chapterCard.addEventListener('click', () => {
            window.location.href = `read.html?book=${bookId}&chapter=${chapter.number}`;
        });
        
        chaptersGrid.appendChild(chapterCard);
    });
    
    // Ночной режим
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        themeToggle.textContent = document.body.classList.contains('night-mode') 
            ? 'Дневной режим' 
            : 'Ночной режим';
    });
    
    // Кнопка "Назад"
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back();
    });
});