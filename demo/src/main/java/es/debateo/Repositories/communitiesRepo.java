package es.debateo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import es.debateo.Model.Communities;
public interface communitiesRepo extends JpaRepository<Communities,Long> {

	@Query("SELECT new Communities(c.communityId, c.communityName) FROM Communities c WHERE c.communityName LIKE :param%")
    List<Communities> search(@Param("param") String cadena);
	
	Communities findCommunitiesByCommunityId(long communityId);
				
}