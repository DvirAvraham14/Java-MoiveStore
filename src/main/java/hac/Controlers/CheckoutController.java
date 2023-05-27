package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.ConstraintViolationException;

import java.util.HashMap;
import java.util.Map;


/**
 *   This class is used to create a checkout controller
 *   This controller is used to handle the checkout process
 *   It is used to add a purchase to the database
 *   It is also used to handle validation errors
 */
@RestController
@RequestMapping("/checkout")
public class CheckoutController {
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    @PostMapping("/purchases")
    public Purchase addPurchase(@Valid @RequestBody Purchase purchase) {
        return repository.save(purchase); // this is a JPA method to save a purchase to the database
    }

    // then comment out the exception handler below and rerun the request,
    // you will see that the response is a 400 bad request returned by spring
    // in other words, if you don't handle the validation errors, Spring will return a 400 bad request
    // writing a custom eception handler allows us to return the errors in a more user friendly way
    // and also allows us to return any other Http response, even a 200 OK response instead of a 400 bad request

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
