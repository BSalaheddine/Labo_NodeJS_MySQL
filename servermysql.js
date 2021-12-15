const { request } = require('express');
let express = require('express');

let msg;

let app = express();

var mysql = require("mysql");

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'todo_database'
});
connection.connect(function(error) {if (error) console.log(error);});

app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    //response.send('Hello World !');
    connection.query("select * from liste;", function(error, result) {
        if (error) console(error);
        else{
            response.render('liste.ejs', {todot: result, msg: msg});
        }
    });
});

app.post('/', (request, response) => {
    if(request.body.tache == ''){
        msg = 'Complétez la tâche';
    }
    else{
        msg = 'Ajout réussi';
        let tache = {"tache":request.body.tache};
    connection.query("INSERT INTO liste SET ?", tache, function(err, result) {
        if (err) console.log(err);
        
    })
    }
    response.redirect('/');
});

app.get('/delete/:del', (request, response) => {
    let elem = request.params.del;
    console.log(elem);
    connection.query("DELETE FROM liste WHERE id = ?", elem, function(err, result) {
        if (err) console.log(err);
        else{
            response.redirect('/');
        }
})
});
app.use(express.static('public'));

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});