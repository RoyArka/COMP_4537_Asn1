
let quoteCounter = 0;
const xhttp = new XMLHttpRequest();
const endPointRoot = "/assignment1/express";
const POST = 'POST';
const GET = 'GET';

//Creates quote prompt
createQuote = (myQuote, myAuthor, isAdmin) => {
    let root = document.getElementById("root");

    //check if admin
    if(!isAdmin) {
        textarea.setAttribute("readonly", "true");
    }

    //div creation for quote block
    let div = document.createElement("div");

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

    //update quote button
    let updateQuote = document.createElement("button");
    updateQuote.innerHTML = "Update in DB";
    updateQuote.setAttribute("id", "btnstyle");

    root.appendChild(div);
    root.appendChild(quoteTag)
    root.appendChild(quoteInput);
    root.appendChild(document.createElement("br"));
    root.appendChild(authorTag);
    root.appendChild(authorInput);
    root.appendChild(document.createElement("br"));
    root.appendChild(document.createElement("br"));
    root.appendChild(deleteButton);
    root.appendChild(updateQuote);
    root.appendChild(document.createElement("br"));
    quoteCounter++;
    console.log("Number of Quotes: " + quoteCounter);
}

//admin Post Request 
addQuote = () => {
    for(i = 0; i < quoteCounter; i++){
        let quoteInput = document.getElementById("quoteInput" + i).value
        let authorInput = document.getElementById("authorInput" + i).value
        let data = JSON.stringify({quote: quoteInput, author: authorInput});
        console.log(data);

        xhttp.open(POST, endPointRoot, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(data);
        
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200) {
                document.getElementById("response").innerHTML = this.responseText;
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
            console.log(this);
            document.getElementById("root").innerHTML = this.responseText;
        }
    } 
}
//PUT AJAX Request

//DELETE AJAX Request

