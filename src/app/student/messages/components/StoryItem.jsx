'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import chatData from '../data/chatData.json';
const StoryItem = ({ story }) => {
  const [showPreview, setShowPreview] = useState(false);
  const user = chatData.users.find((user) => user.id === story.userId);
  const hasUnviewed = !story.viewed;
  return (
    <>
      <div
        className="flex flex-col items-center space-y-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors"
        onClick={() => setShowPreview(true)}
        id="story-item"
        data-oid=".l21s5n"
      >
        <div className="relative" data-oid="_ob2kk1">
          <Image
            src={user.avatar || '/placeholder.svg'}
            alt={user.name}
            width={56}
            height={56}
            className="rounded-full border-2 border-gray-200"
            data-oid="3xy9:7n"
          />
          {hasUnviewed && (
            <div
              className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
              data-oid="q5i2:t7"
            />
          )}
          {story.isLive && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-[10px] text-center rounded-b-full"
              data-oid="8zhqmvm"
            >
              LIVE
            </div>
          )}
          {story.isPremium && (
            <div className="absolute -top-1 -right-1" data-oid="6.4v_dl">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                data-oid="2ts_j.3"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  data-oid="r4w9ch_"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Story Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          id="story-modal"
          data-oid="ixbulo:"
        >
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            id="close-button"
            data-oid="jr4q1zw"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="bgja-3."
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                data-oid="xd69t2j"
              />
            </svg>
          </button>

          <div className="flex flex-col items-center space-y-4" data-oid="3ss6m9e">
            <Image
              src={story.media || user.avatar}
              alt="Story"
              width={400}
              height={600}
              className="rounded-lg max-h-[70vh] w-auto"
              objectFit="contain"
              data-oid="wfhd6lb"
            />

            <div className="flex items-center justify-center space-x-6" data-oid="nwtdl16">
              <button className="text-white/70 hover:text-white" data-oid="x7.2sdx">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="p7_-24n"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    data-oid="sudjt1:"
                  />
                </svg>
              </button>
              <button className="text-white/70 hover:text-white" data-oid="iaek6m4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="hccdg.f"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    data-oid="4r5br5:"
                  />
                </svg>
              </button>
              <button className="text-white/70 hover:text-white" data-oid="kf6ytem">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="99vev:7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    data-oid="vhxqh5l"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StoryItem;
