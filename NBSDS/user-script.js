const books = [
    { id: 1, name: "Noli Me Tangere", price: 295, genre: "Classic", date: 1887, image: "book1.jpg" },
    { id: 2, name: "The Alchemist", price: 599, genre: "Fiction", date: 1988, image: "book2.jpg" },
    { id: 3, name: "The Notebook", price: 450, genre: "Romance", date: 1996, image: "book3.jpg" },
    { id: 4, name: "The 48 Laws of Power", price: 1250, genre: "Non-Fiction", date: 1998, image: "book4.jpg" },
    { id: 5, name: "Smaller and Smaller Circles", price: 375, genre: "Mystery", date: 2002, image: "book5.jpg" },
    { id: 6, name: "Circe", price: 795, genre: "Drama", date: 2018, image: "book6.jpg" },
    { id: 7, name: "It Ends With Us", price: 680, genre: "Romance", date: 2016, image: "book7.jpg" },
    { id: 8, name: "Atomic Habits", price: 820, genre: "Self-Help", date: 2018, image: "book8.jpg" },
    { id: 9, name: "The Great Gatsby", price: 550, genre: "Fiction", date: 1925, image: "book9.jpg" },
    { id: 10, name: "El Filibusterismo", price: 290, genre: "Classic", date: 1891, image: "book10.jpg" },
    { id: 11, name: "Normal People", price: 740, genre: "Drama", date: 2018, image: "book11.jpg" },
    { id: 12, name: "The Little Prince", price: 350, genre: "Fiction", date: 1943, image: "book12.jpg" },
    { id: 13, name: "Crime and Punishment", price: 950, genre: "Classic", date: 1866, image: "book13.jpg" },
    { id: 14, name: "Meditation", price: 600, genre: "Philosophy", date: 180, image: "book14.jpg" },
    { id: 15, name: "The Silent Patient", price: 700, genre: "Thriller", date: 2019, image: "book15.jpg" }
];

function getCoins() { return parseInt(localStorage.getItem("userCoins")) || 0; }
function getOwned() { return JSON.parse(localStorage.getItem("ownedBooks")) || []; }

function createUserCard(book) {
    const owned = getOwned();
    const isBought = owned.includes(book.id);
    return `
    <div class="book-card">
        <div class="img-box" style="height: 220px; width: 100%; margin: 0 0 15px 0;" onclick="location.href='dash-book-profile.html?id=${book.id}'">
            <img src="${book.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='IMAGE'">
        </div>
        <div class="b-genre" style="text-align: center;">${book.genre}</div>
        <div class="b-name" style="text-align: center;">${book.name}</div>
        <div class="b-price" style="text-align: center;">P${book.price}.00</div>
        
        <button class="btn-yellow" onclick="orderPhysical(${book.id})">ORDER PHYSICAL COPY</button>
        <button class="btn-white" onclick="location.href='dash-book-profile.html?id=${book.id}'">
            ${isBought ? 'VIEW EBOOK' : 'BUY EBOOK'}
        </button>
    </div>`;
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
    const ownedFilter = document.getElementById('ownedFilter').value;
    const owned = getOwned();

    if(search) filtered = filtered.filter(b => b.name.toLowerCase().includes(search));
    if(genre !== "ALL GENRE") filtered = filtered.filter(b => b.genre === genre);
    if(ownedFilter === "OWNED") filtered = filtered.filter(b => owned.includes(b.id));
    if(ownedFilter === "NOT OWNED") filtered = filtered.filter(b => !owned.includes(b.id));

    if (priceSort === "MOST EXPENSIVE") filtered.sort((a, b) => b.price - a.price);
    else if (priceSort === "LEAST EXPENSIVE") filtered.sort((a, b) => a.price - b.price);

    if (dateSort === "LATEST") filtered.sort((a, b) => b.date - a.date);
    else if (dateSort === "OLDEST") filtered.sort((a, b) => a.date - b.date);

    grid.innerHTML = filtered.map(b => createUserCard(b)).join('');
}

function addCoins(amount) {
    let current = getCoins();
    localStorage.setItem("userCoins", current + amount);
    alert("Successfully added " + amount + " coins!");
    location.reload();
}

function buyBook(id, price) {
    let coins = getCoins();
    let owned = getOwned();
    if (coins >= price) {
        localStorage.setItem("userCoins", coins - price);
        owned.push(id);
        localStorage.setItem("ownedBooks", JSON.stringify(owned));
        location.reload(); 
    } else { alert("Insufficient Coins!"); }
}

function orderPhysical(id) {
    const book = books.find(b => b.id === id);
    localStorage.setItem("pendingOrder", JSON.stringify(book));
    window.location.href = "dash-order.html";
}

function openPreview() {
    document.getElementById('previewModal').style.display = "block";
}

function closePreview() {
    document.getElementById('previewModal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target == modal) modal.style.display = "none";
}

function loadOrderPage() {
    const orderContainer = document.getElementById('order-item-row');
    const totalDisplay = document.getElementById('total-payment');
    const orderData = JSON.parse(localStorage.getItem("pendingOrder"));
    if (!orderData) return;
    if (orderContainer) {
        orderContainer.innerHTML = `
            <div style="width:100px; height:130px; border:2px solid #000;">
                <img src="${orderData.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='IMG'">
            </div>
            <div style="flex-grow:1; font-weight:900; font-size:20px; text-transform:uppercase; margin-left:20px;">${orderData.name}</div>
            <div style="display:flex; align-items:center; gap:40px; font-weight:900;">
                <span>P${orderData.price} ×1</span>
                <span style="cursor:pointer;" onclick="localStorage.removeItem('pendingOrder'); location.reload();">X</span>
            </div>`;
    }
    if (totalDisplay) totalDisplay.innerText = `P${(orderData.price + 50).toLocaleString()}.00`;
}

function processPlaceOrder() {
    if (!localStorage.getItem("pendingOrder")) { alert("No book selected!"); return; }
    window.location.href = "dash-order-details.html";
}

function logout() { window.location.href = "index.html"; }

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('library-grid')) filterLibrary();
    if (window.location.pathname.includes('dash-order.html')) loadOrderPage();
    const coinDisplay = document.getElementById('coinCount');
    if(coinDisplay) coinDisplay.innerText = `C:${getCoins()}`;
});