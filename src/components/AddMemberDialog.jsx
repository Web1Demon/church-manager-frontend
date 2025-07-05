import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserPlus } from "lucide-react";

const AddMemberDialog = ({ 
  isOpen = false, 
  onOpenChange = () => {}, 
  onAddMember = () => {} 
}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [worker_category, setWorkerCategory] = useState("");
  const [ministry_group, setMinistryGroup] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [join_date, setJoinDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState(true);

 const handleSubmit = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/members", {
      name,
      email,
      phone,
      address,
      birthdate,
      join_date,
      worker_category,
      ministry_group,
      status: status ? "Active" : "Inactive",
    });

    // update parent list
    onAddMember(response.data);

    // clear form
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setBirthdate("");
    setJoinDate(() => new Date().toISOString().slice(0, 10));
    setWorkerCategory("");
    setMinistryGroup("");
    setStatus(true);

    // close modal
    onOpenChange(false);

  } catch (err) {
    console.error("Error adding member:", err.response?.data || err.message);
  }
};


  return (

        <div>
            <Button onClick={() => onOpenChange(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl">
            <UserPlus className="h-5 w-5 mr-2" />
            Add New Member
          </Button>
          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-bold text-slate-800">Add New Member</DialogTitle>
                <DialogDescription className="text-slate-600">
                  Welcome a new member to your church community. Fill in their details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                  <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full name" className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="member@example.com" className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700 font-medium">Address</Label>
                  <Input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="birthdate" className="text-slate-700 font-medium">Birthdate</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="join-date" className="text-slate-700 font-medium">Join Date</Label>
                    <Input
                      id="join-date"
                      type="date"
                      value={join_date}
                      onChange={(e) => setJoinDate(e.target.value)}
                      className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      id="status"
                      type="checkbox"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <Label htmlFor="status" className="text-slate-700 font-medium">
                      Active Status
                    </Label>
                  </div>

                <div className="space-y-2">
                  <Label htmlFor="worker-category" className="text-slate-700 font-medium">Worker Category</Label>
                  <Select value={worker_category} onValueChange={setWorkerCategory}>
                    <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20">
                      <SelectValue placeholder="Select worker category" />
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
                <div className="space-y-2">
                  <Label htmlFor="group" className="text-slate-700 font-medium">Ministry Group</Label>
                  <Select value={ministry_group} onValueChange={setMinistryGroup}>
                    <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20">
                      <SelectValue placeholder="Select a ministry group" />
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
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6">
                  Add Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
  );
};

export default AddMemberDialog;