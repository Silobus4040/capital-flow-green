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
    <div className={`w-full p-4 sm:p-6 lg:p-8 ${className}`}>
      <div 
        className="loan-program-terms prose prose-sm sm:prose-base lg:prose-lg max-w-none loan-terms-enhanced space-y-4 sm:space-y-6"
        dangerouslySetInnerHTML={{ __html: sanitizedTerms }}
      />
    </div>
  );
}