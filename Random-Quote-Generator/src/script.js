let quote = document.querySelector("#quote");
let author = document.querySelector("#author");
let quoteBtn = document.querySelector("#newQuoteBtn");

async function quotes() {
  quote.textContent = "Fetching a quote for you...";
  author.textContent = "";

  try {
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random",
    );
    const data = await res.json();

    quote.textContent = data.data.content;
    author.textContent = data.data.author;
  } catch (error) {
    console.log(error);
    quote.textContent = "failed to fetch quote";
  }
}

quoteBtn.addEventListener("click", quotes);
