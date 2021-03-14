const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
const historyList = document.getElementById("history-list");
//const historyItem = document.getElementById("history-item");
const searchButton = document.getElementById("search-button");
const clearAllButton = document.getElementById("clear");
const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40`;

//search books and filter
//autocomplete logic
const searchBooks = async (searchText) => {
  const res = await fetch(API_URL);
  const data = await res.json();
  const books = data.items.map((book) => {
    const title = book.volumeInfo.title;
    return { title };
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  let matches = books.filter((book) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return book.title.match(regex);
  });
  showResults(matches);
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

//add search history item
searchButton.addEventListener("click", () => {
  //create a div with a paragraph, a delete button and a time stamp every time a user clicks on the Search button
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
//function that deletes a history item
const deleteHistoryItem = (e) => {
  if (e.target.className === "btn-delete") {
    e.target.parentNode.remove();
  }
};
historyList.addEventListener("click", deleteHistoryItem);

//function that deletes the whole history
const deleteAllHistory = (e) => {
  const items = document.querySelectorAll(".history-item");
  items.forEach((item) => {
    item.remove();
  });
};
clearAllButton.addEventListener("click", deleteAllHistory);
