class Product {
    //Constructeur avec les éléments disponibles dans l'API pour les données des produits
    constructor() {
        this.colors;
        this._id;
        this.name;
        this.price;
        this.imageUrl;
        this.description;
        this.classlauncher();
    }

// Méthode qui à la déclaration de la class Product (let product = new Product())
classlauncher() {
    // Appel de la classe Api qui permet de fetch() les informations de tous les "teddy" depuis l'API
    let apiResponse = new Api('http://localhost:3000/api/teddies');

    //Méthode getResponse() qui permet de récuperer les données des nounours
    apiResponse.getResponse().then(data => {
        product.products = data;
        product.createProduct();
    }).catch(error => {
        //Récupération des messages d'erreurs en cas de problèmes
        console.error(error);
    })  
}

//Méthode qui nous permet de créer un produit depuis le constructor
createProduct() {
    for(let i = 0; i < this.products.length; i++) {
        this.colors = this.products[i].colors;
        this._id = this.products[i]._id;
        this.name = this.products[i].name;
        this.price = this.products[i].price;
        this.imageUrl = this.products[i].imageUrl;
        this.description = this.products[i].description;
        
        //Appel de la méthode qui nous permet d'afficher les produits
        this.displayDivProduct();
        //Méthode qui affiche le produit en fonction de son ID quand on clique dessus
        if(this._id === productId){
            this.displayDivProduct();
            //Méthode qui nous permet d'ajouter des produits dans notre panier grâce à un bouton. Les produits sont stockés dans le localStorage
            if(document.getElementById('btn_cart') != null) {
                this.addToCart(this._id, this.name);
            }
        }
    }
}

//Méthode qui nous permet d'afficher la div de chaque produit grâce à des variables
displayDivProduct(){       
    //Code HTML de la div contenant le produit
    let divProductCode = `monhtml`;
    
    //On affiche seulement les div sur la homepage, on vérifie donc que l'élément "products" soit présent
    if(document.getElementById("products") != null){
        let productsDiv = document.getElementById("products");  
        productsDiv.innerHTML += cardCode;
    }
}

//Méthode qui affiche le produit en fonction de son ID quand on clique dessus
displayProduct(){
    //Code HTML de la div de chaque produit
    let viewCode =  `monhtml`;

    //On affiche seulement la div du produit sur lequel on a cliqué grâce à l'id que l'on met en paramètre dans l'URL
    if(document.getElementById('view_product') != null){
        let viewProduct = document.getElementById('view_product');
        viewProduct.innerHTML += viewCode;
        this.getProductColors();
    }
}

//Méthode qui permet de récupérer les couleurs de chaque produit et de les afficher dans la div du produit unique
getProductColors(){
    document.head.innerHTML += '<title>'+ this.name + ' - Orinoco</title>';
    if(document.getElementById('product_colors') != null){
        let productColors = document.getElementById('product_colors');

        //On récupère toutes les couleurs de chaque produit que l'on affiche
        for(let y = 0; y < this.colors.length; y++){
            //Code HTML pour les couleurs (boutons radios selectionnables)
            productColors.innerHTML +=  `monhtml`;
        }
    }     
}

//Méthode qui nous permet d'ajouter un produit dans le panier dans le localStorage avec l'id, le nom et la quantité du produit
addToCart(id, name){
    let btnAddCart = document.getElementById('btn_cart');

    //On défini la valeur de la quantité du produit sur 1 avant que l'utilisateur ne le change (ou pas)
    let productQuantity = "1";
    //On récupère la valeur de l'input (de 1 à 10)
    document.getElementsByClassName('productQuantityInput')[0].addEventListener('input', function(){
        productQuantity = document.getElementById(`product_quantity_${id}`).value;
    })

    btnAddCart.addEventListener('click', function(e){
        //On créé un tableau de tableau (id + quantité)
        let productArray = [id, productQuantity];
        let productsInCartArray = [productArray];

        //Quand le panier est vide on ajoute un produit
        if(localStorage.length === 0){
            localStorage.setItem("productsInCart", JSON.stringify(productsInCartArray));
            alert(`Le produit ${name} est ajouté à votre panier !`)
        //Et sinon on récupère la liste de produit pour voir si il n'est pas déjà dans le panier
        }else{
            let productsInCartArray = JSON.parse(localStorage.getItem("productsInCart"));

            //Ajout panier
            if(JSON.stringify(productsInCartArray).indexOf(JSON.stringify(productArray)) === -1){
                productsInCartArray.push(productArray);
                localStorage.setItem("productsInCart", JSON.stringify(productsInCartArray));
                alert(`Le produit ${name} est ajouté à votre panier !`);
            //Produit déjà dans le panier
            } else {
                alert(`Le produit ${name} est déjà dans votre panier !`);
            }
        }        
    });
}
}