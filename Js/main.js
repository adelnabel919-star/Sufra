const body = document.body;
const languageToggle = document.getElementById("language-toggle");
const searchToggle = document.getElementById("search-toggle");
const searchPanel = document.getElementById("search-panel");
const searchInput = document.getElementById("site-search");
const searchClear = document.getElementById("search-clear");
const cartToggle = document.getElementById("cart-toggle");
const mobileCartToggle = document.getElementById("mobile-cart-toggle");
const mobileBottomCart = document.getElementById("mobile-bottom-cart");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuPanel = document.getElementById("mobile-menu-panel");
const mobileLanguageToggle = document.getElementById("mobile-language-toggle");
const mobileMoreToggle = document.getElementById("mobile-more-toggle");
const mobileNavItems = [...document.querySelectorAll(".mobile-nav-item[data-section]")];
const cartPanel = document.getElementById("cart-panel");
const cartClose = document.getElementById("cart-close");
const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const mobileCartCounts = [...document.querySelectorAll(".mobile-cart-count, .mobile-bottom-count")];
const cartSubtotal = document.getElementById("cart-subtotal");
const cartDelivery = document.getElementById("cart-delivery");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const orderSuccess = document.getElementById("order-success");
const signatureSection = document.querySelector(".signature-section");
const translatableElements = document.querySelectorAll("[data-ar][data-en]");
let cart = JSON.parse(localStorage.getItem("sufra-cart") || "[]");
let signatureFrame = null;
const menuGrid = document.getElementById("menu-grid");
const popularGrid = document.getElementById("popular-grid");
const categoryTabs = document.querySelectorAll(".category-tab");
const productModal = document.getElementById("product-modal");
const reviewsTrack = document.getElementById("reviews-track");
const reviewsViewport = document.querySelector(".reviews-viewport");
const reviewsNext = document.getElementById("reviews-next");
const reviewsPrev = document.getElementById("reviews-prev");
const reviewDots = document.getElementById("review-dots");
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");
const newsletterForm = document.getElementById("newsletter-form");
const newsletterStatus = document.getElementById("newsletter-status");
const footerLanguageToggle = document.getElementById("footer-language-toggle");
const reviewCards = reviewsTrack ? [...reviewsTrack.querySelectorAll(".review-card")] : [];
let reviewIndex = 0;
const menuImages = {
    grills: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    meals: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    appetizers: "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=900&q=85",
    salads: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    desserts: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85"
};
const categoryNames = {
    grills: "مشويات",
    meals: "وجبات",
    appetizers: "مقبلات",
    salads: "سلطات",
    desserts: "حلويات",
    drinks: "مشروبات"
};
const allowedMenuNames = new Set(["شيش طاووق", "كباب لحم", "كفتة مشوية", "ريش ضاني", "طرب مشوي", "نصف فرخة مشوية", "ميكس جريل", "ستيك لحم", "برجر سُفرة", "برجر دبل", "فتة شاورما لحم", "فتة شاورما فراخ", "فراخ بانيه", "Chicken Mushroom", "مكرونة Alfredo Chicken", "مكرونة بولونيز", "كبسة فراخ", "حمص سُفرة", "متبل باذنجان", "بابا غنوج", "ورق عنب", "سمبوسك لحم", "سمبوسك جبنة", "بطاطس مقلية", "كبة مقلية", "سلطة سُفرة", "سلطة فتوش", "تبولة", "سلطة سيزر", "سلطة جرجير", "سلطة زبادي", "سلطة كول سلو", "سلطة يونانية", "أم علي", "كنافة سُفرة", "كنافة نوتيلا", "أرز باللبن", "مهلبية", "تشيز كيك", "براونيز", "مولتن كيك", "عصير مانجو", "عصير فراولة", "ليمون نعناع", "موهيتو سُفرة", "آيس تي خوخ", "كولا", "مياه معدنية", "قهوة تركي"]);
const foodImageKeywords = {
    "شيش طاووق": "chicken-shish-tawook-skewers-grilled",
    "كباب لحم": "beef-kebab-skewers-grilled",
    "كفتة مشوية": "kofta-kebab-grilled",
    "ريش ضاني": "grilled-lamb-chops",
    "طرب مشوي": "grilled-arabic-tarb-meat",
    "نصف فرخة مشوية": "half-grilled-chicken",
    "ميكس جريل": "mixed-grill-kebab-kofta-chicken",
    "ستيك لحم": "grilled-beef-steak",
    "برجر سُفرة": "beef-cheeseburger",
    "برجر دبل": "double-beef-burger",
    "فتة شاورما لحم": "beef-shawarma-fatteh-rice",
    "فتة شاورما فراخ": "chicken-shawarma-fatteh-rice",
    "فراخ بانيه": "crispy-chicken-pane",
    "Chicken Mushroom": "chicken-mushroom-cream-sauce",
    "مكرونة Alfredo Chicken": "chicken-alfredo-pasta",
    "مكرونة بولونيز": "spaghetti-bolognese-ground-beef",
    "كبسة فراخ": "chicken-kabsa-rice",
    "حمص سُفرة": "hummus-olive-oil",
    "متبل باذنجان": "baba-ganoush-tahini",
    "بابا غنوج": "baba-ganoush-vegetables",
    "ورق عنب": "stuffed-grape-leaves-rice",
    "سمبوسك لحم": "beef-sambousek",
    "سمبوسك جبنة": "cheese-sambousek",
    "بطاطس مقلية": "golden-french-fries",
    "كبة مقلية": "fried-kibbeh-meat",
    "سلطة سُفرة": "green-salad-cucumber-tomato",
    "سلطة فتوش": "fattoush-salad-toasted-bread",
    "تبولة": "tabbouleh-parsley-tomato-bulgur",
    "سلطة سيزر": "chicken-caesar-salad-parmesan",
    "سلطة جرجير": "arugula-pomegranate-salad",
    "سلطة زبادي": "cucumber-yogurt-mint",
    "سلطة كول سلو": "creamy-coleslaw-cabbage-carrot",
    "سلطة يونانية": "greek-salad-feta-olives",
    "أم علي": "om-ali-egyptian-dessert",
    "كنافة سُفرة": "kunafa-cream-pistachio",
    "كنافة نوتيلا": "nutella-kunafa",
    "أرز باللبن": "rice-pudding-nuts",
    "مهلبية": "muhallabia-pudding-nuts",
    "تشيز كيك": "strawberry-cheesecake",
    "براونيز": "chocolate-brownies",
    "مولتن كيك": "chocolate-molten-cake",
    "عصير مانجو": "thick-mango-juice",
    "عصير فراولة": "fresh-strawberry-juice",
    "ليمون نعناع": "lemon-mint-drink",
    "موهيتو سُفرة": "lemon-mint-mojito-ice",
    "آيس تي خوخ": "peach-iced-tea",
    "كولا": "cola-ice-glass",
    "مياه معدنية": "mineral-water-bottle",
    "قهوة تركي": "turkish-coffee-cup-foam"
};
const menuGroups = {
    grills: [
        ["شيش طاووق", "قطع فراخ متبلة ومشوية على الفحم", 195, 4.8],
        ["كباب لحم", "قطع لحم متبلة ومشوية على الفحم", 280, 4.9],
        ["كفتة مشوية", "كفتة لحم مشوية بتتبيلة سُفرة", 220, 4.7],
        ["ريش ضاني", "ريش ضاني طرية ومتبلة بالأعشاب", 320, 4.9],
        ["طرب مشوي", "لحم مفروم متبل ملفوف ومشوي", 250, 4.8],
        ["كباب حلة مشوي", "قطع لحم طرية بتتبيلة خاصة", 270, 4.7],
        ["نصف فرخة مشوية", "نصف فرخة متبلة ومشوية على الفحم", 185, 4.8],
        ["فراخ مشوية كاملة", "دجاج كامل بتتبيلة سُفرة", 340, 4.9],
        ["كباب وكفتة ميكس", "تشكيلة كباب وكفتة مشوية", 310, 4.9],
        ["ميكس جريل", "تشكيلة مشويات متنوعة", 390, 5.0],
        ["جوانح مشوية", "أجنحة دجاج متبلة ومشوية", 155, 4.6],
        ["ستيك لحم مشوي", "قطعة لحم مشوية بطريقة احترافية", 350, 4.9]
    ],
    meals: [
        ["برجر سُفرة", "برجر لحم طازج مع جبنة شيدر وصوص سُفرة", 160, 4.8],
        ["برجر دبل", "قطعتان لحم مع شيدر وصوص خاص", 210, 4.9],
        ["وجبة شيش طاووق", "شيش طاووق مع أرز وبطاطس وسلطة", 245, 4.8],
        ["وجبة كفتة", "كفتة مع أرز وبطاطس وسلطة", 260, 4.8],
        ["وجبة كباب", "كباب لحم مع أرز وسلطة", 320, 4.9],
        ["فراخ بانيه", "شرائح فراخ مقرمشة مع بطاطس", 190, 4.7],
        ["Chicken Crispy", "فراخ مقرمشة مع صوص سُفرة", 195, 4.8],
        ["Chicken Mushroom", "فراخ مع مشروم وصوص كريمي", 230, 4.9],
        ["مكرونة Alfredo Chicken", "مكرونة بصوص ألفريدو وقطع فراخ", 220, 4.8],
        ["مكرونة بولونيز", "مكرونة بصوص الطماطم واللحم المفروم", 210, 4.7],
        ["فتة شاورما لحم", "أرز وخبز ولحم شاورما وصوصات", 230, 4.8],
        ["فتة شاورما فراخ", "أرز وخبز وفراخ شاورما وصوص خاص", 200, 4.8],
        ["كبسة فراخ", "أرز متبل مع دجاج وتتبيلة عربية", 220, 4.7],
        ["أرز بالكبدة", "أرز مصري مع كبدة وتوابل خاصة", 175, 4.6]
    ],
    appetizers: [
        ["حمص سُفرة", "حمص كريمي بزيت الزيتون", 75, 4.8],
        ["متبل باذنجان", "باذنجان مشوي مع طحينة", 80, 4.7],
        ["بابا غنوج", "باذنجان مشوي مع خضروات وتتبيلة", 80, 4.8],
        ["ورق عنب", "ورق عنب محشو بالأرز والتوابل", 95, 4.9],
        ["سمبوسك لحم", "عجينة مقرمشة بحشوة اللحم", 90, 4.7],
        ["سمبوسك جبنة", "سمبوسك مقرمش بحشوة الجبن", 85, 4.8],
        ["بطاطس مقلية", "بطاطس ذهبية مقرمشة", 60, 4.6],
        ["بطاطس بالجبنة", "بطاطس مع جبنة وصوص خاص", 90, 4.8],
        ["كبة مقلية", "كبة مقرمشة بحشوة اللحم", 110, 4.8],
        ["طبق مقبلات سُفرة", "تشكيلة حمص ومتبل وسمبوسك", 180, 4.9]
    ],
    salads: [
        ["سلطة سُفرة", "خس وطماطم وخيار وصوص خاص", 85, 4.8],
        ["سلطة فتوش", "خضروات طازجة مع خبز محمص", 90, 4.8],
        ["تبولة", "بقدونس وطماطم وبرغل وليمون", 85, 4.7],
        ["سلطة سيزر", "خس ودجاج وصوص سيزر", 140, 4.9],
        ["سلطة جرجير", "جرجير ورمان وصوص دبس الرمان", 95, 4.8],
        ["سلطة زبادي", "زبادي وخيار ونعناع", 70, 4.7],
        ["سلطة كول سلو", "كرنب وجزر وصوص كريمي", 70, 4.6],
        ["سلطة يونانية", "خضروات وجبنة فيتا وزيت زيتون", 120, 4.8]
    ],
    desserts: [
        ["أم علي", "طبقات من الرقاق والحليب والمكسرات", 95, 4.9],
        ["كنافة سُفرة", "كنافة ذهبية بالقشطة والمكسرات", 110, 4.9],
        ["كنافة نوتيلا", "كنافة مع شوكولاتة نوتيلا", 125, 4.8],
        ["أرز باللبن", "أرز باللبن مع مكسرات", 70, 4.7],
        ["مهلبية", "مهلبية ناعمة بالفانيليا والمكسرات", 65, 4.7],
        ["تشيز كيك", "تشيز كيك كريمي بصوص الفراولة", 120, 4.8],
        ["براونيز", "براونيز شوكولاتة غنية", 110, 4.9],
        ["مولتن كيك", "كيك شوكولاتة بقلب شوكولاتة سائل", 135, 5.0]
    ],
    drinks: [
        ["عصير مانجو", "مانجو طبيعية طازجة", 75, 4.8],
        ["عصير فراولة", "فراولة طازجة مع لمسة سكر", 70, 4.7],
        ["ليمون نعناع", "ليمون طازج مع النعناع", 65, 4.9],
        ["موهيتو سُفرة", "مشروب منعش بالليمون والنعناع", 90, 4.9],
        ["آيس تي خوخ", "شاي مثلج بنكهة الخوخ", 80, 4.7],
        ["كولا", "مشروب غازي بارد", 50, 4.6],
        ["مياه معدنية", "مياه معدنية", 30, 4.6],
        ["قهوة تركي", "قهوة تركية أصيلة", 65, 4.8]
    ]
};
const menuItems = Object.entries(menuGroups).flatMap(([category, items]) => items.filter(([name]) => allowedMenuNames.has(name)).map(([name, description, price, rating], index) => ({
    id: `${category}-${index}`,
    category,
    name,
    description,
    price,
    rating,
    image: `image/menu-${foodImageKeywords[name]}.jpg`,
    badge: index === 0 ? "الأكثر طلبًا" : index === 1 ? "مميز" : ""
})));
const popularItems = [
    ["popular-kebab", "كباب وكفتة", "مشويات مشكلة على الفحم", 250, 4.9, "image/popular-kebab.jpg"],
    ["popular-fatta", "فتة لحمة", "أرز، خبز محمص، صوص الزبادي والطحينة", 185, 4.9, "image/popular-fatta.jpg"],
    ["popular-chicken", "فراخ مشوية", "نصف فرخة مشوية على الفحم", 170, 4.8, "image/popular-chicken.jpg"],
    ["popular-shish", "شيش طاووق", "قطع فراخ متبلة ومشوية على الفحم", 195, 4.8, "image/popular-shish.jpg"],
    ["popular-grill", "ميكس جريل", "تشكيلة فاخرة من أجمل المشويات", 390, 5.0, "image/popular-grill.jpg"],
    ["popular-kunafa", "كنافة سُفرة", "كنافة ذهبية بالقشطة والمكسرات", 110, 4.9, "image/popular-kunafa.jpg"]
].map(([id, name, description, price, rating, image]) => ({
    id,
    category: "grills",
    name,
    description,
    price,
    rating,
    image,
    badge: "الأكثر طلبًا"
}));

