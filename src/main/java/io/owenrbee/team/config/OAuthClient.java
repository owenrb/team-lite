package io.owenrbee.team.config;

public class OAuthClient {

	private String clientId;
	private String clientSecret;

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getClientSecret() {
		return clientSecret;
	}

	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}
	
	@Override
	public String toString() {
		return String.format("%s:%s", clientId, clientSecret);
	}

}
