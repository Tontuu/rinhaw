require("express-async-errors");
const express = require('express');
const db = require("./db");
const { v4: uuidv4 } = require('uuid');
const { ErrorHandler, BodyError} = require("./errors");

const app = express();
const router = express.Router();

app.use(express.json());
app.use("/pessoas", router);

// Album brabo esse
const validation = function(req, res, next){
  const { nome, apelido, nascimento, stack } = req.body;
  const nascDate = new Date(nascimento);

  if (!nome) throw new BodyError("nome cannot be null", 422);
  if (!apelido) throw new BodyError("apelido cannot be null", 422);
  if (!nascimento) throw new BodyError("nascimento cannot be null", 422);

  if (typeof nome != "string") throw new BodyError("name must be string", 400);
  if (typeof apelido != "string") throw new BodyError("apelido must be string", 400);
  if (typeof nascimento != "string") throw new BodyError("nascimento must be string", 400);

  if (nome.length > 100)   throw new BodyError("nome shouldn't exceed 100 chars", 400);
  if (apelido.length > 32) throw new BodyError("apelido shouldn't exceed 32 chars", 400);
  if (isNaN(nascDate))     throw new BodyError("nascimento isn't a date", 400);

  if (stack) {
    const isInvalidTech = stack.some((x) => typeof x != "string" || x.length > 32 || x.length == 0);
    if (isInvalidTech) throw new BodyError("stack is unprocessable", 422);
  }

  next();
}

router.post('/', validation, async (req, res, next) => {
  const id = uuidv4();
  res.status(200).send("TODO: efetuar query no module db com os valores do id e do req.body");
})

router.get('/', (req, res) => {
  if (!req.query['t']) {
    res.status(400).end();
  }
  res.send("TODO: search by term");
})

app.get('/contagem-pessoas', (_, res) => {
  db.count().then((result) => {
    const [countResult] = result.rows;
    res.json(countResult).end();
  }).catch(() => {
    res.status(422).end();
  });
});

app.use(ErrorHandler); // Error handler middleware

app.listen(8080, () => {
  console.log(`server.js:${process.pid}: Listening on 8080`);
})
