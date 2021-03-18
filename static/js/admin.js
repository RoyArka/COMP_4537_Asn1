
const root = document.getElementById("root");

//Creates quote prompt
createQuote = (isAdmin) => {

    //check if admin
    if(!isAdmin) {
        textarea.setAttribute("readonly", "true");
    }

    //Quote title
    let quoteTag = document.createElement("p");
    quoteTag.innerHTML = '<h4>Quote:</h4>'

    //Author title 
    let authorTag = document.createElement("p");
    authorTag.innerHTML = '<h4>Author:</h4>'

    //div creation for quote block
    let div = document.createElement("div");

    //quote within div
    let quoteInput = document.createElement("textarea");
    quoteInput.setAttribute('type', 'text');

    //author div
    let authorInput = document.createElement("input");
    authorInput.setAttribute('type', 'text');

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
}