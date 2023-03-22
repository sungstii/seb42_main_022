package community.naver.controller;

import community.naver.service.NaverClient;
import community.naver.dto.SearchNewsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/news")
@RestController
public class NaverSearchController {
    private final NaverClient naverClient;
    @GetMapping
    public ResponseEntity searchNews(@RequestParam(required = false, defaultValue = "환경") String query,
                                     @RequestParam(required = false, defaultValue = "1") int start,
                                     @RequestParam(required = false, defaultValue = "20") int display,
                                     @RequestParam(required = false, defaultValue = "sim") String sort){

         SearchNewsDto.Response response = naverClient.searchQuerySet(query, start, display, sort);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
