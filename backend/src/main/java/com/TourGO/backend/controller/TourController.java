package com.TourGO.backend.controller;

import com.TourGO.backend.dto.TourDto;
import com.TourGO.backend.model.Tour;
import com.TourGO.backend.repository.TourRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourRepository tourRepository;

    public TourController(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    // Endpoint to GET all tours
    @GetMapping
    public List<TourDto> getAllTours() {
        return tourRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Endpoint to CREATE a new tour
    @PostMapping
    public ResponseEntity<TourDto> createTour(@RequestBody TourDto tourDto) {
        Tour tour = new Tour();
        tour.setName(tourDto.getName());
        tour.setCountry(tourDto.getCountry());
        tour.setDescription(tourDto.getDescription());

        Tour savedTour = tourRepository.save(tour);
        return ResponseEntity.ok(convertToDto(savedTour));
    }

    // Helper method to convert Entity to DTO
    private TourDto convertToDto(Tour tour) {
        TourDto tourDto = new TourDto();
        tourDto.setId(tour.getId());
        tourDto.setName(tour.getName());
        tourDto.setCountry(tour.getCountry());
        tourDto.setDescription(tour.getDescription());
        return tourDto;
    }
}