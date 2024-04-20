document.addEventListener('DOMContentLoaded', function(){
    let numberForm = document.getElementById('numberForm')
    let numInput = document.getElementById('numInput')
    let addBtn = document.getElementById('addBtn')
    let numP = document.getElementById('numbers')
    let errorP = document.getElementById('errors')


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

    //part 1

    let numPromises = [];
    let numArray = [];

    addBtn.addEventListener('click', function(){
        if (!isNaN(Number(numInput.value)) && numInput.value !== ''){
            errorP.innerText = '';
            numArray.push(numInput.value)
            numP.innerText = `${numArray}`
            numInput.value = '';
        } else{
            errorP.innerText = `${numInput.value} is not a number`
            numInput.value = '';
        }
    })

    numberForm.addEventListener('submit', function(evt){
        evt.preventDefault()

        for(let i = 0; i < numArray.length; i++){
            numPromises.push(
                get(`http://numbersapi.com/${numArray[i]}?json`)
            );
        }

        numP.innerText = '';
        numArray = [];

        Promise.all(numPromises)
        .then(newArr =>{
            newArr.forEach(n => {
                const p = document.createElement('p');
                p.textContent = n.data.text
                document.body.appendChild(p);
            })
        })
        .catch(err => {
            console.log(`Oops, there was a problem :( ${err}`);
          });
    })
})


