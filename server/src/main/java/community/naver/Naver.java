package community.naver;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Naver {
    @Value("${naver.client.id}")
    private String naverClientId; //id
    @Value("${naver.client.secret}")
    private String NaverClientSecret; //시크릿키
    @Value("${naver.url.search.news}")
    private String naverNewSearchUrl; //뉴스 검색주소
    @Value("${naver.url.search.image}")
    private String naverImageSearchUrl; //이미지 검색주소

    public void newSearchUrl(){

    }


    
}
