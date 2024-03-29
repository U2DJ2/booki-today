package booki_today.persistence.entity.department;

import booki_today.global.annotation.Association;
import booki_today.persistence.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Getter
@Table(name = "department")
@Entity
public class DepartmentJpaEntity extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private long id;

    @Association
    private long universityId;

    private String departmentName;

    protected DepartmentJpaEntity() {
    }

    @Builder
    private DepartmentJpaEntity(final long universityId, final String departmentName) {
        this.universityId = universityId;
        this.departmentName = departmentName;
    }
}
