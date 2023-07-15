function search() {
  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput.value.toLowerCase();
  const searchByTitle = document.getElementById('searchByTitle').checked;

  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  // Lakukan permintaan GET ke API untuk mendapatkan data buku
  fetch('http://localhost:8080/books')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data && data.length > 0) {
        const filteredBooks = data.filter(book => {
          const title = book.title ? book.title.toLowerCase() : '';
          const author = book.author ? book.author.toLowerCase() : '';
          const searchField = searchByTitle ? title : `${title} ${author}`;
          return searchField.includes(searchValue);
        });

        if (filteredBooks.length > 0) {
          const bookTable = document.getElementById('bookTable');
          bookTable.innerHTML = `
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Page</th>
            </tr>
          `;

          filteredBooks.forEach((book, index) => {
            const { title, author, year, page } = book;
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${title}</td>
              <td>${author}</td>
              <td>${year}</td>
              <td>${page}</td>
            `;
            bookTable.appendChild(row);
          });
        } else {
          searchResults.innerHTML = '<p>Tidak ada hasil yang ditemukan</p>';
        }
      } else {
        searchResults.innerHTML = '<p>Data buku tidak tersedia</p>';
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}
