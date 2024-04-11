package moim_today.presentation.university;

import moim_today.application.department.DepartmentService;
import moim_today.application.university.UniversityService;
import moim_today.dto.department.DepartmentInfoResponse;
import moim_today.dto.university.UniversityInfoResponse;
import moim_today.global.response.CollectionResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/universities")
@RestController
public class UniversityController {

    private final UniversityService universityService;
    private final DepartmentService departmentService;

    public UniversityController(final UniversityService universityService, final DepartmentService departmentService) {
        this.universityService = universityService;
        this.departmentService = departmentService;
    }

    @PostMapping
    public void updateCollegeInfo(){
        universityService.putAllUniversity();
    }

    @PostMapping("/departments")
    public void updateDepartmentInfo(){
        departmentService.putAllDepartment();
    }

    @GetMapping
    public CollectionResponse<List<UniversityInfoResponse>> getUniversity(){
        return CollectionResponse.of(universityService.getUniversities());
    }

    @GetMapping("/departments")
    public CollectionResponse<List<DepartmentInfoResponse>> getDepartments(@RequestParam(defaultValue = "-1", required = false) long universityId,
                                                                                  @RequestParam(defaultValue = "", required = false) String universityName){
        return CollectionResponse.of(departmentService.getAllDepartment(universityId, universityName));
    }
}
