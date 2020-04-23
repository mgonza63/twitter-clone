const form = document.querySelector('form');
const spinner = document.querySelector('.spinner');
// const API_URL = 'http://localhost:3000/tweets';

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000/tweets' : 'https://tweet-v2.herokuapp.com/tweets';
const tweetsElement = document.querySelector('.tweets')

spinner.style.display = '';

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
            // list tweets again so they appear without refreshing
            listAllTweets();
        }) 

})

function listAllTweets() {
    // blank it out before showing them
    // so the latest tweet shows above
    tweetsElement.innerHTML = '';
    // getting the json data from the back-end
    fetch(API_URL)
        .then(response  => response.json())
        .then(tweets => {
            console.log(tweets);
            tweets.reverse();
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

                const date = document.createElement('small')
                date.textContent = new Date(tweet.created);
                // append header(name) and content to the div
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                tweetsElement.appendChild(div);
            })
            spinner.style.display = 'none';
        })
}