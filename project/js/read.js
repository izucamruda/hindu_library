document.addEventListener("DOMContentLoaded", () => {
    const bookId = getUrlParam("book") || "bgita";
    const chapterNumber = Number(getUrlParam("chapter") || 1);

    const book = getBook(bookId);
    const chapter = getChapter(bookId, chapterNumber);

    if (!book || !chapter) {
        document.querySelector(".reading-content").innerHTML =
            `<p class="error-msg">Глава не найдена. <a href="index.html">На главную</a></p>`;
        return;
    }

    document.title = `${book.title} · Глава ${chapter.number} | Библиотека индуизма`;

    // Заголовки
    document.getElementById("chapterLabel").textContent =
        `${book.title} · Глава ${chapter.number}`;
    document.getElementById("chapterTitle").textContent = chapter.title;

    // Ссылка «К главам»
    const back = document.getElementById("backButton");
    if (back) back.href = `book.html?book=${book.id}`;

    // Заголовок сайдбара
    document.getElementById("sidebarBookTitle").textContent = book.title;
    document.getElementById("sidebarChapterCount").textContent =
        `${book.chapters.length} глав`;

    // Список глав в сайдбаре
    const list = document.getElementById("chapterList");
    list.innerHTML = "";
    book.chapters.forEach(ch => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = "chapter-link" + (ch.number === chapter.number ? " active" : "");
        a.href = `read.html?book=${book.id}&chapter=${ch.number}`;
        a.innerHTML = `
            <span class="chapter-link-num">${String(ch.number).padStart(2, "0")}</span>
            <span class="chapter-link-title">${ch.title}</span>
        `;
        li.appendChild(a);
        list.appendChild(li);
    });

    // Картинка главы (если есть в /images/ bgita-1.jpg — подставим)
    const imgContainer = document.getElementById("imageContainer");
    const imgPath = `images/${book.id}-${chapter.number}.jpg`;
    // Проверим существование через Image
    const testImg = new Image();
    testImg.onload = () => {
        imgContainer.innerHTML =
            `<img src="${imgPath}" alt="${book.title} — глава ${chapter.number}" class="holy-image">`;
    };
    testImg.src = imgPath;

    // Стихи
    const versesContainer = document.getElementById("versesContainer");
    versesContainer.innerHTML = "";

    if (!chapter.verses || chapter.verses.length === 0) {
        versesContainer.innerHTML =
            `<p class="empty-verses">Текст этой главы пока не добавлен. Скоро появится.</p>`;
    } else {
        chapter.verses.forEach(v => {
            const el = document.createElement("div");
            el.className = "verse";

            if (v.speaker) {
                el.classList.add("verse-speaker");
                el.innerHTML = `<span class="verse-speaker-name">${v.speaker}</span>
                                <span class="verse-text">${v.text}</span>`;
            } else {
                el.innerHTML = `
                    ${v.number ? `<span class="verse-number">${v.number}</span>` : ""}
                    <span class="verse-text">${v.text}</span>
                `;
            }
            versesContainer.appendChild(el);
        });
    }

    // Навигация по главам
    const prevBtn = document.getElementById("prevChapter");
    const nextBtn = document.getElementById("nextChapter");
    const sorted = [...book.chapters].sort((a, b) => a.number - b.number);
    const idx = sorted.findIndex(c => c.number === chapter.number);
    const prev = sorted[idx - 1];
    const next = sorted[idx + 1];

    if (prev) {
        prevBtn.onclick = () =>
            (window.location.href = `read.html?book=${book.id}&chapter=${prev.number}`);
    } else {
        prevBtn.disabled = true;
    }

    if (next) {
        nextBtn.onclick = () =>
            (window.location.href = `read.html?book=${book.id}&chapter=${next.number}`);
    } else {
        nextBtn.disabled = true;
    }

    // Прогресс через localStorage
    updateProgress(book, chapter.number);
    markAsRead(book.id, chapter.number);
    updateProgress(book, chapter.number);
});

// --- Прогресс ---

function readKey(bookId) {
    return `hindu-lib-read-${bookId}`;
}

function markAsRead(bookId, chapterNumber) {
    const key = readKey(bookId);
    const read = JSON.parse(localStorage.getItem(key) || "[]");
    if (!read.includes(chapterNumber)) {
        read.push(chapterNumber);
        localStorage.setItem(key, JSON.stringify(read));
    }
}

function updateProgress(book, currentChapter) {
    const key = readKey(book.id);
    const read = JSON.parse(localStorage.getItem(key) || "[]");
    const total = book.chapters.length;
    const percent = total > 0 ? Math.round((read.length / total) * 100) : 0;

    const fill = document.getElementById("progressFill");
    const text = document.getElementById("progressText");
    if (fill) fill.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}% (${read.length} из ${total})`;
}