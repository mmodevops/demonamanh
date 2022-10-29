const express = require("express");
var router = express.Router();

//connect to mongo db
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://namanh:12345acb@sandbox.yaprtgs.mongodb.net/test";

//insert
router.get("/insert", (req, res) => {
  res.render("insert");
});
router.post("/doInsert", async (req, res) => {

    let inputName = req.body.txtName;
    let inputType = req.body.txtType;
    let inputPrice = req.body.txtPrice;
    let newToy = { name: inputName, type: inputType, price: inputPrice };

    let client = await MongoClient.connect(url);
    let dbo = client.db("shopToyDB");
      res.render("insert", {model : errorModel});
      await dbo.collection("product").insertOne(newToy);
      res.redirect("/");
});

//show all product toys
router.get("/", async function (req, res) {
  let client = await MongoClient.connect(url);
  let dbo = client.db("shopToyDB");
  let result = await dbo.collection("product").find({}).toArray();
  res.render("all_products", { model: result });
});
//delete
router.get("/delete", async (req, res) => {
  let id = req.query.id;
  var ObjectID = require("mongodb").ObjectID;
  let client = await MongoClient.connect(url);
  let dbo = client.db("shopToyDB");
  await dbo.collection("product").deleteOne({ _id: ObjectID(id) });

  // let result = await dbo.collection("product").find({}).toArray();
  // res.render('all_products', {model:result});
  res.redirect("/");
});
//searching
router.post("/search", async (req, res) => {
  let search = req.body.txtSearch;
  let client = await MongoClient.connect(url);
  let dbo = client.db("shopToyDB");
  let result = await dbo
    .collection("product")
    .find({name})
    .toArray();
  res.render("all_products", { model: result });
});

//edit
router.get("/edit", async (req, res) => {
  let id = req.query.id;
  var ObjectID = require("mongodb").ObjectID;

  let client = await MongoClient.connect(url);
  let dbo = client.db("shopToyDB");
  let result = await dbo.collection("product").findOne({ _id: ObjectID(id) });
  res.render("edit", { model: result });
});

//information
router.post("/doEdit", async (req, res) => {
  let id = req.body.id;
  let name = req.body.editName;
  let type = req.body.editType;
  let price = req.body.editPrice;

  let newValue = { $set: { name: name, type: type, price: price } };
  var ObjectID = require("mongodb").ObjectID;
  let condition = { _id: ObjectID(id) };

  let client = await MongoClient.connect(url);
  let dbo = client.db("shopToyDB");
  await dbo.collection("product").updateOne(condition, newValue);
  //
  // let result = await dbo.collection("product").find({}).toArray();
  // res.render('all_products', { model: result });
  res.redirect("/");
});

module.exports = router;
