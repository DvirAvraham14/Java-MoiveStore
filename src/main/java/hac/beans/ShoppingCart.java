package hac.beans;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ShoppingCart {

    private ArrayList<Product> products = new ArrayList<>();

    public ShoppingCart() {
        this.products = new ArrayList<Product>();
    }

    public ArrayList<Product> addProduct(Product product) {
        products.add(product);
        return products;
    }

    public void setProducts(ArrayList<Product> products) {
        this.products = products;
    }


    public ArrayList<Product> getProducts() {
        return products;
    }
}
