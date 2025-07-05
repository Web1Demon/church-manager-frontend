import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const EditMemberDialog = ({ 
  isOpen = false, 
  onOpenChange = () => {}, 
  member = {}, 
  onUpdateMember = () => {}, 
  onMemberChange = () => {} 
}) => {

  const handleUpdateMember = async (member) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/members/${member.id}`, {
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      birthdate: member.birthdate,
      join_date: member.join_date,
      worker_category: member.worker_category,
      ministry_group: member.ministry_group,
      status: member.status
    });

    console.log("Updated Member :", response.data);
    onUpdateMember(response.data);  
    onOpenChange(false); 
  } catch (err) {
    console.error("Error updating member:", err);
  }
};


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[30%]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-slate-800">Edit Member</DialogTitle>
          <DialogDescription className="text-slate-600">
            Update member information below.
          </DialogDescription>
        </DialogHeader>

        {member && (
          <div className="grid gap-6 py-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-slate-700 font-medium">Full Name</Label>
              <Input 
                id="edit-name" 
                value={member.name || ''}
                onChange={(e) => onMemberChange({...member, name: e.target.value})}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-slate-700 font-medium">Email Address</Label>
              <Input 
                id="edit-email"
                type="email"
                value={member.email || ''}
                onChange={(e) => onMemberChange({...member, email: e.target.value})}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-slate-700 font-medium">Phone Number</Label>
              <Input 
                id="edit-phone"
                value={member.phone || ''}
                onChange={(e) => onMemberChange({...member, phone: e.target.value})}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="edit-address" className="text-slate-700 font-medium">Address</Label>
              <Input 
                id="edit-address"
                value={member.address || ''}
                onChange={(e) => onMemberChange({...member, address: e.target.value})}
              />
            </div>

            {/* Birthdate */}
            <div className="space-y-2">
              <Label htmlFor="edit-birthdate" className="text-slate-700 font-medium">Birthdate</Label>
              <Input
                type="date"
                id="edit-birthdate"
                value={member.birthdate || ''}
                onChange={(e) => onMemberChange({...member, birthdate: e.target.value})}
              />
            </div>

            {/* Join Date */}
            <div className="space-y-2">
              <Label htmlFor="edit-join-date" className="text-slate-700 font-medium">Join Date</Label>
              <Input
                type="date"
                id="edit-join-date"
                value={member.join_date || ''}
                onChange={(e) => onMemberChange({...member, join_date: e.target.value})}
              />
            </div>

            {/* Worker Category */}
            <div className="space-y-2">
              <Label htmlFor="edit-worker-category" className="text-slate-700 font-medium">Worker Category</Label>
              <Select
                value={member.worker_category || ''}
                onValueChange={(value) => onMemberChange({...member, worker_category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Church Member</SelectItem>
                  <SelectItem value="sanctuary">Sanctuary Worker</SelectItem>
                  <SelectItem value="media">Media Team</SelectItem>
                  <SelectItem value="ushers">Ushers</SelectItem>
                  <SelectItem value="security">Security Team</SelectItem>
                  <SelectItem value="children">Children's Ministry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ministry Group */}
            <div className="space-y-2">
              <Label htmlFor="edit-ministry-group" className="text-slate-700 font-medium">Ministry Group</Label>
              <Select
                value={member.ministry_group || ''}
                onValueChange={(value) => onMemberChange({...member, ministry_group: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="choir">Choir Ministry</SelectItem>
                  <SelectItem value="youth">Youth Group</SelectItem>
                  <SelectItem value="bible-study">Bible Study</SelectItem>
                  <SelectItem value="volunteer">Volunteer Team</SelectItem>
                  <SelectItem value="prayer">Prayer Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="edit-status" className="text-slate-700 font-medium">Status</Label>
              <Select
                value={member.status || ''}
                onValueChange={(value) => onMemberChange({...member, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        )}

        {/* Footer buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6">
            Cancel
          </Button>
          <Button onClick={() => handleUpdateMember(member)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6">
            Update Member
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberDialog;
