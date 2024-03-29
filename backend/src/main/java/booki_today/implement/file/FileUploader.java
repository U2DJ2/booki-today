package booki_today.implement.file;

import booki_today.dto.file.FileAddRequest;
import booki_today.global.annotation.Implement;
import booki_today.global.error.InternalServerException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static booki_today.global.constant.FileExceptionConstant.FILE_UPLOAD_ERROR;

@Slf4j
@Implement
public class FileUploader {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public FileUploader(final AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public void uploadFile(final FileAddRequest fileAddRequest, final MultipartFile multipartFile) {
        String uploadFilePath = fileAddRequest.uploadFilePath();
        List<FileAddRequest> s3files = new ArrayList<>();

        String originalFileName = multipartFile.getOriginalFilename();
        String uploadFileName = fileAddRequest.studentId()+"-"+originalFileName;

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try (InputStream inputStream = multipartFile.getInputStream()) {

            String keyName = uploadFilePath + "/" + uploadFileName;

            amazonS3.putObject(
                    new PutObjectRequest(bucketName, keyName, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead));

            String uploadFileUrl = amazonS3.getUrl(bucketName, keyName).toString();

        } catch (IOException e) {
            log.error("Exception [Err_Location]: {}", e.getStackTrace()[0]);
            throw new InternalServerException(FILE_UPLOAD_ERROR.message());
        }
    }
}
