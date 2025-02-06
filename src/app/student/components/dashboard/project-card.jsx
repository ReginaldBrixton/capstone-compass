import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import { Card, CardContent, CardHeader } from '../../../../components/ui/card';
import { Progress } from '../../../../components/ui/progress';
import { cn } from '../../../../lib/utils';
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  UsersIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import { getAvatarUrl } from '../../../../utils/avatar';

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
    high: 'text-red-700 bg-red-100 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    medium: 'text-yellow-700 bg-yellow-100 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    low: 'text-green-700 bg-green-100 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  };
  const statusIcons = {
    'in progress': <ClockIcon className="h-4 w-4 text-blue-500 dark:text-blue-300" />,
    completed: <CheckCircleIcon className="h-4 w-4 text-green-500 dark:text-green-300" />,
    delayed: <AlertTriangleIcon className="h-4 w-4 text-red-500 dark:text-red-300" />,
  };
  const statusColors = {
    'in progress': 'text-blue-700 bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    completed: 'text-green-700 bg-green-100 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    delayed: 'text-red-700 bg-red-100 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  };
  
  return (
    <Card
      className="group relative overflow-hidden border bg-white transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/80 dark:hover:border-primary/30 dark:hover:shadow-slate-800/50"
      id="project-card"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 opacity-0 transition-opacity group-hover:opacity-100 dark:to-slate-900/80" />
      
      <CardHeader className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={cn('font-medium capitalize transition-colors', priorityColors[priority])}
              >
                {priority} Priority
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  'flex items-center gap-1.5 font-medium capitalize transition-colors',
                  statusColors[status]
                )}
              >
                {statusIcons[status]}
                <span>{status}</span>
              </Badge>
            </div>
            <ArrowUpRightIcon className="h-5 w-5 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Progress</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {progress}%
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-slate-100 dark:bg-slate-700" 
              indicatorClassName="bg-primary-500 dark:bg-primary-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">Due {dueDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member, i) => (
                  <div key={i} title={member.name}>
                    <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-800">
                      <AvatarImage
                        src={getAvatarUrl(member.name, member.image)}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-slate-100 dark:bg-slate-700 dark:text-slate-300">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
              {members.length > 3 && (
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <UsersIcon className="mr-1 h-4 w-4" />+{members.length - 3}
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
