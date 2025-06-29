"use client";

import { Button } from "@/components/ui/button";
import { AppProvider } from "@/context/AppContext";
import { useState, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Lazy-loaded screens
const CartScreen = lazy(() =>
  import("@/screens").then((m) => ({ default: m.CartScreen }))
);
const DiscountScreen = lazy(() =>
  import("@/screens").then((m) => ({ default: m.DiscountScreen }))
);
const MainScreen = lazy(() =>
  import("@/screens").then((m) => ({ default: m.MainScreen }))
);
const MenuScreen = lazy(() =>
  import("@/screens").then((m) => ({ default: m.MenuScreen }))
);
const PaymentScreen = lazy(() =>
  import("@/screens").then((m) => ({ default: m.PaymentScreen }))
);

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
          <Image src="/logo.svg" alt="Logo" width={112} height={112} />
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
                className="min-h-full p-4"
              >
                <Component />
              </motion.div>
            </Suspense>
          </AnimatePresence>
        </div>

        {/* Fixed bottom button bar */}
        <div className="sticky bottom-0 z-10 h-20 flex items-center justify-evenly">
          {currentIndex > 0 && (
            <Button
              size={"lg"}
              variant="outline"
              onClick={() => goTo(currentIndex - 1)}
            >
              Back
            </Button>
          )}
          {nextLabel && (
            <Button
              size={"lg"}
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
