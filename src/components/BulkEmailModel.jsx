import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X, Mail, Users, Send } from "lucide-react";
import { useToast } from "../hooks/use-toast";

/**
 * @typedef {Object} BulkEmailModalProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {any[]} members
 * @property {any[]} selectedMembers
 * @property {Record<string, string>} workerCategories
 */

const BulkEmailModal = ({ isOpen, onClose, members, selectedMembers, workerCategories }) => {
  const { toast } = useToast();
  const [emailType, setEmailType] = useState("selected");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const getRecipientsForCategory = (category) => {
    if (category === "all") return members;
    return members.filter(member => member.workerCategory === category);
  };

  const getCurrentRecipients = () => {
    if (emailType === "selected") {
      return selectedMembers;
    } else {
      return getRecipientsForCategory(selectedCategory);
    }
  };

  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      });
      return;
    }

    const recipients = getCurrentRecipients();
    if (recipients.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please select members or choose a category with members.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // This is where you would send the data to your Laravel backend
      const emailData = {
        recipients: recipients.map(member => ({
          id: member.id,
          name: member.name,
          email: member.email,
          workerCategory: member.workerCategory
        })),
        subject: subject.trim(),
        message: message.trim(),
        emailType,
        selectedCategory: emailType === "category" ? selectedCategory : null,
        timestamp: new Date().toISOString()
      };

      console.log("Bulk email data to send to Laravel:", emailData);

      // Replace this with your actual API call to Laravel
      // const response = await fetch('/api/send-bulk-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(emailData),
      // });

      // Simulate API success for now
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Bulk Email Sent",
        description: `Email sent successfully to ${recipients.length} recipient${recipients.length > 1 ? 's' : ''}.`,
      });

      // Reset form
      setSubject("");
      setMessage("");
      setEmailType("selected");
      setSelectedCategory("all");
      onClose();

    } catch (error) {
      console.error("Error sending bulk email:", error);
      toast({
        title: "Email Send Failed",
        description: "Failed to send bulk email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const recipients = getCurrentRecipients();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Mail className="h-6 w-6 text-blue-600" />
            Send Bulk Email
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Send an email to multiple members at once. Choose to send to selected members or entire categories.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email Type Selection */}
          <div className="space-y-3">
            <Label className="text-slate-700 font-medium">Send To</Label>
            <Select value={emailType} onValueChange={(value) => setEmailType(value)}>
              <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="selected">Selected Members ({selectedMembers.length})</SelectItem>
                <SelectItem value="category">Worker Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Selection */}
          {emailType === "category" && (
            <div className="space-y-3">
              <Label className="text-slate-700 font-medium">Select Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(workerCategories).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label} ({getRecipientsForCategory(value).length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Recipients Preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-500" />
              <Label className="text-slate-700 font-medium">
                Recipients ({recipients.length})
              </Label>
            </div>
            <div className="max-h-32 overflow-y-auto bg-slate-50 rounded-lg p-3 border">
              {recipients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {recipients.slice(0, 10).map((member) => (
                    <Badge key={member.id} variant="secondary" className="bg-blue-100 text-blue-800">
                      {member.name}
                    </Badge>
                  ))}
                  {recipients.length > 10 && (
                    <Badge variant="outline" className="bg-slate-100">
                      +{recipients.length - 10} more
                    </Badge>
                  )}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No recipients selected</p>
              )}
            </div>
          </div>

          {/* Email Subject */}
          <div className="space-y-2">
            <Label htmlFor="email-subject" className="text-slate-700 font-medium">Subject</Label>
            <Input
              id="email-subject"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>

          {/* Email Message */}
          <div className="space-y-2">
            <Label htmlFor="email-message" className="text-slate-700 font-medium">Message</Label>
            <Textarea
              id="email-message"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSending} className="px-6">
            Cancel
          </Button>
          <Button 
            onClick={handleSendEmail} 
            disabled={isSending || recipients.length === 0}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmailModal;
