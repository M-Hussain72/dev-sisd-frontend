import { useState, useRef } from 'react';
import { Combobox, Loader, Input, useCombobox, Text } from '@mantine/core';
import searchIcon from '../assets/searchIcon.svg';
import { Link, useNavigate } from '@tanstack/react-router';
import { getCoursesBySuggestion } from '../http/courseHttp';
import { SearchSuggestionIn } from '../interface/courseInterface';

export default function AutoCompleteSearchInput() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchSuggestionIn[] | null>(null);
  const [value, setValue] = useState('');
  const [empty, setEmpty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const fetchOptions = (query: string) => {
    setLoading(true);

    getCoursesBySuggestion({ search: query })
      .then((result) => {
        setData(result);
        setLoading(false);
        setEmpty(result.length === 0);
      })
      .catch(() => {});
  };

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);

    if (event.currentTarget.value.length != 0) {
      fetchOptions(event.currentTarget.value);
      combobox.resetSelectedOption();
      combobox.openDropdown();
    } else {
      combobox.closeDropdown();
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
      combobox.closeDropdown();
      navigate({
        to: `/courses/search/${inputRef.current?.value}`,
      });
    }
  }

  const options = (data || []).map((item) => (
    <Combobox.Option value={item.title} key={item.slug} c="#949697">
      <Link
        to={!(item.type === 'category') ? `/courses/search/${item.title}` : `/courses/category/${item.slug}`}
        className="flex items-center"
      >
        <img src={searchIcon} className=" pr-2   " />
        {item.title}
      </Link>
    </Combobox.Option>
  ));

  return (
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
        <div className=" max-w-[630px] w-full min-w-0 ">
          <Input
            ref={inputRef}
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search for anything"
            size="md"
            radius={'md'}
            styles={{
              input: {
                color: '#2B2B2B', // Text color
                backgroundColor: '#F4F5F6', // Background color
                boxShadow: 'none',
              },
            }}
            className="  max-w-[630px] min-w-[150px] w-full focus:border-[#2B2B2B]"
            value={value}
            onChange={(event) => {
              handelChange(event);
            }}
            onBlur={() => combobox.closeDropdown()}
            leftSection={<img src={searchIcon} />}
            rightSection={loading && <Loader size={18} />}
            onKeyDown={(event) => handleKeyDown(event)}
          ></Input>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options>
          {options}
          {empty && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
