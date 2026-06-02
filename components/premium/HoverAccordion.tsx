'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface HoverAccordionItem {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

interface HoverAccordionProps {
  items: HoverAccordionItem[];
  defaultOpen?: string;
}

export function HoverAccordion({ items, defaultOpen }: HoverAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen || null);

  return (
    <div className="space-y-3 w-full">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
          layout
          onMouseEnter={() => setOpenId(item.id)}
          onMouseLeave={() => setOpenId(null)}
        >
          <motion.button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
            layout
          >
            <div className="flex items-center gap-3">
              {item.icon && <div className="text-accent">{item.icon}</div>}
              <h3 className="text-lg font-semibold text-primary dark:text-white text-left">
                {item.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className="text-accent" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
