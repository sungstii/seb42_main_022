package community.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LevelDto {
    private int level;
//    private int levelExp; // 해당부분에 대한 계산식을 수정하면 오픈하겠음
    private int totalExp;
}
