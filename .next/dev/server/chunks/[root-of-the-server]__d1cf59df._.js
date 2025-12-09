module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectToDatabase",
    ()=>connectToDatabase,
    "getCollection",
    ()=>getCollection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) {
    console.warn("MONGODB_URI environment variable is not set");
}
let cachedClient = null;
let cachedDb = null;
async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb
        };
    }
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }
    const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](MONGODB_URI);
    await client.connect();
    const db = client.db("blog_hub");
    cachedClient = client;
    cachedDb = db;
    return {
        client,
        db
    };
}
async function getCollection(collectionName) {
    const { db } = await connectToDatabase();
    return db.collection(collectionName);
}
}),
"[project]/app/api/seed/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
;
;
const samplePosts = [
    {
        title: "10 Tips for Boosting Your Productivity",
        slug: "10-tips-boosting-productivity",
        content: "Productivity is the key to success in both personal and professional life. Here are ten proven strategies to help you get more done in less time. From time-blocking techniques to the power of saying no, these tips will transform how you work and live.",
        excerpt: "Discover proven strategies to maximize your daily output and achieve your goals faster.",
        authorName: "Howard",
        category: "Lifestyle",
        tags: [
            "productivity",
            "self-improvement",
            "tips"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop"
    },
    {
        title: "Why Travel is the Best Investment You Can Make",
        slug: "why-travel-best-investment",
        content: "Travel opens your mind, broadens your perspective, and creates memories that last a lifetime. Unlike material possessions, experiences through travel shape who you are and how you see the world.",
        excerpt: "Exploring the world is more than a luxury—it's an investment in your personal growth.",
        authorName: "Bella",
        category: "Travel",
        tags: [
            "travel",
            "investment",
            "lifestyle"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
    },
    {
        title: "The Top 10 Travel Destinations for 2025",
        slug: "top-10-travel-destinations-2025",
        content: "Planning your next adventure? Here are the most exciting destinations that should be on your bucket list this year. From hidden gems to popular hotspots, there's something for every type of traveler.",
        excerpt: "Discover the must-visit places that will make your travel experiences unforgettable.",
        authorName: "Andrew",
        category: "Travel",
        tags: [
            "travel",
            "destinations",
            "2025"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop"
    },
    {
        title: "The Future of Technology: Trends to Watch",
        slug: "future-technology-trends",
        content: "Technology is evolving at an unprecedented pace. From artificial intelligence to quantum computing, the innovations of today will shape the world of tomorrow. Here's what you need to know to stay ahead.",
        excerpt: "Stay informed about the latest tech innovations that are reshaping our world.",
        authorName: "Andrew",
        category: "Technology",
        tags: [
            "technology",
            "AI",
            "future"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
        title: "The Power of Positive Thinking",
        slug: "power-positive-thinking",
        content: "Your mindset shapes your reality. Learn how cultivating a positive outlook can improve your health, relationships, and overall quality of life. Science-backed strategies for a happier you.",
        excerpt: "Transform your life by changing your thoughts and embracing positivity.",
        authorName: "Theresa",
        category: "Health",
        tags: [
            "mindset",
            "wellness",
            "positivity"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
        title: "The Top 5 Travel Destinations for Adventure Seekers",
        slug: "top-5-adventure-destinations",
        content: "For those who crave adrenaline and unforgettable experiences, these destinations offer the ultimate adventure. From mountain climbing to deep-sea diving, push your limits and discover new horizons.",
        excerpt: "Fuel your wanderlust with these thrilling destinations perfect for adventurers.",
        authorName: "Natasya",
        category: "Travel",
        tags: [
            "adventure",
            "travel",
            "outdoor"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop"
    },
    {
        title: "Mastering the Art of Mindful Eating",
        slug: "mastering-mindful-eating",
        content: "In our fast-paced world, we often forget to truly enjoy our meals. Mindful eating is about being present with your food, savoring every bite, and developing a healthier relationship with eating.",
        excerpt: "Learn how being present during meals can transform your health and well-being.",
        authorName: "Sarah",
        category: "Health",
        tags: [
            "mindfulness",
            "health",
            "nutrition"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop"
    },
    {
        title: "Building a Successful Remote Business",
        slug: "building-remote-business",
        content: "The future of work is remote. Learn how entrepreneurs are building thriving businesses without traditional office spaces. From team management to productivity tools, everything you need to succeed.",
        excerpt: "Discover the secrets to running a successful business from anywhere in the world.",
        authorName: "Michael",
        category: "Business",
        tags: [
            "remote work",
            "entrepreneurship",
            "business"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
    },
    {
        title: "The Science of Better Sleep",
        slug: "science-better-sleep",
        content: "Quality sleep is essential for physical health, mental clarity, and emotional well-being. Discover evidence-based strategies to improve your sleep and wake up feeling refreshed every day.",
        excerpt: "Unlock the secrets to restful nights and energized mornings.",
        authorName: "Dr. Lisa",
        category: "Health",
        tags: [
            "sleep",
            "wellness",
            "science"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop"
    },
    {
        title: "Cooking Like a Pro: Essential Kitchen Skills",
        slug: "cooking-essential-kitchen-skills",
        content: "Transform your home cooking with professional techniques. From knife skills to flavor pairing, learn the fundamentals that will elevate your culinary creations to restaurant quality.",
        excerpt: "Master the kitchen with these professional chef secrets and techniques.",
        authorName: "Chef Marco",
        category: "Food",
        tags: [
            "cooking",
            "food",
            "skills"
        ],
        status: "published",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    }
];
async function POST() {
    try {
        const { db } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        const existingPosts = await db.collection("posts").countDocuments();
        if (existingPosts > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Posts already exist",
                count: existingPosts
            });
        }
        const now = new Date();
        const postsToInsert = samplePosts.map((post, index)=>({
                ...post,
                authorId: "",
                publishedAt: new Date(now.getTime() - index * 24 * 60 * 60 * 1000),
                createdAt: new Date(now.getTime() - index * 24 * 60 * 60 * 1000),
                updatedAt: now
            }));
        const result = await db.collection("posts").insertMany(postsToInsert);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Successfully seeded posts",
            count: result.insertedCount
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error seeding posts:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to seed posts"
        }, {
            status: 500
        });
    }
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: "Use POST method to seed the database with sample posts"
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d1cf59df._.js.map