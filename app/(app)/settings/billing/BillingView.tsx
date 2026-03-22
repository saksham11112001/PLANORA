'use client'
import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { toast } from '@/store/appStore'

const PLANS = [
  {
    key:      'free',
    name:     'Free',
    priceINR: 0,
    features: ['Up to 5 members','3 projects','Basic task management','Client management'],
  },
  {
    key:      'starter',
    name:     'Starter',
    priceINR: 999,
    features: ['Up to 15 members','15 projects','Time tracking','Recurring tasks','Priority support'],
    popular:  false,
  },
  {
    key:      'pro',
    name:     'Pro',
    priceINR: 2999,
    features: ['Up to 50 members','Unlimited projects','Advanced reports','API access','Recurring tasks','Time tracking'],
    popular:  true,
  },
  {
    key:      'business',
    name:     'Business',
    priceINR: 7999,
    features: ['Unlimited members','Unlimited projects','All Pro features','SSO / SAML','Audit log','Dedicated support'],
  },
]

interface Props { orgName: string; currentPlan: string; status: string; subscriptionId: string | null }

export function BillingView({ orgName, currentPlan, status, subscriptionId }: Props) {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleUpgrade(plan: string) {
    if (plan === 'free' || plan === currentPlan) return
    setLoading(plan)
    try {
      const res = await fetch('/api/settings/billing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_tier: plan }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error ?? 'Failed to initiate payment'); setLoading(null); return }

      const { subscription_id, key_id } = data
      // Load Razorpay checkout script dynamically
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
      script.onload = () => {
        const options = {
          key:            key_id,
          subscription_id,
          name:           'Planora',
          description:    `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan — Monthly`,
          image:          '/favicon.ico',
          prefill:        { name: orgName },
          theme:          { color: '#0d9488' },
          handler: (response: any) => {
            toast.success('Payment successful! Your plan has been upgraded.')
            setTimeout(() => window.location.reload(), 1500)
          },
          modal: { ondismiss: () => setLoading(null) },
        }
        const rzp = new (window as any).Razorpay(options)
        rzp.open()
        setLoading(null)
      }
    } catch { toast.error('Network error'); setLoading(null) }
  }

  return (
    <div>
      {/* Current plan status */}
      <div className="card p-5 mb-8 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center">
          <Zap className="h-6 w-6 text-teal-600"/>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current plan</p>
          <p className="text-xl font-bold text-gray-900 capitalize">{currentPlan}</p>
        </div>
        {subscriptionId && (
          <div className="ml-auto">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{status}</span>
          </div>
        )}
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-2 gap-4">
        {PLANS.map(plan => {
          const isCurrent = plan.key === currentPlan
          const isLoading = loading === plan.key
          return (
            <div key={plan.key}
              className={`card p-5 relative ${plan.popular ? 'border-2 border-teal-500' : ''} ${isCurrent ? 'ring-2 ring-teal-300' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most popular</div>
              )}
              {isCurrent && (
                <div className="absolute -top-3 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Current</div>
              )}
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
              <div className="mb-4">
                {plan.priceINR === 0
                  ? <span className="text-2xl font-bold text-gray-900">Free</span>
                  : <><span className="text-2xl font-bold text-gray-900">₹{plan.priceINR.toLocaleString('en-IN')}</span><span className="text-gray-400 text-sm">/mo</span></>
                }
              </div>
              <ul className="space-y-2 mb-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5"/>
                    {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <div className="w-full py-2 text-center text-sm font-medium text-teal-600 bg-teal-50 rounded-lg">Current plan</div>
              ) : plan.key === 'free' ? (
                <div className="w-full py-2 text-center text-sm text-gray-400">Downgrade on cancellation</div>
              ) : (
                <button onClick={() => handleUpgrade(plan.key)} disabled={isLoading || !!loading}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${plan.popular ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'border border-teal-500 text-teal-600 hover:bg-teal-50'} disabled:opacity-50`}>
                  {isLoading ? 'Opening checkout...' : `Upgrade to ${plan.name}`}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-center text-gray-400 mt-6">
        Payments powered by Razorpay · Secure · Cancel anytime
      </p>
    </div>
  )
}
