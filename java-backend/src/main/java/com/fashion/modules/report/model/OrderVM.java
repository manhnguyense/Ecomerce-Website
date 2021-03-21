package com.fashion.modules.report.model;

import java.math.BigDecimal;
import java.util.List;

import com.fashion.commons.enums.OrderType;

import lombok.Data;

@Data
public class OrderVM {
	private Integer id;
	private String customerName;
	private OrderType state;
	private BigDecimal total;
	private Integer discount;
	private List<OrderDetailVM> orderDetails;
}