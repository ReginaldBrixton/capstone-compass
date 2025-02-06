'use client';

import React, { useEffect, useState } from 'react';
import { FiActivity, FiBell, FiGlobe, FiMoon, FiShield, FiUser } from 'react-icons/fi';
import {
  Button,
  SaveButtonContainer,
  Select,
  SettingLabel,
  SettingRow,
  SettingsContainer,
  SettingsGrid,
  SettingsSection,
  Tab,
  TabsContainer,
  Toggle,
} from './styles/SettingsStyles';
const TABS = [
  {
    id: 'account',
    label: 'Account',
    icon: FiUser,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: FiBell,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: FiMoon,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: FiShield,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: FiGlobe,
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: FiActivity,
  },
];
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account settings
    profileVisibility: 'public',
    twoFactorAuth: false,
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    mentionNotifications: true,
    teamUpdates: true,
    // Appearance settings
    darkMode: false,
    fontSize: 'medium',
    colorTheme: 'blue',
    // Privacy settings
    showOnlineStatus: true,
    allowMessaging: true,
    dataSharing: false,
    // Preferences
    language: 'english',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    // Activity
    activityLog: true,
    sessionHistory: true,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    setHasChanges(true);
  };
  const handleSelect = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
    setHasChanges(true);
  };
  const handleSave = async () => {
    // TODO: Implement API call to save settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };
  const renderAccountSettings = () => (
    <SettingsSection data-oid="ral631q">
      <h2 data-oid="fif:7l3">Account Settings</h2>
      <SettingRow data-oid="vei4j:u">
        <SettingLabel data-oid="b8q:ddw">
          <h3 data-oid="_q6tyg9">Profile Visibility</h3>
          <p data-oid="w9t37ae">Control who can see your profile</p>
        </SettingLabel>
        <Select
          value={settings.profileVisibility}
          onChange={(e) => handleSelect('profileVisibility', e.target.value)}
          data-oid="u8:tpar"
        >
          <option value="public" data-oid="5ylfiif">
            Public
          </option>
          <option value="private" data-oid="69ppex5">
            Private
          </option>
          <option value="team" data-oid="l4qiaga">
            Team Only
          </option>
        </Select>
      </SettingRow>
      <SettingRow data-oid="v3-gy3y">
        <SettingLabel data-oid="2:oatjm">
          <h3 data-oid="2qmxc0w">Two-Factor Authentication</h3>
          <p data-oid="rputhk1">Add an extra layer of security</p>
        </SettingLabel>
        <Toggle data-oid="ewrbhjj">
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={() => handleToggle('twoFactorAuth')}
            data-oid="nep5ikv"
          />
          <span data-oid="156mvh9" />
        </Toggle>
      </SettingRow>
    </SettingsSection>
  );
  const renderNotificationSettings = () => (
    <SettingsSection data-oid="fjvnthc">
      <h2 data-oid="-tfa:r4">Notification Preferences</h2>
      <SettingRow data-oid="543l-.l">
        <SettingLabel data-oid=":jiikp0">
          <h3 data-oid="ans5-2w">Email Notifications</h3>
          <p data-oid="72ltzll">Receive updates via email</p>
        </SettingLabel>
        <Toggle data-oid="fug66op">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
            data-oid="8dk::9s"
          />
          <span data-oid="mwe83qx" />
        </Toggle>
      </SettingRow>
      <SettingRow data-oid="2t46x01">
        <SettingLabel data-oid="uxvi.t1">
          <h3 data-oid="d4s:8pi">Push Notifications</h3>
          <p data-oid="12drl13">Get instant notifications</p>
        </SettingLabel>
        <Toggle data-oid="segtdl-">
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
            data-oid=".klml1p"
          />
          <span data-oid="cx84h51" />
        </Toggle>
      </SettingRow>
      <SettingRow data-oid="a0l_..2">
        <SettingLabel data-oid="6nxz2hj">
          <h3 data-oid="b6bf-xj">Team Updates</h3>
          <p data-oid="a21v-95">Get notified about team activities</p>
        </SettingLabel>
        <Toggle data-oid="kqtayxs">
          <input
            type="checkbox"
            checked={settings.teamUpdates}
            onChange={() => handleToggle('teamUpdates')}
            data-oid="yxqamxn"
          />
          <span data-oid="p.b.au-" />
        </Toggle>
      </SettingRow>
    </SettingsSection>
  );
  const renderAppearanceSettings = () => (
    <SettingsSection data-oid="c53y-ll">
      <h2 data-oid="t1lhr1r">Appearance</h2>
      <SettingRow data-oid="76z.xaj">
        <SettingLabel data-oid="eoyz:.3">
          <h3 data-oid="r-80i18">Dark Mode</h3>
          <p data-oid="_glz3pf">Toggle dark theme</p>
        </SettingLabel>
        <Toggle data-oid="e_deb5n">
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => handleToggle('darkMode')}
            data-oid=".to8t-a"
          />
          <span data-oid="hdkd09w" />
        </Toggle>
      </SettingRow>
      <SettingRow data-oid="edzashh">
        <SettingLabel data-oid="__t.bs-">
          <h3 data-oid="p22jna2">Font Size</h3>
          <p data-oid="jf5_ht2">Adjust the text size</p>
        </SettingLabel>
        <Select
          value={settings.fontSize}
          onChange={(e) => handleSelect('fontSize', e.target.value)}
          data-oid="aczuzmk"
        >
          <option value="small" data-oid="7q5rvrh">
            Small
          </option>
          <option value="medium" data-oid="0h6mce8">
            Medium
          </option>
          <option value="large" data-oid="a281f2s">
            Large
          </option>
        </Select>
      </SettingRow>
    </SettingsSection>
  );
  const renderPrivacySettings = () => (
    <SettingsSection data-oid="mitry7_">
      <h2 data-oid="uwjp90_">Privacy & Security</h2>
      <SettingRow data-oid="4mivscf">
        <SettingLabel data-oid="5eoihn3">
          <h3 data-oid=".ycxkgd">Online Status</h3>
          <p data-oid="szsybg3">Show when you're active</p>
        </SettingLabel>
        <Toggle data-oid="h7s4wlh">
          <input
            type="checkbox"
            checked={settings.showOnlineStatus}
            onChange={() => handleToggle('showOnlineStatus')}
            data-oid=":t51va1"
          />
          <span data-oid="xul:2nn" />
        </Toggle>
      </SettingRow>
      <SettingRow data-oid="jrjdtjo">
        <SettingLabel data-oid="wdwj1.i">
          <h3 data-oid="qt9t_bw">Data Sharing</h3>
          <p data-oid="tdcql8l">Share usage data to improve services</p>
        </SettingLabel>
        <Toggle data-oid="40-:70t">
          <input
            type="checkbox"
            checked={settings.dataSharing}
            onChange={() => handleToggle('dataSharing')}
            data-oid="5wv4xch"
          />
          <span data-oid="j1:0q60" />
        </Toggle>
      </SettingRow>
    </SettingsSection>
  );
  const renderPreferenceSettings = () => (
    <SettingsSection data-oid="9h-93ka">
      <h2 data-oid="0.xteks">Preferences</h2>
      <SettingRow data-oid=".-mpe9h">
        <SettingLabel data-oid="mdnb76m">
          <h3 data-oid="9:yymtg">Language</h3>
          <p data-oid="a_v2u34">Choose your preferred language</p>
        </SettingLabel>
        <Select
          value={settings.language}
          onChange={(e) => handleSelect('language', e.target.value)}
          data-oid="lxd2cqn"
        >
          <option value="english" data-oid="t668ilu">
            English
          </option>
          <option value="spanish" data-oid="hv803p:">
            Spanish
          </option>
          <option value="french" data-oid="x34cipc">
            French
          </option>
          <option value="german" data-oid="gcshmdd">
            German
          </option>
        </Select>
      </SettingRow>
      <SettingRow data-oid="-9fpez4">
        <SettingLabel data-oid="l:mszic">
          <h3 data-oid=":qss5u:">Time Zone</h3>
          <p data-oid="m3xzss-">Set your local time zone</p>
        </SettingLabel>
        <Select
          value={settings.timezone}
          onChange={(e) => handleSelect('timezone', e.target.value)}
          data-oid="n7.:lcc"
        >
          <option value="UTC" data-oid="oqkpjuu">
            UTC
          </option>
          <option value="UTC-8" data-oid="w7xwdl.">
            Pacific Time (UTC-8)
          </option>
          <option value="UTC-5" data-oid=":a7zvd8">
            Eastern Time (UTC-5)
          </option>
          <option value="UTC+1" data-oid=":9fxna3">
            Central European Time (UTC+1)
          </option>
        </Select>
      </SettingRow>
    </SettingsSection>
  );
  const renderActivitySettings = () => (
    <SettingsSection data-oid="ftu34lx">
      <h2 data-oid="msoli:t">Activity Log</h2>
      <SettingRow data-oid="cwzg7yi">
        <SettingLabel data-oid="skx99c_">
          <h3 data-oid="_dorfax">Activity Tracking</h3>
          <p data-oid="raqejz7">Track your account activity</p>
        </SettingLabel>
        <Toggle data-oid="r2-6b0n">
          <input
            type="checkbox"
            checked={settings.activityLog}
            onChange={() => handleToggle('activityLog')}
            data-oid="f:e:fbx"
          />
          <span data-oid="h8l1m2e" />
        </Toggle>
      </SettingRow>
      <SettingRow data-oid="s2gq7yk">
        <SettingLabel data-oid="6n1ojos">
          <h3 data-oid="b-eza7y">Session History</h3>
          <p data-oid="sberi9j">Keep record of login sessions</p>
        </SettingLabel>
        <Toggle data-oid="os4aogi">
          <input
            type="checkbox"
            checked={settings.sessionHistory}
            onChange={() => handleToggle('sessionHistory')}
            data-oid="vyhu9c0"
          />
          <span data-oid="e6gofqz" />
        </Toggle>
      </SettingRow>
    </SettingsSection>
  );
  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'preferences':
        return renderPreferenceSettings();
      case 'activity':
        return renderActivitySettings();
      default:
        return null;
    }
  };
  return (
    <SettingsContainer data-oid="acxbjae">
      <TabsContainer data-oid="0nb3wjd">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Tab
            key={id}
            active={activeTab === id}
            onClick={() => setActiveTab(id)}
            data-oid="ftewy29"
          >
            <Icon
              style={{
                marginRight: '8px',
              }}
              data-oid="c2ty::q"
            />
            {label}
          </Tab>
        ))}
      </TabsContainer>

      <SettingsGrid data-oid="n632x11">{renderContent()}</SettingsGrid>

      {hasChanges && (
        <SaveButtonContainer data-oid="72.brc:">
          <Button onClick={handleSave} data-oid="x7jy9w9">
            Save Changes
          </Button>
        </SaveButtonContainer>
      )}
    </SettingsContainer>
  );
}
