
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("booksGrid");
    if (!grid) return;

    grid.innerHTML = "";

    Object.values(BOOKS).forEach(book => {
        const card = document.createElement("a");
        card.href = `book.html?book=${book.id}`;
        card.className = "book-card";
        card.style.setProperty("--c1", book.color[0]);
        card.style.setProperty("--c2", book.color[1]);
        card.style.setProperty("--accent", book.accent);

        card.innerHTML = `
            <div class="book-cover">
                <span class="book-cover-om">ॐ</span>
                <h3 class="book-cover-title">${book.title}</h3>
                <span class="book-cover-sub">${book.subtitle}</span>
                <div class="book-cover-ornament">✦ ❋ ✦</div>
            </div>
            <div class="book-meta">
                <p class="book-description">${book.description}</p>
                <div class="book-stats">
                    <span>Глав: ${book.chapters.length}</span>
                    <span>Стихов: ${book.verses.toLocaleString("ru-RU")}</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
});