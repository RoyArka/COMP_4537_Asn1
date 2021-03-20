
let quoteCounter = 0;
const xhttp = new XMLHttpRequest();
const endPointRoot = "/assignment1/express";
const POST = 'POST';
const GET = 'GET';
const DELETE = 'DELETE';
const PUT = 'PUT';
let qArray = [];

//Creates quote prompt
createQuote = (myID, myQuote, myAuthor, isAdmin) => {
    let root = document.getElementById("root");

    //check if admin
    if(!isAdmin) {
        textarea.setAttribute("readonly", "true");
    }

    //div creation for quote block
    let div = document.createElement("div");
    div.setAttribute("id", "div"+quoteCounter);

    //Quote title
    let quoteTag = document.createElement("p");
    quoteTag.innerHTML = '<h4>Quote:</h4>';

    //Author title 
    let authorTag = document.createElement("p");
    authorTag.innerHTML = '<h4>Author:</h4>';

    //quote within div
    let quoteInput = document.createElement("textarea");
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute("id", "quoteInput"+quoteCounter);
    quoteInput.value = myQuote;

    //author div
    let authorInput = document.createElement("input");
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute("id", "authorInput"+quoteCounter);
    authorInput.value = myAuthor;

    //delete quote button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Quote";

    //update quote button
    let updateQuote = document.createElement("button");
    updateQuote.innerHTML = "Update in DB";
    updateQuote.setAttribute("id", "btnstyle");

    root.appendChild(div);
    div.appendChild(quoteTag)
    div.appendChild(quoteInput);
    div.appendChild(document.createElement("br"));
    div.appendChild(authorTag);
    div.appendChild(authorInput);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(deleteButton);
    deleteButton.setAttribute('onclick', 'deleteQuote('+myID+','+quoteCounter+')');
    div.appendChild(updateQuote);
    updateQuote.setAttribute('onclick', 'adminUpdateinDB('+myID+','+quoteCounter+')')
    div.appendChild(document.createElement("br"));
    quoteCounter++;
}

//admin Post Request 
addQuote = () => {
    for(i = 0; i < quoteCounter; i++){
        let quoteValue = document.getElementById("quoteInput" + i).value
        let authorValue = document.getElementById("authorInput" + i).value
        console.log(quoteValue);
        console.log(authorValue);
        let data = JSON.stringify({quote: quoteValue, author: authorValue});
        console.log(data);

        xhttp.open(POST, endPointRoot);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(data);
        
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        }
    }
}

//admin GET Request
adminfromDB = () => {
    xhttp.open(GET, endPointRoot + "?isAdmin=true");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            let data = JSON.parse(this.response);
            console.log(data);
            qArray = data;
            loadQuotes();
        }
    } 
}

//Load Quotes function
loadQuotes = () => {
    qArray.forEach(element => {
        createQuote(element.id, element.quote, element.author, true);
    });
}

//Delete Quote function
deleteQuote = (id, quoteCounter) => {
    document.getElementById("div"+quoteCounter).remove();
    adminDeletinDb(id);
}

//admin DELETE Request
adminDeletinDb = (id) => {
    console.log(id);
    xhttp.open(DELETE, endPointRoot);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("id="+id); 
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
        }
    }
}

//admin PUT Request
adminUpdateinDB = (id, quoteCounter) => {
    console.log(id);
    let quoteValue = document.getElementById("quoteInput" + quoteCounter).value
    let authorValue = document.getElementById("authorInput" + quoteCounter).value
    console.log(quoteValue);
    console.log(authorValue);
    let data = JSON.stringify({id: id, quote: quoteValue, author: authorValue});
    console.log(data);
    xhttp.open(PUT, endPointRoot);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(data);
}