const mongoose = require('mongoose');
require('dotenv').config();

const sweetSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String,
}, { timestamps: true });

const Sweet = mongoose.model('Sweet', sweetSchema);

const sampleSweets = [
  // Indian Sweets
  {
    name: 'Gulab Jamun',
    category: 'Indian Sweet',
    price: 120,
    quantity: 50,
    description: 'Soft, spongy milk-solid balls soaked in fragrant rose-cardamom sugar syrup',
    imageUrl: 'https://images.pexels.com/photos/6544378/pexels-photo-6544378.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Rasgulla',
    category: 'Indian Sweet',
    price: 100,
    quantity: 60,
    description: 'Light, spongy cottage cheese balls in sweet, chilled sugar syrup',
    imageUrl: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Jalebi',
    category: 'Indian Sweet',
    price: 80,
    quantity: 75,
    description: 'Crispy, spiral-shaped sweets dipped in sugar syrup, best enjoyed hot',
    imageUrl: 'https://images.pexels.com/photos/10664018/pexels-photo-10664018.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Kaju Katli',
    category: 'Indian Sweet',
    price: 450,
    quantity: 40,
    description: 'Premium cashew fudge with silver leaf, rich and melt-in-mouth',
    imageUrl: 'https://images.pexels.com/photos/7622121/pexels-photo-7622121.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Ladoo',
    category: 'Indian Sweet',
    price: 60,
    quantity: 80,
    description: 'Traditional round sweet balls made with gram flour, ghee, and sugar',
    imageUrl: 'https://images.pexels.com/photos/7622090/pexels-photo-7622090.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Rasmalai',
    category: 'Indian Sweet',
    price: 150,
    quantity: 45,
    description: 'Soft paneer discs soaked in sweet, thickened milk with cardamom and saffron',
    imageUrl: 'https://images.pexels.com/photos/8753649/pexels-photo-8753649.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Barfi (Milk Fudge)',
    category: 'Indian Sweet',
    price: 180,
    quantity: 55,
    description: 'Creamy milk fudge with pistachios and almonds, cut into diamond shapes',
    imageUrl: 'https://images.pexels.com/photos/7622103/pexels-photo-7622103.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Mysore Pak',
    category: 'Indian Sweet',
    price: 250,
    quantity: 35,
    description: 'Rich, crumbly sweet from Karnataka made with gram flour, sugar, and pure ghee',
    imageUrl: 'https://images.pexels.com/photos/6544358/pexels-photo-6544358.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Sandesh',
    category: 'Indian Sweet',
    price: 140,
    quantity: 50,
    description: 'Bengali sweet made from fresh paneer and sugar, delicately flavored',
    imageUrl: 'https://images.pexels.com/photos/7622086/pexels-photo-7622086.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Peda',
    category: 'Indian Sweet',
    price: 90,
    quantity: 70,
    description: 'Soft, semi-solid sweet made from khoya and flavored with cardamom',
    imageUrl: 'https://images.pexels.com/photos/7622084/pexels-photo-7622084.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  // Western Sweets
  {
    name: 'Chocolate Truffle',
    category: 'Chocolate',
    price: 330,
    quantity: 50,
    description: 'Rich, decadent chocolate truffles with a smooth ganache center',
    imageUrl: 'https://images.pexels.com/photos/827513/pexels-photo-827513.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Rainbow Gummy Bears',
    category: 'Gummy',
    price: 200,
    quantity: 100,
    description: 'Colorful, fruity gummy bears in assorted flavors',
    imageUrl: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Strawberry Lollipop',
    category: 'Lollipop',
    price: 160,
    quantity: 75,
    description: 'Classic strawberry-flavored lollipop on a stick',
    imageUrl: 'https://images.pexels.com/photos/6544414/pexels-photo-6544414.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Caramel Toffee',
    category: 'Caramel',
    price: 370,
    quantity: 40,
    description: 'Buttery caramel toffee with a hint of sea salt',
    imageUrl: 'https://images.pexels.com/photos/3776942/pexels-photo-3776942.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Sour Worms',
    category: 'Gummy',
    price: 250,
    quantity: 80,
    description: 'Tangy and sweet sour gummy worms in neon colors',
    imageUrl: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Mint Chocolate Bar',
    category: 'Chocolate',
    price: 290,
    quantity: 60,
    description: 'Cool mint cream enrobed in dark chocolate',
    imageUrl: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Cotton Candy',
    category: 'Cotton Candy',
    price: 410,
    quantity: 30,
    description: 'Fluffy, melt-in-your-mouth spun sugar in pink and blue',
    imageUrl: 'https://images.pexels.com/photos/6544409/pexels-photo-6544409.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Jelly Beans Mix',
    category: 'Jelly Beans',
    price: 230,
    quantity: 90,
    description: 'Assorted jelly beans with 20 different fruity flavors',
    imageUrl: 'https://images.pexels.com/photos/54630/jelly-beans-candy-sweets-confectionery-54630.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Peanut Butter Cups',
    category: 'Chocolate',
    price: 310,
    quantity: 55,
    description: 'Creamy peanut butter wrapped in milk chocolate',
    imageUrl: 'https://images.pexels.com/photos/4686960/pexels-photo-4686960.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Licorice Twists',
    category: 'Licorice',
    price: 190,
    quantity: 65,
    description: 'Classic black licorice twists with an authentic flavor',
    imageUrl: 'https://images.pexels.com/photos/4033636/pexels-photo-4033636.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Marshmallow Hearts',
    category: 'Marshmallow',
    price: 270,
    quantity: 45,
    description: 'Soft, pillowy marshmallows shaped like hearts',
    imageUrl: 'https://images.pexels.com/photos/3776970/pexels-photo-3776970.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Chocolate Fudge',
    category: 'Chocolate',
    price: 450,
    quantity: 35,
    description: 'Homemade-style chocolate fudge, rich and creamy',
    imageUrl: 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Rainbow Lollipop',
    category: 'Lollipop',
    price: 200,
    quantity: 70,
    description: 'Swirled rainbow lollipop that changes flavors as you lick',
    imageUrl: 'https://images.pexels.com/photos/618923/pexels-photo-618923.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Peach Rings',
    category: 'Gummy',
    price: 240,
    quantity: 85,
    description: 'Sweet and tangy peach-flavored gummy rings',
    imageUrl: 'https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Honeycomb Candy',
    category: 'Hard Candy',
    price: 350,
    quantity: 40,
    description: 'Crunchy honeycomb toffee dipped in chocolate',
    imageUrl: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing sweets (optional - comment out if you want to keep existing data)
    await Sweet.deleteMany({});
    console.log('Cleared existing sweets');

    // Insert sample data
    const result = await Sweet.insertMany(sampleSweets);
    console.log(`✅ Successfully added ${result.length} sweets to the database!`);
    
    console.log('\nSample sweets added:');
    result.forEach((sweet, index) => {
      console.log(`${index + 1}. ${sweet.name} - ₹${sweet.price} (${sweet.quantity} in stock)`);
    });

    await mongoose.disconnect();
    console.log('\nDatabase seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
