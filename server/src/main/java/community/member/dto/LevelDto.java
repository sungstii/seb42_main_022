package community.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LevelDto {
    private String userName;
    private int level;
    private int levelExp; // 해당부분에 대한 계산식을 수정하면 오픈하겠음 / 재개장
    private int totalExp;
}
