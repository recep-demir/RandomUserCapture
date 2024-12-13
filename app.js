
const randomUser= async ()=> {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const a = data.results[0];

    showScreen(a);

    localStorage.setItem('currentUser', JSON.stringify(a));
}
randomUser();

const showScreen = (a) => {
    document.querySelector(".card").innerHTML = `
        <img src="${a.picture.large}" class="card-img-top" id="user-image" alt="User Image">
        <div class="card-body text-center">
            <h5 class="card-title" id="user-name">${a.name.title} ${a.name.first} ${a.name.last}</h5>
            <p class="card-text" id="user-email">${a.email}</p>
            <p class="card-text" id="user-phone">${a.phone}</p>
        </div>`;
};

document.getElementById('new-user').addEventListener('click', randomUser);

document.getElementById('add-user').addEventListener('click', () => {
    const a = JSON.parse(localStorage.getItem('currentUser'));
    
    if (a) {
        document.getElementById('saved-users').innerHTML += `
            <div class="card my-2" style="width: 18rem;">
                <img src="${a.picture.large}" class="card-img-top" alt="User Image">
                <div class="card-body">
                    <h5 class="card-title">${a.name.title} ${a.name.first} ${a.name.last}</h5>
                    <p class="card-text">Email: ${a.email}</p>
                    <p class="card-text">Phone: ${a.phone}</p>
                </div>
            </div>`;

// localstoragedan verilen parse edilerek çekilmesi. Bu işlem localstoragedan gelen veri string olduğu için yapılmaktadır.
        let savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];
        savedUsers.push(a);
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
        randomUser();
    }
});


document.getElementById('view-saved').addEventListener('click', () => {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('savedPage').style.display = 'flex';

    const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];
    savedUsers.forEach((e)=>{
        document.getElementById("saved-users").innerHTML += `
        <div class="card my-2" style="width: 18rem;">
            <img src="${a.picture.large}" class="card-img-top" alt="User Image">
            <div class="card-body">
                <h5 class="card-title">${a.name.title} ${a.name.first} ${a.name.last}</h5>
                <p class="card-text">Email: ${a.email}</p>
                <p class="card-text">Phone: ${a.phone}</p>
            </div>
        </div>`;
    });
});


document.getElementById('back-to-main').addEventListener('click', () => {
    document.getElementById('main-page').style.display = 'flex';
    document.getElementById('savedPage').style.display = 'none';
});

document.getElementById('remove-all').addEventListener('click', () => {
    localStorage.removeItem('savedUsers');
    document.getElementById('saved-users').innerHTML = '';
});


