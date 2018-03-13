function searchEvent(e) {
    console.log(e.keyCode);

    if (e.keyCode == 13) {
        var searchString = document.getElementById("searchBar").value.toLowerCase();
        console.log(searchString);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var returnedObject = JSON.parse(this.responseText);
                console.log(returnedObject);
                document.getElementById("pics").innerHTML = "";
                returnedObject.ImageKeys.forEach((image) => {
                    console.log(image);
                    document.getElementById("pics").innerHTML += "<div class='img-container'> <div  style='background-image:url('https:\\\\s3.us-east-2.amazonaws.com\\yogen1\\" + image + "')"+" class='img' ></div>";
                });
            }
        };
        xhttp.open("GET", "http://localhost:4000/search/" + searchString, true);
        xhttp.send();
    }
}