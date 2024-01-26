import ProductService from './product.service';
import { MOCK_PRODUCTS } from './test-data';


/**
 * Products Retrieval
 * Suite in charge of testing the retrieval of products and filters.
 */
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





/**
 * Misc Helpers
 * Suite in charge of testing the misc helpers in the service
 */
describe('Misc Helpers', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });


  test('can prettify a dollar amount', () => {
    expect(ProductService.prettifyAmount(7194556.3681)).toBe('$7,194,556.37');
  });

  test('can filter a list of given products based on any category', () => {
    // all products
    expect(ProductService.filterProducts(MOCK_PRODUCTS, 'All')).toEqual(MOCK_PRODUCTS);

    // by category
    expect(ProductService.filterProducts(MOCK_PRODUCTS, 'Men\'s Clothing')).toEqual([
      {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
      },
      {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 500
        }
      },
    ]);
    expect(ProductService.filterProducts(MOCK_PRODUCTS, 'Jewelery')).toEqual([
      {
        "id": 5,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 4.6,
            "count": 400
        }
      },
      {
          "id": 8,
          "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
          "price": 10.99,
          "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
          "category": "jewelery",
          "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
          "rating": {
              "rate": 1.9,
              "count": 100
          }
      },
    ]);
    expect(ProductService.filterProducts(MOCK_PRODUCTS, 'Women\'s Clothing')).toEqual([
      {
        "id": 20,
        "title": "DANVOUY Womens T Shirt Casual Cotton Short",
        "price": 12.99,
        "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
        "rating": {
            "rate": 3.6,
            "count": 145
        }
      },
      {
          "id": 15,
          "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
          "price": 56.99,
          "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
          "category": "women's clothing",
          "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
          "rating": {
              "rate": 2.6,
              "count": 235
          }
      },
    ]);
    expect(ProductService.filterProducts(MOCK_PRODUCTS, 'Electronics')).toEqual([
      {
          "id": 9,
          "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
          "price": 64,
          "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
          "category": "electronics",
          "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
          "rating": {
              "rate": 3.3,
              "count": 203
          }
      },
      {
          "id": 13,
          "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
          "price": 599,
          "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
          "category": "electronics",
          "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
          "rating": {
              "rate": 2.9,
              "count": 250
          }
      },
    ]);
  });
});