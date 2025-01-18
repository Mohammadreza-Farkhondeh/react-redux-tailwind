'use client';

import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, Settings, Users } from 'lucide-react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: {
    href: string;
    title: string;
    icon: React.ElementType;
  }[];
}

export function SidebarNav({
  className,
  items = [],
  ...props
}: SidebarNavProps) {
  const defaultItems = [
    {
      href: '/dashboard',
      title: 'Home',
      icon: Home,
    },
    {
      href: '/users',
      title: 'Users',
      icon: Users,
    },
    {
      href: '/settings',
      title: 'Settings',
      icon: Settings,
    },
  ];

  const navItems = items.length ? items : defaultItems;

  return (
    <Sidebar className={cn('pb-12', className)} {...props}>
      <SidebarHeader>
        <div className="space-y-2">
          <h2 className="px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <a href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
