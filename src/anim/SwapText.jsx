/**
 * Hover text-swap: the label slides up and out while an identical copy slides
 * in from below (the duplicated-label effect on nk.studio CTAs).
 * Place inside any button/link; the hover of the nearest interactive
 * ancestor triggers it (see .swap CSS).
 */
export default function SwapText({ children }) {
  return (
    <span className="swap">
      <span className="swap-line">{children}</span>
      <span className="swap-line swap-line--dup" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
