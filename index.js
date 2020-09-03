var offset_number = 0;
function load_giphy(query_name,type){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var giphy_object = JSON.parse(this.responseText);
            display_giphy(giphy_object,type);
        }
    };
    xhttp.open("GET", "https://api.giphy.com/v1/gifs/search?q="+query_name+"&api_key=jQJuVoXL04GZ04T2qA9yHPMMgMlwD19a&limit=50&offset="+offset_number+"", true);
    offset_number += 51;
    console.log(offset_number);
    xhttp.send(); 
}

function setup_most_popular(){
    offset_number=0;
    load_giphy("most+popular");
}

function search(){
    offset_number = 0;
    var query = document.getElementById("query_engine").value.trim();
    if(query != ""){
        query = query.replace(" ","+");
        load_giphy(query,0);
    }else{
        query="most+popular";
        load_giphy(query,0);
    }
}

function display_giphy(giphy_object,type){
    var giphy_holder = document.getElementById("giphy_holder")
    if(giphy_object.data.length < 1){
        alert("No -gifs found");
        document.getElementById("query_engine").value='';
    }else{
        if(type==0){
            var giphy_holder = document.getElementById("giphy_holder");
            while (giphy_holder.firstChild) {
                giphy_holder.removeChild(giphy_holder.firstChild);
            }
        }
    }
    for(let i=0 ; i < giphy_object.data.length ; i++){
        var div = document.createElement("div");
        div.className = "response_holder";
        var img_tag = document.createElement("img");
        console.log(giphy_object.data[i]);
        img_tag.setAttribute("src",giphy_object.data[i].images.preview_gif.url);
        div.appendChild(img_tag);
        giphy_holder.appendChild(div);
    }
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        var query = document.getElementById("query_engine").value.trim();
        if(query != ""){
            query = query.replace(" ","+");
            offset_number+=51;
            load_giphy(query,1);
        }else{
            offset_number+=51;
            query="most+popular";
            load_giphy(query,1);
        }
    }
};