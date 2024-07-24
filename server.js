const express = require('express');
const app = express();
//
// Middleware to parse body to json
app.use(express.json());

const pessoaObj = {
  "apelido": "",
  "nome": "",
  "nascimento": "",
  "stack": []
}

app.get("/pessoas/", (req, res) => {
  res.status(200).send({
    "message": "GET para o termo",
    "data": req.query
  })
})

app.get("/pessoas/:id", (req, res) => {
  res.status(200).send({
    "message": "GET para o id " + req.params,
    "data": req.params
  })
})

app.get("/contagem-pessoas", (req, res) => {
  res.status(200).send({
    "message": "GET para a contagem de pessoas",
    "data": "TODO"
  })
})

app.post("/pessoas", (req, res) => {
  const data = req.body;
  res.status(200).send({
    "message": "success",
    "data": data
  })
})

app.listen(3000, () => {
  console.log("Estou escutando babex");
})
