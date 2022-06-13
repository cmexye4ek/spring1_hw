package ru.gb.market.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.gb.market.models.Product;

import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCostAfter(int minCost);
    List<Product> findByCostBefore(int maxCost);
    List<Product> findByCostBetween(int minCost, int maxCost);
}
