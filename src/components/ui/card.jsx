
const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white shadow-sm rounded-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`pb-3 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );

}

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h2
      className={`text-xl font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
  }

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={`text-gray-600 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
  }

  const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
    }

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`border-t border-gray-200 pt-4 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );

}

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent, Card };