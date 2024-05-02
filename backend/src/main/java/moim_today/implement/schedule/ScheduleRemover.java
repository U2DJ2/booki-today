package moim_today.implement.schedule;

import moim_today.global.annotation.Implement;
import moim_today.persistence.entity.schedule.ScheduleJpaEntity;
import moim_today.persistence.repository.schedule.ScheduleRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Implement
public class ScheduleRemover {

    private final ScheduleRepository scheduleRepository;

    public ScheduleRemover(final ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @Transactional
    public void deleteSchedule(final long memberId, final long scheduleId) {
        ScheduleJpaEntity scheduleJpaEntity = scheduleRepository.getById(scheduleId);
        scheduleJpaEntity.validateMember(memberId);
        scheduleRepository.delete(scheduleJpaEntity);
    }

    @Transactional
    public void deleteAllByMeetingIdIn(final List<Long> meetingIds) {
        if (!meetingIds.isEmpty()) {
            scheduleRepository.deleteAllByMeetingIdIn(meetingIds);
        }
    }
}