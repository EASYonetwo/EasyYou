package com.easy.you.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 6957724606292924777L;
	
	public ResourceNotFoundException(String message) {
		super(message);
	}
	
}
