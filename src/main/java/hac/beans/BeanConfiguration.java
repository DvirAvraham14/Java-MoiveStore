package hac.beans;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

// This class is used to create beans for the application
@Configuration
public class BeanConfiguration {

    // This bean is used to create a new shopping cart for each session
    @Bean
    @SessionScope
    public ShoppingCart sessionShoppingCart() {
        return new ShoppingCart();
    }

}
