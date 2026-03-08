import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import CustomerInfoScreen from "./pages/CustomerInfoScreen";
import ServiceScreen from "./pages/ServiceScreen";
import DashboardScreen from "./pages/DashboardScreen";
import PriceListScreen from "./pages/PriceListScreen";
import BookingScreen from "./pages/BookingScreen";
import OrderDrinkScreen from "./pages/OrderDrinkScreen";
import OrderProductScreen from "./pages/OrderProductScreen";
import TrendingScreen from "./pages/TrendingScreen";
import ChooseMasterScreen from "./pages/ChooseMasterScreen";
import BonusesScreen from "./pages/BonusesScreen";
import BeforeAfterScreen from "./pages/BeforeAfterScreen";
import ProcedureHistoryScreen from "./pages/ProcedureHistoryScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/customer-info" element={<CustomerInfoScreen />} />
          <Route path="/services" element={<ServiceScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/price-list" element={<PriceListScreen />} />
          <Route path="/booking" element={<BookingScreen />} />
          <Route path="/order-drink" element={<OrderDrinkScreen />} />
          <Route path="/order-product" element={<OrderProductScreen />} />
          <Route path="/trending" element={<TrendingScreen />} />
          <Route path="/choose-master" element={<ChooseMasterScreen />} />
          <Route path="/bonuses" element={<BonusesScreen />} />
          <Route path="/before-after" element={<BeforeAfterScreen />} />
          <Route path="/procedure-history" element={<ProcedureHistoryScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
