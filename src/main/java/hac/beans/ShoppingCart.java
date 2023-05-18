package hac.beans;

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

    public void setProducts(ArrayList<ShoppingItem> products) {
        this.cart = products;
    }


    public ArrayList<ShoppingItem> getCart() {
        return cart;
    }

    public ArrayList<ShoppingItem> updateItem(Long id, int quantity) {
        for (ShoppingItem item : this.cart) {
            if (item.getId().equals(id)) {
                item.setQuantity(quantity);
            }
        }
        return this.cart;
    }

    public ArrayList<ShoppingItem> deleteItem(Long id) {
        for (ShoppingItem item : this.cart) {
            if (item.getId().equals(id)) {
                this.cart.remove(item);
                break;
            }
        }
        return this.cart;
    }
}
