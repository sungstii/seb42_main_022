package community.calculator.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter @Setter
@NoArgsConstructor
@ToString
public class Calculator {
    @NotBlank(message = "소비 전력을 적어주세요")
    private String powerConsumption;     // 소비전력
    @NotBlank(message = "사용 시간을 적어주세요")
    private String hour;         // 사용시간
    private int totalUsage;          // 총 사용량
    private int electricCharges;     // 전기 요금

    // int 형은 max랑 min 밖에 사용 못함 NotNull을 사용하기 부적합 -> Integer에 NotNull을 사용하기

}
