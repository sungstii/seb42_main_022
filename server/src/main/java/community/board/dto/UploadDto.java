package community.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UploadDto {
    private Long fileId;
    private String fileName;
    private String imagePath;
}
