package C06.OMG.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PermintaanStatus {
    private int supervisor;
    private int manajer;
    private int warehouse;
    private int dikirim;
    private int pengadaan;
    private int ditolak;
    private int selesai;
}
