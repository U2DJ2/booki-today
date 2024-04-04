package moim_today.application.file;

import moim_today.domain.member.MemberSession;
import moim_today.dto.file.FileDeleteRequest;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    void uploadFile(final MemberSession memberSession, final MultipartFile multipartFile);

    void deleteFile(final FileDeleteRequest fileDeleteRequest);
}
