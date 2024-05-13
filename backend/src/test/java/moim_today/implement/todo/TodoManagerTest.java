package moim_today.implement.todo;

import moim_today.domain.todo.enums.TodoProgress;
import moim_today.dto.todo.MemberTodoResponse;
import moim_today.dto.todo.TodoUpdateRequest;
import moim_today.global.error.ForbiddenException;
import moim_today.global.error.NotFoundException;
import moim_today.persistence.entity.moim.joined_moim.JoinedMoimJpaEntity;
import moim_today.persistence.entity.todo.TodoJpaEntity;
import moim_today.util.ImplementTest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

import static moim_today.global.constant.exception.TodoExceptionConstant.TODO_NOT_FOUND_ERROR;
import static moim_today.global.constant.exception.TodoExceptionConstant.TODO_NOT_OWNER_ERROR;
import static moim_today.util.TestConstant.*;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

class TodoManagerTest extends ImplementTest {

    @Autowired
    private TodoManager todoManager;

    private final LocalDateTime UPDATE_AFTER_START_TIME =
            LocalDateTime.of(1, 1, 1, 1, 11, 1);
    private final LocalDateTime UPDATE_AFTER_END_TIME =
            LocalDateTime.of(1200, 12, 12, 12, 8, 8, 8);

    @DisplayName("모임의 모든 멤버의 시작, 끝 기간에 맞는 Todo를 모두 가져온다")
    @Test
    void findAllMembersTodosInMoim() {

        // given1
        final long MEMBER_SIZE = 4;
        final long EACH_MEMBER_TODO_SIZE_IN_MOIM = 2;

        for (long i = 0; i < MEMBER_SIZE; i++) {
            JoinedMoimJpaEntity joinedMoimJpaEntity = JoinedMoimJpaEntity.builder()
                    .memberId(MEMBER_ID.longValue() + i)
                    .moimId(MOIM_ID.longValue())
                    .build();

            joinedMoimRepository.save(joinedMoimJpaEntity);
        }

        for (long i = 0; i < MEMBER_SIZE; i++) {
            TodoJpaEntity todoJpaEntity1 = TodoJpaEntity.builder()
                    .memberId(MEMBER_ID.longValue() + i)
                    .moimId((MOIM_ID.longValue()))
                    .startDateTime(LocalDateTime.of(2024, 5, 11, 0, 0, 0))
                    .endDateTime(LocalDateTime.of(2024, 5, 11, 6, 0, 0))
                    .build();

            TodoJpaEntity todoJpaEntity2 = TodoJpaEntity.builder()
                    .memberId(MEMBER_ID.longValue() + i)
                    .moimId((MOIM_ID.longValue()))
                    .startDateTime(LocalDateTime.of(2024, 5, 11, 0, 0, 0))
                    .endDateTime(LocalDateTime.of(2024, 6, 1, 0, 0, 0))
                    .build();

            todoRepository.save(todoJpaEntity1);
            todoRepository.save(todoJpaEntity2);
        }

        // given2
        TodoJpaEntity outOfDateRangeTodo = TodoJpaEntity.builder()
                .memberId(MEMBER_ID.longValue())
                .moimId((MOIM_ID.longValue()))
                .startDateTime(LocalDateTime.of(2024, 5, 11, 0, 0, 0))
                .endDateTime(LocalDateTime.of(2024, 7, 11, 0, 0, 0))
                .build();

        // given3
        TodoJpaEntity anotherMoimTodo = TodoJpaEntity.builder()
                .memberId(MEMBER_ID.longValue())
                .moimId((MOIM_ID.longValue())+1L)
                .startDateTime(LocalDateTime.of(2024, 5, 11, 0, 0, 0))
                .endDateTime(LocalDateTime.of(2024, 6, 11, 0, 0, 0))
                .build();


        todoRepository.save(outOfDateRangeTodo);
        todoRepository.save(anotherMoimTodo);

        // when
        List<MemberTodoResponse> membersDataRangeTodosInMoim = todoManager.findAllMembersTodosInMoim(MOIM_ID.longValue(),
                YearMonth.of(2024, 5), 1);

        membersDataRangeTodosInMoim.forEach(System.out::println);

        // then
        assertThat(membersDataRangeTodosInMoim.size()).isEqualTo(MEMBER_SIZE);
        membersDataRangeTodosInMoim.forEach(m -> {
            assertThat(m.todoResponses().size()).isEqualTo(EACH_MEMBER_TODO_SIZE_IN_MOIM);
        });
    }

    @DisplayName("Todo를 업데이트할 때, Todo가 존재하지 않으면 에러가 발생한다")
    @Test
    void updateTodoNotFoundErrorTest() {
        // given
        TodoUpdateRequest todoUpdateRequest = new TodoUpdateRequest(1, 1,
                UPDATE_AFTER_CONTENT.value(), TodoProgress.ACTIVE, UPDATE_AFTER_START_TIME, UPDATE_AFTER_END_TIME);

        // expected
        Assertions.assertThatThrownBy(() -> todoManager.updateTodo(MEMBER_ID.longValue(), todoUpdateRequest))
                .isInstanceOf(NotFoundException.class)
                .hasMessage(TODO_NOT_FOUND_ERROR.message());
    }

    @DisplayName("Todo를 업데이트할 때, Todo의 주인이 아니면 에러가 발생한다")
    @Test
    void updateTodoNotTodoOnwerErrorTest() {
        // given1
        TodoUpdateRequest todoUpdateRequest = new TodoUpdateRequest(TODO_ID.longValue(), MOIM_ID.longValue(),
                UPDATE_AFTER_CONTENT.value(), TodoProgress.ACTIVE, UPDATE_AFTER_START_TIME, UPDATE_AFTER_END_TIME);

        // given2
        TodoJpaEntity originalTodo = TodoJpaEntity.builder()
                .memberId(MEMBER_ID.longValue())
                .moimId(MOIM_ID.longValue())
                .contents(UPDATE_BEFORE_CONTENT.value())
                .todoProgress(TodoProgress.PENDING)
                .startDateTime(LocalDateTime.of(1000, 1, 1, 1, 1, 1))
                .endDateTime(LocalDateTime.of(1500, 5, 5, 5, 5, 5))
                .build();

        todoRepository.save(originalTodo);

        // expected
        Assertions.assertThatThrownBy(() -> todoManager.updateTodo(MEMBER_ID.longValue()+1L, todoUpdateRequest))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage(TODO_NOT_OWNER_ERROR.message());
    }

    @DisplayName("Todo를 업데이트한다")
    @Test
    void updateTodoTest() {
        // given1
        TodoJpaEntity originalTodo = TodoJpaEntity.builder()
                .memberId(MEMBER_ID.longValue())
                .moimId(MOIM_ID.longValue())
                .contents(UPDATE_BEFORE_CONTENT.value())
                .todoProgress(TodoProgress.PENDING)
                .startDateTime(LocalDateTime.of(1000, 1, 1, 1, 1, 1))
                .endDateTime(LocalDateTime.of(1500, 5, 5, 5, 5, 5))
                .build();

        todoRepository.save(originalTodo);

        // given2
        TodoUpdateRequest todoUpdateRequest = new TodoUpdateRequest(originalTodo.getId(), MOIM_ID.longValue(),
                UPDATE_AFTER_CONTENT.value(), TodoProgress.ACTIVE, UPDATE_AFTER_START_TIME, UPDATE_AFTER_END_TIME);

        // expected
        assertThatCode(() -> todoManager.updateTodo(MEMBER_ID.longValue(), todoUpdateRequest))
                .doesNotThrowAnyException();
    }
}