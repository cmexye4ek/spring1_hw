package ru.gb.market.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.gb.market.dto.ProductDto;
import ru.gb.market.exceptions.ResourceNotFoundException;
import ru.gb.market.models.Category;
import ru.gb.market.models.Product;
import ru.gb.market.services.CategoryService;
import ru.gb.market.services.ProductService;

import javax.print.attribute.standard.PrinterMessageFromOperator;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {
    private ProductService productService;
    private CategoryService categoryService;

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    //http://localhost:8189/market/api/v1/products
    @GetMapping
    public Page<ProductDto> findAll(@RequestParam(name = "page", defaultValue = "1") int pageIndex) {
        if (pageIndex < 1) {
            pageIndex = 1;
        }
        return productService.findAll(pageIndex - 1, 10).map(ProductDto::new);
    }

    @GetMapping("/{id}")
    public Product findById(@PathVariable Long id) {
        return productService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product id = " + id + "not found on server"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto addNewProduct(@RequestBody ProductDto productDto) {
        productService.saveOrUpdateProduct(getProductFromDto(productDto));
        return new ProductDto(getProductFromDto(productDto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ProductDto updateProduct(@RequestBody ProductDto productDto) {
        productService.saveOrUpdateProduct(getProductFromDto(productDto));
        return new ProductDto(getProductFromDto(productDto));
    }

    private Product getProductFromDto (ProductDto productDto) {
        Product product = new Product();
        product.setId(productDto.getId());
        product.setTitle(productDto.getTitle());
        product.setCost(productDto.getCost());
        Category category = categoryService.findByTitle(productDto.getCategoryTitle()).orElseThrow(() -> new ResourceNotFoundException("Category title = "+ productDto.getCategoryTitle() +" not found"));
        product.setCategory(category);
        return product;
    }

    @DeleteMapping("/{id}")
    public int deleteById(@PathVariable Long id) {
        productService.deleteById(id);
        return HttpStatus.OK.value();
    }
}
