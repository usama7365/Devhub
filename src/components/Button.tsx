import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Loader2, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'github' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  className?: string;
  withArrow?: boolean;
  onClick?: () => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      href,
      isExternal = false,
      isLoading = false,
      fullWidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      withArrow = false,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group';
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-3 text-lg',
      full: 'w-full py-2 px-4 text-sm'
    };
    
    const variants = {
      primary: 'bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-95 border border-transparent hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--shadow-color)]/20 active:scale-[0.98] transform transition-all duration-300',
      secondary: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-opacity-90 border border-transparent hover:shadow-md hover:shadow-[var(--shadow-color)]/10 active:scale-[0.98] transform transition-all duration-300',
      outline: 'border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] hover:shadow-md hover:shadow-[var(--shadow-color)]/10 active:scale-[0.98] transform transition-all duration-300',
      ghost: 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/80 border border-transparent hover:shadow-sm active:scale-[0.98] transform transition-all duration-300',
      accent: 'bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent)]/90 border border-transparent hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--shadow-color)]/20 active:scale-[0.98] transform transition-all duration-300',
      github: 'border border-[var(--border-color)] text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/90 hover:border-[var(--text-secondary)] hover:shadow-md hover:shadow-[var(--shadow-color)]/10 active:scale-[0.98] transform transition-all duration-300',
      link: 'font-medium text-[var(--accent)] hover:text-[var(--accent)]/90 p-0 hover:underline decoration-2 underline-offset-4 transition-all duration-300'
    };

    const classes = cn(
      baseStyles,
      variant !== 'link' && sizes[size],
      variants[variant],
      fullWidth && variant !== 'link' && 'w-full',
      className
    );

    const content = (
      <>
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!isLoading && LeftIcon && (
          <LeftIcon className={cn(
            "transition-transform duration-300 group-hover:scale-110",
            size === 'sm' || size === 'full' ? 'w-4 h-4 mr-2' : 'w-5 h-5 mr-2 -ml-1',
            variant === 'link' && 'w-4 h-4 mr-2'
          )} />
        )}
        <span className="relative">
          {children}
          {withArrow && (
            <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
        {!isLoading && RightIcon && (
          <RightIcon className={cn(
            "transition-transform duration-300 group-hover:scale-110",
            size === 'sm' || size === 'full' ? 'w-4 h-4 ml-2' : 'w-5 h-5 ml-2 -mr-1',
            variant === 'link' && 'w-4 h-4 ml-2'
          )} />
        )}
      </>
    );

    if (href) {
      const linkProps = {
        className: classes,
        ...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer'
        })
      };

      return isExternal ? (
        <a href={href} {...linkProps}>
          {content}
        </a>
      ) : (
        <Link to={href} {...linkProps}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isLoading || disabled}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);