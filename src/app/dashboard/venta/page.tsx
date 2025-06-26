"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Clock, Plus, Minus, Search, ShoppingCart, Eye, ChevronRight } from "lucide-react"
import Image from "next/image"

// Tipos de datos
interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  ingredients?: string[]
  calories?: number
  preparationTime?: string
  allergens?: string[]
}

interface CartItem extends Product {
  quantity: number
}

// Datos de productos de ejemplo con información detallada
const products: Product[] = [
  {
    id: "1",
    name: "Café Americano",
    category: "Bebidas",
    price: 2.5,
    image: "/chef1.jpg",
    description:
      "Café negro tradicional preparado con granos 100% arábica, tostado medio para un sabor equilibrado y aromático.",
    ingredients: ["Café arábica", "Agua filtrada"],
    calories: 5,
    preparationTime: "3-4 min",
    allergens: [],
  },
  {
    id: "2",
    name: "Café Latte",
    category: "Bebidas",
    price: 3.5,
    image: "/chef2.jpg",
    description: "Espresso suave combinado con leche vaporizada y una ligera capa de espuma cremosa.",
    ingredients: ["Espresso", "Leche entera", "Espuma de leche"],
    calories: 120,
    preparationTime: "4-5 min",
    allergens: ["Lácteos"],
  },
  {
    id: "3",
    name: "Cappuccino",
    category: "Bebidas",
    price: 3.75,
    image: "/fastfood.jpg",
    description: "Espresso intenso con partes iguales de leche vaporizada y espuma densa, espolvoreado con canela.",
    ingredients: ["Espresso", "Leche entera", "Espuma de leche", "Canela"],
    calories: 80,
    preparationTime: "4-5 min",
    allergens: ["Lácteos"],
  },
  {
    id: "4",
    name: "Espresso",
    category: "Bebidas",
    price: 2.0,
    image: "/hamburger.jpg",
    description:
      "Shot concentrado de café con crema dorada, extraído a la perfección para un sabor intenso y aromático.",
    ingredients: ["Café arábica molido fino"],
    calories: 3,
    preparationTime: "1-2 min",
    allergens: [],
  },
  {
    id: "5",
    name: "Té Chai",
    category: "Bebidas",
    price: 2.8,
    image: "/chef2.jpg",
    description: "Mezcla aromática de té negro con especias tradicionales indias, servido con leche cremosa.",
    ingredients: ["Té negro", "Cardamomo", "Canela", "Jengibre", "Clavo", "Leche"],
    calories: 95,
    preparationTime: "5-6 min",
    allergens: ["Lácteos"],
  },
  {
    id: "6",
    name: "Sandwich de Jamón",
    category: "Comida",
    price: 5.5,
    image: "/chef1.jpg",
    description:
      "Sandwich artesanal con jamón serrano, queso suizo, lechuga fresca, tomate y mostaza dijon en pan integral.",
    ingredients: ["Pan integral", "Jamón serrano", "Queso suizo", "Lechuga", "Tomate", "Mostaza dijon"],
    calories: 420,
    preparationTime: "8-10 min",
    allergens: ["Gluten", "Lácteos"],
  },
  {
    id: "7",
    name: "Ensalada César",
    category: "Comida",
    price: 4.75,
    image: "/chef1.jpg",
    description: "Lechuga romana fresca con aderezo césar casero, crutones dorados y queso parmesano rallado.",
    ingredients: ["Lechuga romana", "Aderezo césar", "Crutones", "Queso parmesano", "Anchoas"],
    calories: 280,
    preparationTime: "5-7 min",
    allergens: ["Gluten", "Lácteos", "Pescado", "Huevo"],
  },
  {
    id: "8",
    name: "Croissant",
    category: "Panadería",
    price: 2.25,
    image: "/chef1.jpg",
    description:
      "Croissant francés tradicional, hojaldrado y dorado, horneado fresco cada mañana con mantequilla premium.",
    ingredients: ["Harina de trigo", "Mantequilla", "Levadura", "Azúcar", "Sal", "Huevo"],
    calories: 231,
    preparationTime: "Listo",
    allergens: ["Gluten", "Lácteos", "Huevo"],
  },
  {
    id: "9",
    name: "Muffin de Arándanos",
    category: "Panadería",
    price: 3.0,
    image: "/chef2.jpg",
    description: "Muffin esponjoso horneado con arándanos frescos y un toque de vainilla, cubierto con azúcar cristal.",
    ingredients: ["Harina", "Arándanos frescos", "Azúcar", "Huevos", "Mantequilla", "Vainilla"],
    calories: 265,
    preparationTime: "Listo",
    allergens: ["Gluten", "Lácteos", "Huevo"],
  },
  {
    id: "10",
    name: "Cheesecake",
    category: "Postres",
    price: 4.5,
    image: "/chef1.jpg",
    description: "Tarta de queso cremosa sobre base de galleta graham, con cobertura de frutos rojos frescos.",
    ingredients: ["Queso crema", "Galletas graham", "Azúcar", "Huevos", "Vainilla", "Frutos rojos"],
    calories: 410,
    preparationTime: "Listo",
    allergens: ["Gluten", "Lácteos", "Huevo"],
  },
  {
    id: "11",
    name: "Brownie",
    category: "Postres",
    price: 3.25,
    image: "/chef2.jpg",
    description: "Brownie de chocolate belga intenso, húmedo por dentro con trozos de nueces y servido tibio.",
    ingredients: ["Chocolate belga", "Mantequilla", "Azúcar", "Huevos", "Harina", "Nueces"],
    calories: 320,
    preparationTime: "2-3 min",
    allergens: ["Gluten", "Lácteos", "Huevo", "Frutos secos"],
  },
  {
    id: "12",
    name: "Tiramisu",
    category: "Postres",
    price: 5.0,
    image: "/fastfood.jpg",
    description:
      "Postre italiano clásico con capas de bizcochos de soletilla, café espresso, mascarpone y cacao en polvo.",
    ingredients: ["Bizcochos soletilla", "Café espresso", "Mascarpone", "Huevos", "Azúcar", "Cacao"],
    calories: 380,
    preparationTime: "Listo",
    allergens: ["Gluten", "Lácteos", "Huevo"],
  },
]

