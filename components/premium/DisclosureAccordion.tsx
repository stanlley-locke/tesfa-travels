'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface AccordionItemData {
  value: string;
  trigger: string;
  content: string;
}

interface DisclosureAccordionProps {
  items: AccordionItemData[];
  defaultValue?: string;
  className?: string;
}

export function DisclosureAccordion({
  items,
  defaultValue,
  className = '',
}: DisclosureAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue} className={className}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="text-lg font-semibold hover:text-accent transition-colors">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
