package community.naver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class NewsSearchDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post { //검색 쿼리
        private String query = ""; //검색어. UTF-8로 인코딩되어야 합니다.
        private int display = 10; //한 번에 표시할 검색 결과 개수(기본값: 10, 최댓값: 100)
        private int start = 1; //검색 시작 위치(기본값: 1, 최댓값: 1000)
        private String sort = "sim"; // sim: 정확도순 , date: 날짜순
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response{ //반환값
        private String lastBuildDate; //검색한 결과를 생성한 시간
        private int total; // 총 검색결과 갯수
        private int start; // 검색 시작 위치
        private int display; // 한번에 표시할 검색결과 갯수
        private String title; //제목
        private String originalLink; // 뉴스기사 원문 URL
        private String link; //뉴스 기사의 네이버 뉴스 URL. 네이버에 제공되지 않은 기사라면 기사 원문의 URL을 반환합니다.
        private String  description; // 뉴스기사 내용을 요약한 정보
        private List<NewsItem> items;
    }

    public static class NewsItem{

    }

}
