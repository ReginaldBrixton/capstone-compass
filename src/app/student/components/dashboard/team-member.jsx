import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import { getAvatarUrl } from '../../../../utils/avatar';

/**
 * TeamMember component displays a team member's information with their avatar and role.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the team member.
 * @param {string} props.role - The role of the team member.
 * @param {string} [props.imageUrl] - Optional URL for the team member's avatar.
 * @returns {JSX.Element} The rendered TeamMember component.
 */
export const TeamMember = ({ name = '', role = '', imageUrl }) => {
  const avatarUrl = getAvatarUrl(name, imageUrl);

  return (
    <div
      className="group flex items-center space-x-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
      id="team-member-container"
    >
      <div
        className="transition-ring relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-ring duration-200 group-hover:ring-primary"
        id="team-member-avatar-container"
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div id="team-member-info" className="space-y-1">
        <h3 className="cursor-pointer text-sm font-medium text-foreground transition-colors duration-150 hover:underline">
          {name || 'Anonymous User'}
        </h3>
        <p
          className="text-xs font-normal text-muted-foreground"
          id="team-member-role"
        >
          {role || 'Member'}
        </p>
      </div>
    </div>
  );
};