function renderMenu(category = "all") {
    const items = category === "all" ? menuItems : menuItems.filter((item) => item.category === category);
    menuGrid.classList.add("is-filtering");
    window.setTimeout(() => {
        menuGrid.innerHTML = items.map((item) => `<article class="menu-card" data-id="${item.id}"><div class="menu-card__image"><img src="${item.image}" alt="${item.name}" loading="lazy">${item.badge ? `<span class="menu-card__badge">${item.badge}</span>` : ""}<button class="menu-card__favorite" type="button" aria-label="إضافة للمفضلة"><i class="far fa-heart"></i></button><button class="menu-card__details" type="button" aria-label="عرض التفاصيل"><i class="fas fa-plus"></i></button></div><div class="menu-card__body"><span class="menu-card__category">${categoryNames[item.category]}</span><h3>${item.name}</h3><p>${item.description}</p><div class="menu-card__footer"><span class="menu-card__rating"><i class="fas fa-star"></i> ${item.rating}</span><strong>${item.price} <small>ج.م</small></strong><button class="add-to-cart" type="button" data-id="${item.id}" aria-label="أضف للسلة"><i class="fas fa-shopping-basket"></i><span data-ar="أضف للسلة" data-en="Add to cart">أضف للسلة</span></button></div></div></article>`).join("");
        menuGrid.classList.remove("is-filtering");
    }, 160);
}

