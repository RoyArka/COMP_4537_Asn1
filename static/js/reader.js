
//GET
const GET = 'GET';
const xhttp = new XMLHttpRequest();
//endpoint for all quotes
const endPointRoot = "/assignment1/v1/quotes";
//endpoint for most recent quote
const endPointQuote = "/assignment1/v1/quotes/1";

//Reader GET Request for all quotes
readFromDB = () => {
    xhttp.open(GET, endPointRoot + "?isAdmin=false");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this);
            document.getElementById("results").innerHTML = this.responseText;
        }
    } 
}

//Reader GET Request for recent quote
recentFromDB = () => {
    xhttp.open(GET, endPointQuote + "?isAdmin=false");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this);
            document.getElementById("results").innerHTML = this.responseText;
        }
    } 
}


