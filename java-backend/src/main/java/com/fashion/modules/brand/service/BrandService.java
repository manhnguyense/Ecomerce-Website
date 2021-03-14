package com.fashion.modules.brand.service;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.brand.model.BrandVM;

public interface BrandService {

	BrandVM createBrand(BrandVM req);

	BrandVM findById(Integer id);

	Page<BrandVM> findAllByStore(Integer page, Integer pageSize, String brandName, SortEnum sortOrder,
			String sortField);

	BrandVM deleteBrand(Integer id, Integer page, Integer pageSize, String brandName, SortEnum sortOrder,
			String sortField);

	Page<BrandVM> seachBrandByStoreAndKeyword(String brandName, SortEnum sortOrder, Integer page, Integer pageSize,
			String sortField);

}
