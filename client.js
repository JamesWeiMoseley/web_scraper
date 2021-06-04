console.log("client side worked");

let output_text = document.getElementById("output");
let btn = document.getElementById("submit_button");
let url_box = document.getElementById("url_input");
let api_box = document.getElementById("api_input");
let server = "https://web-s-server.herokuapp.com/";
// let server = "http://localhost:3000/";


function findWhichTextToScrape() {
    var ele = document.getElementsByName("which");
    let text_type = "";
    if(ele[0].checked) {
        text_type = "p";
    } else if (ele[1].checked){
        text_type = "h";
    } else {
        alert("You must check which text to be scraped");
        location.reload();
    }
    return text_type;
}

// will actually send the post to the API
function axiosPost(payload) {
    let config = {
        headers: {
            "Content-Type" : "application/json"}, 
        responseType: "text"
    }

    axios.post(server, payload, config)
    .then(res => {
        output_text.textContent = JSON.stringify(res.data)
    })
    .catch(error => console.error(error));

}

btn.addEventListener("click", (e) => {
    output_text.textContent = "Loading...";
    let text_type = findWhichTextToScrape();

    // setting up the parameters to send 
    let payload = {
        url_box : url_box.value, 
        api_box : api_box.value,
        text_type: text_type
    };

    // alert box to protect api from being overloaded. 
    if(api_box.value==="" || url_box==="") {
        alert("You are missing values...");
        location.reload();
    }

    axiosPost(payload);
    e.preventDefault();
    
});

