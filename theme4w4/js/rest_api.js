(function(){
    let bouton = document.getElementById('bout_nouvelles')
    let nouvelles = document.querySelector('.nouvelles section')
    console.log(bouton.id)

	function monAjax()
    {
        let maRequete = new XMLHttpRequest();
        console.log(maRequete)
        maRequete.open('GET', 'http://localhost:8888/4w4-3/wp-json/wp/v2/posts');
        maRequete.onload = function () {
            console.log(maRequete)
            if (maRequete.status >= 200 && maRequete.status < 400) {
                let data = JSON.parse(maRequete.responseText);
                nouvelles.innerHTML = maChaine;
            }
            else {
                console.log('La connexion est faite mais il y a une erreur')
            }
        }
        maRequete.onerror = function () {
            console.log("erreur de connexion");
        }
        maRequete.send()
    }

}())