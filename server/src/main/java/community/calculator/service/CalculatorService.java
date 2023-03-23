package community.calculator.service;

import community.calculator.dto.CalculatorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@RequiredArgsConstructor
@Transactional
@Service
public class CalculatorService {


    /* 계산식  1.  100 <= inputNum  (inputNum == 70)
                BaseFees[0] + (inputNum * UseFees[0])
              2.  300 <= inputNum (inputNum == 220)
                BasFees[2] + {inputNum 중 100 (inputNum의 남은 값은 120) * UseFees[0]}
                + {inputNum 중 100 (inputNum의 남은 값은 20) * UseFees[1]}
                + {inputNum 남은 값 (20) * UseFees[2]}
     */
    public int calculation(int usage) {
        CalculatorDto calculatorDto = new CalculatorDto();

        calculatorDto.setInputNum(usage);
        int inputNum = calculatorDto.getInputNum();

        double totalUsage = 0;

        int[] baseFees = { 400, 890, 1560, 3750, 7110, 12600 };
        double[] useFees = { 59.1, 122.6, 183.0, 273.2, 406.7, 690.8 };

        if (inputNum <= 0) {
            totalUsage = 0;

        } else if (inputNum <= 100) {
            totalUsage = baseFees[0] + (inputNum * useFees[0]);

        } else if (inputNum <= 200) {
            totalUsage = baseFees[1] + (100 * useFees[0]) + ((inputNum - 100) * useFees[1]);

        } else if (inputNum <= 300) {
            totalUsage = baseFees[2] + (100 * useFees[0]) + (200 * useFees[1]) + ((inputNum - 200) * useFees[2]);

        } else if (inputNum <= 400) {
            totalUsage = baseFees[3] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + ((inputNum - 300) * useFees[3]);

        } else if (inputNum <= 500) {
            totalUsage = baseFees[4] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + (400 * useFees[3])
                    + ((inputNum - 400) * useFees[4]);

        } else if (inputNum > 500)

            totalUsage = baseFees[5] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + (400 * useFees[3])

                    + (500 * useFees[4]) + ((inputNum - 500) * useFees[5]);

        return (int)totalUsage;
    }
}
