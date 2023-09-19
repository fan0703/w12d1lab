const express = require('express');
const app = express();
const jsxEngine = require('jsx-view-engine')
//data
const fruits = require('./models/fruits')
const vegetables = require('./models/vegetables')
//adding our view templates
app.set('view engine', 'jsx');
  app.engine('jsx', jsxEngine());

  //near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});


//routes INDUCE
//Index route - all the fruits
app.get('/fruits/', (req, res) => {
    // res.send(fruits);
    res.render('fruits/FruitsIndex', {fruits: fruits})
});
//New - get the form to add a new fruit
app.get('/fruits/new', (req, res)=>{
    res.render('fruits/New')
})
//delet
//update
//creat
app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits'); //send the user back to /fruits
});


//show route
// app.get('/fruits/:indexOfFruitsArray', (req,res)=>{
//     res.send(fruits[req.params.indexOfFruitsArray])
// })
app.get('/fruits/:indexOfFruitsArray', function(req, res){
    res.render('fruits/FruitsShow', { //second param must be an object
        fruit: fruits[req.params.indexOfFruitsArray] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
});   

app.get('/vegetables', (req, res)=>{
    res.render('vegetables/VegetablesIndex', {vegetables: vegetables})
})

app.get('/vegetables/:indexOfVegetablesArray', (req,res)=>{
    res.render('vegetables/VegetablesShow', {vegetable: vegetables[req.params.indexOfVegetablesArray]
})
})
app.listen(3000, () => {
    console.log('listening');
});