import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Copy, 
  Send,
  Clock,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  key: string;
  author: string;
  text: string;
  timestamp: Date;
}

interface CollaborationPanelProps {
  currentKey: string;
  language: string;
  onShareProject: () => void;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  currentKey,
  language,
  onShareProject
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const { toast } = useToast();

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      key: currentKey,
      author: 'You',
      text: newComment.trim(),
      timestamp: new Date()
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been saved for this translation key",
    });
  };

  const inviteCollaborator = () => {
    if (!collaboratorEmail.trim()) return;

    // Simulate sending invitation
    toast({
      title: "Invitation sent!",
      description: `Collaboration invitation sent to ${collaboratorEmail}`,
    });
    setCollaboratorEmail('');
  };

  const shareProjectLink = async () => {
    const projectUrl = `${window.location.origin}?project=${language}&key=${currentKey}`;
    
    try {
      await navigator.clipboard.writeText(projectUrl);
      toast({
        title: "Link copied!",
        description: "Project share link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const currentKeyComments = comments.filter(comment => comment.key === currentKey);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="w-4 h-4" />
          Collaboration
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Share project */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Share Project</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shareProjectLink}
              className="flex-1"
            >
              <Share2 className="w-3 h-3 mr-1" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onShareProject}
              className="flex-1"
            >
              <Send className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Invite collaborators */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Invite Collaborator</h4>
          <div className="flex gap-2">
            <Input
              placeholder="colleague@email.com"
              value={collaboratorEmail}
              onChange={(e) => setCollaboratorEmail(e.target.value)}
              className="flex-1 text-sm"
            />
            <Button
              size="sm"
              onClick={inviteCollaborator}
              disabled={!collaboratorEmail.trim()}
            >
              Invite
            </Button>
          </div>
        </div>

        {/* Comments for current key */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              Comments
            </h4>
            {currentKeyComments.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {currentKeyComments.length}
              </Badge>
            )}
          </div>

          {currentKey ? (
            <>
              {/* Existing comments */}
              {currentKeyComments.length > 0 && (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {currentKeyComments.map(comment => (
                    <div key={comment.id} className="p-2 bg-muted rounded-md">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {comment.author}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {comment.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new comment */}
              <div className="space-y-2">
                <Textarea
                  placeholder={`Add a comment for "${currentKey}"...`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                />
                <Button
                  size="sm"
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className="w-full"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Add Comment
                </Button>
              </div>
            </>
          ) : (
            <Alert>
              <AlertDescription className="text-xs">
                Select a translation key to add comments
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationPanel;
