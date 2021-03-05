const search = document.getElementById("input");
const matchList = document.getElementById("match-list");
//const API_KEY = config.apiKey;
const API_KEY = "AIzaSyBFBmCkfIDsxbWqPyfROe19X3Izi-x9LMk";
const inputValue = search.value;
//const inputValue = input.value;
//const API_URL = `https://www.googleapis.com/books/v1/volumes?q="harry potter"key=${API_KEY}`;
//const API_URL = "https://www.googleapis.com/books/v1/volumes?q=search+terms";
const API_URL =
  "https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=40";
//const API_URL = `https://www.googleapis.com/books/v1/volumes?q="${inputValue}"&langRestrict=us&key=${API_KEY}`;

//search books and filter
const searchBooks = async (searchText) => {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);
  const newBooks = data.items.map((book) => {
    //const author = book.volumeInfo.authors;
    const title = book.volumeInfo.title;
    //console.log(title);
    return { title };
  });

  let matches = newBooks.filter((book) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return book.title.match(regex);
  });
  //console.log(matches);

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  showResults(matches);
};

//Show results in HTML
const showResults = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
    <div class="card">
    <h4>${match.title}</h4>
    <div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};
search.addEventListener("input", () => searchBooks(search.value));

