import express from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  addQuote,
  getRandomQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to cwissy.rest");
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

app.get("/api/quotes", async (req, res) => {
  console.log(req.query);
  if (req.query.type == "random") {
    res.send(await getRandomQuote());
  } else {
    res.send(await getQuotes());
  }
});

app.post("/api/quotes", async (req, res) => {
  //add to quote (req) to the quotes.json => addQuote()
  // return all quotes (with updated new quote included)
  console.log("post method running");
  console.log(req);
  console.log("req body: " + req.body.quoteText);
  await addQuote(req.body.quoteText);
  console.log(getQuotes());
  res.send(await getQuotes());
});

app.patch("/api/quotes/:id", async (req, res) => {
  await editQuote(req.body.id,req.body.quoteText)
  res.send(await getQuotes())
})

app.delete("/api/quotes/:id", async (req, res) => {

  await deleteQuote(req.body.id)
  res.send(await getQuotes())
})
