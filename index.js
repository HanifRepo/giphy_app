var offset_number = 0;
var isLoading = false;
var api_key = "jQJuVoXL04GZ04T2qA9yHPMMgMlwD19a";
function loadGiphy(query_name,type){
    if(isLoading === false){
        addLoader();
        isLoading = true ;
        const fetchPromise =fetch("https://api.giphy.com/v1/gifs/searchGiphy?q="+query_name+"&api_key="+api_key+"&limit=25&offset="+offset_number+"");
        fetchPromise.then(response => {
            return response.json();
        }).then(giphy_object => {
            offset_number += 26;
            removeLoader();
            dispGiphy(giphy_object,type);
        }).catch(err => {
            var giphy_holder = document.getElementById("giphy_holder");
            while (giphy_holder.firstChild) {
                giphy_holder.removeChild(giphy_holder.firstChild);
            }
            try {
                removeLoader();
            } catch(err){}
            var error_line = document.createElement("div");
            error_line.textContent = "There's seems to be a problem with the Intenet Connection";
            error_line.className = "error_text";
            giphy_holder.appendChild(error_line);
        }).finally(function(){
            isLoading = false ;
        });
    } 
}

function setupPopular(){
    offset_number=0;
    loadGiphy("most+popular");
}

function searchGiphy(){
    offset_number = 0;
    var query = document.getElementById("query_engine").value.trim();
    if(query !== ""){
        query = query.replace(" ","+");
        loadGiphy(query,0);
    }else{
        query="most+popular";
        loadGiphy(query,0);
    }
}

function dispGiphy(giphy_object,type){
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
    for(let i=0 ; i < giphy_object.data.length ; i++){
        var div = document.createElement("div");
        div.className = "response_holder";
        div.id = "response_holder";
        var img_tag = document.createElement("img");
        img_tag.setAttribute("src",giphy_object.data[i].images.preview_gif.url);
        div.appendChild(img_tag);
        giphy_holder.appendChild(div);   
    }
}

var input = document.getElementById("query_engine");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    searchGiphy();
});

function addLoader() {
    var response_holder = document.getElementById("giphy_holder");
    var loader = document.createElement('div');
    loader.className = "text";
    loader.textContent = "Loading ...";
    response_holder.appendChild(loader);
    var whole__container = document.getElementById("whole__container");
    whole__container.classList.add("stop_scrolling");
}
  
function removeLoader() {
    var response_holder = document.getElementById("giphy_holder");
    response_holder.removeChild(response_holder.lastChild);
    var whole__container = document.getElementById("whole__container");
    whole__container.classList.remove("stop_scrolling");
}

const intersectionObserver = new IntersectionObserver(entries =>{
    if(entries[0].intersectionRatio <= 0){
        return;
    }
    var query = document.getElementById("query_engine").value.trim();
    if(query !== ""){
        query = query.replace(" ","+");
		offset_number+=25;
		loadGiphy(query,1);
    }else{
        offset_number+=25;
        query="most+popular";
        loadGiphy(query,1);
    }
});

var sentinel = document.getElementById("sentinel");
intersectionObserver.observe(sentinel);
