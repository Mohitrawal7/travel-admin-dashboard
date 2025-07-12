package com.TourGO.backend.repository;

import com.TourGO.backend.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, Long> {

}