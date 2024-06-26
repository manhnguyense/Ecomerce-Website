package com.fashion.modules.complain.model;

import com.fashion.commons.enums.ComplainType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplainVM extends ComplainRequest {

	private Integer id;
	
	private ComplainType state;
	
}
