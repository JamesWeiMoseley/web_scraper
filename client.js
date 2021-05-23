console.log("client side worked");
const url = 'https://web-s-server.herokuapp.com/';


let output_text = document.getElementById("output");
let btn = document.getElementById("submit_button");
let url_box = document.getElementById("url_input");
let api_box = document.getElementById("api_input");
let server = "https://web-s-server.herokuapp.com/";

btn.addEventListener("click", (e) => {
    console.log(url_box.value);
    output_text.textContent = "Loading...";
    // console.log(api_box.value);

    let config = {
    headers: {
        "Content-Type" : "application/json"}, 
    responseType: "text"
    }

    let payload = {
        url_box : url_box.value, 
        api_box : api_box.value
    };

    axios.post(server, payload, config)
    .then(res => {
        output_text.textContent = JSON.stringify(res.data)
    })
    .catch(error => console.error(error));

    e.preventDefault();
});
