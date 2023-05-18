package hac.beans;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;


@Component
public class ShoppingCart {

    private ArrayList<ShoppingItem> cart ;

    public ShoppingCart() {
        this.cart = new ArrayList<ShoppingItem>();
    }

    public ArrayList<ShoppingItem> addProduct(Product product) {
        boolean found = false;
        for (ShoppingItem p : cart) {
            if (p.getProduct().getId().equals(product.getId())) {
                p.setQuantity(p.getQuantity() + 1);
                found = true;
                break; // Exit the loop since the product is found
            }
        }
        if (!found) {
            cart.add(new ShoppingItem(product, 1));
        }

        return cart;
    }

    public void setProducts(ArrayList<ShoppingItem> products) {
        this.cart = products;
    }


    public ArrayList<ShoppingItem> getCart() {
        return cart;
    }
}
