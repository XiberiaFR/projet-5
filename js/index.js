const cameraList = document.getElementById('camera__list');

let url = "http://localhost:3000/api/cameras";


// function qui récupère les infos de l'url et renvoie une promise au format JSON
async function getCamera(url) {
    let result = await fetch(url)
    return result.json()
}


getCamera(url).then(cameras => {
    console.log(cameras)
    cameras.forEach(camera => {
        console.log(camera)
        cameraList.innerHTML += `moncodesourcehtml`
    });
})
    .catch(function (error) {
        console.log('Problème avec le fetch: ' + error);
        alert('Echec de la connexion au serveur !');
    });