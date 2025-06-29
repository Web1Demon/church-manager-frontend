import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Target, PieChart, BarChart } from "lucide-react";
/**
 * @typedef {Object} Transaction
 * @property {number} id
 * @property {string} type
 * @property {string} category
 * @property {number} amount
 * @property {string} date
 * @property {string} description
 * @property {string} method
 */

/**
 * @typedef {Object} FinancialInsightsProps
 * @property {Transaction[]} transactions
 * @property {boolean} [isDarkMode]
 */

const FinancialInsights = ({ transactions, isDarkMode = false }) => {
  // Calculate insights
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netIncome = totalIncome - totalExpenses;
  
  // Category analysis
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  
  const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];
  
  // Financial health score (0-100)
  const expenseRatio = totalExpenses / totalIncome;
  const healthScore = Math.max(0, Math.min(100, 100 - (expenseRatio * 100)));
  
  // Insights and recommendations
  const insights = [
    {
      type: netIncome > 0 ? "positive" : "negative",
      icon: netIncome > 0 ? TrendingUp : TrendingDown,
      title: netIncome > 0 ? "Positive Cash Flow" : "Negative Cash Flow",
      description: `Your net income is ${netIncome > 0 ? '+' : ''}$${netIncome.toLocaleString()}`,
      color: netIncome > 0 ? "text-green-600" : "text-red-600"
    },
    {
      type: "info",
      icon: Target,
      title: "Top Category",
      description: topCategory ? `${topCategory[0]}: $${topCategory[1].toLocaleString()}` : "No data available",
      color: "text-blue-600"
    },
    {
      type: healthScore > 70 ? "positive" : healthScore > 40 ? "warning" : "negative",
      icon: healthScore > 70 ? TrendingUp : AlertTriangle,
      title: "Financial Health",
      description: `Score: ${Math.round(healthScore)}/100`,
      color: healthScore > 70 ? "text-green-600" : healthScore > 40 ? "text-yellow-600" : "text-red-600"
    }
  ];

  const cardClass = isDarkMode ? "bg-gray-900 border-gray-700" : "";
  const textClass = isDarkMode ? "text-green-400" : "";
  const subTextClass = isDarkMode ? "text-green-300" : "text-gray-600";

  return (
    <div className="space-y-6">
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${textClass}`}>
            <BarChart className="h-5 w-5" />
            <span>Financial Insights</span>
          </CardTitle>
          <CardDescription className={subTextClass}>
            AI-powered analysis of your financial data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${isDarkMode ? 'text-green-400' : insight.color}`} />
                    <span className={`font-medium ${textClass}`}>{insight.title}</span>
                  </div>
                  <p className={`text-sm ${subTextClass}`}>{insight.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${textClass}`}>
            <PieChart className="h-5 w-5" />
            <span>Quick Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                ${totalIncome.toLocaleString()}
              </div>
              <div className={`text-sm ${subTextClass}`}>Total Income</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                ${totalExpenses.toLocaleString()}
              </div>
              <div className={`text-sm ${subTextClass}`}>Total Expenses</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${textClass}`}>
                {transactions.length}
              </div>
              <div className={`text-sm ${subTextClass}`}>Transactions</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${textClass}`}>
                {Object.keys(categoryTotals).length}
              </div>
              <div className={`text-sm ${subTextClass}`}>Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialInsights;
