import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Sparkles, CheckCircle2, X } from 'lucide-react';

export const DonationSection: React.FC = () => {
  const { t } = useLanguage();
  const { isDonateOpen, setIsDonateOpen, addDonation } = useApp();
  
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const amounts = [25, 50, 100, 250];

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (finalAmount > 0) {
      addDonation(finalAmount, message);
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    setIsDonateOpen(false);
    setIsSuccess(false);
  };

  return (
    <>
      {/* Inline Section Callout */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-900 to-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Heart className="w-3.5 h-3.5 fill-amber-400" />
            <span>FOUNDATION SUPPORT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t('donate.title', 'Support The Future Of Music Education')}
          </h2>

          <p className="mt-4 text-base text-neutral-300 leading-relaxed">
            {t('donate.subtitle', 'Your contribution funds equipment grants, free studio access, and scholarships for emerging artists worldwide.')}
          </p>

          <div className="mt-8">
            <button
              onClick={() => setIsDonateOpen(true)}
              className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-neutral-950" />
              <span>Make a Tax-Deductible Donation</span>
            </button>
          </div>

        </div>
      </section>

      {/* Donation Modal */}
      {isDonateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-lg my-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-neutral-900 dark:text-neutral-100 p-6 md:p-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-50">
                  Support Music Education
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleDonateSubmit} className="space-y-5 my-6">
                
                {/* Preset Amounts */}
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase mb-2">
                    Select Donation Amount (EUR)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {amounts.map((amt) => {
                      const isSel = selectedAmount === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-3 rounded-xl font-mono text-xs font-bold border transition-all ${
                            isSel
                              ? 'bg-amber-500 text-neutral-950 border-amber-500'
                              : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          €{amt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                    Or Enter Custom Amount (€)
                  </label>
                  <input
                    type="number"
                    min="5"
                    placeholder="Enter custom amount..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono"
                  />
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                    Dedication / Note of Support (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="In honor of emerging artists everywhere..."
                    className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium"
                  />
                </div>

                {/* Impact Callout */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>100% of donations directly fund equipment grants and free student software.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  Confirm Donation of €{customAmount || selectedAmount}
                </button>

              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold">Thank You For Your Support!</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Your generosity helps empower emerging musicians around the globe.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-xs uppercase"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
