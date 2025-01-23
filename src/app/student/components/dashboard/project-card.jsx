import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";
import { cn } from "../../../../lib/utils";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  UsersIcon,
  ArrowUpRightIcon,
} from "lucide-react";

/**
 * ProjectCard component displays project details including title, description,
 * priority, status, progress, due date, and team members.
 *
 * @param {Object} props - Component properties
 * @param {string} props.title - Project title
 * @param {string} props.description - Project description
 * @param {"high" | "medium" | "low"} props.priority - Project priority
 * @param {"in progress" | "completed" | "delayed"} props.status - Project status
 * @param {number} props.progress - Project progress percentage
 * @param {string} props.dueDate - Project due date
 * @param {Array<{name: string, image?: string}>} props.members - Project team members
 * @returns {JSX.Element} The rendered component
 */
export const ProjectCard = ({
  title,
  description,
  priority,
  status,
  progress,
  dueDate,
  members,
}) => {
  const priorityColors = {
    high: "text-red-700 bg-red-100 border-red-200",
    medium: "text-yellow-700 bg-yellow-100 border-yellow-200", 
    low: "text-green-700 bg-green-100 border-green-200"
  };

  const statusIcons = {
    "in progress": <ClockIcon className="h-4 w-4" />,
    completed: <CheckCircleIcon className="h-4 w-4" />,
    delayed: <AlertTriangleIcon className="h-4 w-4" />
  };

  const statusColors = {
    "in progress": "text-blue-700 bg-blue-100 border-blue-200",
    completed: "text-green-700 bg-green-100 border-green-200",
    delayed: "text-red-700 bg-red-100 border-red-200"
  };

  return (
    <Card 
      className="overflow-hidden border-2 hover:border-primary/50"
      id="project-card"
    >
      <CardHeader className="p-6" id="project-card-header">
        <div className="space-y-4" id="project-card-header-content">
          <div className="flex items-center justify-between" id="project-card-badges">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={cn("capitalize font-medium", priorityColors[priority])}
                id="project-card-priority-badge"
              >
                {priority} Priority
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize flex items-center gap-1.5 font-medium",
                  statusColors[status]
                )}
                id="project-card-status-badge"
              >
                {statusIcons[status]}
                <span>{status}</span>
              </Badge>
            </div>
            <ArrowUpRightIcon className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-2" id="project-card-header-details">
            <h3 
              className="text-xl font-bold tracking-tight"
              id="project-card-title"
            >
              {title}
            </h3>
            <p
              className="text-sm text-muted-foreground line-clamp-2"
              id="project-card-description"
            >
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0" id="project-card-content">
        <div className="space-y-6" id="project-card-progress">
          <div className="space-y-2" id="project-card-progress-bar">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2"
            />
          </div>

          <div className="flex items-center justify-between" id="project-card-footer">
            <div className="flex items-center gap-2 text-muted-foreground" id="project-card-due-date">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">Due {dueDate}</span>
            </div>

            <div className="flex items-center gap-2" id="project-card-members">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member, i) => (
                  <div
                    key={i}
                    title={member.name}
                    id={`project-card-member-${i}`}
                  >
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={member.image || `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(member.name)}`}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
              {members.length > 3 && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  +{members.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
