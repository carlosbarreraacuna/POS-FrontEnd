"use client"

import {
  Bell,
  ChefHat,
  Home,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  UtensilsCrossed,
  Users,
  Calendar,
  MapPin,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  ChevronRight,
  Utensils,
  Receipt,
  Calculator,
  PieChart,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/app/context/AuthContext"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Menú principal (siempre visible)
const mainMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    roles: ["Admin", "Mesero", "Cajero", "Cocinero", "Bartender"],
  },
]

// Menús organizados por grupos con iconos consistentes
const menuGroups = [
  {
    title: "Operaciones",
    items: [
      {
        title: "Venta Directa",
        url: "/dashboard/venta",
        icon: ShoppingCart,
        badge: "12",
        roles: ["Admin", "Mesero", "Cajero"],
      },
      {
        title: "Gestión de Pedidos",
        url: "/dashboard/pedidos",
        icon: ShoppingCart,
        badge: "12",
        roles: ["Admin", "Mesero", "Cajero"],
      },
      {
        title: "Gestión de Mesas",
        url: "/dashboard/mesas",
        icon: MapPin,
        roles: ["Admin", "Mesero"],
      },
      {
        title: "Cocina/Bar",
        url: "/dashboard/cocina",
        icon: ChefHat,
        badge: "5",
        roles: ["Admin", "Cocinero", "Bartender"],
      },
    ],
  },
  {
    title: "Menú y Productos",
    items: [
      {
        title: "Menú Digital",
        url: "/dashboard/menu",
        icon: Utensils,
        roles: ["Admin", "Mesero"],
      },
      {
        title: "Inventario",
        url: "/dashboard/inventario",
        icon: Package,
        roles: ["Admin", "Cocinero"],
      },
    ],
  },
  {
    title: "Clientes",
    items: [
      {
        title: "Gestión de Clientes",
        url: "/dashboard/clientes",
        icon: Users,
        roles: ["Admin", "Mesero", "Cajero"],
      },
      {
        title: "Reservas Online",
        url: "/dashboard/reservas",
        icon: Calendar,
        roles: ["Admin", "Mesero"],
      },
    ],
  },
  {
    title: "Finanzas",
    items: [
      {
        title: "Facturación",
        url: "/dashboard/facturacion",
        icon: Receipt,
        roles: ["Admin", "Cajero"],
      },
      {
        title: "Contabilidad",
        url: "/dashboard/contabilidad",
        icon: Calculator,
        roles: ["Admin"],
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Dashboard Ventas",
        url: "/dashboard/ventas",
        icon: TrendingUp,
        roles: ["Admin"],
      },
      {
        title: "Reportes",
        url: "/dashboard/reportes",
        icon: PieChart,
        roles: ["Admin"],
      },
    ],
  },
  {
    title: "Administración",
    items: [
      {
        title: "Usuarios",
        url: "/dashboard/usuarios",
        icon: UserCheck,
        roles: ["Admin"],
      },
      {
        title: "Notificaciones",
        url: "/dashboard/notificaciones",
        icon: Bell,
        badge: "3",
        roles: ["Admin", "Mesero", "Cajero", "Cocinero", "Bartender"],
      },
      {
        title: "Seguridad",
        url: "/dashboard/seguridad",
        icon: Shield,
        roles: ["Admin"],
      },
      {
        title: "Configuración",
        url: "/dashboard/configuracion",
        icon: Settings,
        roles: ["Admin"],
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, isHydrated } = useAuth()

  // 🟡 Mostrar nada mientras carga o no hay sesión
  if (!isHydrated) return null
  if (!user?.role) return null

  // 🟢 Filtrar menús según el rol actual
  const allowedMainMenu = mainMenu.filter((item) => item.roles.includes(user.role))

  const allowedMenuGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(user.role)),
    }))
    .filter((group) => group.items.length > 0) // Solo mostrar grupos que tengan items

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-600 text-white">
            <UtensilsCrossed className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">RestaurantPOS</span>
            <span className="truncate text-xs">Sistema de Gestión</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allowedMainMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grupos de navegación */}
        {allowedMenuGroups.map((group) => (
          <Collapsible key={group.title} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1.5 text-sm font-medium transition-colors">
                  {group.title}
                  <ChevronRight className="ml-auto h-5 w-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                          <Link href={item.url} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <item.icon className="size-5" />
                              <span>{item.title}</span>
                            </div>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={"/placeholder.svg"} alt={user?.username || "Usuario"} />
                    <AvatarFallback className="rounded-lg bg-orange-600 text-white">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.username || "Usuario"}</span>
                    <span className="truncate text-xs">{user?.email || user?.role}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/configuracion">
                    <Settings className="mr-2 h-5 w-5" />
                    Configuración
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/perfil">
                    <UserCheck className="mr-2 h-5 w-5" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/notificaciones">
                    <Bell className="mr-2 h-5 w-5" />
                    Notificaciones
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
