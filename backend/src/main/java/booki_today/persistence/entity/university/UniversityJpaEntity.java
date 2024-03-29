package booki_today.persistence.entity.university;

import booki_today.persistence.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Getter
@Table(name = "university")
@Entity
public class UniversityJpaEntity extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "university_id")
    private long id;

    private String universityName;

    protected UniversityJpaEntity() {
    }

    @Builder
    private UniversityJpaEntity(final String universityName) {
        this.universityName = universityName;
    }
}
