const books = [
    { name: "Noli Me Tangere", price: 295, genre: "Classic" },
    { name: "The Alchemist", price: 599, genre: "Fiction" },
    { name: "The Notebook", price: 450, genre: "Romance" },
    { name: "The 48 Laws of Power", price: 1250, genre: "Non-Fiction" },
    { name: "Smaller and Smaller Circles", price: 375, genre: "Mystery" },
    { name: "Circe", price: 795, genre: "Drama" },
    { name: "It Ends With Us", price: 680, genre: "Romance" },
    { name: "Atomic Habits", price: 820, genre: "Self-Help" },
    { name: "The Great Gatsby", price: 550, genre: "Fiction" },
    { name: "El Filibusterismo", price: 290, genre: "Classic" },
    { name: "Normal People", price: 740, genre: "Drama" },
    { name: "The Little Prince", price: 350, genre: "Fiction" },
    { name: "Crime and Punishment", price: 950, genre: "Classic" },
    { name: "Meditation", price: 600, genre: "Philosophy" },
    { name: "The Silent Patient", price: 700, genre: "Thriller" }
];

function renderAdminBooks() {
    const tableBody = document.getElementById('admin-book-list');
    if (!tableBody) return;

    tableBody.innerHTML = books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.genre}</td>
            <td>P${book.price}.00</td>
            <td>C${Math.floor(book.price * 1.2)}</td>
            <td style="color: #2e7d32;">Unlimited</td>
            <td>
                <div class="action-btns">
                    <button class="btn-edit" onclick="editBook('${book.name}')">Edit</button>
                    <button class="btn-remove" onclick="removeBook('${book.name}')">Remove</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function editBook(name) {
    alert("Editing: " + name);
}

function removeBook(name) {
    if(confirm("Are you sure you want to remove " + name + "?")) {
        alert(name + " removed.");
    }
}

document.addEventListener('DOMContentLoaded', renderAdminBooks);