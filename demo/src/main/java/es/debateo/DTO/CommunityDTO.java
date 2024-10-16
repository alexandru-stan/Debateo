package es.debateo.DTO;

import jakarta.persistence.Column;

public class CommunityDTO {

	
long communityId;
	

	String communityName;
	

	String communityDescription;
	
	
	byte[] communityImage;
	

	byte[] communityBackgroundImage;
	

	long communityMembers;
	

	String communityCreator;
	
	
	boolean sensitiveContent;
	
	
	long categoria;
	
	String subscription;

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
		this.communityImage = communityImage;
	}

	public byte[] getCommunityBackgroundImage() {
		return communityBackgroundImage;
	}

	public void setCommunityBackgroundImage(byte[] communityBackgroundImage) {
		this.communityBackgroundImage = communityBackgroundImage;
	}

	public long getCommunityMembers() {
		return communityMembers;
	}

	public void setCommunityMembers(long communityMembers) {
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

	public String getSubscription() {
		return subscription;
	}

	public void setSubscription(String subscription) {
		this.subscription = subscription;
	}

	public CommunityDTO(long communityId, String communityName, String communityDescription, byte[] communityImage,
			byte[] communityBackgroundImage, long communityMembers, String communityCreator, 
			long categoria) {
		super();
		this.communityId = communityId;
		this.communityName = communityName;
		this.communityDescription = communityDescription;
		this.communityImage = communityImage;
		this.communityBackgroundImage = communityBackgroundImage;
		this.communityMembers = communityMembers;
		this.communityCreator = communityCreator;
	
		this.categoria = categoria;
	
	}

	public CommunityDTO() {
		super();
	}

	
	
	
	
	
	
	
}
