const app = new Vue({
  el: '#app',
  data: {
      products: [],
      selectedCategory: 'Men',
  },
  computed: {
      filteredProducts() {
          const filtered = this.products.filter(product => product.category_name === this.selectedCategory);
          console.log('filtered:', { filtered })
          return filtered
      },
  },
  methods: {
      async fetchData() {
          try {
              const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');

              if (!response.ok) {
                  throw new Error(`Failed to fetch. Status: ${response.status}`);
              }

              const data = await response.json();
              this.products = data.categories;
          } catch (error) {
              console.error('Error fetching data:', error.message);
          }
      },

      showProducts(category) {
          this.selectedCategory = category;
      },

      calculateDiscount(price, compareAtPrice) {
  price = parseFloat(price);
  compareAtPrice = parseFloat(compareAtPrice);

  if (isNaN(price) || isNaN(compareAtPrice) || compareAtPrice <= price) {
      return '0'; 
  }

  const discount = ((compareAtPrice - price) / compareAtPrice) * (100);
  return discount.toFixed(2);
},
},
mounted() {
this.fetchData();
},
});