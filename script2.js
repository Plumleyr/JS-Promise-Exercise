document.addEventListener('DOMContentLoaded', function(){
    let getCard = document.getElementById('getCard')
    let cardTable = document.getElementById('cardTable')


    function get(url){
        const request = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            request.onload = () =>{
                if (request.readyState !== 4) return;

                if (request.status >= 200 && request.status < 300){
                    resolve({
                        data: JSON.parse(request.response),
                        status: request.status,
                        request: request
                    });
                } else {
                    reject({
                        msg: 'Server Error',
                        status: response.status,
                        request: request
                    })
                }
            }
            request.onerror = function handleError(){
                reject({
                    msg: 'Network Error'
                })
            };

            request.open('GET', url);
            request.send();
        })
    }

    //part 2

    let deckId = '';

    getCard.addEventListener('submit', function(evt){
        evt.preventDefault()

        if (deckId === ''){
            get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => {
                deckId = res.data.deck_id
                return get(`https://deckofcardsapi.com/api/deck/${deckId}/draw`)
            })
            .then(res => {
                    const div = document.createElement('div');
                    const img = document.createElement('img')
                    div.classList.add('card')
                    img.src = `${res.data.cards[0].image}`
                    div.appendChild(img)
                    cardTable.appendChild(div)
                    div.style.transform = `rotate(${Math.random() * 360}deg)`
            })
            .catch(err => {
                console.log(`Oops, there was a problem :( ${err}`);
              });
        } else {
            get(`https://deckofcardsapi.com/api/deck/${deckId}/draw`)
            .then(res =>{
                const div = document.createElement('div');
                const img = document.createElement('img')
                div.classList.add('card')
                img.src = `${res.data.cards[0].image}`
                div.appendChild(img)
                cardTable.appendChild(div)
                div.style.transform = `rotate(${Math.random() * 360}deg)`
            })
            .catch(err => {
                console.log(`Oops, there was a problem :( ${err}`);
              });
        }
    })
})