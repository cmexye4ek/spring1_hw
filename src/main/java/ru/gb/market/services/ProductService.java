package ru.gb.market.services;

import org.springframework.stereotype.Service;
import ru.gb.market.models.Product;
import ru.gb.market.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public List<Product> findByCostAfter(int minCost) {
        return productRepository.findByCostAfter(minCost);
    }

    public List<Product> findByCostBefore(int maxCost) {
        return productRepository.findByCostBefore(maxCost);
    }

    public List<Product> findByCostBetween(int minCost, int maxCost) {
        return productRepository.findByCostBetween(minCost, maxCost);
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public void save(Product product){
        productRepository.save(product);
    }

    public void deleteById(Long id){
        productRepository.deleteById(id);
    }

}
