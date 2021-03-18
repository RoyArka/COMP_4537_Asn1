
//GET
const GET = 'GET';

//GET readquote endpoint
const getEndPoint = 'readQuote';

//Reader GET Request 
readfromDB = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(GET, getEndPoint);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this);
            document.getElementById("results").innerHTML = this.responseText;
        }
    } 
}
