'use client';

import React, { useEffect, useState } from 'react';

import { AnnouncementCard, AnnouncementModal, SearchAndFilter } from './components';
import { announcements } from './data/announcements';
import { AnnouncementList, Header, PageContainer, Subtitle, Title } from './styles';

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements);

  useEffect(() => {
    const filtered = announcements.filter((announcement) => {
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || announcement.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
    setFilteredAnnouncements(filtered);
  }, [searchQuery, activeFilter]);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  return (
    <PageContainer>
      <Header>
        <Title>Announcements</Title>
        <Subtitle>Stay updated with the latest news and events</Subtitle>
      </Header>

      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <AnnouncementList
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onClick={() => handleAnnouncementClick(announcement)}
          />
        ))}
        {filteredAnnouncements.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 0',
              color: '#718096',
            }}
          >
            No announcements found matching your criteria
          </div>
        )}
      </AnnouncementList>

      {selectedAnnouncement && (
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}
    </PageContainer>
  );
}
