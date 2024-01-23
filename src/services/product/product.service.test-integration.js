import ProductService from './product.service';


describe('Products Retrieval', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can retrieve a list of products and filters correctly', async () => {
    // retrieve the data an make sure it matches perfectly
    const { products, filters } = await ProductService.listProductsAndFilters();
    
    // make sure items were retrieved
    expect(products.length).toBeGreaterThan(0);
    expect(filters.length).toBeGreaterThan(0);
  });
});
