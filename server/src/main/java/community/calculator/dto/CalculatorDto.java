package community.calculator.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Stack;

@Getter @Setter
@NoArgsConstructor
public class CalculatorDto {
    public static class Post {
        @NotNull(message = "전기 사용량을 적어주세요")
        private int inputNum;          //사용량
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    /*전기요금의 월간 사용량, 예상 전기요금을 출력*/
    public static class Response{
        private int powerConsume; //소비전력 w기준
        private int usageTime; //사용시간
        private int kWh; //월간 사용량, 1000W = 1kWh
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseList{
        private List<Response> kWhList;
        private String totalFee; //월간 사용량에 따른 전기요금
        private int kWhTotal;
    }


}
