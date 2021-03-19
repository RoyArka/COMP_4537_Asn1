const express = require('express');
const mysql = require('mysql');
const app = express();

const endPointRoot = "/assignment1/express"

//is admin bool
var isAdmin = true;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PORT
let port = 8888 || process.env.PORT;

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

//Create Connection to DB
const db = mysql.createPool({
    connectionLimit : 10,
    host: remoteDB.host,
    user: remoteDB.user,
    password: remoteDB.password,
    database: remoteDB.database
})

//Handles POST request
app.post(endPointRoot, (req, res) => {
    console.log("recived a POST request");
    console.log(req.body);
    console.log(req.body.quote);
    console.log(req.body.author);
    insertIntoTable(req.body.quote, req.body.author, res);
});

//Handles GET request from reader
app.get(endPointRoot, (req, res) => {
    
    if(req.query.isAdmin === "true"){
        console.log('recieved a GET request from admin')
        readFromTable(res);
    }
    else{
        isAdmin = false;
        console.log('recieved a GET request from reader')
        readFromTable(res);
    }
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
           res.end(formatAdminResult(result));
        }
    });
}

//Formats results for reader page
const formatReaderResult = (result) => {
    formattedResult = "<table>"
    formattedResult += "<tr> <th>Quotes</th> <th>Authors</th> </tr>";
    result.forEach(row => {
        formattedResult +="<tr>"
        formattedResult += `<td>'${row.quote}'</td>`;
        formattedResult += `<td>'${row.author}'</td>`;
        formattedResult +="</tr>"
    })
    formattedResult += "</table>";
    return formattedResult;
}

//Formats results for admin page
const formatAdminResult = (result) => {
    formattedResult = "<table>"
    formattedResult += "<tr> <th>Quotes</th> <th>Authors</th> </tr>";
    result.forEach(row => {
        formattedResult += `<td>'${row.quote}'</td>`;
        formattedResult += `<td>'${row.author}'</td>`;
    })
    formattedResult += "</table>";
    return formattedResult;
}

app.listen(port, () => {
    let msg = "Connected! Waiting for request on "
    console.log(msg + port);
});

