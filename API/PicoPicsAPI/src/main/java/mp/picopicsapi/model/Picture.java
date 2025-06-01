package mp.picopicsapi.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Picture {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String filename;
    private String contentType;
    @Lob
    @Column(length = 52_428_800)
    private byte[] data;
    @ManyToOne
    private User owner;
    @Column(nullable = false)
    private LocalDateTime uploadDate;

    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }

    public LocalDateTime getUploadDate() { return uploadDate; }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
