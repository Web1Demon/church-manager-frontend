import { useTheme } from '../../contexts/ThemeContext'; 

const Card = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm rounded-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`pb-3 mb-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  
  return (
    <h2
      className={`text-xl font-semibold ${isDark ? 'text-green-500' : 'text-gray-900'} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

const CardDescription = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  
  return (
    <p
      className={`${isDark ? 'text-gray-100' : 'text-gray-600'} ${className}`}
      {...props}  
    >
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`mt-4 ${isDark ? 'text-white' : 'text-gray-800'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent, Card };