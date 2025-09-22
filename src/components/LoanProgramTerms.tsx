import { ScrollArea } from "@/components/ui/scroll-area";
import DOMPurify from "dompurify";

interface LoanProgramTermsProps {
  terms: string;
  className?: string;
}

export default function LoanProgramTerms({ terms, className = "" }: LoanProgramTermsProps) {
  const sanitizedTerms = DOMPurify.sanitize(terms, {
    ALLOWED_TAGS: ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'span', 'strong', 'em', 'br'],
    ALLOWED_ATTR: ['style', 'class'],
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'iframe'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror']
  });

  return (
    <ScrollArea className={`min-h-96 max-h-[600px] w-full rounded-md border p-4 md:p-8 ${className}`}>
      <div 
        className="loan-program-terms prose prose-base md:prose-lg max-w-none loan-terms-enhanced"
        dangerouslySetInnerHTML={{ __html: sanitizedTerms }}
      />
    </ScrollArea>
  );
}