package com.fashion.modules.product.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDetailVM {
	
	private Integer sizeId;
	
	private String size;
	
	private Integer colorId;
	
	private String color;
	
	private Integer quantity;

}
