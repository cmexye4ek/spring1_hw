package ru.gb.market.controllers;

import org.springframework.web.bind.annotation.*;
import ru.gb.market.models.Product;
import ru.gb.market.services.ProductService;

import java.util.List;

@RestController
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //http://localhost:8189/market/products
    @GetMapping("/products")
    public List<Product> findAll() {
        return productService.findAll();
    }

    //http://localhost:8189/market/products/cost_after?min=100
    @GetMapping("/products/cost_after")
    public List<Product> findByCostAfter(@RequestParam (name = "min") int minCost) {
        return productService.findByCostAfter(minCost);
    }

    //http://localhost:8189/market/products/cost_before?max=200
    @GetMapping("/products/cost_before")
    public List<Product> findByCostBefore(@RequestParam (name = "max") int maxCost) {
        return productService.findByCostBefore(maxCost);
    }

    //http://localhost:8189/market/products/cost_between?min=100&max=400
    @GetMapping("/products/cost_between")
    public List<Product> findByCostBetween(@RequestParam (name = "min") int minCost, @RequestParam (name = "max") int maxCost) {
        return productService.findByCostBetween(minCost, maxCost);
    }

    @GetMapping("/products/{id}")
    public Product findById(@PathVariable Long id) {
        return productService.findById(id).get();
    }

    @PostMapping("/products")
    public void save(@RequestBody Product product) {
        productService.save(product);
    }

    @GetMapping("/products/delete/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteById(id);
    }
}
