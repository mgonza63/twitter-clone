const form = document.querySelector('form');
const spinner = document.querySelector('.spinner');
const API_URL = 'http://localhost:3000/tweets';

const tweetsElement = document.querySelector('.tweets')

spinner.style.display = 'none';

listAllTweets();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    
    const tweet = {
        name,
        content
    };
    form.style.display = 'none';
    spinner.style.display = '';


    // request data from the server
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tweet),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()) // same as the server-side "res.json()"
        .then(createdTweet => {         // so the response is the createdTweet
            console.log(createdTweet);

            // hide spinner, display form and empty values
            spinner.style.display = 'none';
            form.style.display = '';
            form.reset();
        }) 

})

function listAllTweets() {
    // getting the json data from the back-end
    fetch(API_URL)
        .then(response  => response.json())
        .then(tweets => {
            console.log(tweets);
            tweets.forEach(tweet => {
                // header element and set as
                // the name.tweet 
                const div = document.createElement('div');
                const header = document.createElement('h3');
                header.textContent = tweet.name;
                
                // contents element and set as
                // the name.content 
                const contents = document.createElement('p');
                contents.textContent = tweet.content;

                // append header(name) and content to the div
                div.appendChild(header);
                div.appendChild(contents);

                tweetsElement.appendChild(div);
            })
        })
}