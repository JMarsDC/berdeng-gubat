package com.berdenggubat.backend.service;

import com.berdenggubat.backend.entity.User;
import com.berdenggubat.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // CREATE with validation
    public User register(User u) {
        if (u.getEmail() == null || !u.getEmail().contains("@"))
            throw new RuntimeException("Enter a valid email");
        if (u.getPassword() == null || u.getPassword().length() < 6)
            throw new RuntimeException("Password must be at least 6 characters");
        if (u.getFirstName() == null || u.getFirstName().isBlank())
            throw new RuntimeException("First name is required");
        if (userRepo.existsByEmail(u.getEmail().trim().toLowerCase()))
            throw new RuntimeException("Email is already registered");

        u.setEmail(u.getEmail().trim().toLowerCase());
        u.setRole("USER");        // everyone starts as USER
        u.setStatus("ACTIVE");
        User saved = userRepo.save(u);
        saved.setPassword(null);  // never send password back
        return saved;
    }

    // READ with checks
    public User login(String email, String password) {
        User u = userRepo.findByEmail(email == null ? "" : email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!u.getPassword().equals(password))
            throw new RuntimeException("Invalid email or password");
        if (!"ACTIVE".equals(u.getStatus()))
            throw new RuntimeException("Account is disabled");
        u.setPassword(null);
        return u;
    }

    // UPDATE (used later by the Organization-approval feature)
    public User changeRole(int userId, String newRole) {
        User u = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!newRole.equals("USER") && !newRole.equals("ADMIN") && !newRole.equals("ORGANIZATION"))
            throw new RuntimeException("Invalid role");
        u.setRole(newRole);
        return userRepo.save(u);
    }
}
