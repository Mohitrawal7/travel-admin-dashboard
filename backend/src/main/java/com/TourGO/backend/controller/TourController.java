package com.TourGO.backend.controller;

import com.TourGO.backend.dto.TourDto;
import com.TourGO.backend.model.Tour;
import com.TourGO.backend.model.User;
import com.TourGO.backend.repository.TourRepository;
import com.TourGO.backend.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourRepository tourRepository;
    private final UserRepository userRepository;

    public TourController(TourRepository tourRepository, UserRepository userRepository) {
        this.tourRepository = tourRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/public")
    public List<TourDto> getPublicTours(){
        return tourRepository.findAll(PageRequest.of(0,5)).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }



    // Endpoint to GET all tours
    @GetMapping
    public List<TourDto> getAllTours() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"));

        List<Tour> tours;
        if(isAdmin) {
            tours = tourRepository.findAll();
        } else {
            tours = tourRepository.findByUserUsername(username);
        }
        return tours.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Endpoint to CREATE a new tour
    @PostMapping
    public ResponseEntity<TourDto> createTour(@RequestBody TourDto tourDto) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(()->new RuntimeException("User not found"));

        Tour tour = new Tour();
        tour.setName(tourDto.getName());
        tour.setCountry(tourDto.getCountry());
        tour.setDescription(tourDto.getDescription());
        tour.setUser(currentUser);

        Tour savedTour = tourRepository.save(tour);
        return ResponseEntity.ok(convertToDto(savedTour));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TourDto> updateTour(@PathVariable Long id, @RequestBody TourDto tourDto) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));

        //security
        if(!hasPermission(tour.getUser().getUsername())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        tour.setName(tourDto.getName());
        tour.setCountry(tourDto.getCountry());
        tour.setDescription(tourDto.getDescription());

        Tour updatedTour = tourRepository.save(tour);
        return ResponseEntity.ok(convertToDto(updatedTour));
    }

    // DELETE a tour by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTour(@PathVariable Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("atour not found with this id"));

        if (!hasPermission(tour.getUser().getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        tourRepository.deleteById(id);
        return ResponseEntity.ok("Tour deleted successfully!");
    }


    private boolean hasPermission(String ownerUsername) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"));

        return isAdmin || currentUsername.equals(ownerUsername);
    }

    // method to convert Entity to DTO
    private TourDto convertToDto(Tour tour) {
        TourDto tourDto = new TourDto();
        tourDto.setId(tour.getId());
        tourDto.setName(tour.getName());
        tourDto.setCountry(tour.getCountry());
        tourDto.setDescription(tour.getDescription());
        tourDto.setCreatedBy(tour.getUser().getUsername());
        return tourDto;
    }
}