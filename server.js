const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jsxEngine = require("jsx-view-engine");

const methodOverride = require('method-override');
//import dotenv module to connect to your env file
const dotenv = require("dotenv");
//data
// const fruits = require('./models/fruits')
const Fruit = require("./models/fruits");
const Vegetable = require("./models/vegetables");

//adding our view templates
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

dotenv.config();
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//near the top, around other app.use() calls
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
//seed route
app.get('/fruits/seed', async(req, res)=>{
    try{
        await Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ])
        res.redirect('/fruits');
     }catch(error){
        console.error(error)
     }
});
//routes INDUCE
//Index route - all the fruits
app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render('fruits/FruitsIndex', {fruits: fruits})
  // });
  try{
    const fruits = await Fruit.find()
    res.render("fruits/FruitsIndex", { fruits: fruits });
  }catch(error){
    console.error(error)
  }
  });

app.get("/vegetables", async(req, res) => {
 try{
    const vegetables = await Vegetable.find()
     res.render("vegetables/VegetablesIndex", { vegetables: vegetables });
 }catch(error){
    console.error(error)
 }
});
//New - get the form to add a new fruit
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

//delet
app.delete('/fruits/:id', async(req, res)=>{
    try{
        await Fruit.findByIdAndRemove(req.params.id)
            res.redirect('/fruits');//redirect back to fruits index
        
    }catch(error){
            console.error(error)
        }
        });

app.delete('/vegetables/:id', async(req, res)=>{
    try{
        await Vegetable.findByIdAndRemove(req.params.id)
        res.redirect('/vegetables')
    }catch(error){
        console.error(error)
    }
})
//update
app.put("/fruits/:id", async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
      } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
      }
      // fruits.push(req.body);
      await Fruit.findByIdAndUpdate(req.params.id, req.body)
        // res.send(createdFruit)
        res.redirect("/fruits");
      //send the user back to /fruits
    } catch (error) {
      console.log(error);
    }
  });

  app.put('/vegetables/:id', async(req, res)=>{
    try{
        if (req.body.readyToEat === "on") {
            req.body.readyToEat = true;
        } else {
            req.body.readyToEat = false;
      }
      await Vegetable.findByIdAndUpdate(req.params.id, req.body)
      res.redirect('/vegetables')

    }catch(error){
        console.log(error)
    }
  })
//creat
app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    // fruits.push(req.body);
    await Fruit.create(req.body)
      // res.send(createdFruit)
      res.redirect("/fruits");
    //send the user back to /fruits
  } catch (error) {
    console.log(error);
  }
});

app.post("/vegetables", async(req, res) => {
    try{
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  await Vegetable.create(req.body);
  res.redirect("/vegetables");
}catch(error){
    console.log(error)
}
});

//EDIT
app.get('/fruits/:id/edit', async(req, res)=>{
    try {
        const foundFruit = await Fruit.findById(req.params.id)
        res.render('fruits/Edit', 
        {fruit: foundFruit})
    } catch(error) {
        console.log(error)
      }
})

app.get('/vegetables/:id/edit', async(req, res)=>{
    try{
        const foundVegetable = await Vegetable.findById(req.params.id)
        res.render('vegetables/Edit', {vegetable: foundVegetable})
    }catch(error){
        console.log(error)
    }
})
//show route
// app.get('/fruits/:indexOfFruitsArray', (req,res)=>{
//     res.send(fruits[req.params.indexOfFruitsArray])
// })
app.get("/fruits/:id", async (req, res)=> {
    try{
     const fruit = await Fruit.findById(req.params.id)
  res.render("fruits/FruitsShow", {
    //second param must be an object
    fruit: fruit //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
}catch(error){
    console.log(error)
}
});

app.get("/vegetables/:id", async(req, res) => {
    try{
  res.render("vegetables/VegetablesShow", { vegetable: vegetable });
    }catch(error){
        console.log(error)
    }
});

// app.get("/vegetables/:indexOfVegetablesArray", (req, res) => {
//   res.render("vegetables/VegetablesShow", {
//     vegetable: vegetables[req.params.indexOfVegetablesArray],
//   });
// });
app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});





// URL	HTTP Verb	Action	Used For	Mongoose Model Function
// /things/	GET	index	Displaying a list of all things	.find
// /things/new	GET	new	Display HTML form for creating a new thing	N/A
// /things	POST	create	Create a new thing	.create
// /things/:id	GET	show	Display a specific thing	.findById
// /things/:id/edit	GET	edit	Return an HTML form for editing a thing	.findById
// /things/:id	PATCH/PUT	update	Update a specific thing	.findByIdAndUpdate
// /things/:id	DELETE	destroy	Delete a specific thing	.findByIdAndDelete