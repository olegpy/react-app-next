import {Category} from "@/types/books";
import {FC} from "react";
import {
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel
} from '@mui/material';

import { SelectChangeEvent } from '@mui/material/Select';

type MultipleSelectProps = {
  labelId: string;
  id: string;
  value: Category[];
  items: Category[];
  onChange: (value: Category[]) => void;
}

const CategoriesSelect: FC<MultipleSelectProps> = (props) => {
  const { labelId, id, value, items, onChange } = props;

  const handleMapChange = (categoryName: string) => {
    const matchingCategory = items.find(category => category.name === categoryName);

    if (matchingCategory) {
      return {
        id: matchingCategory.id,
        name: matchingCategory.name,
      };
    } else {
      // Handle the case where the category is not found (optional)
      return {
        id: 'unknown-id',
        name: categoryName,
      };
    }

  };
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;

    // onChange(newValue.map(handleMapChange));
    onChange(
      // Ensure value is an array of Category objects
      (typeof value === 'string' ? value.split(',') : value).map(handleMapChange),
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl sx={{ width: '100%', margin: '16px 0' }}>
      <InputLabel id="categories-label">Category</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        multiple
        value={value.map((category) => category.name)}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
      >
        {items.map(({id, name}) => (
          <MenuItem
            key={id}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoriesSelect;