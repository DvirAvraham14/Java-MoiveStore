package hac.beans;

import org.springframework.stereotype.Component;

/**
 * This class is used to create a shopping item object
 */
@Component
public class ShoppingItem {

    private Long id; // Unique id for each item in the cart
    private Product product; // Product object
    private int quantity; // Quantity of the product in the cart

    private static Long nextId = 1L; // Used to generate unique id for each item in the cart

    // Constructors
    public ShoppingItem() {}

    // Constructor with parameters for the shopping item object
    public ShoppingItem(Product product, Integer quantity) {
        this.id = nextId++;
        this.product = product;
        this.quantity = quantity;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void updateItem(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
