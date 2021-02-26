package com.fashion.modules.promotion.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.promotion.domain.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
	
	Promotion findOneById(Integer id);
	
	@Query(" SELECT p " 
			+ " FROM Promotion p " 
			+ " WHERE p.store.id = :storeId")
	Page<Promotion> findAllByStore(@Param("storeId") Integer storeId, Pageable page);
	
	@Query(" SELECT p " 
			+ " FROM Promotion p " 
			+ " WHERE p.startDate >= :from AND p.startDate <= :to")
	List<Promotion> findPromotionValidDate(
			@Param("from") Date from ,
			@Param("to") Date to);	
	
	Promotion findOnePromotionByCode(String code);
	
}
