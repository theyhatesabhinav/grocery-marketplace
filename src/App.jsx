import { useEffect, useMemo, useState } from 'react'

const demoVendors = [
  {
    id: 'vendor-1',
    ownerName: 'Aman Verma',
    shopName: 'Fresh Basket',
    products: [
      { id: 'p-1', name: 'Rice', price: 42, unit: 'kg', category: 'Grains' },
      { id: 'p-2', name: 'Milk', price: 32, unit: 'litre', category: 'Dairy' },
      { id: 'p-3', name: 'Tomato', price: 24, unit: 'kg', category: 'Vegetables' },
    ],
  },
  {
    id: 'vendor-2',
    ownerName: 'Neha Singh',
    shopName: 'Daily Needs',
    products: [
      { id: 'p-4', name: 'Bread', price: 38, unit: 'packet', category: 'Bakery' },
      { id: 'p-5', name: 'Eggs', price: 58, unit: 'dozen', category: 'Protein' },
      { id: 'p-6', name: 'Banana', price: 30, unit: 'dozen', category: 'Fruits' },
    ],
  },
]

const STORAGE_KEYS = {
  vendors: 'grocery-market-vendors',
  vendorSession: 'grocery-market-vendor-session',
  customerCart: 'grocery-market-customer-cart',
}

const loadState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch (error) {
    return fallback
  }
}

const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

