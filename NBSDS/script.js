const books = [
    { id: 1, name: "Noli Me Tangere", price: 295, genre: "Classic", date: 1887 },
    { id: 2, name: "The Alchemist", price: 599, genre: "Fiction", date: 1988 },
    { id: 3, name: "The Notebook", price: 450, genre: "Romance", date: 1996 },
    { id: 4, name: "The 48 Laws of Power", price: 1250, genre: "Non-Fiction", date: 1998 },
    { id: 5, name: "Smaller and Smaller Circles", price: 375, genre: "Mystery", date: 2002 },
    { id: 6, name: "Circe", price: 795, genre: "Drama", date: 2018 },
    { id: 7, name: "It Ends With Us", price: 680, genre: "Romance", date: 2016 },
    { id: 8, name: "Atomic Habits", price: 820, genre: "Self-Help", date: 2018 },
    { id: 9, name: "The Great Gatsby", price: 550, genre: "Fiction", date: 1925 },
    { id: 10, name: "El Filibusterismo", price: 290, genre: "Classic", date: 1891 },
    { id: 11, name: "Normal People", price: 740, genre: "Drama", date: 2018 },
    { id: 12, name: "The Little Prince", price: 350, genre: "Fiction", date: 1943 },
    { id: 13, name: "Crime and Punishment", price: 950, genre: "Classic", date: 1866 },
    { id: 14, name: "Meditation", price: 600, genre: "Philosophy", date: 180 },
    { id: 15, name: "The Silent Patient", price: 700, genre: "Thriller", date: 2019 }
];

function createCard(book) {
    return `<div class="book-card">
        <div class="img-box"></div>
        <div class="b-genre">${book.genre}</div>
        <div class="b-name">${book.name}</div>
        <div class="b-price">P${book.price}.00</div>
    </div>`;
}

function updatePopular(btn) {
    const grid = document.getElementById('popular-grid');
    if(!grid) return;
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    let shuffled = [...books].sort(() => 0.5 - Math.random());
    grid.innerHTML = shuffled.slice(0, 4).map(b => createCard(b)).join('');
}

function filterLibrary() {
    const grid = document.getElementById('library-grid');
    if(!grid) return;

    let filtered = [...books];
    const search = document.getElementById('search').value.toLowerCase();
    const genre = document.getElementById('genreSelect').value;
    const priceSort = document.getElementById('priceSort').value;
    const dateSort = document.getElementById('dateSort').value;

    if(search) filtered = filtered.filter(b => b.name.toLowerCase().includes(search));
    if(genre !== "ALL GENRE") filtered = filtered.filter(b => b.genre === genre);

    if (priceSort === "MOST EXPENSIVE") filtered.sort((a, b) => b.price - a.price);
    else if (priceSort === "LEAST EXPENSIVE") filtered.sort((a, b) => a.price - b.price);

    if (dateSort === "LATEST") filtered.sort((a, b) => b.date - a.date);
    else if (dateSort === "OLDEST") filtered.sort((a, b) => a.date - b.date);

    grid.innerHTML = filtered.map(b => createCard(b)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const popGrid = document.getElementById('popular-grid');
    if(popGrid) popGrid.innerHTML = books.slice(0, 4).map(b => createCard(b)).join('');
    
    const latGrid = document.getElementById('latest-grid');
    if(latGrid) latGrid.innerHTML = books.sort((a,b) => b.date - a.date).slice(0, 4).map(b => createCard(b)).join('');
    
    filterLibrary();
});