function renderPopularDishes() {
    popularGrid.innerHTML = popularItems.map((item, index) => `<article class="popular-card" data-id="${item.id}" style="--card-delay: ${index * 80}ms"><div class="popular-card__image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="popular-card__badge">الأكثر طلبًا</span><button class="popular-card__favorite" type="button" aria-label="إضافة للمفضلة"><i class="far fa-heart"></i></button></div><div class="popular-card__body"><h3>${item.name}</h3><p>${item.description}</p><div class="popular-card__footer"><span><i class="fas fa-star"></i> ${item.rating}</span><strong>${item.price} <small>ج.م</small></strong><button class="popular-add" type="button" aria-label="أضف للسلة"><span>+</span> <i class="fas fa-shopping-basket"></i></button></div></div></article>`).join("");
}

function observePopularSection() {
    const popularSection = document.querySelector(".popular-section");
    if (!popularSection) return;
    const popularObserver = new IntersectionObserver(([entry]) => {
        popularSection.classList.toggle("is-visible", entry.isIntersecting);
    }, {
        threshold: 0.18
    });
    popularObserver.observe(popularSection);
}

function updateSignatureProgress() {
    signatureFrame = null;
    if (!signatureSection) return;
    const bounds = signatureSection.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height), 0), 1);
    signatureSection.style.setProperty("--signature-progress", progress.toFixed(3));
}

