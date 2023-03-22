package community.naver.service;

import community.naver.dto.SearchNewsDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class NaverClient {
    @Value("${naver.client.id}")
    private String naverClientId; //id
    @Value("${naver.client.secret}")
    private String naverClientSecret; //시크릿키
    @Value("${naver.url.search.news}")
    private String naverNewSearchUrl; //뉴스 검색주소
    @Value("${naver.url.search.image}")
    private String naverImageSearchUrl; //이미지 검색주소

    /* 뉴스검색 메서드*/
    public SearchNewsDto.Response searchNews(SearchNewsDto.Post post){
        var uri = UriComponentsBuilder.fromUriString(naverNewSearchUrl) //뉴스검색 주소
                .queryParams(post.toMultiValueMap())
                .build()
                .encode()
                .toUri();

        var headers = new HttpHeaders(); //http헤더에 키값을 넣어줌
        headers.set("X-Naver-Client-Id", naverClientId);
        headers.set("X-Naver-Client-Secret", naverClientSecret);
        headers.setContentType(MediaType.APPLICATION_JSON); //Json형식으로 변환

        var httpEntity = new HttpEntity<>(headers); //요청하는 부분
        var responseType = new ParameterizedTypeReference<SearchNewsDto.Response>(){}; //응답값

        var responseEntity = new RestTemplate().exchange( //모든 정보를 담아주는 부분
                uri,
                HttpMethod.GET,
                httpEntity,
                responseType
        );
        return responseEntity.getBody();
    }

    public SearchNewsDto.Response searchQuerySet(String query, int start, int display, String sort){
        SearchNewsDto.Post post = new SearchNewsDto.Post();
        post.setQuery(query);
        post.setStart(start);
        post.setDisplay(display);
        post.setSort(sort);

        return searchNews(post);
    }
}
