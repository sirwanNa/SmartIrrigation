export enum IrrigationType {
  Drip = "Drip",                     // Efficient, low-pressure, root-zone irrigation
  Sprinkler = "Sprinkler",           // Overhead spray irrigation (portable or fixed)
  Surface = "Surface",               // Traditional flood or furrow irrigation
  Subsurface = "Subsurface",         // Below-soil drip or pipe-based delivery
  Manual = "Manual",                 // Hand watering with hose or bucket
  CenterPivot = "CenterPivot",       // Circular automated sprinkler system
  LateralMove = "LateralMove",       // Moves linearly across the field
  Bubbler = "Bubbler",               // High-flow local delivery for trees
  Aeroponics = "Aeroponics",         // Mist-based, soil-less (greenhouses)
  Hydroponics = "Hydroponics",       // Water-circulated root zone for soil-less farms
}
