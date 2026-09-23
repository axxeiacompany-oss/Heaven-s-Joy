import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoreStatusBanner } from './components/StoreStatusBanner';
import { MenuSection } from './components/MenuSection';
import { BoutiqueExperience } from './components/BoutiqueExperience';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationFooter } from './components/LocationFooter';
import { CustomizerModal } from './components/CustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Product, CartItem, CustomerOrderDetails } from './types';
import { productsData } from './data/products';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('heavens_joy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Completed order state
  const [completedOrder, setCompletedOrder] = useState<{
    details: CustomerOrderDetails;
    totalAmount: number;
    orderNumber: string;
    items: CartItem[];
  } | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('heavens_joy_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Determine if store is open based on current time (16:00 to 23:00)
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 16 && currentHour < 23;
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  }, [cartItems]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Direct add for non-customizable items
  const handleAddToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && (!item.customizations || item.customizations.length === 0)
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const target = updated[existingIndex];
      target.quantity += 1;
      target.itemTotalPrice = target.quantity * product.price;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        itemTotalPrice: product.price,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    showToast(`${product.name} adicionado à sacola!`);
  };

  const handleOpenCustomizer = (product?: Product) => {
    const targetProduct = product || productsData.find((p) => p.id === 'bw-tradicional') || productsData[0];
    setCustomizingProduct(targetProduct);
    setIsCustomizerOpen(true);
  };

  const handleConfirmCustomizedItem = (customizedItem: CartItem) => {
    setCartItems((prev) => [...prev, customizedItem]);
    showToast(`${customizedItem.product.name} personalizado adicionado!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const unitPrice = item.itemTotalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderCompleted = (orderDetails: CustomerOrderDetails, totalAmount: number) => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
    const orderedItems = [...cartItems];

    setCompletedOrder({
      details: orderDetails,
      totalAmount,
      orderNumber,
      items: orderedItems,
    });

    // Clear cart
    setCartItems([]);
    setIsCartOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2426]">
      {/* Top Banner */}
      <StoreStatusBanner
        isOpenNow={isOpenNow}
        onExploreMenu={() => {
          document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Top Bar Contract Navbar */}
      <Navbar
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={() => handleOpenCustomizer()}
        isOpenNow={isOpenNow}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          isOpenNow={isOpenNow}
          onExploreMenu={() => {
            document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomizer={() => handleOpenCustomizer()}
        />

        {/* Menu & Customizer Showcase */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onCustomize={handleOpenCustomizer}
        />

        {/* Boutique Philosophy & Visual Gallery */}
        <BoutiqueExperience />

        {/* Real Customer Reviews & Proof */}
        <ReviewsSection />
      </main>

      {/* Location & Footer */}
      <LocationFooter />

      {/* Mobile Sticky Quick Bag bar (Caps under 15% height) */}
      {cartItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#8D2B52] text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between border border-[#A43B66] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-semibold">Ver Sacola ({cartItemCount})</span>
            </div>
            <span className="text-xs font-bold tabular-nums">
              R$ {cartTotal.toFixed(2).replace('.', ',')} →
            </span>
          </button>
        </div>
      )}

      {/* Toast alert feedback */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#2B1720] text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Customizer Modal */}
      <CustomizerModal
        product={customizingProduct}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onConfirmAddToCart={handleConfirmCustomizedItem}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Success & Live Tracker Modal */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        orderDetails={completedOrder?.details || null}
        cartItems={completedOrder?.items || []}
        totalAmount={completedOrder?.totalAmount || 0}
        orderNumber={completedOrder?.orderNumber || '0000'}
      />
    </div>
  );
}
