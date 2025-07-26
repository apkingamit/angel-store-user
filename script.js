// GitHub repository details
const REPO_OWNER = 'apkingamit';
const REPO_NAME = 'angel-store-data';
const CATEGORIES_FILE = 'categories.json';
const PRODUCTS_FILE = 'products.json';

// DOM Elements
const categoriesContainer = document.getElementById('categories-container');
const productsContainer = document.getElementById('products-container');
const categoryTitle = document.getElementById('category-title');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
});

// Load categories from GitHub
async function loadCategories() {
    try {
        const response = await fetch(
            `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${CATEGORIES_FILE}`
        );
        
        if (!response.ok) throw new Error('Failed to load categories');
        
        const categories = await response.json();
        renderCategories(categories);
    } catch (error) {
        console.error('Error loading categories:', error);
        categoriesContainer.innerHTML = '<p>Error loading categories. Please try again later.</p>';
    }
}

// Render categories
function renderCategories(categories) {
    categoriesContainer.innerHTML = '';
    
    if (categories.length === 0) {
        categoriesContainer.innerHTML = '<p>No categories available.</p>';
        return;
    }
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-image">
                ${category.image ? `<img src="${category.image}" alt="${category.name}">` : '📁'}
            </div>
            <div class="category-info">
                <h3 class="category-name">${category.name}</h3>
            </div>
        `;
        
        categoryCard.addEventListener('click', () => {
            filterProductsByCategory(category.id);
            categoryTitle.textContent = category.name;
        });
        
        categoriesContainer.appendChild(categoryCard);
    });
}

// Load products from GitHub
async function loadProducts() {
    try {
        const response = await fetch(
            `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${PRODUCTS_FILE}`
        );
        
        if (!response.ok) throw new Error('Failed to load products');
        
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Render products
function renderProducts(products) {
    productsContainer.innerHTML = '';
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products available.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '📦'}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">₹${product.price}</div>
                <p class="product-description">${product.description || ''}</p>
                <a href="${product.affiliateLink}" target="_blank" class="buy-btn">Buy Now</a>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Filter products by category
function filterProductsByCategory(categoryId) {
    fetch(
        `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${PRODUCTS_FILE}`
    )
    .then(response => {
        if (!response.ok) throw new Error('Failed to load products');
        return response.json();
    })
    .then(products => {
        const filteredProducts = products.filter(product => product.categoryId === categoryId);
        renderProducts(filteredProducts);
    })
    .catch(error => {
        console.error('Error filtering products:', error);
        productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
    });
                     }
