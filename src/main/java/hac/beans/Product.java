package hac.beans;

import org.springframework.stereotype.Component;

@Component
public class Product {

    private Long id;
    private String name;
    private Double price;
    private String image;

    public Product() {
    }

    public Product(Long id, String name, Double price, String description, String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    // getters and setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
