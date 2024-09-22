import { DependencyType, Parts } from '@/models/Parts';

export const mockPartsData: Parts = [
  {
    id: 'frame',
    name: 'Frame',
    characteristics: [
      {
        id: 'frame_type',
        name: 'Frame Type',
        options: [
          {
            id: 'full_suspension',
            value: 'Full Suspension',
            basePrice: 500,
            stock: 10,
            prices: [],
            dependencies: [],
          },
          {
            id: 'diamond_frame',
            value: 'Diamond Frame',
            basePrice: 400,
            stock: 45,
            prices: [],
            dependencies: [],
          },
          {
            id: 'hardtail',
            value: 'Hardtail',
            basePrice: 350,
            stock: 20,
            prices: [],
            dependencies: [],
          },
        ],
      },
      {
        id: 'frame_finish',
        name: 'Frame Finish',
        options: [
          {
            id: 'matte',
            value: 'Matte',
            basePrice: 0,
            stock: 30,
            prices: [
              {
                price: 30,
                dependencies: [
                  {
                    characteristicId: 'frame_type',
                    optionId: 'full_suspension',
                    type: DependencyType.Requires,
                  },
                ],
              },
              {
                price: 50,
                dependencies: [
                  {
                    characteristicId: 'frame_type',
                    optionId: 'diamond_frame',
                    type: DependencyType.Requires,
                  },
                ],
              },
            ],
            dependencies: [
              {
                characteristicId: 'frame_type',
                optionId: 'hardtail',
                type: DependencyType.Excludes,
              },
            ],
          },
          {
            id: 'glossy',
            value: 'Glossy',
            basePrice: 0,
            stock: 25,
            prices: [],
            dependencies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'wheel',
    name: 'Wheel',
    characteristics: [
      {
        id: 'wheel_type',
        name: 'Wheel Type',
        options: [
          {
            id: 'mountain_wheels',
            value: 'Mountain Wheels',
            basePrice: 200,
            stock: 10,
            prices: [],
            dependencies: [
              {
                characteristicId: 'frame_type',
                optionId: 'full_suspension',
                type: DependencyType.Requires,
              },
            ],
          },
          {
            id: 'fat_bike_wheels',
            value: 'Fat Bike Wheels',
            basePrice: 220,
            stock: 5,
            prices: [],
            dependencies: [
              {
                characteristicId: 'rim_color',
                optionId: 'red',
                type: DependencyType.Excludes,
              },
            ],
          },
          {
            id: 'road_wheels',
            value: 'Road Wheels',
            basePrice: 180,
            stock: 15,
            prices: [],
            dependencies: [],
          },
        ],
      },
      {
        id: 'rim_color',
        name: 'Rim Color',
        options: [
          {
            id: 'red',
            value: 'Red',
            basePrice: 10,
            stock: 20,
            prices: [],
            dependencies: [],
          },
          {
            id: 'black',
            value: 'Black',
            basePrice: 0,
            stock: 25,
            prices: [],
            dependencies: [],
          },
          {
            id: 'silver',
            value: 'Silver',
            basePrice: 5,
            stock: 15,
            prices: [],
            dependencies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'seat',
    name: 'Seat',
    characteristics: [
      {
        id: 'seat_type',
        name: 'Seat Type',
        options: [
          {
            id: 'racing_seat',
            value: 'Racing Seat',
            basePrice: 50,
            stock: 10,
            prices: [
              {
                price: 20,
                dependencies: [
                  {
                    characteristicId: 'wheel_type',
                    optionId: 'road_wheels',
                    type: DependencyType.Requires,
                  },
                ],
              },
            ],
            dependencies: [],
          },
          {
            id: 'comfort_seat',
            value: 'Comfort Seat',
            basePrice: 40,
            stock: 15,
            prices: [],
            dependencies: [],
          },
          {
            id: 'gel_seat',
            value: 'Gel Seat',
            basePrice: 60,
            stock: 5,
            prices: [],
            dependencies: [
              {
                characteristicId: 'frame_type',
                optionId: 'hardtail',
                type: DependencyType.Requires,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'crankset',
    name: 'Crankset',
    characteristics: [
      {
        id: 'crankset_type',
        name: 'Crankset Type',
        options: [
          {
            id: 'single_speed',
            value: 'Single Speed',
            basePrice: 70,
            stock: 15,
            prices: [],
            dependencies: [
              {
                characteristicId: 'frame_type',
                optionId: 'full_suspension',
                type: DependencyType.Excludes,
              },
            ],
          },
          {
            id: 'multi_speed',
            value: 'Multi Speed',
            basePrice: 90,
            stock: 20,
            prices: [],
            dependencies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'pedals',
    name: 'Pedals',
    characteristics: [
      {
        id: 'pedal_type',
        name: 'Pedal Type',
        options: [
          {
            id: 'clipless_pedals',
            value: 'Clipless Pedals',
            basePrice: 50,
            stock: 20,
            prices: [],
            dependencies: [],
          },
          {
            id: 'flat_pedals',
            value: 'Flat Pedals',
            basePrice: 30,
            stock: 25,
            prices: [],
            dependencies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'brakes',
    name: 'Brakes',
    characteristics: [
      {
        id: 'brake_type',
        name: 'Brake Type',
        options: [
          {
            id: 'disc_brakes',
            value: 'Disc Brakes',
            basePrice: 80,
            stock: 10,
            prices: [],
            dependencies: [
              {
                characteristicId: 'wheel_type',
                optionId: 'road_wheels',
                type: DependencyType.Excludes,
              },
            ],
          },
          {
            id: 'rim_brakes',
            value: 'Rim Brakes',
            basePrice: 60,
            stock: 20,
            prices: [],
            dependencies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'handlebars',
    name: 'Handlebars',
    characteristics: [
      {
        id: 'handlebar_type',
        name: 'Handlebar Type',
        options: [
          {
            id: 'drop_handlebars',
            value: 'Drop Handlebars',
            basePrice: 70,
            stock: 15,
            prices: [],
            dependencies: [
              {
                characteristicId: 'wheel_type',
                optionId: 'road_wheels',
                type: DependencyType.Requires,
              },
            ],
          },
          {
            id: 'flat_handlebars',
            value: 'Flat Handlebars',
            basePrice: 50,
            stock: 20,
            prices: [],
            dependencies: [],
          },
          {
            id: 'slim_handlebars',
            value: 'Slim Handlebars',
            basePrice: 50,
            stock: 0,
            prices: [],
            dependencies: [],
          },
        ],
      },
    ],
  },
];
