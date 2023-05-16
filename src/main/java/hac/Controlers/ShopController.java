package hac.Controlers;

import hac.beans.Product;
import hac.beans.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class ShopController {

    @Autowired
    private ShoppingCart shoppingCart;


    @GetMapping("/cart")
    public ArrayList<Product> getCart() {
        return shoppingCart.getProducts();
    }

    @PostMapping("/cart")
    public ShoppingCart addToCart(@RequestBody Product product) {
        shoppingCart.addProduct(product);
        return shoppingCart;
    }
}
