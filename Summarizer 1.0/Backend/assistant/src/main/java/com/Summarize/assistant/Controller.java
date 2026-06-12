package com.Summarize.assistant;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Summarize")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class Controller {

    private final SummarizeService summarizeService;

    @PostMapping("/process")
    public ResponseEntity<String> processContent(@RequestBody SummarizeRequest request){
        String result = summarizeService.processContent(request);
        return ResponseEntity.ok(result);
    }
}
