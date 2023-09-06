const localst = new Localst();


const favorite = document.querySelector('#favorites');
const img = document.querySelector('.img-fluid');
const text = document.querySelector('.card-text');
if (favorite) {
    const ch = localst.getFromDB();

    ch.forEach(c => {
        favorite.innerHTML += `
        <div class="col-md-12" id="favcol">
               <div class="card my-3">
                        <div class="row g-0">
                            <div class="col-md-2">
                                <img src="${c.image}" class="img-fluid"
                                    alt="...">
                            </div>
                            <div class="col-md-8 d-flex justify-content-center align-items-center">
                                <div class="card-body">
                                    <h5 class="card-title"></h5>
                                    <h5>Series</h5>
                           
                                    <p class="card-text">${c.name}</p>
                                </div>
                             <div>
                                <button class="btn btn-danger remove" data-id=${c.id}>Delete</button>
                             </div>
                            </div>
                        </div>
                        </div>
                        </div> `;



    })
}


favorite.addEventListener('click', (e) => {
 
    e.preventDefault();
    if (e.target.classList.contains('remove')) {
    
        console.log();
        var favcol = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
            favcol.remove();
    
        localst.removeFromDB(e.target.dataset.id);
    }
})