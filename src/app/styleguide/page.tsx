import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StatCard } from '@/components/ui/stat-card'
import { StockStatusBadge } from '@/components/ui/stock-status-badge'
import { OrderStatusBadge } from '@/components/ui/order-status-badge'
import { StockStatus, OrderStatus } from '@/lib/constants'
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Users,
  ShoppingCart,
  Store,
  BarChart3,
  AlertCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Style Guide - CBD SaaS Platform',
  description: 'Component library and design system documentation',
}

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-cbd-black p-8">
      <div className="container mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Design <span className="text-gradient-green">System</span>
          </h1>
          <p className="text-lg text-cbd-gray-light max-w-2xl mx-auto">
            Component library and design tokens for the CBD SaaS Platform
          </p>
        </div>

        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Color Palette</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass">
              <CardContent className="pt-6">
                <div className="h-20 w-full bg-cbd-black rounded-lg mb-3" />
                <p className="text-sm font-medium text-white">#050505</p>
                <p className="text-xs text-cbd-gray">Primary Black</p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="pt-6">
                <div className="h-20 w-full bg-cbd-green rounded-lg mb-3" />
                <p className="text-sm font-medium text-white">#00FF66</p>
                <p className="text-xs text-cbd-gray">Primary Green</p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="pt-6">
                <div className="h-20 w-full bg-cbd-green-dark rounded-lg mb-3" />
                <p className="text-sm font-medium text-white">#00B94A</p>
                <p className="text-xs text-cbd-gray">Dark Green</p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="pt-6">
                <div className="h-20 w-full bg-cbd-gray rounded-lg mb-3" />
                <p className="text-sm font-medium text-white">#777777</p>
                <p className="text-xs text-cbd-gray">Neutral Gray</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Typography</h2>
          
          <Card className="glass">
            <CardContent className="pt-6 space-y-4">
              <h1 className="text-5xl font-bold text-white">Heading 1 - 48px Bold</h1>
              <h2 className="text-4xl font-bold text-white">Heading 2 - 36px Bold</h2>
              <h3 className="text-3xl font-semibold text-white">Heading 3 - 30px Semibold</h3>
              <h4 className="text-2xl font-semibold text-white">Heading 4 - 24px Semibold</h4>
              <p className="text-lg text-cbd-gray-light">Body Large - 18px Regular</p>
              <p className="text-base text-cbd-gray-light">Body - 16px Regular</p>
              <p className="text-sm text-cbd-gray-light">Body Small - 14px Regular</p>
              <p className="text-xs text-cbd-gray">Body XS - 12px Regular</p>
            </CardContent>
          </Card>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Buttons</h2>
          
          <Card className="glass">
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Package className="h-4 w-4" /></Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="glow-green">Primary with Glow</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Badges</h2>
          
          <Card className="glass">
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="info">Info</Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-3">Stock Status Badges</h4>
                <div className="flex flex-wrap gap-3">
                  <StockStatusBadge status={StockStatus.NORMAL} />
                  <StockStatusBadge status={StockStatus.LOW} />
                  <StockStatusBadge status={StockStatus.CRITICAL} />
                  <StockStatusBadge status={StockStatus.OUT_OF_STOCK} />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-3">Order Status Badges</h4>
                <div className="flex flex-wrap gap-3">
                  <OrderStatusBadge status={OrderStatus.PENDING} />
                  <OrderStatusBadge status={OrderStatus.CONFIRMED} />
                  <OrderStatusBadge status={OrderStatus.PREPARING} />
                  <OrderStatusBadge status={OrderStatus.SHIPPED} />
                  <OrderStatusBadge status={OrderStatus.DELIVERED} />
                  <OrderStatusBadge status={OrderStatus.CANCELLED} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stat Cards */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Stat Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Sales"
              value="€12,430"
              change={12.5}
              icon={DollarSign}
            />
            <StatCard
              title="Products Sold"
              value="342"
              change={8.2}
              icon={ShoppingCart}
            />
            <StatCard
              title="New Customers"
              value="28"
              change={-3.1}
              icon={Users}
            />
            <StatCard
              title="Active Stores"
              value="5"
              icon={Store}
            />
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Form Elements</h2>
          
          <Card className="glass">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" disabled placeholder="Disabled field" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-cbd-green/20">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>
                  A card with glassmorphism effect and green border
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-cbd-gray-light">
                  This is the default card style used throughout the application.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-cbd-green/20 card-hover">
              <CardHeader>
                <CardTitle>Hover Card</CardTitle>
                <CardDescription>
                  Card with hover effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-cbd-gray-light">
                  Hover over this card to see the scale and glow effect.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Effects */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Effects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass">
              <CardContent className="pt-6 text-center">
                <div className="h-24 flex items-center justify-center">
                  <p className="text-white font-medium">Glassmorphism</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong">
              <CardContent className="pt-6 text-center">
                <div className="h-24 flex items-center justify-center">
                  <p className="text-white font-medium">Strong Glass</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass glow-green">
              <CardContent className="pt-6 text-center">
                <div className="h-24 flex items-center justify-center">
                  <p className="text-white font-medium">Green Glow</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Icons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Icons</h2>
          
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Store className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Store</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Package className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Package</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Cart</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Users</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Chart</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <DollarSign className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Dollar</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Trending</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-cbd-green" />
                  <span className="text-xs text-cbd-gray">Alert</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
