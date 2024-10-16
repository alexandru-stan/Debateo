package es.debateo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import es.debateo.DTO.CommunityDTO;
import es.debateo.Model.Communities;
public interface communitiesRepo extends JpaRepository<Communities,Long> {

	@Query("SELECT new Communities(c.communityId, c.communityName) FROM Communities c WHERE c.communityName LIKE :param%")
    List<Communities> search(@Param("param") String cadena);
	
	
	@Query("SELECT new es.debateo.DTO.CommunityDTO("
			+ "c.communityId,"
			+ "c.communityName,"
			+ "c.communityDescription,"
			+ "c.communityImage,"
			+ "c.communityBackgroundImage,"
			+ "c.communityMembers,"
			+ "c.communityCreator,"
			+ "c.categoria) "
			+ " FROM Communities c "
			+ "WHERE c.communityId=:id")
	CommunityDTO getCommunityData(@Param("id") long id);
	
	int countByCommunityCreator(String communityCreator);
	
	
	@Query("SELECT c FROM Communities c "
			+ "ORDER BY (SELECT COUNT(s) FROM Subscriptions s WHERE s.communityId = c.communityId) DESC "
			+ "LIMIT 3")
	List<Communities> recommend();
	
	@Query("SELECT new es.debateo.Model.Communities(c.communityId, c.communityName, c.communityImage) " 
		       + "FROM Communities c "
		       + "WHERE (EXISTS (SELECT s FROM Subscriptions s WHERE s.communityId = c.communityId " 
		       + "AND s.username = :username AND s.subscriptionLevel <> 'BANNED' )) OR c.communityCreator = :username ")
		List<Communities> getSubscribedCommunities(@Param("username") String username);

	@Query("SELECT new es.debateo.Model.Communities(c.communityId, c.communityName, c.communityImage), COUNT(DISTINCT p.publicationId) as score "
			+ " FROM Communities  c"
			+ " LEFT JOIN Posts p "
			+ "	ON p.community = c.communityId"
			+ " GROUP BY c.communityId"
			+ " ORDER BY score DESC "
			+ "  "
			)
	List<Communities> getHotCommunities();
			
}
