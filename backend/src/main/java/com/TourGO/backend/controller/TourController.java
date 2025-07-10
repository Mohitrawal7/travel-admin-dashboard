package com.TourGO.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    @GetMapping
    public ResponseEntity<List<Map<String, String>>> getAllTours() {
        List<Map<String, String>> tours = List.of(
                Map.of("id", "1", "name", "Paris Adventure", "country", "France"),
                Map.of("id", "2", "name", "Tokyo Neon Nights", "country", "Japan"),
                Map.of("id", "3", "name", "Roman Holiday", "country", "Italy")
        );
        return ResponseEntity.ok(tours);
    }
}