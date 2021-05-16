// the Model mainly saves the data of each element ( the model doesnt care about how the data
// presented to the user nor how it behaves to certain changes )
var shopItemModel = /** @class */ (function () {
    function shopItemModel(_id, _productName, _productPrice, _quantity, _img) {
        this._id = _id;
        this._productName = _productName;
        this._productPrice = _productPrice;
        this._quantity = _quantity;
        this._img = _img;
    }
    //Getters
    shopItemModel.prototype.getId = function () { return this._id; };
    shopItemModel.prototype.getProductName = function () { return this._productName; };
    shopItemModel.prototype.getProductPrice = function () { return this._productPrice; };
    shopItemModel.prototype.getImg = function () { return this._img; };
    shopItemModel.prototype.getQuantity = function () { return this._quantity; };
    //Setters 
    shopItemModel.prototype.setProductName = function (productName) { this._productName = productName; };
    ;
    shopItemModel.prototype.setProductPrice = function (productPrice) { this._id = productPrice; };
    ;
    shopItemModel.prototype.setImg = function (img) { this._img = img; };
    ;
    shopItemModel.prototype.setQuantity = function (quantity) { this._quantity = quantity; };
    ;
    return shopItemModel;
}());
// the View mainly focuses on showing the data provided by the presenter  
// it also takes care of the user behavior and lets the presenter decides what happen
// you can see below that the view is waiting for data provided by the presenter 
// to actually draw it to the screen ( setModel ) and it also waits 
// the presenter to decide how to deal with the delete button clicked 
// event or the input field on change event
var shopItemView = /** @class */ (function () {
    function shopItemView() {
    }
    shopItemView.prototype.getHtml = function () {
        return this.html;
    };
    shopItemView.prototype.setModel = function (model) {
        this.html = document.createElement("tr");
        this.html.setAttribute("class", "shopItemRow");
        this.deleteButton = document.createElement("button");
        this.deleteButton.innerHTML = "X";
        this.deleteButton.setAttribute("class", "deleteBtn");
        var removeTd = document.createElement("td");
        removeTd.setAttribute("class", "actionsTd");
        removeTd.append(this.deleteButton);
        this.quantityTd = document.createElement("td");
        this.quantityInputField = document.createElement("input");
        this.quantityInputField.setAttribute("type", "number");
        this.quantityInputField.setAttribute("min", "1");
        this.quantityInputField.setAttribute("class", "quantityInput");
        this.quantityInputField.value = "1";
        this.quantityTd.appendChild(this.quantityInputField);
        this.productNameTd = document.createElement("td");
        this.productNameTd.setAttribute("class", "productNameColumn");
        this.productPriceTd = document.createElement("td");
        var imgTd = document.createElement("td");
        this.imgImage = document.createElement("img");
        this.imgImage.setAttribute("width", "75px");
        imgTd.appendChild(this.imgImage);
        this.quantityInputField.value = model.getQuantity().toString();
        this.productNameTd.innerHTML = model.getProductName();
        this.productPriceTd.innerHTML = model.getProductPrice().toString();
        this.imgImage.setAttribute("src", model.getImg());
        this.html.append(removeTd, this.productNameTd, imgTd, this.quantityTd, this.productPriceTd);
    };
    shopItemView.prototype.addInputChangedHandler = function (handler) {
        this.quantityInputField.addEventListener('input', handler);
    };
    shopItemView.prototype.addDeleteHandler = function (handler) {
        this.deleteButton.addEventListener("click", handler);
    };
    shopItemView.prototype.updatePrice = function (price) {
        this.productPriceTd.innerHTML = price.toString();
    };
    return shopItemView;
}());
// the Presenter mainly takes the data from the model and provides it to the view
// the presenter also decides how to manipulate the data ( model ) and it decides what happens
// to certain events of the view without needing to know how exactly those events are triggered 
var shopItemPresenter = /** @class */ (function () {
    function shopItemPresenter(_view, _model) {
        this._view = _view;
        this._model = _model;
        _view.setModel(_model);
        _view.addInputChangedHandler(function () {
            _view.updatePrice(parseInt(_view.quantityInputField.value) * _model.getProductPrice());
        });
        _view.addDeleteHandler(function () {
            _view.html.remove();
        });
    }
    shopItemPresenter.prototype.getView = function () { return this._view; };
    shopItemPresenter.prototype.getModel = function () { return this._model; };
    return shopItemPresenter;
}());
function showData(table) {
    for (var index = 0; index < table.length; index++) {
        var item = table[index];
        var presenter = new shopItemPresenter(new shopItemView(), new shopItemModel(item.id, item.municipalite, item.rang, 1, item.service));
        var newDiv = presenter.getView().getHtml();
        var currentDiv = document.getElementById('div1');
        document.getElementById("myShopListTable").append(newDiv);
    }
}
// Here I'm using a fake API to retrive some data and treat using the showData() function 
// Notice that the function only communicates with the presenter.
fetch('https://mocki.io/v1/63068930-aee7-4c7a-95ab-8b0d5b42bff5')
    .then(function (res) { return res.json(); })
    .then(function (json) { return showData(json); });