function requestSignatureUpdate() {
    if (signatureFrame === null) signatureFrame = requestAnimationFrame(updateSignatureProgress);
}

function setLanguage(language) {
    const isEnglish = language === "en";
    document.documentElement.lang = language;
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
    document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
        element.textContent = element.dataset[isEnglish ? "en" : "ar"];
    });
    languageToggle.textContent = isEnglish ? "AR" : "EN";
    languageToggle.setAttribute("aria-label", isEnglish ? "التبديل إلى العربية" : "Switch to English");
    languageToggle.title = languageToggle.getAttribute("aria-label");
    searchInput.placeholder = isEnglish ? "Search the website..." : "ابحث في الموقع...";
    document.querySelectorAll("[data-placeholder-ar][data-placeholder-en]").forEach((element) => {
        element.placeholder = element.dataset[isEnglish ? "placeholderEn" : "placeholderAr"];
    });
    if (footerLanguageToggle) footerLanguageToggle.textContent = isEnglish ? "English | العربية" : "العربية | English";
    if (mobileLanguageToggle) mobileLanguageToggle.textContent = isEnglish ? "English / العربية" : "العربية / English";
    updateReviews();
    renderCart();
    localStorage.setItem("sufra-language", language);
}

function updateReviews() {
    if (!reviewsTrack || !reviewCards.length) return;
    const visibleCount = getReviewVisibleCount();
    const maxIndex = Math.max(0, reviewCards.length - visibleCount);
    reviewIndex = Math.min(reviewIndex, maxIndex);
    const cardWidth = reviewCards[0].getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(reviewsTrack).gap) || 0;
    const offset = reviewIndex * (cardWidth + gap);
    reviewsTrack.style.transform = `translateX(-${offset}px)`;
    reviewsNext.disabled = reviewIndex >= maxIndex;
    reviewsPrev.disabled = reviewIndex <= 0;
    reviewDots.innerHTML = Array.from({
        length: maxIndex + 1
    }, (_, index) => `<button class="review-dot${index === reviewIndex ? " is-active" : ""}" type="button" aria-label="Review ${index + 1}"></button>`).join("");
}

