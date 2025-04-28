
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FileText, Upload, Book, Settings, LogOut } from "lucide-react";

export const AppSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center h-16 px-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-navy flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="font-serif text-xl font-medium">LegalEase</div>
          </div>
          <div className="flex-1" />
          <SidebarTrigger className="lg:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="py-2">
          <h3 className="px-4 text-sm font-medium text-sidebar-foreground/70 py-2">
            DOCUMENT MANAGEMENT
          </h3>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 w-full",
                      isActive && "text-accent"
                    )
                  }
                >
                  <FileText className="h-5 w-5" />
                  <span>Documents</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/upload"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 w-full",
                      isActive && "text-accent"
                    )
                  }
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/case-law"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 w-full",
                      isActive && "text-accent"
                    )
                  }
                >
                  <Book className="h-5 w-5" />
                  <span>Case Law Library</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <h3 className="px-4 text-sm font-medium text-sidebar-foreground/70 py-2 mt-4">
            ACCOUNT
          </h3>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 w-full",
                      isActive && "text-accent"
                    )
                  }
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-3 border-t">
          <p className="text-xs text-sidebar-foreground/60 text-center">
            LegalEase © {new Date().getFullYear()}
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
