package community.calculator.controller;


import community.calculator.dto.CalculatorDto;
import community.calculator.service.CalculatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calculators")
@Validated
@Slf4j
@RequiredArgsConstructor
public class CalculatorController {
    private final CalculatorService calculatorService;

    /*프론트에서 요청한 전기요금 계산기 방법이 2가지 있다
    * 1. 입력값을 한쌍만 받고 그에대한 월간 사용량 및 사용요금을 계산해주면*/


    /*소비전력, 사용시간을 적으면 월간 요금을 출력*/
    @PostMapping
    public ResponseEntity<?> postCalculation(@RequestParam(required = false, defaultValue = "0") int powerConsume1,
                                             @RequestParam(required = false, defaultValue = "0") int usageTime1,
                                             @RequestParam(required = false, defaultValue = "0") int powerConsume2,
                                             @RequestParam(required = false, defaultValue = "0") int usageTime2,
                                             @RequestParam(required = false, defaultValue = "0") int powerConsume3,
                                             @RequestParam(required = false, defaultValue = "0") int usageTime3,
                                             @RequestParam(required = false, defaultValue = "0") int powerConsume4,
                                             @RequestParam(required = false, defaultValue = "0") int usageTime4,
                                             @RequestParam(required = false, defaultValue = "0") int powerConsume5,
                                             @RequestParam(required = false, defaultValue = "0") int usageTime5) {

        CalculatorDto.ResponseList response = calculatorService.calculatorResponse(powerConsume1, usageTime1,
                powerConsume2, usageTime2, powerConsume3, usageTime3, powerConsume4, usageTime4, powerConsume5, usageTime5);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
