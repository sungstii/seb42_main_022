package community.naver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

public class SearchNewsDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post { //검색 쿼리
        private String query = ""; //검색어. UTF-8로 인코딩되어야 합니다.
        private int display = 20; //한 번에 표시할 검색 결과 개수(기본값: 10, 최댓값: 100)
        private int start = 1; //검색 시작 위치(기본값: 1, 최댓값: 1000)
        private String sort = "sim"; // sim: 정확도순 , date: 날짜순

        /*데이터를 한꺼번에 들어가게 해주는 메서드*/
        public MultiValueMap<String, String> toMultiValueMap() {
            var map = new LinkedMultiValueMap<String, String>();

            map.add("query", query);
            map.add("display", String.valueOf(display));
            map.add("start", String.valueOf(start));
            map.add("sort", sort);

            return map;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response { //반환값
        private String lastBuildDate; //검색한 결과를 생성한 시간
        private int total; // 총 검색결과 갯수
        private int start; // 검색 시작 위치
        private int display; // 한번에 표시할 검색결과 갯수
        private List<NewsItem> items;
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class NewsItem {
            private String title; //제목
            private String originallink; // 뉴스기사 원문 URL
            private String link; //뉴스 기사의 네이버 뉴스 URL. 네이버에 제공되지 않은 기사라면 기사 원문의 URL을 반환합니다.
            private String description; // 뉴스기사 내용을 요약한 정보
            private String pubDate;
        }
    }
}
