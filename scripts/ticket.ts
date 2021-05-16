
// the Model mainly saves the data of each element ( the model doesnt care about how the data
// presented to the user nor how it behaves to certain changes )
class shopItemModel{
    constructor(private _id:number,private _productName:string,private _productPrice:number,
        private _quantity:number,private _img:string){}
    //Getters
    public getId(){return this._id;} 
    public getProductName(){return this._productName;}
    public getProductPrice(){return this._productPrice;} 
    public getImg(){return this._img;} 
    public getQuantity(){return this._quantity;} 
    //Setters 
    public setProductName(productName:string){this._productName=productName};
    public setProductPrice(productPrice:number){this._id=productPrice};
    public setImg(img:string){this._img=img};
    public setQuantity(quantity:number){this._quantity=quantity}; 
}



// the View mainly focuses on showing the data provided by the presenter  
// it also takes care of the user behavior and lets the presenter decides what happen
// you can see below that the view is waiting for data provided by the presenter 
// to actually draw it to the screen ( setModel ) and it also waits 
// the presenter to decide how to deal with the delete button clicked 
// event or the input field on change event

class shopItemView{
    html:any;   
    deleteButton:any; 
    quantityTd:any;
    quantityInputField:any; 
    productNameTd:any; 
    productPriceTd:any; 
    imgImage:any; 
    constructor(){}
         
    getHtml(){
        return this.html;
    }
    setModel(model:shopItemModel){   
        this.html = document.createElement("tr");
        this.html.setAttribute("class","shopItemRow")

        this.deleteButton = document.createElement("button") 
        this.deleteButton.innerHTML = "X";
        this.deleteButton.setAttribute("class", "deleteBtn"); 

        var removeTd = document.createElement("td"); 
        removeTd.setAttribute("class", "actionsTd");
        removeTd.append(this.deleteButton);

        this.quantityTd = document.createElement("td"); 
        this.quantityInputField = document.createElement("input");  
        this.quantityInputField.setAttribute("type","number");
        this.quantityInputField.setAttribute("min","1");
        this.quantityInputField.setAttribute("class","quantityInput");
        this.quantityInputField.value = "1";
        this.quantityTd.appendChild(this.quantityInputField);
 
        this.productNameTd = document.createElement("td"); 
        this.productNameTd.setAttribute("class","productNameColumn");
   
        this.productPriceTd = document.createElement("td");  
        
        var imgTd = document.createElement("td"); 
        this.imgImage = document.createElement("img");
        this.imgImage.setAttribute("width","75px") 
        imgTd.appendChild(this.imgImage);  
        
        this.quantityInputField.value= model.getQuantity().toString();
        this.productNameTd.innerHTML = model.getProductName();
        this.productPriceTd.innerHTML = model.getProductPrice().toString()+"$";
        this.imgImage.setAttribute("src",model.getImg())
        
        this.html.append(removeTd,this.productNameTd, imgTd,this.quantityTd, this.productPriceTd); 
        
    }
    addInputChangedHandler(handler){
        this.quantityInputField.addEventListener('input', handler);
    }
    addDeleteHandler(handler){
       this.deleteButton.addEventListener("click", handler);
    }  
    updatePrice(price:number){
        this.productPriceTd.innerHTML = price.toString()+"$"; 
    }
}
 

// the Presenter mainly takes the data from the model and provides it to the view
// the presenter also decides how to manipulate the data ( model ) and it decides what happens
// to certain events of the view without needing to know how exactly those events are triggered 
class shopItemPresenter{ 
    constructor(private _view:shopItemView, private _model:shopItemModel){
        _view.setModel(_model); 
        _view.addInputChangedHandler(function(){  
            _view.updatePrice(parseInt(_view.quantityInputField.value)*_model.getProductPrice());
        });
        _view.addDeleteHandler(function(){ 
            _view.html.remove();
        }); 
    }  
    public getView(){return this._view}
    public getModel(){return this._model} 
}


function showData(table) {
    for (let index = 0; index < table.length; index++) {
        var item = table[index];
        let presenter = new shopItemPresenter(
            new shopItemView(), new shopItemModel(item.id, item.title, item.price, 1, item.image)
        ); 
        var newDiv = presenter.getView().getHtml(); 
        var currentDiv = document.getElementById('div1');
        document.getElementById("myShopListTable").append(newDiv);
    } 
}

// Here I'm using a fake API to retrive some data and treat using the showData() function 
// Notice that the function only communicates with the presenter.
fetch('https://fakestoreapi.com/products?limit=10')
    .then(res => res.json())
    .then(json => showData(json));





