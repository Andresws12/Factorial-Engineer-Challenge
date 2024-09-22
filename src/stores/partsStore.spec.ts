// stores/parts.spec.ts
import { setActivePinia, createPinia } from 'pinia';
import { useI18n } from 'vue-i18n';

import { usePartsStore } from './parts';

import { getAllParts } from '@/webservices/bikeParts/BikePartsWebservice';
import { Option, DependencyType } from '@/models/Parts';

import { mockPartsData } from '@/models/utils/MockPartsData';

jest.mock('@/webservices/bikeParts/BikePartsWebservice', () => ({
  getAllParts: jest.fn(),
}));

jest.mock('vue-i18n', () => ({
  useI18n: jest.fn(),
}));

describe('Parts Store', () => {
  let partsStore: ReturnType<typeof usePartsStore>;
  let mockedGetAllParts: jest.Mock;
  let mockedUseI18n: jest.Mock;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockedGetAllParts = getAllParts as jest.Mock;
    mockedUseI18n = useI18n as jest.Mock;

    mockedUseI18n.mockReturnValue({
      t: (key: string) => key,
    });

    partsStore = usePartsStore();
  });

  it('should fetch parts data', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);

    await partsStore.getParts();

    expect(mockedGetAllParts).toHaveBeenCalled();
    expect(partsStore.partsData).toEqual(mockPartsData);
  });

  it('should handle error in getParts', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const error = new Error('Network Error');
    mockedGetAllParts.mockRejectedValue(error);

    await partsStore.getParts();

    expect(mockedGetAllParts).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);

    consoleErrorSpy.mockRestore();
  });

  it('should select an option', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const partId = 'frame';
    const characteristicId = 'frame_type';
    const option = mockPartsData[0].characteristics[0].options[0];

    partsStore.selectOption(partId, characteristicId, option);

    expect(partsStore.selectedOptions[partId][characteristicId]).toEqual(
      option
    );
    expect(
      partsStore.selectedOptionKeys.has(`${characteristicId}_${option.id}`)
    ).toBe(true);
  });

  it('should not select an unselectable option due to stock', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const partId = 'handlebars';
    const characteristicId = 'handlebar_type';
    const option = mockPartsData
      .find(p => p.id === 'handlebars')!
      .characteristics[0].options.find(o => o.id === 'slim_handlebars')!;

    expect(option.stock).toBe(0);
    partsStore.selectOption(partId, characteristicId, option);

    expect(partsStore.selectedOptions[partId]).toBeUndefined();
    expect(
      partsStore.selectedOptionKeys.has(`${characteristicId}_${option.id}`)
    ).toBe(false);
  });

  it('should correctly calculate the total price', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const frameOption = mockPartsData[0].characteristics[0].options[0]; // Full Suspension
    partsStore.selectOption('frame', 'frame_type', frameOption);

    const wheelOption = mockPartsData[1].characteristics[0].options[0]; // Mountain Wheels
    partsStore.selectOption('wheel', 'wheel_type', wheelOption);

    expect(partsStore.totalPrice).toBe(
      frameOption.basePrice + wheelOption.basePrice
    );
  });

  it('should correctly identify if an option is selected', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const partId = 'frame';
    const characteristicId = 'frame_type';
    const option = mockPartsData[0].characteristics[0].options[0];

    partsStore.selectOption(partId, characteristicId, option);

    expect(
      partsStore.isOptionSelected(partId, characteristicId, option.id)
    ).toBe(true);
    expect(
      partsStore.isOptionSelected(partId, characteristicId, 'some_other_option')
    ).toBe(false);
  });

  it('should handle dependency with unrecognized type in isOptionSelectable', () => {
    const option: Option = {
      id: 'test_option',
      value: 'Test Option',
      basePrice: 100,
      stock: 10,
      prices: [],
      dependencies: [
        {
          characteristicId: 'test_char',
          optionId: 'test_option',
          type: 'unknown_type' as DependencyType,
        },
      ],
    };

    expect(partsStore.isOptionSelectable(option)).toBe(true);
  });

  it('should determine if an option is selectable based on dependencies', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const matteOption = mockPartsData[0].characteristics[1].options.find(
      o => o.id === 'matte'
    )!;
    expect(partsStore.isOptionSelectable(matteOption)).toBe(true);

    const frameOption = mockPartsData[0].characteristics[0].options.find(
      o => o.id === 'full_suspension'
    )!;
    partsStore.selectOption('frame', 'frame_type', frameOption);

    expect(partsStore.isOptionSelectable(matteOption)).toBe(true);
  });

  it('should get the option price with additional price rules', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const matteOption = mockPartsData[0].characteristics[1].options.find(
      o => o.id === 'matte'
    )!;
    const frameOption = mockPartsData[0].characteristics[0].options.find(
      o => o.id === 'full_suspension'
    )!;
    partsStore.selectOption('frame', 'frame_type', frameOption);

    expect(partsStore.getOptionPrice(matteOption)).toBe(
      matteOption.basePrice + 30
    );
  });

  it('should get the base price of an option', () => {
    const option: Option = {
      id: 'test_option',
      value: 'Test Option',
      basePrice: 100,
      stock: 10,
      prices: [],
      dependencies: [],
    };

    expect(partsStore.getOptionBasePrice(option)).toBe(100);
  });

  it('should get the part name by ID', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    expect(partsStore.getPartName('frame')).toBe('Frame');
    expect(partsStore.getPartName('unknown_part')).toBe('');
  });

  it('should get the characteristic name by part and characteristic ID', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    expect(partsStore.getCharacteristicName('frame', 'frame_type')).toBe(
      'Frame Type'
    );
    expect(
      partsStore.getCharacteristicName('frame', 'unknown_characteristic')
    ).toBe('');
  });

  it('should get the unselectable reason for an option with Excludes dependency', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const rimColorRedOption = mockPartsData[1].characteristics[1].options.find(
      o => o.id === 'red'
    )!;
    partsStore.selectOption('wheel', 'rim_color', rimColorRedOption);

    const fatBikeWheelsOption =
      mockPartsData[1].characteristics[0].options.find(
        o => o.id === 'fat_bike_wheels'
      )!;
    const reason = partsStore.getOptionUnselectableReason(fatBikeWheelsOption);

    expect(reason).toBe('views.home.titles.incompatible Red');
  });

  it('should remove incompatible selections', async () => {
    mockedGetAllParts.mockResolvedValue(mockPartsData);
    await partsStore.getParts();

    const frameOption = mockPartsData[0].characteristics[0].options.find(
      o => o.id === 'full_suspension'
    )!;
    const matteOption = mockPartsData[0].characteristics[1].options.find(
      o => o.id === 'matte'
    )!;
    const hardtailOption = mockPartsData[0].characteristics[0].options.find(
      o => o.id === 'hardtail'
    )!;

    partsStore.selectOption('frame', 'frame_type', frameOption);
    partsStore.selectOption('frame', 'frame_finish', matteOption);

    expect(partsStore.isOptionSelected('frame', 'frame_finish', 'matte')).toBe(
      true
    );

    partsStore.selectOption('frame', 'frame_type', hardtailOption);

    expect(partsStore.isOptionSelected('frame', 'frame_type', 'hardtail')).toBe(
      true
    );
    expect(partsStore.isOptionSelected('frame', 'frame_finish', 'matte')).toBe(
      false
    );
  });
});
