package moim_today.persistence.repository.member;

import moim_today.persistence.entity.member.MemberJpaEntity;

public interface MemberRepository {

    void save(final MemberJpaEntity entity);

    MemberJpaEntity getByEmail(final String email);

    MemberJpaEntity getById(final long memberId);
}