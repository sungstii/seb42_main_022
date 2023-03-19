package community.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SearchType {
    TITLE("제목"),
    CONTENTS("본문"),
    NAME("이름");

    private final String description;
}