function moveReviews(direction) {
    const maxIndex = Math.max(0, reviewCards.length - getReviewVisibleCount());
    reviewIndex = Math.min(Math.max(reviewIndex + direction, 0), maxIndex);
    updateReviews();
}

function animateCounters() {
    document.querySelectorAll(".counter").forEach((counter) => {
        const target = Number(counter.dataset.target);
        const decimals = Number(counter.dataset.decimals || 0);
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            counter.textContent = (target * easedProgress).toFixed(decimals);
            if (progress < 1) requestAnimationFrame(updateCounter);
        }

        requestAnimationFrame(updateCounter);
    });
}

function renderCart() {
    const isEnglish = document.documentElement.lang === "en";
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price + Number(item.options?.extraTotal || 0)) * item.quantity, 0);
    const delivery = cart.length ? 30 : 0;
    const totalPrice = subtotal + delivery;
    cartCount.textContent = totalItems;
    mobileCartCounts.forEach((counter) => {
        counter.textContent = totalItems;
    });
    cartSubtotal.textContent = subtotal;
    cartDelivery.textContent = delivery;
    cartTotal.textContent = totalPrice;
    checkoutButton.disabled = cart.length === 0;
    if (!cart.length) {
        cartItems.innerHTML = `<div class="empty-cart"><span class="empty-cart__icon"><i class="fas fa-basket-shopping"></i></span><strong>${isEnglish ? "Your cart is empty" : "السلة لسه فاضية"}</strong><p>${isEnglish ? "Choose your favorite dish and start your order." : "اختار طبقك المفضل وابدأ طلبك."}</p><a href="#menu" class="empty-cart__link">${isEnglish ? "Browse menu" : "تصفح المنيو"}</a></div>`;
        return;
    }
    cartItems.innerHTML = cart.map((item) => {
        const itemTotal = item.price + Number(item.options?.extraTotal || 0);
        const size = item.options?.size || (isEnglish ? "Single" : "مفرد");
        const extras = item.options?.extras?.length ? item.options.extras.join("، ") : (isEnglish ? "No additions" : "بدون إضافات");
        return `<div class="cart-item"><img src="${item.image || "image/logo.png"}" alt="${isEnglish ? item.nameEn : item.nameAr}"><div class="cart-item__details"><strong>${isEnglish ? item.nameEn : item.nameAr}</strong><small>${size} · ${extras}</small><b>${itemTotal} ${isEnglish ? "EGP" : "ج.م"}</b></div><div class="item-actions"><button type="button" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button><span>${item.quantity}</span><button type="button" data-action="increase" data-id="${item.id}" aria-label="Increase quantity"><i class="fas fa-plus"></i></button><button class="remove-item" type="button" data-action="remove" data-id="${item.id}" aria-label="Remove item"><i class="fas fa-trash"></i></button></div></div>`;
    }).join("");
}

