export type MenuCategory = { title: string; items: string[] };
export type MenuPackage = { id: string; name: string; price: number; badge?: string; categories: MenuCategory[] };

export const menusEn: MenuPackage[] = [
  { id: "menu-1", name: "Menu One", price: 283, categories: [
    { title: "Appetizers & Soup", items: ["Assorted bread", "Creamy mushroom soup with croutons and lemon wedges"] },
    { title: "Cold Mezze & Salads", items: ["Red pepper and cumin hummus", "Mutabbal with tahini", "Vine leaves in lemon and olive oil", "Fattoush with za’atar croutons", "Thai chicken salad with ginger, soy and sesame dressing"] },
    { title: "Hot Appetizers", items: ["Mixed mouajanat: cheese samosa and beef sambusa", "Breaded chicken fingers with BBQ dip"] },
    { title: "Main Courses", items: ["Saleeg", "Chicken kabsa", "Grilled chicken breast with mashed potato and gravy", "Kofta siniya", "Fish tikka masala with chargrilled vegetables", "Spaghetti bolognese", "Rice with vermicelli"] },
    { title: "Desserts", items: ["Fresh fruit basket", "Mini cheesecake assortment: raspberry, red velvet and Oreo", "Crème caramel", "Coconut basbousa"] },
    { title: "Beverages", items: ["Cocktail juice", "Watermelon juice", "Soft drinks", "Water", "Tea, coffee and milk — low-fat, full-fat, hot or cold"] },
  ]},
  { id: "menu-2", name: "Menu Two", price: 329, badge: "Most popular", categories: [
    { title: "Appetizers & Soup", items: ["Assorted bread", "Creamy chicken and corn soup with lemon wedges and croutons"] },
    { title: "Cold Mezze & Salads", items: ["Sun-dried tomato hummus", "Beetroot mutabbal", "Vine leaves in lemon and olive oil", "Tuna pasta salad with lemon mayo", "Rocca, mushroom and eggplant salad with balsamic dressing", "Fattoush with za’atar croutons"] },
    { title: "Hot Appetizers", items: ["Mixed mouajanat and assorted kibbeh", "Chicken wings Provençal"] },
    { title: "Main Courses", items: ["Chicken qursan with vegetables", "Smoked chicken mandi rice", "Lamb kofta with potato in tomato sauce", "Moroccan fish tagine with seasonal vegetables", "Chicken and mushroom fettuccine", "Mahashi with lamb", "White rice"] },
    { title: "Desserts", items: ["Seasonal fruit display", "Mini cheesecake assortment: raspberry, red velvet and Oreo", "Assorted cakes", "Chef’s selection of Arabic sweets", "Om Ali"] },
    { title: "Beverages", items: ["Mango juice", "Orange juice", "Soft drinks", "Water", "Tea, coffee and milk — low-fat, full-fat, hot or cold"] },
  ]},
  { id: "menu-3", name: "Menu Three", price: 390, badge: "Signature", categories: [
    { title: "Appetizers & Soup", items: ["Assorted bread", "Lamb harira soup with lemon wedges and croutons", "Walnut muhammara mini tartine"] },
    { title: "Cold Mezze & Salads", items: ["Avocado hummus", "Walnut muhammara", "Shrimp couscous with lemon and dill", "Quinoa tabbouleh with pomegranate", "Classic chicken Caesar", "Sliced eggplant gratin", "Beetroot salad with feta and cherry tomato"] },
    { title: "Hot Appetizers", items: ["Mixed mouajanat, kibbeh and mini vegetable pizza", "Musakhan roll with tangy pomegranate dip"] },
    { title: "Main Courses", items: ["Lamb marqooq with eggplant and vegetables", "White rice", "Vegetable maqluba with minced beef and chicken", "Baked salmon with dill and mustard sauce", "Classic beef lasagne al forno", "Mixed grill: chicken taouk and lamb kofta with grilled vegetables", "Chinese fried rice with vegetables"] },
    { title: "Desserts", items: ["Tropical fruit salad", "Mini cheesecake assortment: raspberry, red velvet and Oreo", "Assorted fruit tarts", "Assorted cakes", "Baklava selection", "Om Ali and assorted éclairs"] },
    { title: "Beverages", items: ["Orange juice", "Carrot juice", "Mineral water and soft drinks", "Water", "Tea, coffee and milk — low-fat, full-fat, hot or cold", "Saudi coffee"] },
  ]},
];

