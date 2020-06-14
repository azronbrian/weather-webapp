// client-side javascript

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const time = document.querySelector('#timestamp');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    if (!location) {
        messageOne.textContent = 'you must enter location'
        messageTwo.textContent = ''
        time.textContent = ''
    } else {
        const api = '/weather?address=' + location
        messageOne.textContent = 'loading..'
        messageTwo.textContent = ''
        time.textContent = ''
        fetch(api).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else { 
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast.description
                    time.textContent = data.forecast.time
                }
            })
        })
    }
})