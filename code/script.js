
const books = document.getElementsByClassName("book");
const button = document.getElementById("click-button");
const input = document.getElementById("input");

button.addEventListener("click", () => {
  const inputValue = input.value;
  const API_KEY = config.apiKey;
  //const API_KEY = "AIzaSyBFBmCkfIDsxbWqPyfROe19X3Izi-x9LMk";
  const API_URL = `https://www.googleapis.com/books/v1/volumes?q="${inputValue}"&langRestrict=us&key=${API_KEY}`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const newBooks = data.items.map((book) => {
        const author = book.volumeInfo.authors;
        const title = book.volumeInfo.title;
        const description = book.volumeInfo.description;
        //console.log(author, title, description);

        return { author, title, description };
      });
      newBooks.forEach((item, index) => {
        books[index].querySelector(".title").innerText = item.title;
        books[index].querySelector(".author").innerText = item.author;
        books[index].querySelector(".description").innerText = item.description;
      });
    });
  input.value = "";
});
