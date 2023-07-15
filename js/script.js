document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('bookList');

  fetch('http://localhost:8080/books')
  // fetch('https://taufiqalif.github.io/rest-api-books/books')
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data);
      
      if (data && data.length > 0) {
        data.forEach((book, index) => {
          console.log('Current book:', book);
          
          const { id, title, author, year, page } = book;
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td>${year}</td>
            <td>${page}</td>
          `;
          bookList.appendChild(row);
        });
      } else {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">Data buku tidak tersedia</td>';
        bookList.appendChild(row);
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="5">Terjadi kesalahan saat memuat data</td>';
      bookList.appendChild(row);
    });
});
