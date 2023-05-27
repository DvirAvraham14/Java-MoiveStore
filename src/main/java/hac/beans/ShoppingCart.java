package hac.beans;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * This class is used to create a shopping cart object
 */
@Component
public class ShoppingCart {

    private ArrayList<ShoppingItem> cart ; // List of products in the cart

    public ShoppingCart() {
        this.cart = new ArrayList<ShoppingItem>();
    } // Constructor

    // get and set methods for the shopping cart object
    public ArrayList<ShoppingItem> addProduct(Product product) {
        boolean found = false;
        for (ShoppingItem p : this.cart) {
            if (p.getProduct().getId().equals(product.getId())) {
                p.setQuantity(p.getQuantity() + 1);
                found = true;
                break; // Exit the loop since the product is found
            }
        }
        if (!found) {
            cart.add(new ShoppingItem(product, 1));
        }

        return this.cart;
    }

    // get and set methods for the shopping cart object
    public void setProducts(ArrayList<ShoppingItem> products) {
        this.cart = products;
    }

    // get and set methods for the shopping cart object
    public ArrayList<ShoppingItem> getCart() {
        return cart;
    }

    // update the quantity of a product in the cart
    public ArrayList<ShoppingItem> updateItem(Long id, int quantity) {
        for (ShoppingItem item : this.cart) {
            if (item.getId().equals(id)) {
                item.setQuantity(quantity);
            }
        }
        return this.cart;
    }

    // delete a product from the cart
    public ArrayList<ShoppingItem> deleteItem(Long id) {
        for (ShoppingItem item : this.cart) {
            if (item.getId().equals(id)) {
                this.cart.remove(item);
                break;
            }
        }
        return this.cart;
    }

    // delete all products from the cart
    public void deleteCart() {
        this.cart.clear();
    }
}
