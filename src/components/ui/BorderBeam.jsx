import { cn } from '../../lib/utils'

export default function BorderBeam({
  className,
  size = 200,
  duration = 12,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = '#4fc3f7',
  colorTo = '#7c3aed',
  delay = 0,
}) {
  return (
    <div
      style={{
        '--size': size,
        '--duration': duration,
        '--anchor': anchor,
        '--border-width': borderWidth,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--delay': `-${delay}s`,
      }}
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        '[border:calc(var(--border-width)*1px)_solid_transparent]',
        '[background:linear-gradient(#0a0a1a,#0a0a1a)_padding-box,conic-gradient(from_calc(var(--anchor)*1deg),transparent_0%,var(--color-from)_20%,var(--color-to)_30%,transparent_40%)_border-box]',
        '[animation:border-beam_calc(var(--duration)*1s)_linear_infinite]',
        '[animation-delay:var(--delay)]',
        className,
      )}
    />
  )
}
