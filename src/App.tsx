import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import GenderScreen from "./pages/GenderScreen";
import ServiceScreen from "./pages/ServiceScreen";
import DashboardScreen from "./pages/DashboardScreen";
import PriceListScreen from "./pages/PriceListScreen";
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
          <Route path="/gender" element={<GenderScreen />} />
          <Route path="/services" element={<ServiceScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/price-list" element={<PriceListScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
