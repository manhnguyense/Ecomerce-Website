package com.fashion.modules.store.service.impl;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.constants.ErrorMessage;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.product.repository.ProductRepository;
import com.fashion.modules.promotion.model.PromotionVM;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.model.StoreVM;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.modules.store.service.StoreService;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class StoreServiceImpl extends BaseService implements StoreService {

	@Autowired
	private StoreRepository storeRepo;
	
	@Autowired
	private ProductRepository producRepo;

	@Transactional
	@Override
	public StoreVM getStore(final Integer id) {
		final Store store = storeRepo.findOneById(id);
		final StoreVM storeVM = mapper.map(store, StoreVM.class);
		storeVM.setPromotions(store.getPromotions().stream()
				.filter(it -> (Calendar.getInstance().getTime().compareTo(it.getEndDate())) < 1)
				.map(i -> mapper.map(i, PromotionVM.class)).collect(Collectors.toList()));
		storeVM.setTotalProduct(
				producRepo.findAllProductStore(id, PageRequest.of(0, Integer.MAX_VALUE)).getContent().size());
		return storeVM;
	}

	@Transactional
	@Override
	public Page<StoreVM> getStores(final String storeName, final SortType sortOrder, final String sortField,
			final Integer page, final Integer pageSize) {
		if (StringUtils.isEmpty(storeName)) {
			return storeRepo.findAll(PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> mapper.map(it, StoreVM.class));
		}
		return searchStore(storeName, sortOrder, sortField, page, pageSize);
	}

	@Transactional
	@Override
	public StoreVM updateStore(final StoreReq req, final Integer id) {
		final Store store = storeRepo.findOneById(id);
		mapper.map(req, store);
		return mapper.map(store, StoreVM.class);
	}

	@Transactional
	@Override
	public StoreVM deleteStore(final Integer id, final String storeName, final SortType sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		storeRepo.deleteById(id);
		final List<StoreVM> content = getStores(storeName, sortOrder, sortField, page, pageSize).getContent();
		if (CollectionUtils.isEmpty(content)) {
			return null;
		}
		final StoreVM last = Iterables.getLast(content);
		return CollectionUtils.isNotEmpty(content) && id != last.getId() ? last : null;
	}

	@Override
	@Transactional
	public StoreVM createStore(final StoreReq req) {
		final Store store = mapper.map(req, Store.class);
		try {
			return mapper.map(storeRepo.save(store), StoreVM.class);
		} catch (Exception e) {
			throw new InvalidArgumentException(ErrorMessage.DUPLICATE_STORE);
		}

	}

	@Override
	@Transactional
	public List<StoreVM> getStoreByIds(final List<Integer> ids) {
		return storeRepo.getStoreByIds(ids).stream().map(it -> mapper.map(it, StoreVM.class))
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public Page<StoreVM> searchStore(final String storeName, final SortType sortOrder, final String sortField,
			final Integer page, final Integer pageSize) {
		return storeRepo
				.seachStoreByKeyWord(storeName,
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, StoreVM.class));
	}

	@Override
	@Transactional
	public String existedStoreName(final String storeName) {
		final Store store = storeRepo.findByStoreName(storeName);
		if (store != null) {
			return Constants.EXISTED;
		}
		throw new InvalidArgumentException(Constants.NOT_EXISTED);
	}

}
