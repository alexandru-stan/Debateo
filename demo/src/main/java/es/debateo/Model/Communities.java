package es.debateo.Model;



import org.apache.tomcat.util.codec.binary.Base64;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Communities {

	@Id
	@Column(name="community_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long communityId;
	
	@Column(name="community_name")
	String communityName;
	
	@Column(name="community_description")
	String communityDescription;
	
	@Column(name="community_image")
	byte[] communityImage;
	
	@Column(name="community_background_image")
	byte[] communityBackgroundImage;
	
	@Column(name="community_members")
	int communityMembers;
	
	@Column(name="community_creator")
	String communityCreator;
	
	@Column(name="sensitive_content")
	boolean sensitiveContent;
	
	@Column(name="categoria")
	long categoria;

	public Communities(long communityId, String communityName, String communityDescription, byte[] communityImage,
			byte[] communityBackgroundImage, int communityMembers, String communityCreator, boolean sensitiveContent,
			long categoria) {
		super();
		this.communityId = communityId;
		this.communityName = communityName;
		this.communityDescription = communityDescription;
		this.setCommunityImage(communityImage);
		this.setCommunityBackgroundImage(communityBackgroundImage);
		this.communityMembers = communityMembers;
		this.communityCreator = communityCreator;
		this.sensitiveContent = sensitiveContent;
		this.categoria = categoria;
	}

	
	
	public Communities(long communityId, String communityName) {
		super();
		this.communityId = communityId;
		this.communityName = communityName;
	}



	public Communities() {
		super();
	}

	public long getCommunityId() {
		return communityId;
	}

	public void setCommunityId(long communityId) {
		this.communityId = communityId;
	}

	public String getCommunityName() {
		return communityName;
	}

	public void setCommunityName(String communityName) {
		this.communityName = communityName;
	}

	public String getCommunityDescription() {
		return communityDescription;
	}

	public void setCommunityDescription(String communityDescription) {
		this.communityDescription = communityDescription;
	}

	public byte[] getCommunityImage() {
		return communityImage;
	}

	public void setCommunityImage(byte[] communityImage) {
		
		byte[] imagenCodificada = Base64.encodeBase64(communityImage,false);
		this.communityImage= imagenCodificada;
		
	}

	public byte[] getCommunityBackgroundImage() {
		return communityBackgroundImage;
	}

	public void setCommunityBackgroundImage(byte[] communityBackgroundImage) {
		byte[] imagenCodificada = Base64.encodeBase64(communityBackgroundImage,false);
		this.communityBackgroundImage= imagenCodificada;
	}

	public int getCommunityMembers() {
		return communityMembers;
	}

	public void setCommunityMembers(int communityMembers) {
		this.communityMembers = communityMembers;
	}

	public String getCommunityCreator() {
		return communityCreator;
	}

	public void setCommunityCreator(String communityCreator) {
		this.communityCreator = communityCreator;
	}

	public boolean isSensitiveContent() {
		return sensitiveContent;
	}

	public void setSensitiveContent(boolean sensitiveContent) {
		this.sensitiveContent = sensitiveContent;
	}

	public long getCategoria() {
		return categoria;
	}

	public void setCategoria(long categoria) {
		this.categoria = categoria;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
}