function App() {
  const [vendors, setVendors] = useState(() => loadState(STORAGE_KEYS.vendors, demoVendors))
  const [activeRole, setActiveRole] = useState('customer')
  const [vendorSession, setVendorSession] = useState(() => loadState(STORAGE_KEYS.vendorSession, null))
  const [customerCart, setCustomerCart] = useState(() => loadState(STORAGE_KEYS.customerCart, []))
  const [shopFilter, setShopFilter] = useState('')
  const [selectedShopId, setSelectedShopId] = useState(demoVendors[0].id)
  const [vendorForm, setVendorForm] = useState({ ownerName: '', shopName: '' })
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    unit: '',
    category: 'Vegetables',
  })

  useEffect(() => {
    saveState(STORAGE_KEYS.vendors, vendors)
  }, [vendors])

  useEffect(() => {
    saveState(STORAGE_KEYS.vendorSession, vendorSession)
  }, [vendorSession])

  useEffect(() => {
    saveState(STORAGE_KEYS.customerCart, customerCart)
  }, [customerCart])

  const selectedShop = useMemo(
    () => vendors.find((shop) => shop.id === selectedShopId) || vendors[0],
    [vendors, selectedShopId],
  )

  const filteredShops = useMemo(() => {
    const keyword = shopFilter.trim().toLowerCase()
    if (!keyword) return vendors
    return vendors.filter(
      (shop) =>
        shop.shopName.toLowerCase().includes(keyword) ||
        shop.ownerName.toLowerCase().includes(keyword),
    )
  }, [vendors, shopFilter])

  const totalCartValue = useMemo(
    () => customerCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [customerCart],
  )

  const createVendor = (event) => {
    event.preventDefault()
    const ownerName = vendorForm.ownerName.trim()
    const shopName = vendorForm.shopName.trim()

    if (!ownerName || !shopName) {
      alert('Please enter both vendor name and shop name.')
      return
    }

    const newVendor = {
      id: `vendor-${Date.now()}`,
      ownerName,
      shopName,
      products: [],
    }

    setVendors((current) => [newVendor, ...current])
    setSelectedShopId(newVendor.id)
    setVendorSession(newVendor)
    setVendorForm({ ownerName: '', shopName: '' })
    setActiveRole('vendor')
  }

  const addProduct = (event) => {
    event.preventDefault()
    const name = productForm.name.trim()
    const unit = productForm.unit.trim()
    const price = Number(productForm.price)

    if (!vendorSession) {
      alert('Please login as a vendor first.')
      return
    }

    if (!name || !unit || !price || Number.isNaN(price) || price <= 0) {
      alert('Please enter valid product details.')
      return
    }

    const nextProduct = {
      id: `product-${Date.now()}`,
      name,
      price,
      unit,
      category: productForm.category,
    }

    setVendors((current) =>
      current.map((shop) =>
        shop.id === vendorSession.id
          ? { ...shop, products: [nextProduct, ...shop.products] }
          : shop,
      ),
    )

    setProductForm({
      name: '',
      price: '',
      unit: '',
      category: 'Vegetables',
    })
  }

  const removeProduct = (productId) => {
    if (!vendorSession) return

    setVendors((current) =>
      current.map((shop) =>
        shop.id === vendorSession.id
          ? { ...shop, products: shop.products.filter((item) => item.id !== productId) }
          : shop,
      ),
    )
  }

  const addToCart = (product) => {
    setCustomerCart((current) => {
      const existing = current.find((item) => item.productId === product.id && item.shopId === selectedShop.id)

      if (existing) {
        return current.map((item) =>
          item.productId === product.id && item.shopId === selectedShop.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...current,
        {
          cartId: `cart-${Date.now()}`,
          shopId: selectedShop.id,
          shopName: selectedShop.shopName,
          productId: product.id,
          productName: product.name,
          price: product.price,
          unit: product.unit,
          quantity: 1,
        },
      ]
    })
  }

  const updateCartQuantity = (cartId, delta) => {
    setCustomerCart((current) =>
      current
        .map((item) =>
          item.cartId === cartId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const checkoutCart = () => {
    if (!customerCart.length) {
      alert('Your cart is empty.')
      return
    }

    const shopNames = [...new Set(customerCart.map((item) => item.shopName))]
    alert(
      `Order placed successfully from ${shopNames.join(', ')}. Total: ₹${totalCartValue}.`,
    )
    setCustomerCart([])
  }

  const currentVendorProducts = vendorSession
    ? vendors.find((shop) => shop.id === vendorSession.id)?.products || []
    : []

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Marketplace</p>
          <h1>Grocery Town</h1>
        </div>
        <div className="role-switcher">
          <button
            className={activeRole === 'customer' ? 'role active' : 'role'}
            onClick={() => setActiveRole('customer')}
          >
            Customer
          </button>
          <button
            className={activeRole === 'vendor' ? 'role active' : 'role'}
            onClick={() => setActiveRole('vendor')}
          >
            Vendor
          </button>
        </div>
      </header>

      {activeRole === 'customer' ? (
        <main className="content-grid customer-grid">
          <section className="panel">
            <div className="panel-header">
              <h2>Shops</h2>
              <input
                type="search"
                placeholder="Search shop"
                value={shopFilter}
                onChange={(event) => setShopFilter(event.target.value)}
              />
            </div>

            <div className="shop-list">
              {filteredShops.length ? (
                filteredShops.map((shop) => (
                  <button
                    key={shop.id}
                    className={selectedShopId === shop.id ? 'shop-card selected' : 'shop-card'}
                    onClick={() => setSelectedShopId(shop.id)}
                  >
                    <div>
                      <strong>{shop.shopName}</strong>
                      <small>{shop.ownerName}</small>
                    </div>
                    <span>{shop.products.length} items</span>
                  </button>
                ))
              ) : (
                <p className="empty-state">No shops found.</p>
              )}
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>{selectedShop?.shopName || 'Select a shop'}</h2>
              <span>{selectedShop?.ownerName}</span>
            </div>

            <div className="product-grid">
              {selectedShop?.products?.length ? (
                selectedShop.products.map((product) => (
                  <article key={product.id} className="product-card">
                    <div className="product-tag">{product.category}</div>
                    <h3>{product.name}</h3>
                    <p>
                      ₹{product.price} / {product.unit}
                    </p>
                    <button className="primary-button" onClick={() => addToCart(product)}>
                      Add to cart
                    </button>
                  </article>
                ))
              ) : (
                <p className="empty-state">This shop has no products yet.</p>
              )}
            </div>
          </section>

          <aside className="panel cart-panel">
            <div className="panel-header">
              <h2>Cart</h2>
            </div>

            {customerCart.length ? (
              <>
                <div className="cart-items">
                  {customerCart.map((item) => (
                    <div key={item.cartId} className="cart-item">
                      <div>
                        <strong>{item.productName}</strong>
                        <small>
                          {item.shopName} • ₹{item.price} / {item.unit}
                        </small>
                      </div>

                      <div className="quantity-control">
                        <button onClick={() => updateCartQuantity(item.cartId, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.cartId, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-box">
                  <div>
                    <span>Total</span>
                    <strong>₹{totalCartValue}</strong>
                  </div>
                  <button className="primary-button" onClick={checkoutCart}>
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <p className="empty-state">Your cart is empty.</p>
            )}
          </aside>
        </main>
      ) : (
        <main className="content-grid vendor-grid">
          <section className="panel">
            <div className="panel-header">
              <h2>Vendor Dashboard</h2>
            </div>

            {!vendorSession ? (
              <form className="stack-form" onSubmit={createVendor}>
                <label>
                  Your name
                  <input
                    type="text"
                    value={vendorForm.ownerName}
                    onChange={(event) =>
                      setVendorForm((current) => ({ ...current, ownerName: event.target.value }))
                    }
                    placeholder="e.g. Rohan"
                  />
                </label>

                <label>
                  Shop name
                  <input
                    type="text"
                    value={vendorForm.shopName}
                    onChange={(event) =>
                      setVendorForm((current) => ({ ...current, shopName: event.target.value }))
                    }
                    placeholder="e.g. Green Valley"
                  />
                </label>

                <button className="primary-button" type="submit">
                  Create shop
                </button>
              </form>
            ) : (
              <div className="vendor-summary">
                <div>
                  <p className="eyebrow">Signed in as</p>
                  <h3>{vendorSession.ownerName}</h3>
                  <p>{vendorSession.shopName}</p>
                </div>

                <button
                  className="secondary-button"
                  onClick={() => setVendorSession(null)}
                >
                  Logout
                </button>
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>Add Product</h2>
            </div>

            {vendorSession ? (
              <form className="stack-form" onSubmit={addProduct}>
                <label>
                  Product name
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="e.g. Onion"
                  />
                </label>

                <div className="inline-fields">
                  <label>
                    Price
                    <input
                      type="number"
                      min="1"
                      value={productForm.price}
                      onChange={(event) =>
                        setProductForm((current) => ({ ...current, price: event.target.value }))
                      }
                      placeholder="₹"
                    />
                  </label>

                  <label>
                    Unit
                    <input
                      type="text"
                      value={productForm.unit}
                      onChange={(event) =>
                        setProductForm((current) => ({ ...current, unit: event.target.value }))
                      }
                      placeholder="kg / litre / packet"
                    />
                  </label>
                </div>

                <label>
                  Category
                  <select
                    value={productForm.category}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, category: event.target.value }))
                    }
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Grains">Grains</option>
                    <option value="Protein">Protein</option>
                  </select>
                </label>

                <button className="primary-button" type="submit">
                  Save product
                </button>
              </form>
            ) : (
              <p className="empty-state">Create a shop to add your products.</p>
            )}
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>My Products</h2>
            </div>

            {vendorSession && currentVendorProducts.length ? (
              <div className="product-list">
                {currentVendorProducts.map((product) => (
                  <div key={product.id} className="vendor-product-row">
                    <div>
                      <strong>{product.name}</strong>
                      <small>
                        {product.category} • ₹{product.price} / {product.unit}
                      </small>
                    </div>
                    <button className="remove-button" onClick={() => removeProduct(product.id)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No products added yet.</p>
            )}
          </section>
        </main>
      )}
    </div>
  )
}

export default App