function saveCart() {
    localStorage.setItem("sufra-cart", JSON.stringify(cart));
    renderCart();
}

function setCartOpen(isOpen) {
    cartPanel.classList.toggle("is-open", isOpen);
    cartPanel.setAttribute("aria-hidden", String(!isOpen));
    cartOverlay.hidden = !isOpen;
    document.body.classList.toggle("cart-open", isOpen);
}

let selectedProduct = null;
let modalQuantity = 1;

function addProductToCart(item, quantity = 1, options = {}) {
    const previousTotal = cart.reduce((sum, entry) => sum + entry.quantity, 0);
    const existing = cart.find((entry) => entry.id === item.id);
    if (existing) existing.quantity += quantity;
    else cart.push({
        id: item.id,
        nameAr: item.name,
        nameEn: item.name,
        price: item.price,
        image: item.image,
        quantity,
        options
    });
    saveCart();
    animateCartCount(previousTotal, previousTotal + quantity);
}

function animateCartCount(previousTotal, nextTotal) {
    if (!cartCount) return;
    const start = Number(previousTotal);
    const end = Number(nextTotal);
    const startTime = performance.now();
    const duration = 360;
    cartCount.classList.remove("is-changing");
    requestAnimationFrame(() => cartCount.classList.add("is-changing"));
    mobileCartCounts.forEach((counter) => {
        counter.classList.remove("is-changing");
        requestAnimationFrame(() => counter.classList.add("is-changing"));
    });

    function updateCount(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        cartCount.textContent = Math.round(start + (end - start) * easedProgress);
        mobileCartCounts.forEach((counter) => {
            counter.textContent = Math.round(start + (end - start) * easedProgress);
        });
        if (progress < 1) requestAnimationFrame(updateCount);
        else window.setTimeout(() => {
            cartCount.classList.remove("is-changing");
            mobileCartCounts.forEach((counter) => counter.classList.remove("is-changing"));
        }, 260);
    }

    requestAnimationFrame(updateCount);
}

function flyToCart(sourceImage) {
    const targetCart = window.matchMedia("(max-width: 767px)").matches ? (mobileBottomCart || mobileCartToggle) : cartToggle;
    if (!sourceImage || !targetCart || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        targetCart?.classList.add("is-bumped");
        window.setTimeout(() => targetCart?.classList.remove("is-bumped"), 520);
        return;
    }
    const sourceRect = sourceImage.getBoundingClientRect();
    const cartRect = targetCart.getBoundingClientRect();
    const flyer = sourceImage.cloneNode(true);
    const startX = sourceRect.left + sourceRect.width / 2 - 28;
    const startY = sourceRect.top + sourceRect.height / 2 - 28;
    const endX = cartRect.left + cartRect.width / 2 - 28;
    const endY = cartRect.top + cartRect.height / 2 - 28;
    const curveX = (endX - startX) * 0.5;
    const curveY = Math.min(startY, endY) - 120;
    flyer.className = "cart-fly-image";
    flyer.style.left = `${startX}px`;
    flyer.style.top = `${startY}px`;
    document.body.appendChild(flyer);
    const animation = flyer.animate([{
        transform: "translate(0, 0) scale(1)",
        opacity: 1
    }, {
        transform: `translate(${curveX}px, ${curveY - startY}px) scale(.68)`,
        opacity: .7,
        offset: .55
    }, {
        transform: `translate(${endX - startX}px, ${endY - startY}px) scale(.35)`,
        opacity: .2
    }], {
        duration: 720,
        easing: "cubic-bezier(.22,.61,.36,1)",
        fill: "forwards"
    });
    animation.finished.then(() => {
        flyer.remove();
        targetCart.classList.add("is-bumped");
        window.setTimeout(() => targetCart.classList.remove("is-bumped"), 520);
    }).catch(() => flyer.remove());
}

