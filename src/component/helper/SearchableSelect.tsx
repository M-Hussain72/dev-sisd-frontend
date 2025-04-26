import { Combobox, ScrollArea, useCombobox } from '@mantine/core';
import InputFelid from '../ui/InputFelid';
import { useState } from 'react';

export default ({ options }: { options: string[] }) => {
  const combobox = useCombobox();
  const [value, setValue] = useState('');

  const shouldFilterOptions = !options.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? options.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : options;

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    combobox.openDropdown();
  };
  return (
    <>
      <Combobox
        onOptionSubmit={(optionValue) => {
          setValue(optionValue);
          combobox.closeDropdown();
        }}
        withinPortal={false}
        store={combobox}
        radius={'md'}
        shadow="sm"
      >
        <Combobox.Target>
          <div className="w-fit">
            <InputFelid
              title="country"
              type="text"
              onChange={handelChange}
              value={value}
              onClick={() => combobox.openDropdown()}
              handleBlur={() => combobox.closeDropdown()}
              handleFocus={() => combobox.openDropdown()}
            />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown hidden={filteredOptions.length === 0}>
          <Combobox.Options>
            <ScrollArea.Autosize type="scroll" scrollbars={'y'} mah={240}>
              {filteredOptions.map((item) => (
                <Combobox.Option value={item} key={item} c="#949697">
                  {item}
                </Combobox.Option>
              ))}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};
