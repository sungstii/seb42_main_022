package community.calculator.controller;


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


    @PostMapping
    public ResponseEntity<?> postCalculation(@RequestParam int inputNum) {

        int calculation = calculatorService.calculation(inputNum);

        return new ResponseEntity<>(calculation, HttpStatus.OK);
    }
}
