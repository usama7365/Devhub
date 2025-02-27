import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Loader2, ArrowRight } from 'lucide-react';
import { buttonUtils } from '../utils/buttonUtils';

type ButtonVariant =
  | 'solid'
  | 'soft'
  | 'outlined'
  | 'subtle'
  | 'brand'
  | 'social'
  | 'link';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // defines custom styling for buttons(hover, border etc)
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  withArrow?: boolean;
}

// Styles configuration
const styles = {
  base: buttonUtils(
    'inline-flex items-center justify-center font-medium rounded-md transition-all duration-300',
    'disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap',
    'px-4 py-2 text-base' // Default Tailwind button sizing
  ),
  variant: {
    solid:
      'bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-95 border border-transparent hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--shadow-color)]/20 active:scale-[0.98] transform transition-all duration-300',
    soft: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-opacity-90 border border-transparent hover:shadow-md hover:shadow-[var(--shadow-color)]/10 active:scale-[0.98] transform transition-all duration-300',
    outlined:
      'border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] hover:shadow-md hover:shadow-[var(--shadow-color)]/10 active:scale-[0.98] transform transition-all duration-300',
    subtle:
      'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/80 border border-transparent hover:shadow-sm active:scale-[0.98] transform transition-all duration-300',
    brand:
      'bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent)]/90 border border-transparent hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--shadow-color)]/20 active:scale-[0.98] transform transition-all duration-300',
    social:
      'border border-[var(--border-color)] text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/90 hover:border-[var(--text-secondary)] hover:shadow-md hover:shadow-[var(--shadow-color)]/10 active:scale-[0.98] transform transition-all duration-300',
    link: 'font-medium text-[var(--accent)] hover:text-[var(--accent)]/90 p-0 hover:underline decoration-2 underline-offset-4 transition-all duration-300',
  },
  icon: {
    base: 'transition-transform duration-300 group-hover:scale-110 flex-shrink-0',
    spacing: {
      left: 'mr-2',
      right: 'ml-2',
    },
  },
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      href,
      isExternal = false,
      isLoading = false,
      fullWidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      withArrow = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonClasses = buttonUtils(
      styles.base,
      styles.variant[variant] || styles.variant.solid,
      fullWidth && 'w-full', // Ensures full-width works dynamically
      className
    );

    const iconClasses = (isLeft: boolean) =>
      buttonUtils(
        styles.icon.base,
        isLeft ? styles.icon.spacing.left : styles.icon.spacing.right
      );

    const content = (
      <>
        {isLoading ? (
          <Loader2
            className={buttonUtils(
              'animate-spin flex-shrink-0',
              styles.icon.spacing.left
            )}
          />
        ) : (
          LeftIcon && <LeftIcon className={iconClasses(true)} />
        )}
        <span className="relative inline-block">
          {children}
          {withArrow && (
            <ArrowRight
              className={buttonUtils(
                'inline-block transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0',
                styles.icon.spacing.right
              )}
            />
          )}
        </span>
        {!isLoading && RightIcon && (
          <RightIcon className={iconClasses(false)} />
        )}
      </>
    );

    return href ? (
      isExternal ? (
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      ) : (
        <Link to={href} className={buttonClasses}>
          {content}
        </Link>
      )
    ) : (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isLoading || disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
