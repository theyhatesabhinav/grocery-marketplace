* {
  box-sizing: border-box;
}

:root {
  color: #1e293b;
  background: #f3f7f0;
  font-family: Inter, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-height: 100vh;
}

body {
  background: linear-gradient(180deg, #f0fdf4 0%, #f8fafc 100%);
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}

.topbar h1 {
  margin: 2px 0 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: #16a34a;
  font-weight: 700;
}

.role-switcher {
  display: inline-flex;
  padding: 6px;
  background: #e5f7ea;
  border: 1px solid #bbf7d0;
  border-radius: 999px;
}

.role {
  border: 0;
  background: transparent;
  color: #166534;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 600;
}

.role.active {
  background: #16a34a;
  color: white;
  box-shadow: 0 8px 20px rgba(22, 163, 74, 0.2);
}

.content-grid {
  display: grid;
  gap: 22px;
}

.customer-grid {
  grid-template-columns: 1.1fr 1.6fr 0.9fr;
}

.vendor-grid {
  grid-template-columns: 1fr 1.2fr 1fr;
}

.panel {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.06);
  padding: 18px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.panel-header input {
  width: min(220px, 100%);
}

.shop-list,
.product-list,
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.shop-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 16px;
  text-align: left;
  color: inherit;
}

.shop-card.selected {
  background: #ecfdf5;
  border-color: #86efac;
}

.shop-card strong,
.product-card h3,
.vendor-product-row strong {
  display: block;
}

.shop-card small,
.vendor-product-row small,
.cart-item small {
  color: #475569;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
}

.product-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.04);
}

.product-tag {
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.72rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.product-card h3 {
  margin: 0 0 8px;
}

.product-card p {
  margin: 0 0 16px;
  color: #334155;
  font-weight: 600;
}

.primary-button,
.secondary-button,
.remove-button {
  border-radius: 12px;
  border: none;
  padding: 10px 14px;
  font-weight: 700;
}

.primary-button {
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: white;
  width: 100%;
}

.secondary-button {
  background: #f1f5f9;
  color: #0f172a;
}

.remove-button {
  background: #fee2e2;
  color: #b91c1c;
  padding: 8px 10px;
}

.cart-panel {
  min-height: 320px;
}

.cart-item,
.vendor-product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-control button {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  width: 28px;
  height: 28px;
}

.checkout-box {
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.checkout-box span {
  display: block;
  color: #475569;
  font-size: 0.8rem;
}

.checkout-box strong {
  font-size: 1.4rem;
}

.stack-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stack-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
  color: #334155;
}

.stack-form input,
.stack-form select,
.panel-header input {
  border: 1px solid #cbd5e1;
  background: white;
  border-radius: 12px;
  padding: 12px 14px;
  min-height: 46px;
}

.inline-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.vendor-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid #bbf7d0;
  border-radius: 14px;
  background: #f0fdf4;
}

.vendor-summary h3,
.vendor-summary p {
  margin: 0;
}

.empty-state {
  margin: 0;
  color: #64748b;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

@media (max-width: 1024px) {
  .customer-grid,
  .vendor-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .topbar,
  .panel-header,
  .vendor-summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .role-switcher {
    width: 100%;
  }

  .role {
    flex: 1;
  }
}
