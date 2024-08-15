async function fetchProducts() {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            products {
              id
              name
              price
              description
              imageUrl
            }
          }
        `,
      }),
    });
    
    const result = await response.json();
    return result.data.products;
  }
  
  async function displayProducts() {
    const products = await fetchProducts();
    const productsContainer = document.getElementById('products');
    
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      
      productElement.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>$${product.price.toFixed(2)}</strong></p>
      `;
      
      productsContainer.appendChild(productElement);
    });
  }
  
  displayProducts();