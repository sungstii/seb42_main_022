package community.calculator.service;

import community.calculator.dto.Calculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@RequiredArgsConstructor
@Transactional
@Service
public class CalculatorService {


    public Calculator Calculation( Calculator calculator) {
        int hour = Integer.parseInt(calculator.getHour());
        int powerConsumption = Integer.parseInt(calculator.getPowerConsumption());

        int totalUsage = (int) ((hour * powerConsumption * 30) * 0.001); // kWH

        calculator.setTotalUsage(totalUsage);

        int electricCharges;

        int[] baseFees = { 400, 890, 1560, 3750, 7110, 12600 };
        double[] useFees = { 59.1, 122.6, 183.0, 273.2, 406.7, 690.8 };

        if (totalUsage == 0) {
            electricCharges = 0;

        } else if (totalUsage <= 100) {
            electricCharges = (int) (baseFees[0] + (totalUsage * useFees[0]));

        } else if (totalUsage <= 200) {
            electricCharges = (int) (baseFees[1] + (100 * useFees[0]) + ((totalUsage - 100) * useFees[1]));

        } else if (totalUsage <= 300) {
            electricCharges = (int) (baseFees[2] + (100 * useFees[0]) + (200 * useFees[1]) + ((totalUsage - 200) * useFees[2]));

        } else if (totalUsage <= 400) {
            electricCharges = (int) (baseFees[3] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + ((totalUsage - 300) * useFees[3]));

        } else if (totalUsage <= 500) {
            electricCharges = (int) (baseFees[4] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + (400 * useFees[3])
                                + ((totalUsage - 400) * useFees[4]));

        } else {

            electricCharges = (int) (baseFees[5] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + (400 * useFees[3])

                                + (500 * useFees[4]) + ((totalUsage - 500) * useFees[5]));
        }

        calculator.setElectricCharges(electricCharges);

        return calculator;
    }
}