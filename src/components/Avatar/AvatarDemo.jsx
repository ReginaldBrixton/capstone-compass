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
      tooltip: {
        id: 'tooltip-bonnie',
        text: 'Bonnie Green',
      },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
      alt: 'Michael Gough',
      tooltip: {
        id: 'tooltip-michael',
        text: 'Michael Gough',
      },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
      alt: 'Jese Leos',
      tooltip: {
        id: 'tooltip-jese',
        text: 'Jese Leos',
      },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
      alt: 'Robert Wall',
      tooltip: {
        id: 'tooltip-robert',
        text: 'Robert Wall',
      },
    },
    {
      src: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
      alt: 'Lisa Wall',
      tooltip: {
        id: 'tooltip-lisa',
        text: 'Lisa Wall',
      },
    },
  ];
  const dropdownItems = [
    {
      label: 'Dashboard',
      href: '#',
      onClick: () => console.log('Dashboard clicked'),
    },
    {
      label: 'Settings',
      href: '#',
      onClick: () => console.log('Settings clicked'),
    },
    {
      label: 'Earnings',
      href: '#',
      onClick: () => console.log('Earnings clicked'),
    },
    {
      divider: true,
    },
    {
      label: 'Sign out',
      href: '#',
      onClick: () => console.log('Sign out clicked'),
    },
  ];
  return (
    <div className="space-y-8 p-4" data-oid="ny3zj61">
      <div data-oid="p9s3fuy">
        <h2 className="mb-4 text-lg font-semibold" data-oid="f4hpq2g">
          Default Avatars
        </h2>
        <div className="flex flex-wrap gap-4" data-oid="xdg7e25">
          <Avatar src={sampleImage} alt="Default avatar" data-oid="-if6i.l" />
          <Avatar src={sampleImage} alt="Rounded avatar" rounded={false} data-oid="1jff_7o" />
        </div>
      </div>

      <div data-oid="y9lbj7w">
        <h2 className="mb-4 text-lg font-semibold" data-oid="ly4fcov">
          Bordered Avatars
        </h2>
        <div className="flex flex-wrap gap-4" data-oid="t8cb00t">
          <Avatar
            src={sampleImage}
            alt="Default bordered avatar"
            bordered
            className="p-1 ring-2 ring-gray-300 dark:ring-gray-500"
            data-oid="m-778wl"
          />
          <Avatar
            src={sampleImage}
            alt="Primary bordered avatar"
            bordered
            className="p-1 ring-2 ring-blue-500 dark:ring-blue-500"
            data-oid="g9iuwbn"
          />
          <Avatar
            src={sampleImage}
            alt="Success bordered avatar"
            bordered
            className="p-1 ring-2 ring-green-500 dark:ring-green-500"
            data-oid="z-kw_vp"
          />
          <Avatar
            src={sampleImage}
            alt="Warning bordered avatar"
            bordered
            className="p-1 ring-2 ring-yellow-500 dark:ring-yellow-500"
            data-oid="6zboxcl"
          />
          <Avatar
            src={sampleImage}
            alt="Danger bordered avatar"
            bordered
            className="p-1 ring-2 ring-red-500 dark:ring-red-500"
            data-oid="lhofqje"
          />
          <Avatar
            src={sampleImage}
            alt="Purple bordered avatar"
            bordered
            className="p-1 ring-2 ring-purple-500 dark:ring-purple-500"
            data-oid="l55m4n1"
          />
        </div>
      </div>

      <div data-oid="21lxg8g">
        <h2 className="mb-4 text-lg font-semibold" data-oid="5f-tp03">
          Placeholder Avatars
        </h2>
        <div className="flex flex-wrap gap-4" data-oid="8lyg61y">
          <Avatar initials="JL" data-oid="r6lpluf" />
          <Avatar data-oid="maz62i_" />
        </div>
      </div>

      <div data-oid="xqfvs_y">
        <h2 className="mb-4 text-lg font-semibold" data-oid="h:4vwwe">
          Status Indicator
        </h2>
        <div className="flex flex-wrap gap-4" data-oid="g3pb7fr">
          <AvatarStatus src={sampleImage} alt="Online status" status="online" data-oid="8t_1.u2" />
          <AvatarStatus
            src={sampleImage}
            alt="Offline status"
            status="offline"
            data-oid="rovcuqg"
          />
          <AvatarStatus src={sampleImage} alt="Busy status" status="busy" data-oid=":4bj9q8" />
          <AvatarStatus src={sampleImage} alt="Away status" status="away" data-oid="th710a5" />
        </div>
      </div>

      <div data-oid="sema30h">
        <h2 className="mb-4 text-lg font-semibold" data-oid="c12gon6">
          Status Positions
        </h2>
        <div className="flex flex-wrap gap-4" data-oid="79ak402">
          <AvatarStatus
            src={sampleImage}
            alt="Top right status"
            status="online"
            statusPosition="top-right"
            data-oid="myge-nc"
          />
          <AvatarStatus
            src={sampleImage}
            alt="Top left status"
            status="online"
            statusPosition="top-left"
            data-oid="piv1ie7"
          />
          <AvatarStatus
            src={sampleImage}
            alt="Bottom right status"
            status="online"
            statusPosition="bottom-right"
            data-oid="-l1fh-1"
          />
          <AvatarStatus
            src={sampleImage}
            alt="Bottom left status"
            status="online"
            statusPosition="bottom-left"
            data-oid="4hgcx.0"
          />
        </div>
      </div>

      <div data-oid="t1a.rse">
        <h2 className="mb-4 text-lg font-semibold" data-oid="zqvtl:c">
          Stacked Avatars
        </h2>
        <div className="space-y-8" data-oid=".6787ue">
          {/* Default stacked avatars */}
          <div data-oid="30e7wna">
            <h3 className="mb-2 text-sm font-medium" data-oid="nka3i6-">
              Default Stack
            </h3>
            <AvatarGroup
              avatars={[
                {
                  name: 'Alex Smith',
                  status: 'online',
                },
                {
                  name: 'Sarah Johnson',
                  status: 'away',
                },
                {
                  name: 'Mike Brown',
                  status: 'busy',
                },
                {
                  name: 'Lisa Anderson',
                  status: 'offline',
                },
                {
                  name: 'Tom Wilson',
                },
              ]}
              data-oid="i6:suvu"
            />
          </div>

          {/* Different overlap sizes */}
          <div data-oid="u0-wh3e">
            <h3 className="mb-2 text-sm font-medium" data-oid="-jb8-wc">
              Overlap Variations
            </h3>
            <div className="space-y-4" data-oid="1i..yqr">
              <div data-oid="fm2t08v">
                <p className="mb-2 text-sm text-gray-500" data-oid="606dw6j">
                  Small Overlap
                </p>
                <AvatarGroup avatars={avatars} overlap="sm" data-oid="_iuked0" />
              </div>
              <div data-oid="pkvo3.q">
                <p className="mb-2 text-sm text-gray-500" data-oid="c0yql_n">
                  Medium Overlap
                </p>
                <AvatarGroup avatars={avatars} overlap="md" data-oid="6szwyoq" />
              </div>
              <div data-oid="pnjkfr3">
                <p className="mb-2 text-sm text-gray-500" data-oid="-ns-z4:">
                  Large Overlap
                </p>
                <AvatarGroup avatars={avatars} overlap="lg" data-oid="n-0ib2r" />
              </div>
            </div>
          </div>

          {/* Vertical stack */}
          <div data-oid="6qgn3t-">
            <h3 className="mb-2 text-sm font-medium" data-oid="mrxtor2">
              Vertical Stack
            </h3>
            <AvatarGroup avatars={avatars.slice(0, 3)} direction="column" data-oid="pxt2xfn" />
          </div>

          {/* Different sizes */}
          <div data-oid="9dl0sh9">
            <h3 className="mb-2 text-sm font-medium" data-oid="ueweqd8">
              Different Sizes
            </h3>
            <div className="space-y-4" data-oid="jbzf-l1">
              <AvatarGroup avatars={avatars} size="sm" data-oid="b3ohr_t" />
              <AvatarGroup avatars={avatars} size="lg" data-oid="ks94qso" />
            </div>
          </div>

          {/* Without counter */}
          <div data-oid="tmef-e6">
            <h3 className="mb-2 text-sm font-medium" data-oid=".bfjoyd">
              Without Counter
            </h3>
            <AvatarGroup avatars={avatars} showCounter={false} data-oid="dj682-t" />
          </div>

          {/* Square avatars */}
          <div data-oid="0-w9y_o">
            <h3 className="mb-2 text-sm font-medium" data-oid="o7hu9ms">
              Square Avatars
            </h3>
            <AvatarGroup avatars={avatars} rounded={false} data-oid="s15gzwc" />
          </div>
        </div>
      </div>

      <div data-oid="bua6zw5">
        <h2 className="mb-4 text-lg font-semibold" data-oid="lem_vzw">
          Sizes
        </h2>
        <div className="flex flex-wrap items-end gap-4" data-oid="8mct5z-">
          <Avatar src={sampleImage} alt="Extra small" size="xs" data-oid="auzfmi:" />
          <Avatar src={sampleImage} alt="Small" size="sm" data-oid="caobvt8" />
          <Avatar src={sampleImage} alt="Medium" size="md" data-oid="rn3yio9" />
          <Avatar src={sampleImage} alt="Large" size="lg" data-oid=".idsl1u" />
          <Avatar src={sampleImage} alt="Extra large" size="xl" data-oid="2-6dc_3" />
        </div>
      </div>

      <div data-oid="mgaedcg">
        <h2 className="mb-4 text-lg font-semibold" data-oid="kq.ryh1">
          With Tooltip
        </h2>
        <div className="flex flex-wrap gap-8" data-oid="g490fgj">
          <div data-oid="mrh55p-">
            <h3 className="mb-2 text-sm font-medium" data-oid="m:rt:v7">
              Top
            </h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-top"
              tooltipText="Jese Leos"
              placement="top"
              data-oid="t7z_4yv"
            />
          </div>
          <div data-oid="47sbf_-">
            <h3 className="mb-2 text-sm font-medium" data-oid="fhgwa-j">
              Right
            </h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-right"
              tooltipText="Jese Leos"
              placement="right"
              data-oid="-7w.s:p"
            />
          </div>
          <div data-oid=":f6falx">
            <h3 className="mb-2 text-sm font-medium" data-oid=":knejad">
              Bottom
            </h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-bottom"
              tooltipText="Jese Leos"
              placement="bottom"
              data-oid=".w:8ehc"
            />
          </div>
          <div data-oid="p8bh:l.">
            <h3 className="mb-2 text-sm font-medium" data-oid="x5:uqxr">
              Left
            </h3>
            <AvatarTooltip
              src={sampleImage}
              alt="Avatar with tooltip"
              tooltipId="tooltip-left"
              tooltipText="Jese Leos"
              placement="left"
              data-oid="kv6dse5"
            />
          </div>
        </div>
      </div>

      <div data-oid="f:-931y">
        <h2 className="mb-4 text-lg font-semibold" data-oid="qk2.gwj">
          With Text
        </h2>
        <div className="space-y-4" data-oid="diugjgx">
          {/* Basic example */}
          <AvatarWithText
            src={sampleImage}
            alt="Jese Leos"
            name="Jese Leos"
            description="Joined in August 2014"
            data-oid="l3rey5t"
          />

          {/* With different sizes */}
          <div className="space-y-4" data-oid="yj5vxs3">
            <h3 className="text-sm font-medium" data-oid="xe.w.yv">
              Different Sizes
            </h3>
            <AvatarWithText
              src={sampleImage}
              alt="Small size"
              name="Small Avatar"
              description="With small size"
              size="sm"
              data-oid="yulxb9k"
            />
            <AvatarWithText
              src={sampleImage}
              alt="Large size"
              name="Large Avatar"
              description="With large size"
              size="lg"
              data-oid="qoqzu40"
            />
          </div>

          {/* With square avatar */}
          <div data-oid="iatk86y">
            <h3 className="mb-2 text-sm font-medium" data-oid="jv4ylc9">
              Square Avatar
            </h3>
            <AvatarWithText
              src={sampleImage}
              alt="Square avatar"
              name="Square Avatar"
              description="With square shape"
              rounded={false}
              data-oid="fpe3m6c"
            />
          </div>

          {/* Without description */}
          <div data-oid="r7gzu-v">
            <h3 className="mb-2 text-sm font-medium" data-oid="g6ai-fr">
              Without Description
            </h3>
            <AvatarWithText
              src={sampleImage}
              alt="No description"
              name="Name Only"
              data-oid="k3_6fsu"
            />
          </div>

          {/* With placeholder avatar */}
          <div data-oid="k-ve4gn">
            <h3 className="mb-2 text-sm font-medium" data-oid="vx:dcuw">
              With Placeholder
            </h3>
            <AvatarWithText
              initials="JD"
              alt="Placeholder"
              name="John Doe"
              description="Using initials placeholder"
              data-oid="jpafe0r"
            />
          </div>
        </div>
      </div>

      <div data-oid="8xf_vfw">
        <h2 className="mb-4 text-lg font-semibold" data-oid="1:5_.5_">
          With Dropdown
        </h2>
        <div className="flex flex-wrap gap-8" data-oid="rwep0fd">
          <div data-oid=":1rn70l">
            <h3 className="mb-2 text-sm font-medium" data-oid="d7t2rvi">
              Bottom Start
            </h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="bottom-start"
              data-oid="79bllk3"
            />
          </div>

          <div data-oid="7g58p-b">
            <h3 className="mb-2 text-sm font-medium" data-oid="y8d0x-7">
              Bottom End
            </h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="bottom-end"
              data-oid="gc3x3i:"
            />
          </div>

          <div data-oid="-._z3oi">
            <h3 className="mb-2 text-sm font-medium" data-oid="ymlwjqx">
              Top Start
            </h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="top-start"
              data-oid="z2jtn96"
            />
          </div>

          <div data-oid="k:p3ibh">
            <h3 className="mb-2 text-sm font-medium" data-oid="4yq1kvd">
              Top End
            </h3>
            <AvatarDropdown
              src={sampleImage}
              alt="User dropdown"
              userInfo={{
                name: 'Bonnie Green',
                email: 'bonnie@flowbite.com',
              }}
              menuItems={dropdownItems}
              placement="top-end"
              data-oid="c9nj:l_"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvatarDemo;
