(function (window) {

    function myLibrary() {

        //execute code here

        var catalog = createRandomCatalog(100);

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        //function definitions go here

        function searchProductsByPrice(price, diff) {

            var promise = new Promise(function (resolve, reject) {
                if (!isFinite(price)) {
                    reject("Invalid price: " + price);
                } else {
                    var i = 0, products = [];
                    setTimeout(function () {
                        while (i < catalog.length) {
                            if (Math.abs(catalog[i].price - price) < diff) {
                                products.push(mapProduct(catalog[i]));
                            }
                            i++;
                        }
                        resolve(products);
                    }, 1000);
                }
            });
            return promise;
        }

        function searchProductsByType(type) {

            var promise = new Promise(function (resolve, reject) {
                var validTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
                if (!validTypes.includes(type)) {
                    reject("Invalid Type: " + type)
                } else {
                    var i = 0, products = [];
                    setTimeout(function () {
                        while (i < catalog.length) {
                            if (catalog[i].type == type) {
                                products.push(mapProduct(catalog[i]));

                            }
                            i++;
                        }
                        resolve(products);
                    }, 1000);
                }
            });
            return promise;
        }

        function searchProductById(id) {

            var promise = new Promise(function (resolve, reject) {
                var i = 0;
                setTimeout(function () {
                    while (i < catalog.length) {
                        if (catalog[i].id == id) {
                            resolve(mapProduct(catalog[i]));
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                }, 1000);
            });
            return promise;
        }

        function mapProduct(item) {
            return { id: item.id, price: item.price, type: item.type }
        }

        function searchAllProducts() {
            var promise = new Promise(function (resolve, reject) {

                setTimeout(function () {
                    resolve(catalog);
                }, 1000);

            });
            return promise;
        }

        function createRandomProduct() {
            var typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
            var price = (Math.random() * 500).toFixed(2)
            var type = typeArray[Math.floor(Math.random() * 4)];

            return { price: price, type: type };
        }

        function createRandomCatalog(num) {
            var catalog = [];
            for (var i = 0; i < num; i++) {
                var obj = createRandomProduct();
                catalog.push({ id: i, price: obj.price, type: obj.type });
            }
            return catalog;
        }
    }

    if (typeof (window.api) === 'undefined') {
        window.api = myLibrary();
    }

})(window); 