package com.example.carrus.repository;

import com.example.carrus.model.Subscription;
import com.example.carrus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {


}
