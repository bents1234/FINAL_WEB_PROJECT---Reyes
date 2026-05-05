const books = [
    { id: 1, name: "Noli Me Tangere", price: 295, genre: "Classic", date: 1887, img: "book1.jpg" },
    { id: 2, name: "The Alchemist", price: 599, genre: "Fiction", date: 1988, img: "book2.jpg" },
    { id: 3, name: "The Notebook", price: 450, genre: "Romance", date: 1996, img: "book3.jpg" },
    { id: 4, name: "The 48 Laws of Power", price: 1250, genre: "Non-Fiction", date: 1998, img: "book4.jpg" },
    { id: 5, name: "Smaller and Smaller Circles", price: 375, genre: "Mystery", date: 2002, img: "book5.jpg" },
    { id: 6, name: "Circe", price: 795, genre: "Drama", date: 2018, img: "book6.jpg" },
    { id: 7, name: "It Ends With Us", price: 680, genre: "Romance", date: 2016, img: "book7.jpg" },
    { id: 8, name: "Atomic Habits", price: 820, genre: "Self-Help", date: 2018, img: "book8.jpg" },
    { id: 9, name: "The Great Gatsby", price: 550, genre: "Fiction", date: 1925, img: "book9.jpg" },
    { id: 10, name: "El Filibusterismo", price: 290, genre: "Classic", date: 1891, img: "book10.jpg" },
    { id: 11, name: "Normal People", price: 740, genre: "Drama", date: 2018, img: "book11.jpg" },
    { id: 12, name: "The Little Prince", price: 350, genre: "Fiction", date: 1943, img: "book12.jpg" },
    { id: 13, name: "Crime and Punishment", price: 950, genre: "Classic", date: 1866, img: "book13.jpg" },
    { id: 14, name: "Meditation", price: 600, genre: "Philosophy", date: 180, img: "book14.jpg" },
    { id: 15, name: "The Silent Patient", price: 700, genre: "Thriller", date: 2019, img: "book15.jpg" }
];

function showTerms() {
    document.getElementById('termsModal').style.display = 'block';
}

function hideTerms() {
    document.getElementById('termsModal').style.display = 'none';
}

function createCard(book) {
    return `
    <div class="book-card" onclick="requireLogin(event)">
        <div class="img-box">
            <img src="${book.img}" alt="${book.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='IMAGE'">
        </div>
        <div class="b-genre" style="text-align: center;">${book.genre}</div>
        <div class="b-name" style="text-align: center;">${book.name}</div>
        <div class="b-price" style="text-align: center;">P${book.price}.00</div>
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
    
    grid.className = "book-grid-5";

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

function requireLogin(event) {
    if (event) event.preventDefault();
    alert("You need to login to use this feature!");
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const popGrid = document.getElementById('popular-grid');
    if(popGrid) popGrid.innerHTML = books.slice(0, 4).map(b => createCard(b)).join('');
    
    const latGrid = document.getElementById('latest-grid');
    if(latGrid) latGrid.innerHTML = [...books].sort((a,b) => b.date - a.date).slice(0, 4).map(b => createCard(b)).join('');
    
    const restrictedLinks = document.querySelectorAll('.restricted');
    restrictedLinks.forEach(link => {
        link.addEventListener('click', requireLogin);
    });

    if (document.getElementById('library-grid')) filterLibrary();
});