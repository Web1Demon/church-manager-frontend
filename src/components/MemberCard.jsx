import { Avatar, AvatarFallback,  } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Mail, Phone, MapPin, MoreHorizontal, Edit, Trash2, Eye, MessageCircle } from "lucide-react";
import axios from "axios";

const MemberCard = ({ 
  member = {},
  isSelected = false,
  onSelect = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onContact = () => {},
  onViewDetails = () => {}
}) => {
  const getWorkerCategoryBadge = (category) => {
    const badges = {
      member: { label: "Member", className: "bg-blue-100 text-blue-800" },
      sanctuary: { label: "Sanctuary", className: "bg-purple-100 text-purple-800" },
      media: { label: "Media", className: "bg-orange-100 text-orange-800" },
      ushers: { label: "Ushers", className: "bg-green-100 text-green-800" },
      security: { label: "Security", className: "bg-red-100 text-red-800" },
      children: { label: "Children's", className: "bg-yellow-100 text-yellow-800" }
    };
    return badges[category] || { label: "Member", className: "bg-gray-100 text-gray-800" };
  };

  const workerBadge = getWorkerCategoryBadge(member.workerCategory);
  const groups = Array.isArray(member.ministry_group)
    ? member.ministry_group
    : typeof member.ministry_group === 'string'
      ? [member.ministry_group]
      : [];

  return (
    <Card className={`group bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden ${isSelected ? 'ring-2 ring-blue-400' : ''}`}>
      <CardHeader className="pb-4 relative">
        <div className=" top-4 left-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelect(member, checked)}
            className="bg-white border-slate-300"
          />
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div role="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onViewDetails(member)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContact(member, 'email')}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContact(member, 'phone')}>
                <Phone className="h-4 w-4 mr-2" />
                Call Member
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContact(member, 'message')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Member
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Member</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove {member.name || 'this member'} from the church directory? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDelete(member.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-start space-x-4 mt-8">
          <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-semibold text-lg">
              {member.name ? member.name.split(' ').map(n => n[0]).join('') : 'M'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-slate-800 truncate">{member.name || 'Unknown Member'}</CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Member since {member.join_date && !isNaN(Date.parse(member.join_date)) 
                ? new Date(member.join_date).getFullYear() 
                : 'Unknown'}
            </CardDescription>

            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {member.status || 'Unknown'}
              </Badge>
              <Badge variant="outline" className={workerBadge.className}>
                {workerBadge.label}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-slate-600">
            <Mail className="h-4 w-4 text-slate-400" />
            <span className="text-sm truncate">{member.email || 'No email'}</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-600">
            <Phone className="h-4 w-4 text-slate-400" />
            <span className="text-sm">{member.phone || 'No phone'}</span>
          </div>
          <div className="flex items-start space-x-3 text-slate-600">
            <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm leading-relaxed">{member.address || 'No address'}</span>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-sm font-medium text-slate-700 mb-3">Ministry Groups</p>
          <div className="flex flex-wrap gap-2">
            {groups.length > 0 ? (
              groups.map((group, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                  {group}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-slate-500">No groups assigned</span>
            )}
          </div>
        </div>
        
        <div className="pt-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
            onClick={() => onEdit(member)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hover:bg-slate-50">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onViewDetails(member)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContact(member, 'email')}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContact(member, 'phone')}>
                <Phone className="h-4 w-4 mr-2" />
                Call Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;