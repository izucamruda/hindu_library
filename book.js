document.addEventListener("DOMContentLoaded", () => {
    const bookId = getUrlParam("book") || "bgita";
    const book = getBook(bookId);

    if (!book) {
        document.getElementById("bookHeader").innerHTML =
            `<p class="error-msg">Книга не найдена. <a href="index.html">Вернуться на полку</a></p>`;
        document.getElementById("chaptersGrid").innerHTML = "";
        return;
    }

    document.title = `${book.title} | Библиотека индуизма`;

    // Шапка книги
    const header = document.getElementById("bookHeader");
    header.style.setProperty("--c1", book.color[0]);
    header.style.setProperty("--c2", book.color[1]);
    header.style.setProperty("--accent", book.accent);

    header.innerHTML = `
        <div class="book-emblem">
            <span>${book.title.split(" ").map(w => w[0]).join("")}</span>
        </div>
        <div class="book-details">
            <span class="book-subtitle">${book.subtitle}</span>
            <h1 class="book-title">${book.title}</h1>
            <div class="ornament-line"></div>
            <p class="book-description">${book.description}</p>
            <div class="book-stats">
                <span class="stat"><strong>${book.chapters.length}</strong> глав</span>
                <span class="stat"><strong>${book.verses.toLocaleString("ru-RU")}</strong> стихов</span>
            </div>
        </div>
    `;

    // Ссылка «К полке» — на всякий случай ведём на главную
    const back = document.getElementById("backButton");
    if (back) back.href = "index.html";

    // Список глав
    const grid = document.getElementById("chaptersGrid");
    grid.innerHTML = "";

    book.chapters.forEach(ch => {
        const card = document.createElement("a");
        card.className = "chapter-card";
        card.href = `read.html?book=${book.id}&chapter=${ch.number}`;

        card.innerHTML = `
            <span class="chapter-card-number">${String(ch.number).padStart(2, "0")}</span>
            <span class="chapter-card-title">${ch.title}</span>
            <span class="chapter-card-arrow">→</span>
        `;

        grid.appendChild(card);
    });
});