export const menusAr: MenuPackage[] = [
  { id: "menu-1", name: "القائمة الأولى", price: 283, categories: [
    { title: "المقبلات والشوربة", items: ["تشكيلة خبز", "شوربة الفطر الكريمية مع الخبز المحمّص وشرائح الليمون"] },
    { title: "المقبلات الباردة والسلطات", items: ["حمص بالفلفل الأحمر والكمون", "متبل بالطحينة", "ورق عنب بالليمون وزيت الزيتون", "فتوش بخبز الزعتر المحمّص", "سلطة الدجاج التايلاندية بصلصة الزنجبيل والصويا والسمسم"] },
    { title: "المقبلات الساخنة", items: ["تشكيلة معجنات: سمبوسة جبن وسمبوسة لحم", "أصابع دجاج مقرمشة مع صلصة الباربكيو"] },
    { title: "الأطباق الرئيسية", items: ["سليق", "كبسة دجاج", "صدر دجاج مشوي مع البطاطس المهروسة وصلصة الجريفي", "صينية كفتة", "سمك تيكا ماسالا مع خضروات مشوية", "سباغيتي بولونيز", "أرز بالشعيرية"] },
    { title: "الحلويات", items: ["سلة فواكه طازجة", "تشكيلة ميني تشيزكيك: توت العليق وريد فلفت وأوريو", "كريم كراميل", "بسبوسة بجوز الهند"] },
    { title: "المشروبات", items: ["عصير كوكتيل", "عصير بطيخ", "مشروبات غازية", "مياه", "شاي وقهوة وحليب — قليل أو كامل الدسم، ساخن أو بارد"] },
  ]},
  { id: "menu-2", name: "القائمة الثانية", price: 329, badge: "الأكثر طلباً", categories: [
    { title: "المقبلات والشوربة", items: ["تشكيلة خبز", "شوربة الدجاج والذرة الكريمية مع الليمون والخبز المحمّص"] },
    { title: "المقبلات الباردة والسلطات", items: ["حمص بالطماطم المجففة", "متبل بالشمندر", "ورق عنب بالليمون وزيت الزيتون", "سلطة مكرونة بالتونة وصلصة مايونيز الليمون", "سلطة الجرجير والفطر والباذنجان بصلصة البلسميك", "فتوش بخبز الزعتر المحمّص"] },
    { title: "المقبلات الساخنة", items: ["تشكيلة معجنات وكبة", "أجنحة دجاج بروفنسال"] },
    { title: "الأطباق الرئيسية", items: ["قرصان بالدجاج والخضروات", "أرز مندي مدخن بالدجاج", "كفتة ضأن مع البطاطس بصلصة الطماطم", "طاجن سمك مغربي مع الخضروات الموسمية", "فيتوتشيني بالدجاج والفطر", "محاشي باللحم", "أرز أبيض"] },
    { title: "الحلويات", items: ["عرض فواكه موسمية مقطعة", "تشكيلة ميني تشيزكيك: توت العليق وريد فلفت وأوريو", "تشكيلة كيك", "اختيار الشيف من الحلويات العربية", "أم علي"] },
    { title: "المشروبات", items: ["عصير مانجو", "عصير برتقال", "مشروبات غازية", "مياه", "شاي وقهوة وحليب — قليل أو كامل الدسم، ساخن أو بارد"] },
  ]},
  { id: "menu-3", name: "القائمة الثالثة", price: 390, badge: "التجربة المميزة", categories: [
    { title: "المقبلات والشوربة", items: ["تشكيلة خبز", "شوربة حريرة بالضأن مع الليمون والخبز المحمّص", "تارتين محمرة بالجوز"] },
    { title: "المقبلات الباردة والسلطات", items: ["حمص بالأفوكادو", "محمرة بالجوز", "كسكس بالروبيان والليمون والشبت", "تبولة الكينوا بالرمان", "سلطة سيزر بالدجاج", "غراتان شرائح الباذنجان", "سلطة الشمندر بجبنة الفيتا والطماطم الكرزية"] },
    { title: "المقبلات الساخنة", items: ["تشكيلة معجنات وكبة وميني بيتزا بالخضروات", "رول مسخن مع صلصة الرمان الحامضة"] },
    { title: "الأطباق الرئيسية", items: ["مرقوق بالضأن والباذنجان والخضروات", "أرز أبيض", "مقلوبة خضروات باللحم المفروم والدجاج", "سلمون مخبوز بصلصة الشبت والخردل", "لازانيا لحم كلاسيكية بالفرن", "مشاوي مشكلة: شيش طاووق وكفتة ضأن مع خضروات مشوية", "أرز صيني مقلي بالخضروات"] },
    { title: "الحلويات", items: ["سلطة فواكه استوائية", "تشكيلة ميني تشيزكيك: توت العليق وريد فلفت وأوريو", "تشكيلة تارت الفواكه", "تشكيلة كيك", "تشكيلة بقلاوة", "أم علي وتشكيلة إكلير"] },
    { title: "المشروبات", items: ["عصير برتقال", "عصير جزر", "مياه معدنية ومشروبات غازية", "مياه", "شاي وقهوة وحليب — قليل أو كامل الدسم، ساخن أو بارد", "قهوة سعودية"] },
  ]},
];
