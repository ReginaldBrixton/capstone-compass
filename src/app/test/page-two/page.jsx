'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Selector/Select';
const PageTwo = () => {
  return (
    <div className="page-two-container" data-oid=":k15970">
      <h1 className="mb-4 text-2xl font-bold" data-oid="dx_i:5n">
        Selector Component Demo
      </h1>

      <Select data-oid="98cjnx-">
        <SelectTrigger data-oid="w1gbtki">
          <SelectValue placeholder="Select an option" data-oid="xpjctln" />
        </SelectTrigger>
        <SelectContent data-oid="5zko1od">
          <SelectItem value="option1" data-oid="z5iwun3">
            Option 1
          </SelectItem>
          <SelectItem value="option2" data-oid="z7y9gg4">
            Option 2
          </SelectItem>
          <SelectItem value="option3" data-oid="qz1zj0m">
            Option 3
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default PageTwo;
