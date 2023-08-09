package org.kosta.recipekithub.model.exception;

public class NotEnoughStockException extends Exception{

	private static final long serialVersionUID = 7749742268713967517L;
	public NotEnoughStockException(String message) {
		super(message);
	}
}
