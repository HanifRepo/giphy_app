var offset_number = 0;
var isLoading = false;
var api_key = "You_API_KEY";
function load_giphy(query_name,type){
    if(isLoading === false){
        onLoading();
        const fetchPromise =fetch("https://api.giphy.com/v1/gifs/search?q="+query_name+"&api_key="+api_key+"&limit=25&offset="+offset_number+"");
        isLoading = true ;
        fetchPromise.then(response => {
            return response.json();
        }).then(giphy_object => {
            offset_number += 26;
            display_giphy(giphy_object,type);
        }).catch(err => {
            var giphy_holder = document.getElementById("giphy_holder");
            while (giphy_holder.firstChild) {
                giphy_holder.removeChild(giphy_holder.firstChild);
            }
            offLoading();
            var error_line = document.createElement("div");
            error_line.textContent = "There's seems to be a problem with the Intenet Connection";
            error_line.className = "error_text";
            giphy_holder.appendChild(error_line);
        }).finally(function(){
            isLoading = false ;
        });
    } 
}

function setup_most_popular(){
    offset_number=0;
    load_giphy("most+popular");
}

function search(){
    offset_number = 0;
    var query = document.getElementById("query_engine").value.trim();
    if(query !== ""){
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
        if(type===0){
            var giphy_holder = document.getElementById("giphy_holder");
            while (giphy_holder.firstChild) {
                giphy_holder.removeChild(giphy_holder.firstChild);
            }
        }
    }
    render_image(giphy_object);
    offLoading();
}

function render_image(giphy_object){
    for(let i=0 ; i < giphy_object.data.length ; i++){
        var div = document.createElement("div");
        div.className = "response_holder";
        var img_tag = document.createElement("img");
        img_tag.setAttribute("src",giphy_object.data[i].images.preview_gif.url);
        div.appendChild(img_tag);
        giphy_holder.appendChild(div);
    }
} 

document.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        var query = document.getElementById("query_engine").value.trim();
        if(query !== ""){
            query = query.replace(" ","+");
			offset_number+=26;
			load_giphy(query,1);
        }else{
            offset_number+=26;
            query="most+popular";
            load_giphy(query,1);
        }
    }
};

var input = document.getElementById("query_engine");
input.addEventListener("keyup", function(event) {
    console.log(event.key);
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});

function onLoading() {
    document.getElementById("overlay").style.display = "block";
    document.body.classList.add("stop-scrolling");
}
  
function offLoading() {
    document.getElementById("overlay").style.display = "none";
    document.body.classList.remove("stop-scrolling");
}
