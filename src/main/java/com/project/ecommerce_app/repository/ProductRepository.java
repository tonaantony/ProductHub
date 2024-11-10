package com.project.ecommerce_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.ecommerce_app.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  
}
