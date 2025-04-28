
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { authApi } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check local storage for existing user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    const response = await authApi.login({ email, password });
    
    setIsLoading(false);
    
    if (response.success && response.data) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast({
        title: "Login successful",
        description: "Welcome back to LegalEase!",
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: response.error || "Please check your credentials and try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    const response = await authApi.register({ name, email, password });
    
    setIsLoading(false);
    
    if (response.success && response.data) {
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast({
        title: "Registration successful",
        description: "Welcome to LegalEase!",
      });
      return true;
    } else {
      toast({
        title: "Registration failed",
        description: response.error || "Please try again with different credentials.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
