package com.example.carrus.repository;

import com.example.carrus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

//    // Custom query to find user by email (for login)
//    User findByEmail(String email);

    // Custom query to find user by email and password (for login authentication)
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    User findByEmailAndPassword(String email, String password);

    // Custom query to check if a user exists by email (for registration)
    boolean existsByEmail(String email);
}
