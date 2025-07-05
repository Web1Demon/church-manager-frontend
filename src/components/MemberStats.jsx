import { Card, CardContent } from "./ui/card";
import { Users } from "lucide-react";

const MemberStats = ({ memberCount, filterWorkerCategory }) => {
  const getStatsLabel = () => {
    switch (filterWorkerCategory) {
      case "all":
        return "Total Members";
      case "member":
        return "Church Members";
      default:
        return "Workers";
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{memberCount}</p>
            <p className="text-sm opacity-90">{getStatsLabel()}</p>
          </div>
          <Users className="h-12 w-12 opacity-75" />
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberStats;