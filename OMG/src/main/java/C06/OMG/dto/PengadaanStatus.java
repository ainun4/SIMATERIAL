package C06.OMG.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PengadaanStatus {
    private int purchaser;
    private int dikirim;
    private int diproses;
    private int ditolak;
    private int selesai;
}
