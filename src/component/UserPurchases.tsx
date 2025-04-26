import { NumberFormatter, Table } from '@mantine/core';

const elements = [
  {
    position: 6,
    mass: 12.011,
    symbol: 'C',
    name: 'Carbon mksf skdfmdsf',
  },
  {
    position: 7,
    mass: 14.007,
    symbol: 'N',
    name: 'Nitrogen fkvmfl kf dfdsklf dsfklsd fsdklf sd csdkc dskc dskc dslkc sdlk',
  },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58000000000000, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export default function UserPurchase() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>
        &#8360; <NumberFormatter value={element.position} thousandSeparator />
      </Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div>
      <h1 className=" font-semibold text-3xl text-themeBlack">Purchases</h1>
      {elements.length < 0 ? (
        <div className=" mt-6">
          <Table.ScrollContainer minWidth={500}>
            <Table verticalSpacing="md" withTableBorder className=" rounded-xl">
              <Table.Thead bg={'rgba(238, 238, 238, 1)'}>
                <Table.Tr>
                  <Table.Th>Course Name</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Payment Date</Table.Th>
                  <Table.Th>Payment Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-xl border p-10 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">No Purchases Found</h2>
          <p className="mt-2 text-gray-500">You have not purchased anything yet.</p>
        </div>
      )}
    </div>
  );
}
