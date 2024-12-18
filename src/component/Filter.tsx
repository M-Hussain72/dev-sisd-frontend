import starIcon from '../assets/starIcon.svg';
import {
  Checkbox,
  Group,
  RenderTreeNodePayload,
  getTreeExpandedState,
  Tree,
  TreeNodeData,
  Rating,
  Stack,
  useTree,
} from '@mantine/core';

const data: TreeNodeData[] = [
  {
    label: 'Rating',
    value: 'rating',
    children: [4.5, 4, 3, 2, 1].map((item) => ({
      label: (
        <>
          <Rating
            value={item}
            size={'xs'}
            fractions={2}
            className="gap-1"
            color="#FFD05A"
            emptySymbol={<img src={starIcon} />}
            readOnly
          />
        </>
      ),
      value: `${item}`,
    })),
  },
  {
    label: 'Video Duration',
    value: 'videoDuration',
    children: [
      { label: '0-1 Hour', value: '0-1 Hour' },
      { label: '1-3 Hours', value: '1-3 Hours' },
      { label: '3-6 Hours', value: '3-6 Hours' },
      { label: '6-17 Hours', value: '6-17 Hours' },
      { label: '17-24 Hours', value: '17-24 Hours' },
      { label: '24+ Hours', value: '24+ Hours' },
    ],
  },
  {
    label: 'Category',
    value: 'Category',
    children: ['design', 'business', 'development', 'music', 'innovation', 'lifestyle'].map((item) => ({
      label: item,
      value: item,
    })),
  },
  {
    label: 'Language',
    value: 'Language',
    children: ['English', 'اردو', 'Russian', 'العربية', '日本語'].map((item) => ({ label: item, value: `l${item}` })),
  },
  {
    label: 'Subtitles',
    value: 'Subtitles',
    children: ['English', 'اردو', 'Russian', 'العربية', '日本語'].map((item) => ({ label: item, value: `s${item}` })),
  },
];

const renderTreeNode = ({ node, expanded, hasChildren, elementProps, tree }: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  return (
    <Group gap={4} wrap="nowrap" {...elementProps}>
      {!hasChildren && (
        <>
          <Checkbox.Indicator
            checked={checked}
            size="xs"
            onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
          />
          <br className="my-2" />
        </>
      )}
      <Group
        justify="space-between"
        flex={'true'}
        gap={'xs'}
        className={hasChildren ? ' max-w-[200px] w-full min-w-[100px]' : ''}
        onClick={() => tree.toggleExpanded(node.value)}
        wrap="nowrap"
      >
        <span>{node.label}</span>

        {hasChildren && (
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            className="mt-[2px] fill-[#949697]  group-hover:fill-[#307EE1]"
            style={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 13L6 8.75972L6.71667 8L10 11.4982L13.2833 8.01767L14 8.77739L10 13Z" />
          </svg>
        )}
      </Group>
      {hasChildren && <div className=" "></div>}
    </Group>
  );
};

export default function Filter() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, '*'),
  });
  return (
    <>
      <Group justify="space-between" mr={'xs'} my={'lg'}>
        <h1 className="text-themeBlack text-2xl">Filters</h1>
        <span
          onClick={() => tree.uncheckAllNodes()}
          className=" text-base focus:text-[#3065e1] text-themeBlue cursor-pointer"
        >
          clear
        </span>
      </Group>
      <Tree
        tree={tree}
        data={data}
        levelOffset={0}
        expandOnClick={false}
        renderNode={renderTreeNode}
        styles={{
          subtree: {
            padding: '12px 0',
            margin: '0 0',
          },
        }}
        classNames={{
          root: 'space-y-4', // Add vertical spacing between items
        }}
      />
    </>
  );
}
