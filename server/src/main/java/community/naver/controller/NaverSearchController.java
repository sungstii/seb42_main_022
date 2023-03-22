package community.naver.controller;

import community.naver.NaverClient;
import community.naver.dto.SearchNewsDto;
import community.type.SearchType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/news")
@RestController
public class NaverSearchController {
    private final NaverClient naverClient;
    @GetMapping
    public ResponseEntity searchNews(@RequestParam String query){
        SearchNewsDto.Post post = new SearchNewsDto.Post();
        post.setQuery(query);
        return new ResponseEntity<>(naverClient.searchNews(post), HttpStatus.OK);
    }
}
