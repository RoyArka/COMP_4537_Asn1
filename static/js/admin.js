//quote counter
let quoteCounter = 0;

//xhttp request
const xhttp = new XMLHttpRequest();
//endpointroot
const endPointRoot = "/assignment1/v1/quotes";

const POST = 'POST';
const GET = 'GET';
const DELETE = 'DELETE';
const PUT = 'PUT';
let qArray = [];

//Creates quote prompt
createQuote = (myID, myQuote, myAuthor, isAdmin) => {
    let root = document.getElementById("root");

    //check if admin
    if (!isAdmin) {
        textarea.setAttribute("readonly", "true");
    }

    //div creation for quote block
    let div = document.createElement("div");
    div.setAttribute("id", "div" + quoteCounter);

    //Quote title
    let quoteTag = document.createElement("p");
    quoteTag.innerHTML = '<h4>Quote:</h4>';

    //Author title 
    let authorTag = document.createElement("p");
    authorTag.innerHTML = '<h4>Author:</h4>';

    //quote within div
    let quoteInput = document.createElement("textarea");
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute("id", "quoteInput" + quoteCounter);
    quoteInput.value = myQuote;

    //author div
    let authorInput = document.createElement("input");
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute("id", "authorInput" + quoteCounter);
    authorInput.value = myAuthor;

    //delete quote button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Quote";
    deleteButton.setAttribute("id", "deletebtnID"+quoteCounter);

    //update quote button
    let updateQuote = document.createElement("button");
    updateQuote.innerHTML = "Update in DB";
    updateQuote.setAttribute("id", "updatebtnID"+quoteCounter);
    updateQuote.setAttribute("class", "btnstyle");

    root.appendChild(div);
    div.appendChild(quoteTag)
    div.appendChild(quoteInput);
    div.appendChild(document.createElement("br"));
    div.appendChild(authorTag);
    div.appendChild(authorInput);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(deleteButton);
    deleteButton.setAttribute('onclick', 'deleteQuote(' + myID + ',' + quoteCounter + ')');
    div.appendChild(updateQuote);
    updateQuote.setAttribute('onclick', 'adminUpdateinDB(' + myID + ',' + quoteCounter + ')')
    div.appendChild(document.createElement("br"));
    quoteCounter++;
}

//Function that decides post or put
adminUpdateinDB = (id, quoteCounter) => {
    //if id = null then post quote
    if (id === null) {
        postQuote(quoteCounter);
        console.log("called post request from admin");
    }
    //else if id != null then put quote
    else {
        putQuote(id, quoteCounter);
        console.log("called put request from admin");
    }
}

//admin Post Request 
postQuote = (quoteCounter) => {
    let quoteValue = document.getElementById("quoteInput" + quoteCounter).value
    let authorValue = document.getElementById("authorInput" + quoteCounter).value
    console.log(quoteValue);
    console.log(authorValue);
    let data = JSON.stringify({
        quote: quoteValue,
        author: authorValue
    });
    console.log(data);

    xhttp.open(POST, endPointRoot, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(data);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //id from db
            let idDB = 0;
            idDB = JSON.parse(this.response)[0].id;
            console.log(idDB);
            //sets correct ids to both delete and update buttons
            document.getElementById("updatebtnID" + quoteCounter).setAttribute('onclick', 'adminUpdateinDB(' + idDB + ',' + quoteCounter + ')');
            document.getElementById("deletebtnID" + quoteCounter).setAttribute('onclick', 'deleteQuote(' + idDB + ',' + quoteCounter + ')');
        }
    }
    alert("Saved Quote in Database");
}

//admin PUT Request
putQuote = (id, quoteCounter) => {
    console.log(id);
    let quoteValue = document.getElementById("quoteInput" + quoteCounter).value
    let authorValue = document.getElementById("authorInput" + quoteCounter).value
    console.log(quoteValue);
    console.log(authorValue);
    let data = JSON.stringify({
        id: id,
        quote: quoteValue,
        author: authorValue
    });
    console.log(data);
    xhttp.open(PUT, endPointRoot, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(data);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
    alert("Quote Updated in Databse");
}

//admin GET Request
adminfromDB = () => {
    xhttp.open(GET, endPointRoot + "?isAdmin=true", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.response);
            console.log(data);
            qArray = data;
            loadQuotes();
            if (quoteCounter === 0) {
                alert("No quotes in Database")
            }
        }
    }
}

//Load Quotes from DB function
loadQuotes = () => {
    qArray.forEach(element => {
        createQuote(element.id, element.quote, element.author, true);
    });
}

//Delete Quote function
deleteQuote = (id, quoteCounter) => {
    document.getElementById("div" + quoteCounter).remove();
    adminDeletinDb(id);
    alert("Quote Deleted in Database");
}

//admin DELETE Request
adminDeletinDb = (id) => {
    console.log(id);
    xhttp.open(DELETE, endPointRoot, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("id=" + id);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}