function showAddToast(item) {
    const isEnglish = document.documentElement.lang === "en";
    const toast = document.querySelector(".cart-toast") || document.createElement("div");
    toast.className = "cart-toast";
    toast.textContent = `${isEnglish ? "Added" : "تمت إضافة"} ${item.name} ${isEnglish ? "to your cart" : "إلى السلة ✓"}`;
    document.body.appendChild(toast);
    toast.classList.remove("is-visible");
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    window.clearTimeout(toast.hideTimer);
    toast.hideTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function showCartAdded(button, sourceImage, item) {
    if (!button) return;
    const originalContent = button.dataset.originalContent || button.innerHTML;
    button.dataset.originalContent = originalContent;
    const isEnglish = document.documentElement.lang === "en";
    button.innerHTML = `<i class="fas fa-check"></i><span>${isEnglish ? "Added" : "تمت الإضافة"}</span>`;
    button.classList.remove("is-added");
    requestAnimationFrame(() => button.classList.add("is-added"));
    flyToCart(sourceImage);
    showAddToast(item);
    window.setTimeout(() => {
        button.innerHTML = button.dataset.originalContent;
        button.classList.remove("is-added");
    }, 1200);
}

function updateModalTotal() {
    if (!selectedProduct) return;
    const sizeExtra = Number(document.querySelector("input[name='product-size']:checked")?.value || 0);
    const extras = [...document.querySelectorAll(".extra-options input:checked")].reduce((sum, input) => sum + Number(input.value), 0);
    document.getElementById("modal-total").textContent = (selectedProduct.price + sizeExtra + extras) * modalQuantity;
}

function openProductModal(item) {
    selectedProduct = item;
    modalQuantity = 1;
    document.getElementById("modal-product-image").src = item.image;
    document.getElementById("modal-product-image").alt = item.name;
    document.getElementById("modal-product-category").textContent = categoryNames[item.category];
    document.getElementById("modal-product-name").textContent = item.name;
    document.getElementById("modal-product-description").textContent = item.description;
    document.getElementById("modal-product-rating").innerHTML = `<i class="fas fa-star"></i> ${item.rating}`;
    document.getElementById("modal-quantity").textContent = modalQuantity;
    document.querySelectorAll(".extra-options input").forEach((input) => {
        input.checked = false;
    });
    document.querySelector("input[name='product-size']").checked = true;
    updateModalTotal();
    productModal.hidden = false;
    document.body.classList.add("modal-open");
}

function closeProductModal() {
    productModal.hidden = true;
    document.body.classList.remove("modal-open");
}

categoryTabs.forEach((tab) => tab.addEventListener("click", () => {
    categoryTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderMenu(tab.dataset.category);
}));

menuGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".menu-card");
    if (!card) return;
    const item = menuItems.find((entry) => entry.id === card.dataset.id);
    if (!item) return;
    if (event.target.closest(".add-to-cart")) {
        const button = event.target.closest(".add-to-cart");
        addProductToCart(item);
        showCartAdded(button, card.querySelector(".menu-card__image img"), item);
    } else if (event.target.closest(".menu-card__favorite")) event.target.closest("button").classList.toggle("is-liked");
    else openProductModal(item);
});

popularGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".popular-card");
    if (!card) return;
    const item = popularItems.find((entry) => entry.id === card.dataset.id);
    if (event.target.closest(".popular-add")) {
        const button = event.target.closest(".popular-add");
        addProductToCart(item);
        showCartAdded(button, card.querySelector(".popular-card__image img"), item);
    }
    if (event.target.closest(".popular-card__favorite")) event.target.closest("button").classList.toggle("is-liked");
});

productModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeProductModal();
    if (event.target.closest("[data-quantity]")) {
        modalQuantity = Math.max(1, modalQuantity + Number(event.target.closest("[data-quantity]").dataset.quantity));
        document.getElementById("modal-quantity").textContent = modalQuantity;
        updateModalTotal();
    }
    if (event.target.closest("#modal-add-button")) {
        const selectedSize = document.querySelector("input[name='product-size']:checked")?.nextElementSibling?.textContent.trim() || "Single";
        const selectedExtras = [...document.querySelectorAll(".extra-options input:checked")].map((input) => input.parentElement.textContent.replace(/\+\d+\s*ج\.م/, "").trim());
        const extraTotal = [...document.querySelectorAll(".extra-options input:checked")].reduce((sum, input) => sum + Number(input.value), 0) + Number(document.querySelector("input[name='product-size']:checked")?.value || 0);
        addProductToCart(selectedProduct, modalQuantity, {
            size: selectedSize,
            extras: selectedExtras,
            extraTotal
        });
        showCartAdded(event.target.closest("#modal-add-button"), document.getElementById("modal-product-image"), selectedProduct);
        closeProductModal();
    }
});
productModal.addEventListener("change", updateModalTotal);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !productModal.hidden) closeProductModal();
});

cartItems.addEventListener("click", (event) => {
    if (event.target.closest(".empty-cart__link")) {
        setCartOpen(false);
        return;
    }
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = cart.find((entry) => entry.id === button.dataset.id);
    if (!item) return;
    if (button.dataset.action === "increase") item.quantity += 1;
    if (button.dataset.action === "decrease") item.quantity -= 1;
    if (button.dataset.action === "remove" || item.quantity < 1) cart = cart.filter((entry) => entry.id !== button.dataset.id);
    saveCart();
});

