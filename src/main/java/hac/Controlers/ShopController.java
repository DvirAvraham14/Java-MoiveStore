package hac.Controlers;

import hac.beans.Product;
import hac.beans.ShoppingCart;
import hac.beans.ShoppingItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

/**
 * This class is used to create a REST API for the shopping cart
 */
@RestController
@RequestMapping("/api")
public class ShopController {

    // Autowire the shopping cart bean
    @Autowired
    private ShoppingCart shoppingCart;

    // REST API methods for getting, adding, updating and deleting products from the cart

    // REST API method for getting the shopping cart
    @GetMapping("/cart")
    public ArrayList<ShoppingItem> getCart() {
        return shoppingCart.getCart();
    }

    // REST API method for adding a product to the cart
    @PostMapping("/cart")
    public ArrayList<ShoppingItem> addToCart(@RequestBody Product product) {
        shoppingCart.addProduct(product);
        return shoppingCart.getCart();
    }

    // REST API method for updating the quantity of a product in the cart
    @PutMapping("/cart/{id}")
    public ArrayList<ShoppingItem> updateCart(@PathVariable final Long id, @RequestBody int quantity) {
        return shoppingCart.updateItem(id, quantity);
    }

    // REST API method for deleting a product from the cart
    @DeleteMapping("/cart/{id}")
    public ArrayList<ShoppingItem> deleteItem(@PathVariable final Long id) {
        return shoppingCart.deleteItem(id);
    }

    // REST API method for deleting all products from the cart
    @DeleteMapping("/deleteCart")
    public ArrayList<ShoppingItem> deleteCart() { shoppingCart.deleteCart(); return shoppingCart.getCart();}
}
