package com.project.ecommerce_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.ecommerce_app.model.Product;
import com.project.ecommerce_app.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {
  @Autowired
  private ProductRepository productRepository;

  public Product addProduct(Product product){
    return productRepository.save(product);
  }

  public List<Product> getAllProducts(){
    return productRepository.findAll();
  }

  public Product getProduct(long productId){
    Optional<Product> optional = productRepository.findById(productId);
    if(optional.isPresent()){
      return optional.get();
    }
    else{
      throw new EntityNotFoundException();
    }
  }

  public void deleteProduct(long productId){
    if(productRepository.existsById(productId)){
      productRepository.deleteById(productId);
    }
    else{
      throw new EntityNotFoundException();
    }
  }

  public Product updateProduct(long productId, Product product){
    if(productRepository.existsById(productId)){
      product.setProductId(productId);
      return productRepository.save(product);
    }
    else{
      throw new EntityNotFoundException();
    }
  }
}
