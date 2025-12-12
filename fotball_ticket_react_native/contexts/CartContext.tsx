import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

// --- Types ---

export type MatchType = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  image: ImageSourcePropType;
  price: number; // Base price
  sellerName: string;
  sellerImage: ImageSourcePropType;
};

export type TicketType = {
  id: string;
  matchId: string;
  seatNumber: string;
  gate: string;
  ter: string;
  ticketNumber: string;
  price: number;
  // We can include a snapshot of match details to avoid lookups if match is deleted, 
  // but looking up from matches is better for consistency unless matches expire.
  // For simplicity and robustness, we'll store a snapshot or rely on the matchId.
  // Given the user wants "correct data", storing a snapshot is safer for "purchased" tickets 
  // in case the match definition changes or is removed.
  matchSnapshot: MatchType;
};

export type SaleRecordType = {
  id: string;
  ticketSnapshot: TicketType;
  saleDate: string;
  salePrice: number;
};

type CartContextType = {
  matches: MatchType[];
  cartItems: TicketType[];
  purchasedTickets: TicketType[];
  salesHistory: SaleRecordType[];
  walletBalance: number;

  addToCart: (matchId: string, seatNumber: string, price: number) => void;
  removeFromCart: (ticketId: string) => void;
  clearCart: () => void;
  completePurchase: () => void;
  sellTicket: (ticketId: string) => void;
};

// --- Data ---

const INITIAL_MATCHES: MatchType[] = [
  {
    id: "match1",
    homeTeam: "النصر",
    awayTeam: "الهلال",
    date: "26 Mar 2025",
    time: "17:30",
    venue: "ملعب الانماء",
    image: require("@/assets/images/tickets/ticket1.png"),
    price: 75,
    sellerName: "خالد",
    sellerImage: require("@/assets/images/khalid.jpg"),
  },
  {
    id: "match2",
    homeTeam: "الأهلي",
    awayTeam: "الاتحاد",
    date: "15 Apr 2025",
    time: "20:00",
    venue: "ملعب الجوهرة",
    image: require("@/assets/images/tickets/ticket2.png"),
    price: 100,
    sellerName: "خالد",
    sellerImage: require("@/assets/images/khalid.jpg"),
  },
  {
    id: "match3",
    homeTeam: "الاتحاد",
    awayTeam: "الرائد",
    date: "20 May 2025",
    time: "19:15",
    venue: "ملعب الملك عبدالله",
    image: require("@/assets/images/tickets/ticket3.png"),
    price: 68,
    sellerName: "خالد",
    sellerImage: require("@/assets/images/khalid.jpg"),
  },
  {
    id: "match4",
    homeTeam: "الأهلي",
    awayTeam: "النصر",
    date: "01 Jun 2025",
    time: "21:00",
    venue: "الأول بارك",
    image: require("@/assets/images/tickets/ticket1.png"),
    price: 85,
    sellerName: "خالد",
    sellerImage: require("@/assets/images/khalid.jpg"),
  },
  {
    id: "match5",
    homeTeam: "الاتحاد",
    awayTeam: "الهلال",
    date: "10 Jun 2025",
    time: "20:30",
    venue: "ملعب الجوهرة",
    image: require("@/assets/images/tickets/ticket2.png"),
    price: 95,
    sellerName: "خالد",
    sellerImage: require("@/assets/images/khalid.jpg"),
  },
];

// --- Context ---

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [matches] = useState<MatchType[]>(INITIAL_MATCHES);
  const [cartItems, setCartItems] = useState<TicketType[]>([]);
  const [purchasedTickets, setPurchasedTickets] = useState<TicketType[]>([]); // Start empty or with defaults
  const [salesHistory, setSalesHistory] = useState<SaleRecordType[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  // Helper to generate random ticket details
  const generateTicketDetails = () => ({
    gate: `${Math.floor(Math.random() * 30) + 1}`,
    ter: `T${Math.floor(Math.random() * 8) + 1}`,
    ticketNumber: `BH${Math.floor(10000 + Math.random() * 90000)}`,
  });

  const addToCart = (matchId: string, seatNumber: string, price: number) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    const newTicket: TicketType = {
      id: `cart_${Date.now()}_${Math.random()}`, // Temporary ID
      matchId,
      seatNumber,
      price,
      matchSnapshot: match,
      ...generateTicketDetails(),
    };

    setCartItems(prev => [...prev, newTicket]);
  };

  const removeFromCart = (ticketId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== ticketId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const completePurchase = () => {
    // Move cart items to purchased tickets
    // Assign permanent IDs if needed, or keep cart IDs
    const newPurchased = cartItems.map(item => ({
      ...item,
      id: `ticket_${Date.now()}_${Math.random()}`, // Permanent ID
    }));

    setPurchasedTickets(prev => [...prev, ...newPurchased]);
    clearCart();
  };

  const sellTicket = (ticketId: string) => {
    const ticket = purchasedTickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const salePrice = ticket.price * 0.9; // 10% commission/discount logic
    const saleRecord: SaleRecordType = {
      id: `sale_${Date.now()}`,
      ticketSnapshot: ticket,
      saleDate: new Date().toISOString(),
      salePrice,
    };

    setSalesHistory(prev => [saleRecord, ...prev]);
    setWalletBalance(prev => prev + salePrice);
    setPurchasedTickets(prev => prev.filter(t => t.id !== ticketId));
  };

  return (
    <CartContext.Provider
      value={{
        matches,
        cartItems,
        purchasedTickets,
        salesHistory,
        walletBalance,
        addToCart,
        removeFromCart,
        clearCart,
        completePurchase,
        sellTicket,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
