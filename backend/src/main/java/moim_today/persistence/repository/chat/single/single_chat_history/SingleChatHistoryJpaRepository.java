package moim_today.persistence.repository.chat.single.single_chat_history;

import moim_today.persistence.entity.chat.single.single_chat_history.SingleChatHistoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SingleChatHistoryJpaRepository extends JpaRepository<SingleChatHistoryJpaEntity, Long> {
}