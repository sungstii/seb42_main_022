package community.board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@NoArgsConstructor
@Setter @Getter
@Entity
public class UploadFile{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;
    private String fileName;
    private String imagePath;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    public UploadFile(String fileName, String imagePath) {
        this.fileName = fileName;
        this.imagePath = imagePath;
    }
}
