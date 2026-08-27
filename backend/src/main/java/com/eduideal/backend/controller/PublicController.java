package com.eduideal.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @GetMapping("/demo")
    public ResponseEntity<?> getPublicDemo() {
        return ResponseEntity.ok(Map.of(
                "mode", "PUBLIC_DEMO",
                "chemistry", Map.of(
                        "lesson1", Map.of("id", 1, "title", "Solutions", "status", "UNLOCKED", "access", "FULL_PREVIEW"),
                        "lesson2PlusStatus", "LOCKED"
                ),
                "physics", Map.of("status", "COMING_SOON"),
                "mathematics", Map.of("status", "COMING_SOON")
        ));
    }
}
