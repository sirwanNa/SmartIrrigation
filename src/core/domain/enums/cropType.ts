export enum CroptType{
    None = 0,
    // 🌾 Grains & Cereals
    Wheat = 1 << 0,          // 1
    Corn = 1 << 1,           // 2
    Rice = 1 << 2,           // 4
    Barley = 1 << 3,         // 8

    // 🥬 Vegetables
    Tomato = 1 << 4,         // 16
    Potato = 1 << 5,         // 32
    Carrot = 1 << 6,         // 64
    Cucumber = 1 << 7,       // 128

    // 🍎 Fruits
    Apple = 1 << 8,          // 256
    Orange = 1 << 9,         // 512
    Grape = 1 << 10,         // 1024
    Banana = 1 << 11,        // 2048

    // 🌰 Legumes
    Soybean = 1 << 12,       // 4096
    Pea = 1 << 13,           // 8192

    // 🪵 Industrial
    Cotton = 1 << 14,        // 16384
    Sugarcane = 1 << 15,     // 32768

    // 🪴 Special
    Olive = 1 << 16,         // 65536
    Tea = 1 << 17,           // 131072
    Coffee = 1 << 18,        // 262144

    // 🌿 Forage / Other
    Alfalfa = 1 << 19,       // 524288
    Mixed = 1 << 20          // 1048576
}
