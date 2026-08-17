const myLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");

window.addEventListener("load", function () {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);

    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );

    myLibrary.push(book1);
    myLibrary.push(book2);

    render();
  }
}

function submit() {
  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = Number(pagesInput.value);

  if (
    titleValue === "" ||
    authorValue === "" ||
    Number.isNaN(pagesValue) ||
    pagesValue < 1 ||
    !Number.isInteger(pagesValue)
  ) {
    alert("Please enter a positive whole number for pages.");
    return;
  }

  const book = new Book(
    titleValue,
    authorValue,
    pagesValue,
    readCheckbox.checked
  );

  myLibrary.push(book);
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tableBody = document.getElementById("book-list");
  tableBody.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const row = tableBody.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    const readButton = document.createElement("button");
    readButton.className = "btn btn-success";

    const readStatus = myLibrary[i].check ? "Yes" : "No";

    readButton.textContent = readStatus;

    readButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    wasReadCell.appendChild(readButton);

    const deleteButton = document.createElement("button");

    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;

      myLibrary.splice(i, 1);
      render();

      alert(`Deleted: ${deletedTitle}`);
    });

    deleteCell.appendChild(deleteButton);
  }
}
