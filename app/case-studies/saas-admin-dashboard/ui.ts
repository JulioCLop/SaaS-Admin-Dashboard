export function pillClasses() {
  return "rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/85 transition hover:-translate-y-[1px] hover:border-white/20 hover:bg-white/[0.06]";
}

export function btnClasses(primary: boolean) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full px-3.5 py-2.5 text-sm transition hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(0,0,0,.25)]",
    primary
      ? "border border-[#7C5CFF]/55 bg-gradient-to-r from-[#7C5CFF] to-[#00D4FF]/70 shadow-[0_20px_55px_rgba(124,92,255,.25)] hover:shadow-[0_30px_80px_rgba(124,92,255,.30)]"
      : "border border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
  ].join(" ");
}