const categories = ["Todos", "Bebidas", "Comida", "Panadería", "Postres"]

export default function VentaDirecta() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "tarjeta">("efectivo")
  const [isCartVisible, setIsCartVisible] = useState(true)

  // Filtrar productos por categoría y búsqueda
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filtrar por categoría
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.ingredients?.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    return filtered
  }, [selectedCategory, searchTerm])

  // Calcular totales del carrito
  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const iva = subtotal * 0.19 // 19% IVA
    const total = subtotal + iva
    return { subtotal, iva, total }
  }, [cart])

  // Contar items en el carrito
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Actualizar cantidad en el carrito
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  // Remover producto del carrito
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Limpiar carrito
  const clearCart = () => {
    setCart([])
  }

  // Procesar venta
  const processSale = () => {
    if (cart.length === 0) return

    // Aquí iría la lógica para procesar la venta
    alert(`Venta procesada por $${cartTotals.total.toFixed(2)} - Método: ${paymentMethod}`)
    clearCart()
  }

  const currentTime = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return (
    <div className="flex h-screen">
      {/* Panel de productos */}
      <div className={`transition-all duration-300 ${isCartVisible ? "flex-1" : "w-full"} flex flex-col`}>
        <div className="p-2 border-b bg-white">
          {/* Buscador */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar productos, ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtros de categoría */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de productos con scroll */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-600">${product.price.toFixed(2)}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{product.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="aspect-video relative rounded-lg overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-3">
                              <p className="text-sm text-gray-600">{product.description}</p>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Precio:</span>
                                  <p className="text-orange-600 font-bold">${product.price.toFixed(2)}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Tiempo:</span>
                                  <p>{product.preparationTime}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Calorías:</span>
                                  <p>{product.calories} kcal</p>
                                </div>
                                <div>
                                  <span className="font-medium">Categoría:</span>
                                  <p>{product.category}</p>
                                </div>
                              </div>

                              {product.ingredients && (
                                <div>
                                  <span className="font-medium text-sm">Ingredientes:</span>
                                  <p className="text-sm text-gray-600 mt-1">{product.ingredients.join(", ")}</p>
                                </div>
                              )}

                              {product.allergens && product.allergens.length > 0 && (
                                <div>
                                  <span className="font-medium text-sm text-red-600">Alérgenos:</span>
                                  <p className="text-sm text-red-600 mt-1">{product.allergens.join(", ")}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="sm"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Botón flotante del carrito (cuando está oculto) */}
      {!isCartVisible && (
        <Button
          onClick={() => setIsCartVisible(true)}
          className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 rounded-full w-14 h-14 shadow-lg z-50"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </Badge>
            )}
          </div>
        </Button>
      )}

      {/* Panel del carrito */}
      {isCartVisible && (
        <div className="w-80 border-l bg-gray-50 flex flex-col h-11/12">
          {/* Header del carrito */}
          <div className="p-4 border-b bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Carrito</h2>
                {cartItemsCount > 0 && <Badge className="bg-orange-500">{cartItemsCount}</Badge>}
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsCartVisible(false)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Información de la orden */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Orden actual • {currentTime}</span>
            </div>
          </div>

          {/* Items del carrito con scroll */}
          <div className="flex-1 overflow-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="w-16 h-16 mb-4 opacity-50">
                  <ShoppingCart className="w-full h-full" />
                </div>
                <p>El carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-orange-600 font-semibold text-sm">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer del carrito */}
          <div className="p-4 border-t bg-white">
            {/* Totales */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${cartTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IVA (19%)</span>
                <span>${cartTotals.iva.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-600">${cartTotals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Métodos de pago */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                variant={paymentMethod === "efectivo" ? "default" : "outline"}
                onClick={() => setPaymentMethod("efectivo")}
                className={paymentMethod === "efectivo" ? "bg-gray-800" : ""}
                size="sm"
              >
                Efectivo
              </Button>
              <Button
                variant={paymentMethod === "tarjeta" ? "default" : "outline"}
                onClick={() => setPaymentMethod("tarjeta")}
                className={paymentMethod === "tarjeta" ? "bg-orange-500 hover:bg-orange-600" : ""}
                size="sm"
              >
                Tarjeta
              </Button>
            </div>

            {/* Botón de procesar venta */}
            <Button
              onClick={processSale}
              disabled={cart.length === 0}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Procesar Venta
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
