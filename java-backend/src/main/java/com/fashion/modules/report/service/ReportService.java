package com.fashion.modules.report.service;

import java.text.ParseException;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.poi.ss.usermodel.Workbook;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.report.model.ReportRes;

public interface ReportService {

	ReportRes getOrderByDate(String fromDate, String toDate, Integer top, SortType sortOrder) throws ParseException;
	
	Pair<Workbook,String> getOrderReport(String fromDate, String toDate, Integer top) throws ParseException;
}
