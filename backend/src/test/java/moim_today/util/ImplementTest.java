package moim_today.util;

import moim_today.persistence.repository.certification_token.CertificationTokenRepository;
import moim_today.persistence.repository.department.DepartmentRepository;
import moim_today.persistence.repository.member.MemberRepository;
import moim_today.persistence.repository.university.UniversityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public abstract class ImplementTest {

    @Autowired
    protected DatabaseCleaner databaseCleaner;

    @Autowired
    protected MemberRepository memberRepository;

    @Autowired
    protected CertificationTokenRepository certificationTokenRepository;

    @Autowired
    protected UniversityRepository universityRepository;

    @Autowired
<<<<<<< HEAD
    protected DepartmentRepository departmentRepository;

    @Autowired
=======
>>>>>>> 29b17a6 ([BE] fix : json 파싱 에러 해결)
    protected PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUpDatabase() {
        databaseCleaner.cleanUp();
    }
}
