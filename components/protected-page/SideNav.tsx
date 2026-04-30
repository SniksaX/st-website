'use client'

type SideNavItem = {
  id: string
  label: string
}

type SideNavProps = {
  items: SideNavItem[]
  ariaLabel: string
  navId?: string
  navClassName?: string
  itemClassName: string
  activeClassName: string
  onItemClick: (id: string) => void
}

export default function SideNav({
  items,
  ariaLabel,
  navId,
  navClassName,
  itemClassName,
  activeClassName,
  onItemClick,
}: SideNavProps) {
  return (
    <nav id={navId} className={navClassName} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={`${itemClassName}${index === 0 ? ` ${activeClassName}` : ''}`}
          data-section={item.id}
          data-label={item.label}
          aria-label={item.label}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </nav>
  )
}
