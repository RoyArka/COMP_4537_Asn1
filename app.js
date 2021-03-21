const express = require('express');
const mysql = require('mysql');
const app = express();

//endpoint for all quotes
const endPointRoot = "/assignment1/v1/quotes";
//endpoint for most recent quote
const endPointQuote = "/assignment1/v1/quotes/1";

//is admin bool
var isAdmin = true;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PORT
let port = process.env.PORT || 3000;

//DB creds
const remoteDB = {
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b957c1b0e65c18',
    password: 'e291c077',
    database: 'heroku_3cc3874d5cd258c'
}

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

app.get('/allquotes', (req, res) => {
    res.sendFile(__dirname + '/views/allreader.html');
});

app.get('/recentquote', (req, res) => {
    res.sendFile(__dirname + '/views/recentreader.html');
});


//Create Connection to DB
const db = mysql.createPool({
    connectionLimit : 10,
    host: remoteDB.host,
    user: remoteDB.user,
    password: remoteDB.password,
    database: remoteDB.database
})

//Handles POST request from admin
app.post(endPointRoot, (req, res) => {
    console.log("recived a POST request");
    let newQuote = req.body.quote
    let newAuthor = req.body.author;
    insertIntoTable(newQuote, newAuthor, res);
    lastRow(res, false);
});

//Handles GET requests from admin, and all quotes
app.get(endPointRoot, (req, res) => {
    if(req.query.isAdmin === "true"){
        isAdmin = true;
        console.log('recieved a GET request from admin')
        readFromTable(res);
    }
    else{
        isAdmin = false;
        console.log('recieved a GET request from reader')
        readFromTable(res);
    }
});

//Handles GET request for most recent quote reader side
app.get(endPointQuote, (req, res) => {
    isAdmin = false;
    console.log('recieved a GET request for recent quote')
    lastRow(res, true);
});

//Handles PUT request from admin
app.put(endPointRoot, (req, res) => {
    console.log("recieved a PUT request from admin")
    let ID = req.body.id;
    let newQuote = req.body.quote
    let newAuthor = req.body.author;
    updateRow(ID, newQuote, newAuthor);
});

//Handles DELETE request from admin
app.delete(endPointRoot, (req, res) => {
    console.log("recieved a DELETE request from admin");
    let id = req.body.id;
    deleteRow(id);
});

//Inserts into table 
insertIntoTable = (quote, author, res) => {
    let query = `INSERT INTO quote_author(quote, author) values ('${quote}', '${author}')`;
    db.query(query, (err, res) => {
        if(err) throw err;
        console.log(res);
    });
}

//Updates row in table
updateRow = (id, quote, author) => {
    let query = 'UPDATE quote_author SET quote = "' + quote + '", author = "' + author + '" WHERE id = ' + id;
    db.query(query, (err, res) => {
        if(err) throw err;
        console.log(res);
    });
}

//Delete row in table
deleteRow = (id) => {
    let query = `DELETE FROM quote_author WHERE id = ` + id;
    db.query(query, (err, res) => {
        if(err) throw err;
        console.log(res);
    });
}

//Reads from table 
readFromTable = (res) => {
    let query = `SELECT * FROM quote_author`;
    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            throw err;
        }
        else if(!isAdmin){
            res.end(formatReaderResult(result));
        }
        else{
           res.json(result);
        }
    });
}

//Selects the last row in table for most recent quote
lastRow = (res, isGet) => {
    let query = `SELECT * FROM quote_author ORDER BY id DESC LIMIT 1`
    db.query(query, (err, result) => {
        if(err){
            throw err;
        }
        if(!isGet){
            res.json(result);
        }
        else{
            res.end(formatReaderResult(result));
        } 
    });
}

//Formats results for reader page
const formatReaderResult = (result) => {
    formattedResult = "<table>"
    formattedResult += "<tr><th>Quote</th> <th>Author</th></tr>";
    result.forEach(row => {
        formattedResult +="<tr>"
        formattedResult += `<td>${row.quote}</td>`;
        formattedResult += `<td>${row.author}</td>`;
        formattedResult +="</tr>"
    })
    formattedResult += "</table>";
    return formattedResult;
}

app.listen(port, () => {
    let msg = "Connected! Waiting for request on "
    console.log(msg + port);
});

