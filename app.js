const express = require('express');
const app = express();
let mysql = require('mysql');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//DB creds
const remoteDB = {
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b957c1b0e65c18',
    password: 'e291c077',
    database: 'heroku_3cc3874d5cd258c'
}


//PORT
let port = 8888 || process.env.PORT;

//Routing for js and css
app.use(express.static('static'));
app.use('/css', express.static(__dirname + 'static/css'));
app.use('/js', express.static(__dirname + 'static/js'));

//Routing for pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/admin.html')
});

app.get('/reader', (req, res) => {
    res.sendFile(__dirname + '/views/reader.html')
});

//Create Connection to DB
const db = mysql.createPool({
    connectionLimit : 10,
    host: remoteDB.host,
    user: remoteDB.user,
    password: remoteDB.password,
    database: remoteDB.database
})

//Handles POST request
app.post('/addQuote', (req, res) => {
    console.log("recived a POST request");
    console.log(req.body);
    console.log(req.body.quote);
    console.log(req.body.author);
    insertIntoTable(req.body.quote, req.body.author, res);
});

//Handles GET request from reader
app.get('/readQuote', (req, res) => {
    console.log('recieved a GET request')
    readFromTable(res, false);
})

//Inserts into table 
insertIntoTable = (quote, author, res) => {
    let query = `INSERT INTO quote_author(quote, author) values ('${quote}', '${author}')`;
    db.query(query, (err, res) => {
        if(err) throw err;
        console.log(res);
    });
}

//Reads from table 
readFromTable = (res, isAdmin) => {
    let query = `SELECT * FROM quote_author`;
    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            throw err;
        } 
        else{
            console.log("HERE is the result " + result);
            res.end(readerResult(result));
        }
    });
}

//Formats results for reader page
const formatResult = (result) => {
    formattedResult = "<table>"
    formattedResult += "<tr> <th>Quote</th> <th>author</th> </tr>";
    result.forEach(row => {
        formattedResult +="<tr>"
        formattedResult += `<td>'${row.quote}'</td>`;
        formattedResult += `<td>'${row.author}'</td>`;
        formattedResult +="</tr>"
    })
    formattedResult += "</table>";
    return formattedResult;
}

app.listen(port, () => {
    let msg = "Connected! Waiting for request on "
    console.log(msg + port);
});

