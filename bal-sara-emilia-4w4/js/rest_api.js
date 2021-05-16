(function(){
    //let bouton = document.getElementById('bout_nouvelles')
    let nouvelles = document.querySelector('.nouvelles section')
    let annonce = document.getElementById('annonce')
    //console.log(bouton.id)

    //bouton.addEventListener('mousedown', monAjax)
    window.addEventListener('load', function(){
        //POUR LES NOUVELLES
        monAjax(monObjJS.URLDomaine + '/wp-json/wp/v2/posts', nouvelles)
        //POUR LES ANNONCES
        monAjax(monObjJS.URLDomaine + '/wp-json/wp/v2/posts?categories=35', annonce)
    })

	function monAjax(requete, elmDom)
    {
        let maRequete = new XMLHttpRequest();
        console.log(maRequete)
        maRequete.open('GET', requete);
        maRequete.onload = function () {
            console.log(maRequete)
            if (maRequete.status >= 200 && maRequete.status < 400) {
                let data = JSON.parse(maRequete.responseText);
                let chaine = ''
                for(const elm of data){
                    chaine += '<h2>' + elm.title.rendered + '</h2>'
                    chaine +=  elm.content.rendered 
                }
                elmDom.innerHTML = chaine;
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

    /*
    TRAITEMENT DE L'AJOUT D'UN ARTICLE DE CATÉGORI NOUVELLES
    */

    bouton_ajout = document.getElementById('bout-rapide')
    bouton_ajout.addEventListener('mousedown', function(){
        console.log('ajout')
        let monArticle = {
            "title" : document.querySelector('.admin-rapid [name="title"]').value,
            "content" : document.querySelector('.admin-rapid [name="content"]').value,
            "status" : "publish",
            "categories" : [35]
        }

        console.log(JSON.stringify(monArticle))
        let creerArticle = new XMLHttpRequest()
        creerArticle.open("POST", monObjJS.URLDomaine + '/wp-json/wp/v2/posts')
        creerArticle.setRequestHeader("X-WP-Nonce", monObjJS.nonce)
        creerArticle.setRequestHeader("Content-Type", "application/JSON;charset=UTF8-8")
        creerArticle.send(JSON.stringify(monArticle)) //transmettre la requete au serveur (rest-api)
        creerArticle.onreadystatechange = function(){
            if(creerArticle.readyState == 4){
                if(creerArticle.status == 201){
                    document.querySelector('.admin-rapid [name="title"]').value = ''
                    document.querySelector('.admin-rapid [name="content"]').value = ''
                }
                else{
                    alert('Erreur réessayez')
                }
            }
        }
    })

}())