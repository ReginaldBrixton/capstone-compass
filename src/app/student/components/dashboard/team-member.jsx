import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import Image from "next/image";

/**
 * TeamMember component displays a team member's avatar, name, and role.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name of the team member.
 * @param {string} props.role - The role of the team member.
 * @param {string} [props.imageUrl] - Optional URL for the team member's avatar (currently unused in favor of dicebear).
 *
 * @returns {JSX.Element} The rendered component.
 */
export const TeamMember = ({ name = "", role = "" }) => {
  const avatarUrl = name
    ? `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(
        name
      )}&backgroundColor=b6e3f4`
    : null;

  return (
    <div
      className="group flex items-center space-x-4 rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      id="team-member-container"
    >
      <div
        className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-ring group-hover:ring-primary transition-ring duration-200"
        id="team-member-avatar-container"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${name || "User"}'s avatar`}
            width={48}
            height={48}
            className="object-cover"
            priority={false}
            id="team-member-avatar-image"
          />
        ) : (
          <AvatarFallback className="text-base font-medium" id="team-member-avatar-fallback">
            {name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "?"}
          </AvatarFallback>
        )}
      </div>
      <div id="team-member-info" className="space-y-1">
        <h3
          className="text-sm font-medium text-foreground hover:underline transition-colors duration-150 cursor-pointer"
        >
          {name || "Anonymous User"}
        </h3>
        <p
          className="text-xs font-normal text-muted-foreground"
          id="team-member-role"
        >
          {role || "Member"}
        </p>
      </div>
    </div>
  );
};