cartToggle.addEventListener("click", () => setCartOpen(true));
mobileCartToggle?.addEventListener("click", () => setCartOpen(true));
mobileBottomCart?.addEventListener("click", () => setCartOpen(true));
cartClose.addEventListener("click", () => setCartOpen(false));
cartOverlay.addEventListener("click", () => setCartOpen(false));
checkoutButton.addEventListener("click", () => {
    cart = [];
    saveCart();
    setCartOpen(false);
    orderSuccess.hidden = false;
    orderSuccess.classList.remove("show");
    requestAnimationFrame(() => orderSuccess.classList.add("show"));
    window.setTimeout(() => {
        orderSuccess.classList.remove("show");
        window.setTimeout(() => {
            orderSuccess.hidden = true;
        }, 250);
    }, 3500);
});

languageToggle.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
});

footerLanguageToggle?.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
});

function toggleMobileMenu(forceOpen) {
    if (!mobileMenuPanel) return;
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : mobileMenuPanel.hidden;
    mobileMenuPanel.hidden = !shouldOpen;
    mobileMenuToggle?.setAttribute("aria-expanded", String(shouldOpen));
}

mobileMenuToggle?.addEventListener("click", () => toggleMobileMenu());
mobileMoreToggle?.addEventListener("click", () => toggleMobileMenu());
mobileLanguageToggle?.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
});
mobileMenuPanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleMobileMenu(false)));

mobileNavItems.forEach((item) => item.addEventListener("click", () => {
    mobileNavItems.forEach((navItem) => navItem.classList.toggle("is-active", navItem === item));
}));

reviewsNext?.addEventListener("click", () => moveReviews(1));
reviewsPrev?.addEventListener("click", () => moveReviews(-1));
reviewDots?.addEventListener("click", (event) => {
    const dot = event.target.closest(".review-dot");
    if (!dot) return;
    reviewIndex = [...reviewDots.children].indexOf(dot);
    updateReviews();
});
window.addEventListener("resize", updateReviews);

let reviewTouchStartX = 0;
reviewsViewport?.addEventListener("touchstart", (event) => {
    reviewTouchStartX = event.changedTouches[0].clientX;
}, {
    passive: true
});
reviewsViewport?.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - reviewTouchStartX;
    if (Math.abs(deltaX) < 42) return;
    moveReviews(deltaX < 0 ? 1 : -1);
}, {
    passive: true
});

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    contactSuccess.hidden = false;
    contactSuccess.classList.remove("show");
    requestAnimationFrame(() => contactSuccess.classList.add("show"));
});

newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterForm.reset();
    newsletterStatus.hidden = false;
});

searchToggle.addEventListener("click", () => {
    searchPanel.hidden = !searchPanel.hidden;
    if (!searchPanel.hidden) searchInput.focus();
});

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    document.querySelectorAll(".links li").forEach((item) => {
        item.hidden = query !== "" && !item.textContent.toLowerCase().includes(query);
    });
});

searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
    searchInput.focus();
});

if (signatureSection) {
    const signatureObserver = new IntersectionObserver(([entry]) => {
        signatureSection.classList.toggle("is-visible", entry.isIntersecting);
    }, {
        threshold: 0.12
    });
    signatureObserver.observe(signatureSection);
    window.addEventListener("scroll", requestSignatureUpdate, {
        passive: true
    });
    window.addEventListener("resize", requestSignatureUpdate, {
        passive: true
    });
    requestSignatureUpdate();
}

renderMenu();
renderPopularDishes();
observePopularSection();
setTheme(localStorage.getItem("sufra-theme") || "dark");
setLanguage(localStorage.getItem("sufra-language") || "ar");
renderCart();
document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
    const revealObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            element.classList.add("is-visible");
            revealObserver.disconnect();
        }
    }, {
        threshold: 0.12
    });
    revealObserver.observe(element);
});
const mobileSections = ["home", "menu", "popular-dishes", "testimonials", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
if (mobileSections.length && mobileNavItems.length) {
    const mobileSectionObserver = new IntersectionObserver((entries) => {
        const visibleSection = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleSection) return;
        const activeItem = mobileNavItems.find((item) => item.dataset.section === visibleSection.target.id);
        if (activeItem) mobileNavItems.forEach((item) => item.classList.toggle("is-active", item === activeItem));
    }, {
        rootMargin: "-30% 0px -55%",
        threshold: [0.05, 0.2, 0.5]
    });
    mobileSections.forEach((section) => mobileSectionObserver.observe(section));
}
updateReviews();
animateCounters();
