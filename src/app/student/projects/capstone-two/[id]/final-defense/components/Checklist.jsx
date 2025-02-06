import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
const ChecklistContainer = styled.div.attrs({
  className: 'checklist-container',
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;
const CategoryCard = styled(motion.div).attrs({
  className: 'category-card',
})`
  background: var(--background-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
  }
`;
const ChecklistItemStyled = styled(motion.div).attrs({
  className: 'checklist-item',
})`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: var(--hover-color, #f8f9fa);
  }
`;
const Checkbox = styled.input.attrs({
  className: 'checklist-checkbox',
})`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--primary-color);
  border-radius: 0.25rem;
  cursor: pointer;
  appearance: none;
  position: relative;

  &:checked {
    background-color: var(--primary-color);

    &::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 0.8rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
const ItemText = styled.span.attrs({
  className: 'checklist-item-text',
})`
  flex: 1;
  text-decoration: ${(props) => (props.$checked ? 'line-through' : 'none')};
  color: ${(props) => (props.$checked ? 'var(--text-secondary)' : 'var(--text-primary)')};
`;
const ChecklistItem = ({ item, onToggle }) => {
  return (
    <ChecklistItemStyled
      whileHover={{
        x: 4,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      data-oid="o9.zosm"
    >
      <Checkbox
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
        data-oid="jf7j80o"
      />
      <ItemText $checked={item.checked} data-oid="e958fn:">
        {item.text}
      </ItemText>
    </ChecklistItemStyled>
  );
};
const Checklist = ({ items, onToggleItem }) => {
  const categorizedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  return (
    <ChecklistContainer data-oid="fx.q8bv">
      {Object.entries(categorizedItems).map(([category, categoryItems], index) => (
        <CategoryCard
          key={category}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.1,
          }}
          data-oid="7bn.n93"
        >
          <h3 data-oid="r5.00:5">{category}</h3>
          {categoryItems.map((item) => (
            <ChecklistItem key={item.id} item={item} onToggle={onToggleItem} data-oid="jkb67cg" />
          ))}
        </CategoryCard>
      ))}
    </ChecklistContainer>
  );
};
export default Checklist;
