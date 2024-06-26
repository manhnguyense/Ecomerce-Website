package com.fashion.modules.product.domain;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.store.domain.Store;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

@Entity
@Table(name = "product")
@Access(AccessType.FIELD)
@Indexed
public class Product extends AbstractAuditingEntity {

	private static final long serialVersionUID = 8690924342016681887L;

	@Field
	@Column(name = "product_name")
	private String productName;

	@Field
	@Column(name = "price")
	private BigDecimal price;

	@Column(name = "description")
	private String description;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	@IndexedEmbedded
	private Category category;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "brand_id")
	@IndexedEmbedded
	private Brand brand;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "store_id")
	private Store store;

	public String getDescription() {
		return description;
	}

	public void setDescription(final String description) {
		this.description = description;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
	private Set<Comment> comments = Sets.newHashSet();

	@JsonIgnore
	@IndexedEmbedded
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
	private List<ProductDetail> productDetails = Lists.newArrayList();

	@JsonIgnore
	@IndexedEmbedded
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
	private Set<ProductImage> productImages = Sets.newHashSet();

	public String getProductName() {
		return productName;
	}

	public void setProductName(final String productName) {
		this.productName = productName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(final BigDecimal price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(final Category category) {
		this.category = category;
	}

	public Brand getBrand() {
		return brand;
	}

	public void setBrand(final Brand brand) {
		this.brand = brand;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(final Store store) {
		this.store = store;
	}

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(final Set<Comment> comments) {
		this.comments = comments;
	}

	public List<ProductDetail> getProductDetails() {
		return productDetails;
	}

	public void setProductDetails(final List<ProductDetail> productDetails) {
		this.productDetails = productDetails;
	}

	public Set<ProductImage> getProductImages() {
		return productImages;
	}

	public void setProductImages(final Set<ProductImage> productImages) {
		this.productImages = productImages;
	}

}
