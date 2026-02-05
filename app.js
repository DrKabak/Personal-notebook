// Not listesi
let notes = [];

// Notu ekle
document.getElementById("noteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const date = new Date().toLocaleString();

    const note = {
        id: Date.now(),
        title,
        content,
        date,
        favorite: false
    };
    
    notes.push(note);
    document.getElementById("noteForm").reset();
    renderNotes();
});

// Notları görüntüle
function renderNotes() {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    let filteredNotes = notes;

    // Favori filtreleme
    if (document.getElementById("showFavorites").checked) {
        filteredNotes = filteredNotes.filter(note => note.favorite);
    }

    // Arama
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    filteredNotes = filteredNotes.filter(note => 
        note.title.toLowerCase().includes(searchQuery) || 
        note.content.toLowerCase().includes(searchQuery)
    );

    // Notları listele
    filteredNotes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        if (note.favorite) noteDiv.classList.add("favorite");

        noteDiv.innerHTML = `
            <div class="title">${note.title}</div>
            <div>${note.content}</div>
            <small>${note.date}</small>
            <span class="favorite" onclick="toggleFavorite(${note.id})">⭐</span>
            <button onclick="deleteNote(${note.id})">Sil</button>
        `;

        noteList.appendChild(noteDiv);
    });
}

// Notu favoriye ekle/kaldır
function toggleFavorite(id) {
    const note = notes.find(note => note.id === id);
    if (note) {
        note.favorite = !note.favorite;
        renderNotes();
    }
}

// Notu sil
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    renderNotes();
}

// Filtre ve arama işlemlerini takip et
document.getElementById("showFavorites").addEventListener("change", renderNotes);
document.getElementById("searchInput").addEventListener("input", renderNotes);