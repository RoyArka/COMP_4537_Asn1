const express = require('express');
const app = express();
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

app.get('/student', (req, res) => {
    res.sendFile(__dirname + '/views/student.html')
});

app.listen(port, () => {
    console.log('Server is listening on ' + port);
});

