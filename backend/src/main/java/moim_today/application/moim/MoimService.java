package moim_today.application.moim;

import moim_today.dto.moim.MoimAppendRequest;
import moim_today.dto.moim.MoimDetailResponse;
import moim_today.dto.moim.MoimUpdateRequest;
import moim_today.dto.moim.UploadMoimImageResponse;
import org.springframework.web.multipart.MultipartFile;

public interface MoimService {

    void createMoim(final long memberId, final long universityId,
                    final MoimAppendRequest moimAppendRequest);

    UploadMoimImageResponse uploadMoimImage(final MultipartFile file);

    MoimDetailResponse getMoimDetail(final long moimId);

    void updateMoim(final long memberId, final MoimUpdateRequest moimUpdateRequest);
}
