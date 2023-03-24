package community.calculator.controller;


import community.calculator.dto.Calculator;
import community.calculator.service.CalculatorService;
import community.globaldto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/calculators")
@Validated
@Slf4j
@RequiredArgsConstructor
public class CalculatorController {
    private final CalculatorService calculatorService;

    @PostMapping
    public ResponseEntity<?> postPartialCalculation(@RequestBody @Valid Calculator partialCalculator) {

//        CalculatorDto.PartialCalculator partialCalculation = calculatorMapper.partialPostToPartial(partialCalculator);
        log.info(partialCalculator.toString());
        Calculator calculation = calculatorService.Calculation(partialCalculator);


        return new ResponseEntity<>(new SingleResponseDto<>(calculation), HttpStatus.OK);
    }
}
