"use client";
import { addProduct } from "@/src/lib/api";

import { 
  LayoutDashboard, ShoppingBag, Users, ShoppingCart, Mail, MessageSquare, 
  ShieldCheck, LogOut, Search, Bell, Sun, ChevronDown, Plus, Download, 
  Edit, Eye, Trash2, Store, Share2, Filter, ChevronLeft, ChevronRight, Star
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend 
} from 'recharts';

// --- MOCK DATA FOR CHARTS ---
const profitData = [
  { name: '1D', profit: 4000 }, { name: '2D', profit: 3000 }, { name: '3D', profit: 5000 },
  { name: '4D', profit: 2780 }, { name: '5D', profit: 1890 }, { name: '6D', profit: 3490 }, { name: '7D', profit: 4490 },
];

// --- UPDATED MOCK DATA FOR FULL YEAR ---
const salesReportData = [
  { month: 'JAN', revenue: 4500, expense: 2400 }, 
  { month: 'FEB', revenue: 5200, expense: 1398 },
  { month: 'MAR', revenue: 4800, expense: 9800 }, 
  { month: 'APR', revenue: 6100, expense: 3908 },
  { month: 'MAY', revenue: 5900, expense: 4800 }, 
  { month: 'JUN', revenue: 6800, expense: 3800 },
  { month: 'JUL', revenue: 7200, expense: 4200 },
  { month: 'AUG', revenue: 6500, expense: 3500 },
  { month: 'SEP', revenue: 8100, expense: 5100 },
  { month: 'OCT', revenue: 7800, expense: 4600 },
  { month: 'NOV', revenue: 9200, expense: 5800 },
  { month: 'DEC', revenue: 10500, expense: 6200 },
];

const customerRateData = [
  { name: 'JAN', new: 4000, old: 2400 }, 
  { name: 'MAR', new: 3500, old: 3000 },
  { name: 'MAY', new: 5000, old: 2800 }, 
  { name: 'JUL', new: 4200, old: 4500 },
  { name: 'SEP', new: 6000, old: 3900 },
  { name: 'NOV', new: 5500, old: 4800 },
  { name: 'DEC', new: 7200, old: 5100 },
];


const recentOrders = [
  { id: "#9192", customer: "Gregory Medhurst", email: "greg@yahoo.com", items: 21, price: "$657.00", status: "Refunded" },
  { id: "#4983", customer: "Becky Goodwin", email: "becky@gmail.com", items: 93, price: "$557.00", status: "Cancelled" },
  { id: "#2413", customer: "Ann Leuschke", email: "favian@yahoo.com", items: 23, price: "$857.00", status: "Completed" },
];

const products = [
  { id: 1, name: "Licensed Concrete Cheese", cat: "Electronics", sku: "SKU-86229", stock: 70, price: 210, rating: 3.2, reviews: 24, status: "Pending", img: "https://api.dicebear.com/7.x/shapes/svg?seed=1" },
  { id: 2, name: "Electronic Rubber Table", cat: "Books", sku: "SKU-89762", stock: 60, price: 210, rating: 3.3, reviews: 45, status: "Pending", img: "https://api.dicebear.com/7.x/shapes/svg?seed=2" },
  { id: 3, name: "Practical Steel Keyboard", cat: "Kids", sku: "SKU-41063", stock: 50, price: 310, rating: 4.3, reviews: 57, status: "Publish", img: "https://api.dicebear.com/7.x/shapes/svg?seed=3" },
  { id: 4, name: "Sleek Frozen Ball", cat: "Electronics", sku: "SKU-13240", stock: 14, price: 410, rating: 2.5, reviews: 75, status: "Pending", img: "https://api.dicebear.com/7.x/shapes/svg?seed=4" },
  { id: 5, name: "Ergonomic Frozen Pants", cat: "Games", sku: "SKU-26214", stock: 0, price: 410, rating: 3.5, reviews: 14, status: "Publish", img: "https://api.dicebear.com/7.x/shapes/svg?seed=5" },
];

