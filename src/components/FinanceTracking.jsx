import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tab";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DollarSign, TrendingUp, TrendingDown, Plus, Calendar, Calculator, Search, Receipt, PieChart, Download } from "lucide-react";
import PageTitle from "./PageTitle";

const FinanceTracking = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    category: ""
  });
  const [transactionForm, setTransactionForm] = useState({
    type: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    method: ""
  });

  const financialStats = [
    {
      title: "Total Income",
      value: "$45,230",
      change: "+12.5%",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Expenses",
      value: "$23,100",
      change: "-5.2%",
      changeType: "negative",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Net Income",
      value: "$22,130",
      change: "+18.7%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Monthly Budget",
      value: "$50,000",
      change: "85% used",
      changeType: "neutral",
      icon: Calculator,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      type: "Income",
      category: "Tithes & Offerings",
      amount: 2450,
      date: "Dec 22, 2023",
      description: "Sunday Service Collection",
      method: "Cash"
    },
    {
      id: 2,
      type: "Expense",
      category: "Utilities",
      amount: -320,
      date: "Dec 21, 2023",
      description: "Electric Bill - December",
      method: "Bank Transfer"
    },
    {
      id: 3,
      type: "Income",
      category: "Donations",
      amount: 1200,
      date: "Dec 20, 2023",
      description: "Building Fund Donation",
      method: "Online"
    },
    {
      id: 4,
      type: "Expense",
      category: "Maintenance",
      amount: -180,
      date: "Dec 19, 2023",
      description: "HVAC Repair",
      method: "Credit Card"
    },
    {
      id: 5,
      type: "Income",
      category: "Special Events",
      amount: 850,
      date: "Dec 18, 2023",
      description: "Christmas Concert Donations",
      method: "Mixed"
    }
  ]);

  const budgetCategories = [
    { name: "Tithes & Offerings", budgeted: 35000, actual: 32450, percentage: 93 },
    { name: "Building Fund", budgeted: 8000, actual: 9200, percentage: 115 },
    { name: "Utilities", budgeted: 2000, actual: 1850, percentage: 93 },
    { name: "Staff Salaries", budgeted: 18000, actual: 18000, percentage: 100 },
    { name: "Ministry Programs", budgeted: 3500, actual: 2890, percentage: 83 },
    { name: "Maintenance", budgeted: 1500, actual: 1680, percentage: 112 }
  ];

  // Generate available months and years from transactions
  const {availableMonths, availableYears, availableCategories} = useMemo(() => {
    const months = [...new Set(recentTransactions.map(t => {
      const date = new Date(t.date);
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }))].sort();

    const years = [...new Set(recentTransactions.map(t => {
      const date = new Date(t.date);
      return date.getFullYear().toString();
    }))].sort();

    const categories = [...new Set(recentTransactions.map(t => t.category))].sort();

    return { availableMonths: months, availableYears: years, availableCategories: categories };
  }, [recentTransactions]);

  // filtering transactions based on filters
  const filteredTransactions = useMemo(() => {
    return recentTransactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
        
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      const transactionYear = transactionDate.getFullYear().toString();

      const matchesMonth = !filters.month || transactionMonth === filters.month;
      const matchesYear = !filters.year || transactionYear === filters.year;
      const matchesCategory = !filters.category || transaction.category === filters.category;
      
      return matchesSearch && matchesMonth && matchesYear && matchesCategory;
    });
  }, [recentTransactions, searchTerm, filters]);

  const handleFormChange = (field, value) => {
    setTransactionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showToast = (title, description, variant = "default") => {
    // Simple notification since we don't have toast hook
    alert(`${title}: ${description}`);
  };

  const handleAddTransaction = () => {
    // Validation
    if (!transactionForm.type || !transactionForm.category || !transactionForm.amount || !transactionForm.description) {
      showToast("Missing Information", "Please fill in all required fields.", "destructive");
      return;
    }

    if (parseFloat(transactionForm.amount) <= 0) {
      showToast("Invalid Amount", "Amount must be greater than 0.", "destructive");
      return;
    }

    // Create new transaction
    const newTransaction = {
      id: Math.max(...recentTransactions.map(t => t.id)) + 1,
      type: transactionForm.type,
      category: transactionForm.category,
      amount: transactionForm.type === "Expense" ? -parseFloat(transactionForm.amount) : parseFloat(transactionForm.amount),
      date: new Date(transactionForm.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      description: transactionForm.description,
      method: transactionForm.method
    };

    // Add to transactions
    setRecentTransactions(prev => [newTransaction, ...prev]);

    showToast("Transaction Added", `Successfully added ${transactionForm.type} of $${parseFloat(transactionForm.amount).toLocaleString()} on ${transactionForm.date}.`);
    
    setIsAddTransactionOpen(false);
    setTransactionForm({
      type: "",
      category: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      method: ""
    });
  };

  const handleExportTransactions = () => {
    // create CSV content
    const header = ["Date", "Type", "Category", "Description", "Amount", "Payment Method"];
    const csvContent = [
      header.join(","),
      ...filteredTransactions.map(transaction => [
        transaction.date,
        transaction.type,
        transaction.category,
        transaction.description,
        transaction.amount,
        transaction.method
      ].join(","))
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showToast("Export Complete", "Transactions have been exported successfully.");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <PageTitle 
          size="medium" 
          align="center" 
          className="mb-8"
          >
        Financial Tracking
      </PageTitle>
          <p className="text-theme-secondary">Monitor your church's financial health</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => setIsAddTransactionOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
          
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen} >
             <DialogContent>
                 <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Record a new financial transaction.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select value={transactionForm.type} onValueChange={(value) => handleFormChange("type", value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Income">Income</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0.00" 
                    className="col-span-3" 
                    value={transactionForm.amount}
                    onChange={(e) => handleFormChange("amount", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select value={transactionForm.category} onValueChange={(value) => handleFormChange("category", value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tithes & Offerings">Tithes & Offerings</SelectItem>
                      <SelectItem value="Donations">Donations</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Staff Salaries">Staff Salaries</SelectItem>
                      <SelectItem value="Ministry Programs">Ministry Programs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paymentMethod" className="text-right">
                    Payment Method
                  </Label>
                  <Select value={transactionForm.method} onValueChange={(value) => handleFormChange("method", value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="Online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input 
                    id="description" 
                    placeholder="Transaction description" 
                    className="col-span-3" 
                    value={transactionForm.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTransaction} className="bg-blue-600 hover:bg-blue-700">
                  Add Transaction
                </Button>
              </div>
             </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions" className="cursor-pointer">Recent Transactions</TabsTrigger>
          <TabsTrigger value="budget"  className="cursor-pointer ">Budget Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-900">
                Recent Transactions
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportTransactions}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Showing {filteredTransactions.length} of {recentTransactions.length} transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg ransition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'Income' ? (
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-theme-muted">{transaction.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-theme-primary">{transaction.category}</span>
                          <span className="text-sm text-theme-secondary">{transaction.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Budget vs Actual</CardTitle>
              <CardDescription className="text-gray-600">Monthly budget performance by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-sm text-gray-600">
                        ${category.actual.toLocaleString()} / ${category.budgeted.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          category.percentage > 100 ? 'bg-red-500' :
                          category.percentage > 90 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(category.percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <Badge variant={
                        category.percentage > 100 ? 'destructive' :
                        category.percentage > 90 ? 'secondary' : 'outline'
                      }>
                        {category.percentage}%
                      </Badge>
                      <span className="text-gray-600">
                        {category.percentage > 100 ? 'Over budget' :
                         category.percentage > 90 ? 'Near limit' : 'On track'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceTracking;