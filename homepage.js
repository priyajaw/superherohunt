// http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2455ec6af1960cb47d8ca4e4cbd8c21d
// &hash=93f481289571cc8dc9ac2c1e6f143c28

// 2455ec6af1960cb47d8ca4e4cbd8c21d  pub
// f8b6a956dccc9470a0471106488f4edf860adca9 prv

// 1f8b6a956dccc9470a0471106488f4edf860adca92455ec6af1960cb47d8ca4e4cbd8c21d



const api_url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=2455ec6af1960cb47d8ca4e4cbd8c21d&hash=93f481289571cc8dc9ac2c1e6f143c28";
async function getdata(api_url) {
    
    const response = await fetch(api_url);
    var data = await response.json();
    if (response) {
        hideloader();
    }

    show(data.data.results);
    isFavorite();
}

getdata(api_url);

function hideloader() {
    document.getElementById('loading').style.display = 'none';

}

const localst = new Localst();


function show(data) {

    let list = document.getElementById('list');
    console.log(data);
    list.innerHTML = '';
    for (let ch of data) {
        console.log(ch);
        list.innerHTML += `


        <div class="col-md-4">
        <div class="card" id="cardch"style="width: 18rem;">
       
                        <img src="${ch.thumbnail.path}/portrait_fantastic.${ch.thumbnail.extension}"  class="card-img-top" alt="...">
                        <div class="card-body d-flex justify-content-between align-items-center">
              <a href="more-info.html?id=${ch.id}">
                            <p class="card-text">
                            ${ch.name
            }</p></a>

<a href=""  onclick="handleClick(event,this)" class="">            <i class="fa-regular fa-heart favorite-btn" style="color: #ec3232;" data-id="${ch.id}"></i>
</a>                           
                        </div>
                    </div>
                    
                </div>

        
        `;

    }
}


// async function get(event,a) {
//     event.preventDefault();
//     const response = await fetch(api_url);
//     var data = await response.json();

//     let ans = data.data.results;

//     console.log(a.id);
//     let piddata =ans.filter(pdata=>pdata.id == a.id);

//   document.getElementById('#par')




// }

// async function handleClick(a,event) {
//     event.preventDefault();
//         const response = await fetch(api_url);
//     var data = await response.json();

//     let ans = data.data.results;
//     console.log(data);

//     let piddata = ans.filter(pdata => pdata.id == a.id);

//     console.log('kk',piddata);

// }


function handleClick(e, clickedElement) {
    e.preventDefault();
    // console.log("Event object:", e);
    // console.log("Clicked element:", clickedElement);
    if (e.target.classList.contains('favorite-btn')) {
        // console.log('yes');

        if (e.target.classList.contains('fa-regular')) {
            e.target.classList.remove('fa-regular');
            e.target.classList.add('fa-solid');

            localst.removeFromDB(e.target.dataset.id);

        }
        else {
            e.target.classList.remove('fa-solid');
            e.target.classList.add('fa-regular');


        }
        const charch = e.target.parentElement.parentElement.parentElement;

        const charinfo = {
            id: e.target.dataset.id,
            name: charch.querySelector('.card-text').textContent,
            image: charch.querySelector('.card-img-top').src

        }
        console.log(e.target.parentElement.parentElement.parentElement);
        localst.saveIntoDB(charinfo);

    }
}



// const favorite = document.querySelector('#favorites');
// const img = document.querySelector('.img-fluid');
// const text = document.querySelector('.card-text');
// if (favorite) {
//     const ch = localst.getFromDB();

//     ch.forEach(c => {
//         favorite.innerHTML += `
//                <div class="col-md-12" >
//                         <div class="row g-0">
//                             <div class="col-md-2">
//                                 <img src="${c.image}" class="img-fluid"
//                                     alt="...">
//                             </div>
//                             <div class="col-md-8">
//                                 <div class="card-body">
//                                     <h5 class="card-title"></h5>
//                                     <h5>Series</h5>

//                                     <p class="card-text">${c.text}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         </div>

//         `;



// })
// }

function isFavorite() {
    const character = localst.getFromDB();
    character.forEach(ch => {
        let { id } = ch;



        let favid = document.querySelector(`[data-id="${id}"]`);
        // let favbtn = document.querySelector('.favorite-button');
        if (favid) {
            console.log(favid);
            // if (favid.children[0].classList.contains('fa-regular')){

            // }
            favid.classList.remove('fa-regular');

            favid.classList.add('fa-solid');

        }
    })
}


async function performSearch() {
    var searchInput = document.getElementById('search');
    var list = document.getElementById('list');


    const query = searchInput.value.trim().toLowerCase();
    console.log(searchInput);
    list.innerHTML = "";

    if (query.length === 0) {
        return;
    }

    const response = await fetch(api_url);
    var data = await response.json();
    const filterResult = data.data.results.filter(item => {
        console.log(item.name);
        if (typeof item.name === 'string') {
            return item.name.toLowerCase().includes(query);
        }
        return false;
    });


    if (filterResult.length === 0) {
        list.textContent = "no result found";
    }
    else {
        console.log(filterResult);
       
        show(filterResult);
        isFavorite();
    }
}