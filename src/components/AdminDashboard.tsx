import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Building,
  ShoppingBag,
  Activity,
  CheckCircle2,
  XCircle,
  TrendingUp,
  MapPin,
  PackageCheck,
  Truck,
  DollarSign,
  Users,
} from 'lucide-react';
import { Order } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    gyms,
    orders,
    verifyGymByAdmin,
    toggleGymStatusByAdmin,
    updateOrderStatusByAdmin,
    formatPrice,
  } = useApp();

  const [adminTab, setAdminTab] = useState<'gyms' | 'orders' | 'logs'>('gyms');

  const auditLogs = [
    { id: 'log-1', action: 'Personal Record Approved', target: 'Aryan Sharma (Squat 185kg)', actor: 'Ansh Dwivedi', time: '12 mins ago' },
    { id: 'log-2', action: 'New Pass Activated', target: 'Mohit Rawat (Annual Elite)', actor: 'System Turnstile', time: '45 mins ago' },
    { id: 'log-3', action: 'Store Order Dispatched', target: 'ORD-98214 (Primal Whey Isolate)', actor: 'Ansh Dwivedi', time: '2 hours ago' },
    { id: 'log-4', action: 'Facility Inspection Cleared', target: 'Akhada Iron Forge Arena', actor: 'Ansh Dwivedi', time: 'Yesterday' },
    { id: 'log-5', action: 'UPI Webhook Settlement', target: '₹21,999 credited to Akhada Global', actor: 'Bank Gateway', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Header dedicated to Ansh Dwivedi */}
      <div className="bg-gradient-to-r from-[#201026] via-[#15121E] to-[#0E1319] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                  Ansh Dwivedi
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 text-[10px] font-black uppercase tracking-wider border border-purple-500/40">
                  Platform Administrator &amp; Founder
                </span>
              </div>
              <p className="text-xs text-purple-200/90 font-medium mt-1">
                Full Super-Admin Authority • Network Management, E-Commerce &amp; Financial Settlements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
            <span>Root Admin Session #AKH-ADM-ANS-01</span>
          </div>
        </div>
      </div>

      {/* Global Platform KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Platform GMV</span>
            <span className="text-2xl font-black font-mono text-[#CCFF00] mt-1 block">
              {formatPrice(1842000)}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-semibold">
              <TrendingUp className="w-3 h-3" /> +28.4% this quarter
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#CCFF00]/10 text-[#CCFF00]">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Partner Arenas</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">{gyms.length}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">5 Tier-1 Metros</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Building className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Registered Athletes</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">1,420</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Verified ID holders</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#12171E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Gear Store Revenue</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">
              {formatPrice(312000)}
            </span>
            <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">98.5% on-time delivery</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setAdminTab('gyms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            adminTab === 'gyms'
              ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Gym Partner Approvals ({gyms.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            adminTab === 'orders'
              ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>E-Commerce Fulfillment ({orders.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            adminTab === 'logs'
              ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Platform Audit Trail</span>
        </button>
      </div>

      {/* TAB 1: GYM PARTNER MANAGEMENT */}
      {adminTab === 'gyms' && (
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-400" />
              Affiliated Gym Partner Directory &amp; Moderation
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Super Admin <strong>Ansh Dwivedi</strong> has complete rights to audit equipment, verify licenses, and activate/suspend partner gyms.
            </p>
          </div>

          <div className="space-y-4">
            {gyms.map((gym) => (
              <div
                key={gym.id}
                className="p-5 rounded-2xl bg-[#0A0D10] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-16 h-16 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{gym.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#CCFF00]" /> {gym.city}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">
                      Owner: <strong className="text-white">{gym.ownerName}</strong> • Monthly Pass: {formatPrice(gym.monthlyPrice)}
                    </p>

                    <div className="flex items-center gap-3 text-[10px]">
                      <span className={`font-bold ${gym.verified ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {gym.verified ? '● Verified Partner' : '○ Pending Audit'}
                      </span>
                      <span className={`font-bold ${gym.status === 'active' ? 'text-blue-400' : 'text-red-400'}`}>
                        ● Status: {gym.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => verifyGymByAdmin(gym.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      gym.verified
                        ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{gym.verified ? 'Revoke Badge' : 'Grant Verified'}</span>
                  </button>

                  <button
                    onClick={() => toggleGymStatusByAdmin(gym.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      gym.status === 'active'
                        ? 'bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/20'
                        : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30'
                    }`}
                  >
                    {gym.status === 'active' ? (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Suspend</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Reactivate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STORE ORDERS MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              Customer Orders &amp; Logistics Tracking
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Super Admin <strong>Ansh Dwivedi</strong> manages fulfillment, courier dispatches, and warehouse operations.
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-[#0A0D10] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{order.id}</span>
                    <span className="text-xs text-slate-400">• Customer: <strong className="text-white">{order.customerName}</strong></span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">{order.paymentMethod}</span>
                  </div>

                  <div className="text-xs text-slate-300">
                    {order.items.map((it) => `${it.product.name} (Qty ${it.quantity})`).join(', ')}
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span>Placed: {order.date}</span>
                    <span>Tracking: <strong className="text-slate-300 font-mono">{order.trackingNumber}</strong></span>
                    <span className="text-[#CCFF00] font-mono font-bold text-xs">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(['Processing', 'Shipped', 'Delivered'] as Order['status'][]).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatusByAdmin(order.id, status)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        order.status === status
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40 shadow-sm'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {status === 'Delivered' && <PackageCheck className="w-3.5 h-3.5 inline mr-1" />}
                      {status === 'Shipped' && <Truck className="w-3.5 h-3.5 inline mr-1" />}
                      <span>{status}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLATFORM AUDIT TRAIL */}
      {adminTab === 'logs' && (
        <div className="bg-[#12171E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black font-display tracking-tight text-white uppercase flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Immutable System Activity Logs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every action taken across member logins, owner approvals, and admin controls is timestamped.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">● Live Sync</span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-[#0A0D10] border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <div>
                    <span className="font-bold text-white block">{log.action}</span>
                    <span className="text-[11px] text-slate-400">{log.target}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-purple-300 font-semibold block">By {log.actor}</span>
                  <span className="text-[10px] text-slate-500">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
