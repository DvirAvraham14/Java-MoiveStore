package hac.beans;

import org.springframework.stereotype.Component;

@Component

public class ShoppingItem {

    private Long id;
    private Product product;
    private int quantity;

    private static Long nextId = 1L;

    public ShoppingItem() {
    }

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
