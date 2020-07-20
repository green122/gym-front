import React from "react";
import { Category } from "../../models/Workout";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import "./CategoriesSelector.scss";

interface CategoriesSelectorProps {
  onSelect: (selected: Category[]) => void;
  selected: Category[];
}

const categories: Category[] = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

export const CategoriesSelector = ({
  onSelect,
  selected,
}: CategoriesSelectorProps) => {
  const onChange = (event: CheckboxChangeEvent) => {
    const category: Category = (event.target as any)["data-key"];
    const newSelected = selected.includes(category)
      ? selected.filter((selectedCategory) => selectedCategory === category)
      : selected.concat(category);
    onSelect(newSelected);
  };

  return (
    <div className="categories-list">
      {categories.map((category, index) => (
        <Checkbox
          className="categories-checkbox"
          data-key={category}
          data-type="category"
          checked={selected.includes(category)}
          key={index}
          onChange={onChange}
        >
          {category.toUpperCase()}
        </Checkbox>
      ))}
    </div>
  );
};
