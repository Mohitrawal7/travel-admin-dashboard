package com.TourGO.backend.repository;

import com.TourGO.backend.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourRepository extends JpaRepository<Tour, Long> {

    List<Tour> findByUserUsername(String username);
}