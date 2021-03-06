const search = document.getElementById("input");
const matchList = document.getElementById("match-list");
const historyList = document.getElementById("history-list");
const searchButton = document.getElementById("search-button");
const deleteButton = document.getElementById("btn-delete");
const clearAllButton = document.getElementById("btn-clear");
//const API_KEY = config.apiKey;
const API_URL =
  "https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=40";
//const API_URL = `https://www.googleapis.com/books/v1/volumes?q="${inputValue}"&langRestrict=us&key=${API_KEY}`;

//search books and filter
const searchBooks = async (searchText) => {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);
  const newBooks = data.items.map((book) => {
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

//add search history item
searchButton.addEventListener("click", () => {
  //create a div with a paragraph, a delete button and a time stamp every time a user clicks the Search button
  let input = search.value;
  if (input === "") {
    alert("please add a title");
  } else {
    const newDiv = document.createElement("div");
    newDiv.classList.add("history-item");

    const text = document.createElement("p");
    text.classList.add("history-text");

    const button = document.createElement("button");
    button.classList.add("btn-delete");

    const time = document.createElement("p");
    time.classList.add("history-text");
    let timestamp = new Date().toLocaleString();

    text.innerText = input;
    button.innerHTML = "ⓧ";
    time.innerHTML = timestamp;

    historyList.appendChild(newDiv);
    newDiv.appendChild(text);
    newDiv.appendChild(time);
    newDiv.appendChild(button);
  }

  search.value = "";
});

const deleteItem = (e) => {
  console.log(e.target);
  if (e.target.className === "history-item") {
    e.target.remove();
  }
};
historyList.addEventListener("click", deleteItem);

const clearList = (e) => {
  const items = document.querySelectorAll("history-item");
  items.forEach((item) => {
    item.remove();
  });
  console.log(items);
};

window.onload = function () {
  clearAllButton.addEventListener("click", clearList);
};

//Show results in HTML for search items
const showResults = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
    <h4>${match.title}</h4>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchBooks(search.value));
