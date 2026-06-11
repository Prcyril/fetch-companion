function PFramerText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.framer-text">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1b1b1c] text-[21.5px] tracking-[-0.4px] whitespace-nowrap">
        <p className="leading-[30.8px]">Check my price 👉</p>
      </div>
    </div>
  );
}

function DivFramer1Sh7Qrh() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[181px]" data-name="div.framer-1sh7qrh">
      <PFramerText />
    </div>
  );
}

function CheckMyPrice() {
  return (
    <div className="bg-[#b1ff9e] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[40px] shadow-[1px_1px_0px_0px_#1b1b1c] shrink-0" data-name="Check my price 👉">
      <DivFramer1Sh7Qrh />
      <div className="absolute inset-0 rounded-[40px]" data-name="::after">
        <div aria-hidden className="absolute border-3 border-[#222] border-solid inset-0 pointer-events-none rounded-[40px]" />
      </div>
    </div>
  );
}

export default function DivFramer11Qg5FvContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="div.framer-11qg5fv-container">
      <CheckMyPrice />
    </div>
  );
}