export default function EcmeCompleteDashboard() {
const handleAddProduct = async () => {
  try {
    const res = await addProduct({
      title: "Test Product",
      price: 1200,
      description: "Testing",
      image: "https://picsum.photos/400",
      category: "Art",
    });

    console.log("SUCCESS:", res);
    alert("✅ Product Added");

  } catch (error: any) {
    console.error("FULL ERROR:", error);
    alert(error.message);
  }
};
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#111827] font-sans z-50 relative">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#1F2937] p-1.5 rounded-lg"><div className="w-5 h-5 bg-white rotate-45"></div></div>
          <span className="text-2xl font-black tracking-tight">Admin Panel</span>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
          <SidebarLink icon={<ShoppingBag size={18}/>} label="Category" hasSub />
          <SidebarLink icon={<ShoppingCart size={18}/>} label="Products" active />
          <SidebarLink icon={<Users size={18}/>} label="Customers" />
          <SidebarLink icon={<ShoppingCart size={18}/>} label="Orders" />
          <SidebarLink icon={<Mail size={18}/>} label="Mail" />
          <SidebarLink icon={<MessageSquare size={18}/>} label="Chat" />
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 w-full px-4 py-2 transition-all">
            <LogOut size={18}/> <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 p-8 space-y-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 bg-white border px-4 py-2 rounded-xl w-96 shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search here..." className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-500"><Sun size={20}/></button>
            <button className="text-gray-500 relative"><Bell size={20}/><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-9 h-9 rounded-full border bg-orange-100" alt="avatar" />
          </div>
        </header>

        {/* HERO SECTION */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex justify-between items-center relative overflow-hidden">
          <div className="z-10">
            <h1 className="text-4xl font-black mb-2">Good Morning, Cameron</h1>
            <p className="text-gray-400 mb-6 text-lg">Here’s what happening on your store today.</p>
            <button
            onClick={handleAddProduct} 
            className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-sm shadow-lg shadow-gray-200">
              <Plus size={18}/> Add Product
            </button>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" className="w-48 opacity-90 hidden md:block" alt="hero" />
        </div>

          {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard label="New Orders" value="1,390" growth="+32.40%" color="blue" />
          <StatCard label="Sales" value="$57,890" growth="-32.40%" color="emerald" isDown />
          <StatCard label="Revenue" value="$12,390" growth="+32.40%" color="indigo" />
          <StatCard label="Total Users" value="538" growth="+32.40%" color="rose" />
        </div>

        {/* --- RECENT ORDERS TABLE (Added right here under Hero) --- */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 flex justify-between items-center">
            <h2 className="text-xl font-black">Recent Orders</h2>
            <div className="flex gap-4">
              <button className="p-2 border rounded-xl"><Filter size={16}/></button>
              <button className="text-sm font-bold text-blue-600">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[11px] uppercase font-black text-gray-400 tracking-widest border-b">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-bold text-sm">{order.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 border flex items-center justify-center text-[10px] font-bold">CM</div>
                        <div><p className="font-black text-xs">{order.customer}</p><p className="text-[10px] text-gray-400 font-bold">{order.email}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-sm">{order.items}</td>
                    <td className="px-6 py-5 font-black text-sm">{order.price}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center flex justify-center gap-2">
                      <button className="p-2 border rounded-lg hover:bg-white"><Edit size={14}/></button>
                      <button className="p-2 border rounded-lg hover:bg-white"><Eye size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      

        {/* ROW: PROFIT & CHANNEL REVENUE */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black mb-6">Total Profit</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <defs><linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                  <Area type="monotone" dataKey="profit" stroke="#6366f1" strokeWidth={4} fill="url(#colorP)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="font-black text-xl mb-4">Channel revenue</h3>
            <div className="space-y-6">
              <Progress label="28%" color="bg-blue-500" w="w-[28%]" />
              <Progress label="38%" color="bg-emerald-400" w="w-[38%]" />
              <Progress label="42%" color="bg-orange-300" w="w-[42%]" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-8 border-t pt-8 text-center">
               <div className="flex flex-col items-center"><ShoppingCart className="text-blue-500" size={20}/><span className="font-black text-sm">$2.9K</span></div>
               <div className="flex flex-col items-center"><Store className="text-emerald-500" size={20}/><span className="font-black text-sm">$2.9K</span></div>
               <div className="flex flex-col items-center"><Share2 className="text-orange-300" size={20}/><span className="font-black text-sm">$2.9K</span></div>
            </div>
          </div>
        </div>

        {/* ROW: SALES REPORT & REPEAT CUSTOMER RATE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black mb-8">Sales Report</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={salesReportData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#94a3b8'}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" fill="#6366f110" stroke="#6366f1" strokeWidth={3} />
                  <Bar dataKey="expense" barSize={15} fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-xl font-black mb-8">Repeat Customer Rate</h3>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerRateData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#94a3b8'}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={4} dot={{r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} />
                  <Line type="monotone" dataKey="old" stroke="#3b82f6" strokeWidth={4} dot={{r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* PRODUCT TABLE SECTION */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-black mb-8">Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[11px] uppercase font-black text-gray-400 tracking-widest border-b">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Ratings</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 flex items-center gap-3">
                        <img src={p.img} className="w-10 h-10 rounded-full border shadow-sm" alt="" />
                        <div><p className="font-black text-sm">{p.name}</p><p className="text-xs text-gray-400 font-bold">{p.cat}</p></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${p.stock > 40 ? 'bg-emerald-500' : 'bg-yellow-400'}`} style={{width: `${p.stock}%`}}></div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-black text-sm">${p.price}.00</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5"><span className="text-sm font-black">{p.rating}</span> <Star size={12} fill="#fbbf24" className="text-yellow-400" /></div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.status === 'Publish' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center flex justify-center gap-2">
                        <button className="p-2 border rounded-lg hover:bg-white"><Edit size={14}/></button>
                        <button className="p-2 border rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---
const SidebarLink = ({ icon, label, active = false, hasSub = false }: any) => (
  <div className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-gray-100 text-black shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
    <div className="flex items-center gap-3">{icon} <span className="font-bold text-sm">{label}</span></div>
    {hasSub && <ChevronDown size={14} className="opacity-40" />}
  </div>
);

const StatCard = ({ label, value, growth, color, isDown }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm h-44 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-500`}><ShoppingBag size={20}/></div>
    </div>
    <div>
      <h3 className="text-3xl font-black">{value}</h3>
      <div className="flex justify-between text-[10px] font-bold uppercase mt-1">
        <span className="text-gray-400">{label}</span>
        <span className={isDown ? 'text-red-500' : 'text-emerald-500'}>{isDown?'↓':'↑'} {growth}</span>
      </div>
    </div>
  </div>
);

const Progress = ({ label, color, w }: any) => (
  <div className="space-y-1"><span className="text-xs font-black">{label}</span><div className="h-1.5 w-full bg-gray-50 rounded-full"><div className={`h-full ${color} rounded-full ${w}`}></div></div></div>
);