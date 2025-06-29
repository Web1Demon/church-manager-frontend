import { useTheme } from '../contexts/ThemeContext';

const PageTitle = ({ 
  children, 
  variant = 'default',
  size = 'large',
  align = 'left',
  className = '',
  showUnderline = false,
  gradient = false,
  ...props 
}) => {
  const { isDark } = useTheme();

  // Size variants
  const sizeClasses = {
    small: 'text-2xl md:text-3xl',
    medium: 'text-3xl md:text-4xl',
    large: 'text-3xl md:text-4xl lg:text-5xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl'
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  // Base classes that apply to all variants
  const baseClasses = [
    sizeClasses[size],
    alignClasses[align],
    'font-bold leading-tight tracking-tight mb-6',
    'transition-colors duration-200'
  ].join(' ');

  // Variant-specific classes
  const variantClasses = {
    default: isDark ? 'text-green-600' : 'text-gray-900',
    primary: isDark ? 'text-blue-400' : 'text-blue-600',
    accent: isDark ? 'text-green-400' : 'text-green-600',
    muted: isDark ? 'text-gray-400' : 'text-gray-600'
  };

  // Gradient style
  const gradientStyle = gradient ? {
    background: isDark 
      ? 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)'
      : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  } : {};

  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <h1
        className={`
          ${baseClasses}
          ${gradient ? '' : variantClasses[variant]}
          ${className}
        `}
        style={gradientStyle}
        {...props}
      >
        {children}
      </h1>
    </div>
  );
};

export default PageTitle;