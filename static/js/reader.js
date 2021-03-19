
//GET
const GET = 'GET';
const xhttp = new XMLHttpRequest();
const endPointRoot = "/assignment1/express";

//Reader GET Request 
readfromDB = () => {
    xhttp.open(GET, endPointRoot + "?isAdmin=false");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this);
            document.getElementById("results").innerHTML = this.responseText;
        }
    } 
}

