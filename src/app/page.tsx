"use client";

import { Button } from "@/components/ui/button";
import { AppProvider } from "@/context/AppContext";
import { useState, Suspense, lazy, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Lazy-loaded screens
const MainScreen = lazy(() => import("@/screens/MainScreen"));
const MenuScreen = lazy(() => import("@/screens/MenuScreen"));
const CartScreen = lazy(() => import("@/screens/CartScreen"));
const DiscountScreen = lazy(() => import("@/screens/DiscountScreen"));
const PaymentScreen = lazy(() => import("@/screens/PaymentScreen"));

const screens = [
  { name: "Main", Component: MainScreen, nextLabel: "Enter" },
  { name: "Menu", Component: MenuScreen, nextLabel: "Cart" },
  { name: "Cart", Component: CartScreen, nextLabel: "Next" },
  {
    name: "Discount",
    Component: DiscountScreen,
    nextLabel: "Proceed to Payment",
  },
  { name: "Payment", Component: PaymentScreen, nextLabel: null },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { Component, nextLabel } = screens[currentIndex];

  const goTo = (index: number) => {
    if (index >= 0 && index < screens.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <AppProvider>
      <div className="h-dvh flex flex-col bg-gray-50">
        {/* 🔼 Top bar (Logo) */}
        <div className="p-8 flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="h-28" />
        </div>

        {/* Scrollable screen area */}
        <div className="flex-1 overflow-auto scrollbar-hidden">
          <AnimatePresence mode="wait">
            <Suspense
              fallback={
                <div className="text-gray-50 p-4">Loading screen...</div>
              }
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-full flex justify-center items-center p-4"
              >
                <Component />
              </motion.div>
            </Suspense>
          </AnimatePresence>
        </div>

        {/* Fixed bottom button bar */}
        <div className="sticky bottom-0 z-10 h-20 flex items-center justify-evenly">
          {currentIndex > 0 && (
            <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
              Back
            </Button>
          )}
          {nextLabel && (
            <Button
              variant="outline"
              onClick={() => {
                goTo(currentIndex + 1);
              }}
              className="ml-4"
            >
              {nextLabel}
            </Button>
          )}
        </div>
      </div>
    </AppProvider>
  );
}
