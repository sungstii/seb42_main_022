package community.member.mapper;

import community.member.dto.LevelDto;
import community.member.dto.MemberDto;
import community.member.entity.Level;
import community.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponse(Member member, LevelDto levelDto);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);

    LevelDto levelToLevelResponse(Level level); // 레벨 dto


}

