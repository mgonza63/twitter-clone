
const form = document.querySelector('form');
const spinner = document.querySelector('.spinner');
const API_URL = 'http://localhost:3000/tweets';


spinner.style.display = 'none';

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