package com.berdenggubat.backend.repository;


import com.berdenggubat.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByUserUserId(int userId);
}
