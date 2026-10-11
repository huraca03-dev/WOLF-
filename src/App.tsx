/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { CoCreationStudio } from './components/CoCreationStudio';
import { CheckoutSection } from './components/CheckoutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SocialProofToast } from './components/SocialProofToast';
import { SearchModal } from './components/SearchModal';
import { CartItem, Product, ComboOption, CustomizationConfig } from './types';
import { COMBOS, PRODUCTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'catalogo' | 'estudio' | 'checkout'>('inicio');
  const [selectedStudioCombo, setSelectedStudioCombo] = useState<ComboOption | undefined>(COMBOS[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wolf_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default initial mock cart item for rich immediate UX
    return [
      {
        cartItemId: 'initial-combo-sample',
        isCombo: true,
        comboId: 'combo-1',
        comboTitle: 'Combo Camiseta + Tote Bag',
        productType: 'tshirt',
        price: 75000,
        quantity: 1,
        customizations: [
          {
            productType: 'tshirt',
            baseColor: '#18181B',
            baseColorName: 'Negro Ónix',
            customText: 'WOLF COLLECTIVE',
            fontFamily: 'urban',
            fontSize: 'md',
            textColor: '#FFFFFF',
            uploadedImageUrl: null,
            selectedThemeId: 'spotify',
            placement: 'center',
            sizeSelected: 'M',
          },
          {
            productType: 'totebag',
            baseColor: '#E8DFD8',
            baseColorName: 'Beige Arena',
            customText: 'Cartagena 2026',
            fontFamily: 'serif',
            fontSize: 'md',
            textColor: '#111111',
            uploadedImageUrl: null,
            selectedThemeId: null,
            placement: 'center',
          },
        ],
        giftPackaging: {
          id: 'luxury-box',
          name: 'Caja Rígida de Regalo Exclusiva WOLF Box',
          price: 8000,
          description: 'Caja rígida con cinta de satén y tarjeta caligráfica personalizada',
          includedMessage: true,
        },
        giftCardMessage: '¡Feliz día especial! Hecho con amor en Cartagena.',
      },
    ];
  });

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('wolf_cart_v1', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add individual product to cart
  const handleAddProductToCart = (
    product: Product,
    quantity: number,
    selectedSize?: string,
    selectedColorHex?: string,
    selectedColorName?: string
  ) => {
    const defaultColor = product.colors[0];
    const customization: CustomizationConfig = {
      productType: product.type,
      baseColor: selectedColorHex || defaultColor.hex,
      baseColorName: selectedColorName || defaultColor.name,
      customText: '',
      fontFamily: 'sans',
      fontSize: 'md',
      textColor: '#111111',
      uploadedImageUrl: null,
      selectedThemeId: null,
      placement: 'center',
      sizeSelected: selectedSize,
    };

    const newItem: CartItem = {
      cartItemId: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      isCombo: false,
      productId: product.id,
      productTitle: product.name,
      productType: product.type,
      price: product.price,
      quantity,
      customizations: [customization],
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Add customized combo to cart
  const handleAddComboToCart = (comboItem: CartItem) => {
    setCartItems((prev) => [...prev, comboItem]);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Switch to studio with a specific combo
  const handleStartCoCreation = (combo?: ComboOption) => {
    if (combo) setSelectedStudioCombo(combo);
    setActiveTab('estudio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to catalog
  const handleExploreCatalog = () => {
    setActiveTab('catalogo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct customization from product card
  const handleCustomizeProductInStudio = (product: Product) => {
    // Find matching combo or default to combo 1
    const matchingCombo = COMBOS.find((c) => c.items.some((it) => it.type === product.type)) || COMBOS[0];
    setSelectedStudioCombo(matchingCombo);
    setActiveTab('estudio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      
      {/* Top Bar One-Row Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemCount={totalCartCount}
        openSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1 pb-16">
        
        {/* PESTAÑA: INICIO / EXPERIENCIA WOLF */}
        {activeTab === 'inicio' && (
          <div className="space-y-16">
            <HeroSection
              onStartCoCreation={handleStartCoCreation}
              onExploreCatalog={handleExploreCatalog}
            />
            <ReviewsSection />
            <FaqSection />
          </div>
        )}

        {/* PESTAÑA 1: CATÁLOGO DE PRODUCTOS (VENTA INDIVIDUAL) */}
        {activeTab === 'catalogo' && (
          <div className="space-y-16">
            <ProductCatalog
              onAddToCart={handleAddProductToCart}
              onCustomizeInStudio={handleCustomizeProductInStudio}
            />
            <ReviewsSection />
            <FaqSection />
          </div>
        )}

        {/* PESTAÑA 2: ESTUDIO DE CO-CREACIÓN DE COMBOS */}
        {activeTab === 'estudio' && (
          <div className="space-y-16">
            <CoCreationStudio
              initialCombo={selectedStudioCombo}
              onAddComboToCart={handleAddComboToCart}
              onNavigateToCheckout={() => {
                setActiveTab('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <FaqSection />
          </div>
        )}

        {/* PESTAÑA 3: CHECKOUT & ANTICIPO 50% */}
        {activeTab === 'checkout' && (
          <div className="space-y-16">
            <CheckoutSection
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onGoToStudio={() => {
                setActiveTab('estudio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToCatalog={() => {
                setActiveTab('catalogo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <FaqSection />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Floating Social Proof Toast in Corner */}
      <SocialProofToast />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          handleCustomizeProductInStudio(p);
        }}
        onSelectCombo={(c) => {
          handleStartCoCreation(c);
        }}
      />

    </div>
  );
}
