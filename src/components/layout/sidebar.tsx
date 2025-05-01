
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Database, 
  Home, 
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
  expanded: boolean;
  open: boolean;
  onToggle: () => void;
  onExpand: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ 
  icon, 
  label, 
  href, 
  active,
  onClick 
}: SidebarItemProps) => {
  return (
    <Link 
      to={href}
      className={cn(
        "sidebar-item",
        active && "sidebar-item-active"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = ({ 
  expanded,
  open,
  onToggle,
  onExpand
}: SidebarProps) => {
  const { pathname } = useLocation();
  
  // Define our navigation items
  const mainNav = [
    {
      icon: <Home className="h-4 w-4" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Database className="h-4 w-4" />,
      label: "My Database",
      items: [
        { label: "New Candidate", href: "/database/new-candidate" },
        { label: "Search Candidate", href: "/database/search-candidate" },
        { label: "View Candidate", href: "/database/view-candidate" },
      ],
    },
    {
      icon: <Search className="h-4 w-4" />,
      label: "Sourcing",
      items: [
        { label: "Talent Search", href: "/sourcing/talent-search" },
        { label: "Talent Pipeline", href: "/sourcing/talent-pipeline" },
      ],
    },
    {
      icon: <BarChart className="h-4 w-4" />,
      label: "Analytics",
      items: [
        { label: "Candidates", href: "/analytics/candidates" },
        { label: "Jobs", href: "/analytics/jobs" },
        { label: "Submissions", href: "/analytics/submissions" },
        { label: "Interviews", href: "/analytics/interviews" },
        { label: "Hires", href: "/analytics/hires" },
      ],
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      items: [
        { label: "Connect", href: "/settings/connect" },
        { label: "Financials", href: "/settings/financials" },
      ],
    },
  ];

  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  const handleAccordionChange = (value: string) => {
    setOpenAccordionItems((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });

    // If the sidebar is not expanded, expand it when opening an accordion
    if (!expanded && !openAccordionItems.includes(value)) {
      onExpand();
    }
  };

  if (!open) {
    return (
      <div className="absolute left-0 top-0 z-40">
        <Button
          variant="secondary"
          size="icon"
          className="m-2 rounded-full shadow-md"
          onClick={onToggle}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <aside 
      className={cn(
        "bg-sidebar relative border-r z-30 flex flex-col h-full",
        expanded ? "w-64" : "w-16",
        "transition-width duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
        {expanded && (
          <span className="text-xl font-bold text-primary">Recroot</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onExpand}
          className={cn("ml-auto", !expanded && "mx-auto")}
        >
          {expanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-1">
          {mainNav.map((item, index) => {
            if (!item.items) {
              return (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={expanded ? item.label : ""}
                  href={item.href}
                  active={pathname === item.href}
                />
              );
            }

            const accordionId = `nav-${index}`;
            const isOpen = openAccordionItems.includes(accordionId);
            
            return (
              <Accordion
                key={item.label}
                type="single"
                collapsible
                value={isOpen ? accordionId : ""}
                onValueChange={(value) => handleAccordionChange(value || accordionId)}
                className="border-none"
              >
                <AccordionItem value={accordionId} className="border-none">
                  <AccordionTrigger 
                    className={cn(
                      "sidebar-item py-1.5 px-3 hover:no-underline",
                      item.items.some(subItem => pathname === subItem.href) && "sidebar-item-active"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {expanded && <span>{item.label}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pt-1">
                    {expanded && (
                      <div className="ml-6 flex flex-col gap-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className={cn(
                              "sidebar-item text-xs",
                              pathname === subItem.href && "sidebar-item-active"
                            )}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
