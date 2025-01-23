import React from 'react';

import {
  Avatar,
  AvatarDropdown,
  AvatarGroup,
  AvatarStatus,
  AvatarTooltip,
  AvatarWithText,
} from '.';

const AvatarDemo = () => {
  const sampleImage = 'https://flowbite.com/docs/images/people/profile-picture-5.jpg';
  const avatars = [
    {
      src: sampleImage,
      alt: 'Bonnie Green',
      tooltip: { id: 'tooltip-bonnie', text: 'Bonnie Green' },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
      alt: 'Michael Gough',
      tooltip: { id: 'tooltip-michael', text: 'Michael Gough' },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
      alt: 'Jese Leos',
      tooltip: { id: 'tooltip-jese', text: 'Jese Leos' },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
      alt: 'Robert Wall',
      tooltip: { id: 'tooltip-robert', text: 'Robert Wall' },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
      alt: 'Lisa Wall',
      tooltip: { id: 'tooltip-lisa', text: 'Lisa Wall' },
    },
  ];

  const dropdownItems = [
    { label: 'Dashboard', href: '#', onClick: () => console.log('Dashboard clicked') },
    { label: 'Settings', href: '#', onClick: () => console.log('Settings clicked') },
    { label: 'Earnings', href: '#', onClick: () => console.log('Earnings clicked') },
    { divider: true },
    { label: 'Sign out', href: '#', onClick: () => console.log('Sign out clicked') },
  ];

  return (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-lg font-semibold mb-4">Default Avatars</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar src={sampleImage} alt="Default avatar" />
          <Avatar src={sampleImage} alt="Rounded avatar" rounded={false} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Bordered Avatars</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar
            src={sampleImage}
            alt="Default bordered avatar"
            bordered
            className="p-1 ring-2 ring-gray-300 dark:ring-gray-500"
          />
          <Avatar
            src={sampleImage}
            alt="Primary bordered avatar"
            bordered
            className="p-1 ring-2 ring-blue-500 dark:ring-blue-500"
          />
          <Avatar
            src={sampleImage}
            alt="Success bordered avatar"
            bordered
            className="p-1 ring-2 ring-green-500 dark:ring-green-500"
          />
          <Avatar
            src={sampleImage}
            alt="Warning bordered avatar"
            bordered
            className="p-1 ring-2 ring-yellow-500 dark:ring-yellow-500"
          />
          <Avatar
            src={sampleImage}
            alt="Danger bordered avatar"
            bordered
            className="p-1 ring-2 ring-red-500 dark:ring-red-500"
          />
          <Avatar
            src={sampleImage}
            alt="Purple bordered avatar"
            bordered
            className="p-1 ring-2 ring-purple-500 dark:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Placeholder Avatars</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar initials="JL" />
          <Avatar />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Status Indicator</h2>
        <div className="flex flex-wrap gap-4">
          <AvatarStatus src={sampleImage} alt="Online status" status="online" />
          <AvatarStatus src={sampleImage} alt="Offline status" status="offline" />
          <AvatarStatus src={sampleImage} alt="Busy status" status="busy" />
          <AvatarStatus src={sampleImage} alt="Away status" status="away" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Status Positions</h2>
        <div className="flex flex-wrap gap-4">
          <AvatarStatus
            src={sampleImage}
            alt="Top right status"
            status="online"
            statusPosition="top-right"
          />
          <AvatarStatus
            src={sampleImage}
            alt="Top left status"
            status="online"
            statusPosition="top-left"
          />
          <AvatarStatus
            src={sampleImage}
            alt="Bottom right status"
            status="online"
            statusPosition="bottom-right"
          />
          <AvatarStatus
            src={sampleImage}
            alt="Bottom left status"
            status="online"
            statusPosition="bottom-left"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Stacked Avatars</h2>
        <div className="space-y-8">
          {/* Default stacked avatars */}
          <div>
            <h3 className="text-sm font-medium mb-2">Default Stack</h3>
            <AvatarGroup
              avatars={[
                { name: 'Alex Smith', status: 'online' },
                { name: 'Sarah Johnson', status: 'away' },
                { name: 'Mike Brown', status: 'busy' },
                { name: 'Lisa Anderson', status: 'offline' },
                { name: 'Tom Wilson' },
              ]}
            />
          </div>

          {/* Different overlap sizes */}
          <div>
            <h3 className="text-sm font-medium mb-2">Overlap Variations</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Small Overlap</p>
                <AvatarGroup avatars={avatars} overlap="sm" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Medium Overlap</p>
                <AvatarGroup avatars={avatars} overlap="md" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Large Overlap</p>
                <AvatarGroup avatars={avatars} overlap="lg" />
              </div>
            </div>
          </div>

          {/* Vertical stack */}
          <div>
            <h3 className="text-sm font-medium mb-2">Vertical Stack</h3>
            <AvatarGroup avatars={avatars.slice(0, 3)} direction="column" />
          </div>

          {/* Different sizes */}
          <div>
            <h3 className="text-sm font-medium mb-2">Different Sizes</h3>
            <div className="space-y-4">
              <AvatarGroup avatars={avatars} size="sm" />
              <AvatarGroup avatars={avatars} size="lg" />
            </div>
          </div>

          {/* Without counter */}
          <div>
            <h3 className="text-sm font-medium mb-2">Without Counter</h3>
            <AvatarGroup avatars={avatars} showCounter={false} />
          </div>

          {/* Square avatars */}
          <div>
            <h3 className="text-sm font-medium mb-2">Square Avatars</h3>
            <AvatarGroup avatars={avatars} rounded={false} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Sizes</h2>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar src={sampleImage} alt="Extra small" size="xs" />
          <Avatar src={sampleImage} alt="Small" size="sm" />
          <Avatar src={sampleImage} alt="Medium" size="md" />
          <Avatar src={sampleImage} alt="Large" size="lg" />
          <Avatar src={sampleImage} alt="Extra large" size="xl" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">With Tooltip</h2>
        <div className="flex flex-wrap gap-8">
          <div>
            <h3 className="text-sm font-medium mb-2">Top</h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-top"
              tooltipText="Jese Leos"
              placement="top"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Right</h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-right"
              tooltipText="Jese Leos"
              placement="right"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Bottom</h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-bottom"
              tooltipText="Jese Leos"
              placement="bottom"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Left</h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-left"
              tooltipText="Jese Leos"
              placement="left"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">With Text</h2>
        <div className="space-y-4">
          {/* Basic example */}
          <AvatarWithText
            src={sampleImage}
            alt="Jese Leos"
            name="Jese Leos"
            description="Joined in August 2014"
          />

          {/* With different sizes */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Different Sizes</h3>
            <AvatarWithText
              src={sampleImage}
              alt="Small size"
              name="Small Avatar"
              description="With small size"
              size="sm"
            />
            <AvatarWithText
              src={sampleImage}
              alt="Large size"
              name="Large Avatar"
              description="With large size"
              size="lg"
            />
          </div>

          {/* With square avatar */}
          <div>
            <h3 className="text-sm font-medium mb-2">Square Avatar</h3>
            <AvatarWithText
              src={sampleImage}
              alt="Square avatar"
              name="Square Avatar"
              description="With square shape"
              rounded={false}
            />
          </div>

          {/* Without description */}
          <div>
            <h3 className="text-sm font-medium mb-2">Without Description</h3>
            <AvatarWithText src={sampleImage} alt="No description" name="Name Only" />
          </div>

          {/* With placeholder avatar */}
          <div>
            <h3 className="text-sm font-medium mb-2">With Placeholder</h3>
            <AvatarWithText
              initials="JD"
              alt="Placeholder"
              name="John Doe"
              description="Using initials placeholder"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">With Dropdown</h2>
        <div className="flex flex-wrap gap-8">
          <div>
            <h3 className="text-sm font-medium mb-2">Bottom Start</h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="bottom-start"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Bottom End</h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="bottom-end"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Top Start</h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="top-start"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Top End</h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="top-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarDemo;
