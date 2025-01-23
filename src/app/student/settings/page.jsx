'use client';

import React, { useEffect, useState } from 'react';
import {
  FiActivity,
  FiBell,
  FiGlobe,
  FiMoon,
  FiShield,
  FiUser,
} from 'react-icons/fi';

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
  { id: 'account', label: 'Account', icon: FiUser },
  { id: 'notifications', label: 'Notifications', icon: FiBell },
  { id: 'appearance', label: 'Appearance', icon: FiMoon },
  { id: 'privacy', label: 'Privacy', icon: FiShield },
  { id: 'preferences', label: 'Preferences', icon: FiGlobe },
  { id: 'activity', label: 'Activity', icon: FiActivity },
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
    <SettingsSection>
      <h2>Account Settings</h2>
      <SettingRow>
        <SettingLabel>
          <h3>Profile Visibility</h3>
          <p>Control who can see your profile</p>
        </SettingLabel>
        <Select
          value={settings.profileVisibility}
          onChange={(e) => handleSelect('profileVisibility', e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="team">Team Only</option>
        </Select>
      </SettingRow>
      <SettingRow>
        <SettingLabel>
          <h3>Two-Factor Authentication</h3>
          <p>Add an extra layer of security</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={() => handleToggle('twoFactorAuth')}
          />
          <span />
        </Toggle>
      </SettingRow>
    </SettingsSection>
  );

  const renderNotificationSettings = () => (
    <SettingsSection>
      <h2>Notification Preferences</h2>
      <SettingRow>
        <SettingLabel>
          <h3>Email Notifications</h3>
          <p>Receive updates via email</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
          <span />
        </Toggle>
      </SettingRow>
      <SettingRow>
        <SettingLabel>
          <h3>Push Notifications</h3>
          <p>Get instant notifications</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
          />
          <span />
        </Toggle>
      </SettingRow>
      <SettingRow>
        <SettingLabel>
          <h3>Team Updates</h3>
          <p>Get notified about team activities</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.teamUpdates}
            onChange={() => handleToggle('teamUpdates')}
          />
          <span />
        </Toggle>
      </SettingRow>
    </SettingsSection>
  );

  const renderAppearanceSettings = () => (
    <SettingsSection>
      <h2>Appearance</h2>
      <SettingRow>
        <SettingLabel>
          <h3>Dark Mode</h3>
          <p>Toggle dark theme</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => handleToggle('darkMode')}
          />
          <span />
        </Toggle>
      </SettingRow>
      <SettingRow>
        <SettingLabel>
          <h3>Font Size</h3>
          <p>Adjust the text size</p>
        </SettingLabel>
        <Select
          value={settings.fontSize}
          onChange={(e) => handleSelect('fontSize', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </Select>
      </SettingRow>
    </SettingsSection>
  );

  const renderPrivacySettings = () => (
    <SettingsSection>
      <h2>Privacy & Security</h2>
      <SettingRow>
        <SettingLabel>
          <h3>Online Status</h3>
          <p>Show when you're active</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.showOnlineStatus}
            onChange={() => handleToggle('showOnlineStatus')}
          />
          <span />
        </Toggle>
      </SettingRow>
      <SettingRow>
        <SettingLabel>
          <h3>Data Sharing</h3>
          <p>Share usage data to improve services</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.dataSharing}
            onChange={() => handleToggle('dataSharing')}
          />
          <span />
        </Toggle>
      </SettingRow>
    </SettingsSection>
  );

  const renderPreferenceSettings = () => (
    <SettingsSection>
      <h2>Preferences</h2>
      <SettingRow>
        <SettingLabel>
          <h3>Language</h3>
          <p>Choose your preferred language</p>
        </SettingLabel>
        <Select
          value={settings.language}
          onChange={(e) => handleSelect('language', e.target.value)}
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
        </Select>
      </SettingRow>
      <SettingRow>
        <SettingLabel>
          <h3>Time Zone</h3>
          <p>Set your local time zone</p>
        </SettingLabel>
        <Select
          value={settings.timezone}
          onChange={(e) => handleSelect('timezone', e.target.value)}
        >
          <option value="UTC">UTC</option>
          <option value="UTC-8">Pacific Time (UTC-8)</option>
          <option value="UTC-5">Eastern Time (UTC-5)</option>
          <option value="UTC+1">Central European Time (UTC+1)</option>
        </Select>
      </SettingRow>
    </SettingsSection>
  );

  const renderActivitySettings = () => (
    <SettingsSection>
      <h2>Activity Log</h2>
      <SettingRow>
        <SettingLabel>
          <h3>Activity Tracking</h3>
          <p>Track your account activity</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.activityLog}
            onChange={() => handleToggle('activityLog')}
          />
          <span />
        </Toggle>
      </SettingRow>
      <SettingRow>
        <SettingLabel>
          <h3>Session History</h3>
          <p>Keep record of login sessions</p>
        </SettingLabel>
        <Toggle>
          <input
            type="checkbox"
            checked={settings.sessionHistory}
            onChange={() => handleToggle('sessionHistory')}
          />
          <span />
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
    <SettingsContainer>
      <TabsContainer>
        {TABS.map(({ id, label, icon: Icon }) => (
          <Tab
            key={id}
            active={activeTab === id}
            onClick={() => setActiveTab(id)}
          >
            <Icon style={{ marginRight: '8px' }} />
            {label}
          </Tab>
        ))}
      </TabsContainer>

      <SettingsGrid>{renderContent()}</SettingsGrid>

      {hasChanges && (
        <SaveButtonContainer>
          <Button onClick={handleSave}>Save Changes</Button>
        </SaveButtonContainer>
      )}
    </SettingsContainer>
  );
}
