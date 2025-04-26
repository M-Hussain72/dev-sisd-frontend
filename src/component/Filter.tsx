import React, { useEffect, useState } from 'react';
import starIcon from '../assets/starIcon.svg';
import { Rating } from '@mantine/core';
import { filterIn } from '../interface/filterInterface';

const data = [
  {
    label: 'Rating',
    value: 'rating',
    type: 'radio',
    children: [4.5, 4, 3].map((value) => ({
      label: (
        <div className="flex items-center gap-2">
          <Rating
            value={value}
            size={'xs'}
            fractions={2}
            className="gap-1 py-1"
            color="#FFD05A"
            emptySymbol={<img src={starIcon} />}
            readOnly
          />
          <span className=" text-themeBlack  text-sm">{value.toFixed(1)} & up</span>
        </div>
      ),
      value: `${value}`,
    })),
  },
  {
    label: 'Video Duration',
    value: 'totalDuration',
    type: 'checkBox',
    children: [
      { label: '0-1 Hour', value: 'shortest' },
      { label: '1-3 Hours', value: 'short' },
      { label: '3-6 Hours', value: 'medium' },
      { label: '6-17 Hours', value: 'long' },
      { label: '18+ Hours', value: 'longest' },
    ],
  },
  {
    label: 'Price',
    value: 'price',
    type: 'checkBox',
    children: [
      { label: 'Paid', value: 'price-paid' },
      { label: 'free', value: 'price-free' },
    ],
  },
  {
    label: 'Language',
    value: 'language',
    type: 'checkBox',
    children: ['English', 'اردو', 'Russian', 'العربية', '日本語'].map((item) => ({ label: item, value: `${item}` })),
  },
  // {
  //   label: 'Subtitles',
  //   value: 'Subtitles',
  //   type: 'checkBox',
  //   children: ['English', 'اردو', 'Russian', 'العربية', '日本語'].map((item) => ({ label: item, value: `s-${item}` })),
  // },
];

// const renderTreeNode = ({ node, expanded, hasChildren, elementProps, tree }: RenderTreeNodePayload) => {
//   const checked = tree.isNodeChecked(node.value);

//   return (
//     <Group gap={4} wrap="nowrap" {...elementProps}>
//       {!hasChildren && (
//         <>
//           <Checkbox.Indicator
//             checked={checked}
//             size="xs"
//             onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
//           />
//           <br className="my-2" />
//         </>
//       )}
//       <Group
//         justify="space-between"
//         flex={'true'}
//         gap={'xs'}
//         className={hasChildren ? ' max-w-[200px] w-full min-w-[100px]' : ''}
//         onClick={() => tree.toggleExpanded(node.value)}
//         wrap="nowrap"
//       >
//         <span>{node.label}</span>

//         {hasChildren && (
//           <svg
//             width="20"
//             height="21"
//             viewBox="0 0 20 21"
//             className="mt-[2px] fill-[#949697]  group-hover:fill-[#307EE1]"
//             style={{
//               transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
//             }}
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M10 13L6 8.75972L6.71667 8L10 11.4982L13.2833 8.01767L14 8.77739L10 13Z" />
//           </svg>
//         )}
//       </Group>
//       {hasChildren && <div className=" "></div>}
//     </Group>
//   );
// };

// export default function Filter() {
//   const tree = useTree({
//     initialExpandedState: getTreeExpandedState(data, '*'),
//   });

//   // Add useEffect to track checked nodes changes
//   // useEffect(() => {
//   //   // Get only leaf nodes (actual filter values)
//   //   const checkedLeafNodes = tree.checkedState.filter(node =>
//   //     !data.some(parent => parent.value === node)
//   //   );

//   //   // Group filters by category
//   //   const filters = data.reduce((acc, parent) => {
//   //     const childrenValues = parent.children?.map(child => child.value) || [];
//   //     const selected = checkedLeafNodes
//   //       .filter(checkedValue => childrenValues.includes(checkedValue))
//   //       .map(String);

//   //     if (selected.length > 0) {
//   //       acc[parent.value] = selected;
//   //     }
//   //     return acc;
//   //   }, {} as Record<string, string[]>);

//   //   onChange(filters);
//   // }, [tree.checkedNodes, data, onChange]);
//   console.log(tree.checkedState);
//   console.log(tree.selectedState);

//   return (
//     <>
//       <Group justify="space-between" mr={'xs'} my={'lg'}>
//         <h1 className="text-themeBlack text-2xl">Filters</h1>
//         <span
//           onClick={() => tree.uncheckAllNodes()}
//           className=" text-base focus:text-[#3065e1] text-themeBlue cursor-pointer"
//         >
//           clear
//         </span>
//       </Group>
//       <Tree
//         tree={tree}
//         data={data}
//         levelOffset={0}
//         expandOnClick={false}
//         renderNode={renderTreeNode}
//         styles={{
//           subtree: {
//             padding: '12px 0',
//             margin: '0 0',
//           },
//         }}
//         classNames={{
//           root: 'space-y-4', // Add vertical spacing between items
//         }}
//       />
//     </>
//   );
// }

export default function Filter({ onChange }: { onChange: React.Dispatch<React.SetStateAction<filterIn | null>> }) {
  const [checkedNodes, setCheckedNodes] = useState<string[]>([]);
  const [ratingSelection, setRatingSelection] = useState<string | null>(null);

  // Toggle a node's checked state
  const toggleCheckbox = (value: string) => {
    setCheckedNodes((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleRadioChange = (value: string) => {
    setRatingSelection(value);
  };

  // Clear all checked nodes
  const clearAll = () => {
    setCheckedNodes([]);
    setRatingSelection(null);
  };

  useEffect(() => {
    const checkedSet = new Set(checkedNodes);

    // Build filters by iterating over each parent node
    const filters = data.reduce<Record<string, string[]>>((acc, parent) => {
      if (parent.value === 'rating' && ratingSelection) {
        acc[parent.value] = [ratingSelection];
      } else {
        if (parent.children) {
          const selectedChildren = parent.children
            .filter((child) => checkedSet.has(child.value))
            .map((child) => child.value);

          if (selectedChildren.length > 0) {
            acc[parent.value] = selectedChildren;
          }
        }
      }
      return acc;
    }, {});

    console.log(filters);
    if (onChange && Object.keys(filters).length > 0) {
      console.log('filters:', filters);
      onChange({
        rating: filters.rating ? filters?.rating.join('-') : undefined,
        totalDuration: filters?.totalDuration,
        language: filters?.language,
        price: filters?.price,
        level: undefined,
        featured: undefined,
      });
    } else {
      onChange(null);
    }
  }, [checkedNodes, ratingSelection]);

  // Render a simple two-level tree
  return (
    <div className=" rounded max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-themeBlack">Filters</h1>
        <span onClick={clearAll} className="text-blue-600 cursor-pointer">
          Clear
        </span>
      </div>
      <div>
        {data.map((filter) => (
          <div key={filter.value} className="mb-4">
            <div className="font-medium text-themeBlack text-lg mb-2">{filter.label}</div>
            <div className="">
              {filter.children.map((child) => (
                <label key={child.value} className="flex items-center  cursor-pointer">
                  <input
                    type={filter.type}
                    checked={filter.type === 'radio' ? ratingSelection === child.value : checkedNodes.includes(child.value)}
                    onChange={() => {
                      if (filter.type === 'radio') {
                        handleRadioChange(child.value);
                      } else {
                        toggleCheckbox(child.value);
                      }
                    }}
                    className="w-4 h-4 mr-2 cursor-pointer"
                  />
                  <span className="text-themeBlack my-1">{child.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
