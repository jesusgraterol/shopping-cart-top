import ProductService from './product.service';
import { MOCK_PRODUCTS } from './test-data';


describe('Products Retrieval', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can retrieve a list of products and filters correctly', async () => {
    // create the product listing mock
    const listProductsFN = jest.spyOn(ProductService, '_listProducts').mockImplementation(
      () => Promise.resolve(MOCK_PRODUCTS)
    );

    // retrieve the data an make sure it matches perfectly
    const { products, filters } = await ProductService.listProductsAndFilters();
    expect(products).toEqual(MOCK_PRODUCTS);
    expect(filters).toEqual([
      'All',
      'Men\'s Clothing',
      'Jewelery',
      'Women\'s Clothing',
      'Electronics',
    ]);

    // clear the mock
    listProductsFN.mockRestore();
  });
});
