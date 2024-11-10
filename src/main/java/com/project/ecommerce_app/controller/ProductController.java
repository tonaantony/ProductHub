package com.project.ecommerce_app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.ecommerce_app.model.Product;
import com.project.ecommerce_app.service.ProductService;

import jakarta.persistence.EntityNotFoundException;

@CrossOrigin()
@RestController
public class ProductController {
  @Autowired
  private ProductService productService;

  @PostMapping("/products")
  public ResponseEntity<?> addProduct(@RequestBody Product product){
    try{
      Product savedProduct = productService.addProduct(product);
      return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }catch(Exception e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Product Details");
    }
  }

  @GetMapping("/products")
  public ResponseEntity<?> getAllProducts(){
    return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
  }

  @GetMapping("/products/{productId}")
  public ResponseEntity<?> getProduct(@PathVariable int productId){
    try {
      return ResponseEntity.status(HttpStatus.OK).body(productService.getProduct(productId));
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }
  }

  @DeleteMapping("/products/{productId}")
  public ResponseEntity<?> deleteProduct(@PathVariable int productId){
    try {
      productService.deleteProduct(productId);
      return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully");
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }
  }

  @PutMapping("/products/{productId}")
  public ResponseEntity<?> updateProduct(@PathVariable int productId, @RequestBody Product product){
    try {
      return ResponseEntity.status(HttpStatus.OK).body(productService.updateProduct(productId, product));
    } catch (EntityNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }
  }
}
