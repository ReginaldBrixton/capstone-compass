import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import { getAvatarUrl } from '../../../../utils/avatar';

/**
 * TeamMember component displays a team member's information with their avatar and role.
 * Uses a fluid layout and `clamp()` for responsive sizing.
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
      className="group flex items-center space-x-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary/50"
      id="team-member-container"
      data-oid="rgub9_p"
    >
      <div
        className="relative h-[clamp(3rem,7vw,3.5rem)] w-[clamp(3rem,7vw,3.5rem)] overflow-hidden rounded-full ring-2 ring-slate-200 transition-all duration-300 group-hover:ring-primary-500 dark:ring-slate-600 dark:group-hover:ring-primary-400"
        id="team-member-avatar-container"
        data-oid="d8xi2g-"
      >
        <Avatar className="h-full w-full" data-oid="ruiltiw">
          <AvatarImage
            src={avatarUrl}
            alt={name}
            className="transition-opacity duration-300 group-hover:opacity-90"
            data-oid="khoql9m"
          />
          <AvatarFallback
            className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
            data-oid="yhjne:a"
          >
            {name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <div
        id="team-member-info"
        className="flex-1 space-y-1"
        data-oid="w4c84u7"
      >
        <h3
          className="text-[clamp(0.8rem,4vw,1rem)] font-semibold text-slate-800 transition-colors duration-300 hover:text-primary-600 dark:text-slate-100 dark:hover:text-primary-400"
          data-oid="j-vt06q"
        >
          {name || 'Anonymous User'}
        </h3>
        <Badge
          variant="outline"
          className="rounded-lg bg-slate-100 px-3 py-1 text-[clamp(0.6rem,2vw,0.7rem)] font-medium text-slate-600 shadow-inner dark:bg-slate-700/50 dark:text-slate-300"
          id="team-member-role"
          data-oid="chmjx5m"
        >
          {role || 'Team Member'}
        </Badge>
      </div>
    </div>
  );
};
