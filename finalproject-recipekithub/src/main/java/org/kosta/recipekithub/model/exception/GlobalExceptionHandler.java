package org.kosta.recipekithub.model.exception;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public void handleGlobalException(Exception ex, Model model) {
    	System.out.println(" ?");
        model.addAttribute("errorMessage", "An error occurred: " + ex.getMessage());
    }
} 
