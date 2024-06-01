class Cart{
    constructor(datetime, name,price, quantity, status, 
        user,imgurl){
        this.datetime = datetime;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
        this.user = user;
        this.imgurl = imgurl;
    }
}


module.exports = Cart;