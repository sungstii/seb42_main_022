package community.calculator.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
@NoArgsConstructor
public class CalculatorDto {
    @NotNull(message = "전기 사용량을 적어주세요")
    public int inputNum;          //사용량

}
